import React, { useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../components/Sidebar';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Dummy data for charts, which should be filtered based on date range
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Sales',
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: [300, 400, 500, 200, 300, 400, 600],
      },
    ],
  };

  const pieData = {
    labels: ['Electronics', 'Fashion', 'Grocery'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Order Trends',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const doughnutData = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        data: [200, 150],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className='dashboard container-fluid d-flex p-0 m-0'>
				<div className='col-2 col-md-1 col-sm-1 col-lg-2'>
					<Sidebar />
				</div>
				<div className='col-10 col-md-11 col-sm-11 col-lg-10'>
					<div className='row'>
          <h1 className="mb-4">E-commerce Dashboard</h1>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-dollar-sign"></i> Total Sales</h5>
                  <p className="card-text">$10,000</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-users"></i> New Customers</h5>
                  <p className="card-text">150</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-box"></i> Orders</h5>
                  <p className="card-text">200</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Sales Overview</h5>
                  <Bar data={barData} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order Trends</h5>
                  <Line data={lineData} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">Product Categories</h5>
                  <Pie data={pieData} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="card mb-2" >
                <div className="card-body">
                  <h5 className="card-title">Customer Data</h5>
                  <Doughnut data={doughnutData} />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-6">
              <div className="row">
                <div className="col-12 col-md-6 col-sm-12">
                  <div className="card text-dark border-secondary mb-3">
                    <div className="card-body">
                      <h5 className="card-title"><i className="fas fa-chart-line"></i> Website Analytics</h5>
                      {/* Replace with actual data visualization for website analytics */}
                      <p>Total Visits: 5000</p>
                      <p>Page Views: 15000</p>
                      <p>Bounce Rate: 50%</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-lg-6">
                  <div className="card text-secondary border-dark mb-3">
                    <div className="card-body">
                      <h5 className="card-title"><i className="fas fa-bullhorn"></i> Marketing Data</h5>
                      {/* Replace with actual data visualization for marketing data */}
                      <p>Email Open Rate: 25%</p>
                      <p>Click-Through Rate: 5%</p>
                      <p>Social Media Engagement: 300</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-warehouse"></i> Inventory Levels</h5>
                  {/* Replace with actual data visualization for inventory */}
                  <p>Low Stock: 10 items</p>
                  <p>In Stock: 200 items</p>
                </div>
              </div>         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
