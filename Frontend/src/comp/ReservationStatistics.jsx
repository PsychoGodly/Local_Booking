import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import config from '../Config';

const ReservationStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchReservationStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:${config.portBackend}/api/reservation-statistics`);
        setStatistics(response.data);
        
        // Convert data to format compatible with ReactApexChart
        const categories = Object.keys(response.data);
        const seriesData = Object.values(response.data).map(value => value);
        setChartData({ categories, series: [{ name: 'Reservations', data: seriesData }] });
      } catch (error) {
        console.error('Error fetching reservation statistics:', error);
      }
    };

    fetchReservationStatistics();
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: chartData.categories || [],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Number of Reservations'
      }
    },
    title: {
      text: 'Reservation Statistics by Month'
    }
  };

  return (
    <div>
      <div>
        <ReactApexChart options={chartOptions} series={chartData.series || []} type="bar" height={350} />
      </div>
    </div>
  );
};

export default ReservationStatistics;
