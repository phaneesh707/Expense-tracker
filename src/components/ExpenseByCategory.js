import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';



const ExpenseByCategory = () => {
  const [data, setData] = useState([]);
  const [userId,setUserId] = useState();

  useEffect(() => {

    const id = localStorage.getItem('userid');
    setUserId(id)
    axios
      .get(`http://localhost:8080/userexp/${id}`)
      .then((response) => {
        const expenses = response.data;

        // Group expenses by category
        const categories = expenses.reduce((acc, expense) => {
          const category = expense.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + expense.cost;
          return acc;
        }, {});

        // Convert categories object to an array of objects that can be used in a pie chart
        const data = Object.entries(categories).map(([category, cost]) => ({
          label: category,
          value: cost,
        }));

        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#C9CBFF',
          '#FD6A02',
          '#7CCBE5',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#C9CBFF',
          '#FD6A02',
          '#7CCBE5',
        ],
      },
    ],
  };

  return (
    <div>
    <div className="chart-container" style={{ width: '400px', height: '400px'}}>
      <h2>Expenses by Category</h2>
      {data.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading expenses by category...</p>
      )}
    </div>
    </div>
  );
};

export default ExpenseByCategory;
