import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../helpers/axiosConfig';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import roleController from '../../helpers/roleLogin';
import Dates from '../../helpers/getDate';
import CustomTooltip from '../../helpers/toolTip';

import './barChart.css'

function BarGraph() {

  if (!roleController.isAdmin()) {
    window.location = '/login'
  }

  const [data, setData] = useState([]);

  const [date, setDate] = useState({
    currentDate: Dates.getDate()
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setDate(values => ({ ...values, [name]: value }))
  };

  useEffect(() => {
    axios(axiosConfig.postConfig('http://localhost:4000/admin/barchart', date)) //gets data from api
      .then(response => {
        setData(response.data.data); //save only 'data' in response to the state
      })
      .catch((error) => {
        alert('Session Timed out login again')
        window.location = '/login'
      });
  }, [date]);

  return (
    <>
      <div className='resHeading'>Response Status</div>

      <label className='dataInput'>Select date :</label><input type='date' className='dateInput' name='currentDate' value={date.currentDate || ''} onChange={handleChange} max={Dates.getDate()}></input>

      {data.length === 0 ?
        <>
          <div className='noData'>No Alerts Sent !</div>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              width={500}
              height={500}
              margin={{
                top: 50,
                right: 30,
                left: 30,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis scale='linear' domain={[0, 3]} />
              <Tooltip cursor={{ fill: '#0000' }} content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Responded" barSize={50} fill="#7ABB67" />
              <Bar dataKey="Unresponded" barSize={50} fill="#CA6767" />
            </BarChart>
          </ResponsiveContainer>
        </>
        :
        <>
          <ResponsiveContainer width='100%' height={400}>
            <BarChart
              width={500}
              height={500}
              data={data}
              margin={{
                top: 50,
                right: 30,
                left: 30,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis scale='linear' domain={[0, 'dataMax']} />
              <Tooltip cursor={{ fill: '#0000' }} content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Responded" barSize={50} fill="#7ABB67" />
              <Bar dataKey="Unresponded" barSize={50} fill="#CA6767" />
            </BarChart>
          </ResponsiveContainer>
        </>}
    </>
  );
}

export default BarGraph;