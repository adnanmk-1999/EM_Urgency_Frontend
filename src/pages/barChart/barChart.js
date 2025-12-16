import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from 'react-router-dom';
import roleController from '../../helpers/roleLogin';
import Dates from '../../helpers/getDate';
import CustomTooltip from '../../helpers/toolTip';

import axiosClient from '../../api/axiosClient';

import './barChart.css';

function BarGraph() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [date, setDate] = useState({
    currentDate: Dates.getDate()
  });

  // ===============================
  // ADMIN GUARD (functional fix)
  // ===============================
  useEffect(() => {
    if (!roleController.isAdmin()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setDate(values => ({ ...values, [name]: value }));
  }

  // ===============================
  // FETCH BAR CHART DATA
  // ===============================
  useEffect(() => {
    axiosClient
      .post('/admin/barchart', date)
      .then(response => {
        setData(response.data.data);
      })
      .catch(() => {
        alert('Session Timed out login again');
        localStorage.clear();
        navigate('/login', { replace: true });
      });
  }, [date, navigate]);

  return (
    <>
      <div className='resHeading'>Response Status</div>

      <label className='dataInput'>Select date :</label>
      <input
        type='date'
        className='dateInput'
        name='currentDate'
        value={date.currentDate || ''}
        onChange={handleChange}
        max={Dates.getDate()}
      />

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
        </>
      }
    </>
  );
}

export default BarGraph;
