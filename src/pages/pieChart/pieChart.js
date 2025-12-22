import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from 'react-router-dom';
import roleController from '../../helpers/roleLogin';

import axiosClient from '../../api/axiosClient';

import './pieChart.css';

function PieGraph() {

  const navigate = useNavigate();

  const [sentCount, setsendCount] = useState([]);
  const [failedCount, setfailedCount] = useState([]);
  const [draftCount, setdraftCount] = useState([]);

  // ADMIN GUARD (functional fix)
  useEffect(() => {
    if (!roleController.isAdmin()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // FETCH SENT COUNT
  useEffect(() => {
    axiosClient
      .get('/admin/piechartsent')
      .then(response => {
        setsendCount(response.data.data.Sent);
      });
  }, []);

  // FETCH FAILED COUNT
  useEffect(() => {
    axiosClient
      .get('/admin/piechartfailed')
      .then(response => {
        setfailedCount(response.data.data.Failed);
      });
  }, []);

  // FETCH DRAFT COUNT
  useEffect(() => {
    axiosClient
      .get('/admin/piechartdraft')
      .then(response => {
        setdraftCount(response.data.data.Draft);
      });
  }, []);

  const data = [
    { name: "Success", value: sentCount, fill: "#88E16E" },
    { name: "Draft", value: draftCount, fill: "#F5E767" },
    { name: "Failed", value: failedCount, fill: "#F66060" }
  ];

  return (
    <>
      <div className="chartSection">
        <div className="chartHeader">
          <h1>Alert Status</h1>
          <div className="chartUnderline"></div>
        </div>

        <div className="chartContainer">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="49%"
                outerRadius={160}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                isAnimationActive
              />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default PieGraph;
