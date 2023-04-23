import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgChartsReact } from 'ag-charts-react';
import ExpenseByCategory from './ExpenseByCategory';

const Chart = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [userId,setUserId] = useState();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id)
    axios.get(`http://localhost:8080/userexp/${id}`)
      .then((response) => {
        let i;
        let temp = 0;
        let points = [];
        for (i = 0; i < response.data.length; i++) {
          if (i !== (response.data.length - 1) && !response.data[i + 1].date.localeCompare(response.data[i].date)) {
            temp += response.data[i].cost;
          } else {
            temp += response.data[i].cost;
            let day = response.data[i].date.substring(8, 10);
            points.push({
              date: String(day),
              spending: Number(temp),
            });
            temp = 0;
          }
        }
        setDataPoints(points);
      });
  }, []);

  const options = {
    type: 'line',
    autoSize: true,
  
    legend: {
      enabled: false
    },
    data: dataPoints,
    series: [{
      xKey: 'date',
      yKey: 'spending',
    }],
  };

  return <>
    <div className='d-flex justify-content-center flex-column' style={{alignItems:'center'}}>
    <h2>Expenses Graph</h2>
    <AgChartsReact options={options} />
    <ExpenseByCategory />
    </div>
    </> ;
}

export default Chart;
