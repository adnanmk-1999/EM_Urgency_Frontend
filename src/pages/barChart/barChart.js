import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
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
  // ADMIN GUARD
  // ===============================
  useEffect(() => {
    if (!roleController.isAdmin()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDate(prev => ({ ...prev, [name]: value }));
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
        alert('Session timed out. Please login again.');
        localStorage.clear();
        navigate('/login', { replace: true });
      });
  }, [date, navigate]);

  function formatDateReadable(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  return (
    <div className="chartSection">
      {/* ===== HEADER ===== */}
      <div className="chartHeader">
        <h1>Response Status</h1>
        <div className="chartUnderline"></div>
      </div>

      <div className="datePickerWrapper">
        <span className="dateLabel">Select date:</span>
        <span className="dateText">
          {formatDateReadable(date.currentDate)}
        </span>

        <div className="dateBox">
          <input
            type="date"
            name="currentDate"
            value={date.currentDate || ""}
            onChange={handleChange}
            max={Dates.getDate()}
            className="hiddenDateInput"
          />
          <span className="material-icons">calendar_today</span>
        </div>
      </div>

      {/* ===== CHART ===== */}
      <div className="chartContainer">
        {data.length === 0 ? (
          <>
            <div className="noData">No Alerts Sent</div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart margin={{ top: 30, right: 30, left: 30, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={data}
              margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" />
              <Bar dataKey="Responded" barSize={40} fill="#7ABB67" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Unresponded" barSize={40} fill="#CA6767" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default BarGraph;
