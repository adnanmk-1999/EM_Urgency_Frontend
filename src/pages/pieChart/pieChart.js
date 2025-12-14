import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import roleController from '../../helpers/roleLogin';
import axios from 'axios';
import axiosConfig from '../../helpers/axiosConfig';

import './pieChart.css'

function PieGraph() {

  if (!roleController.isAdmin()) {
    window.location = '/login'
  }

  const [sentCount, setsendCount] = useState([])
  const [failedCount, setfailedCount] = useState([])
  const [draftCount, setdraftCount] = useState([])



  useEffect(() => {
    axios(axiosConfig.getConfig('http://localhost:4000/admin/piechartsent')) //gets data from api
      .then(response => {
        setsendCount(response.data.data.Sent); //save only 'data' in response to the state
      })
  }, [])


  useEffect(() => {
    axios(axiosConfig.getConfig('http://localhost:4000/admin/piechartfailed')) //gets data from api
      .then(response => {
        setfailedCount(response.data.data.Failed); //save only 'data' in response to the state
      })
  }, [])

  useEffect(() => {
    axios(axiosConfig.getConfig('http://localhost:4000/admin/piechartdraft')) //gets data from api
      .then(response => {
        setdraftCount(response.data.data.Draft); //save only 'data' in response to the state
      })
  }, [])

  const data = [
    { name: "Success", value: sentCount, fill: "#88E16E" },
    { name: "Draft", value: draftCount, fill: "#F5E767" },
    { name: "Failed", value: failedCount, fill: "#F66060" }
  ]

  return (
    <>
      <div className='statusHeading'>Alert Status</div>
      <ResponsiveContainer width='100%' height={450}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx='50%'
            cy={200}
            outerRadius={200}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default PieGraph;