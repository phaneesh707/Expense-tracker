import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Balance = () => {
  const [total, setTotal] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/balance')
      .then(response => {
        setTotal(response.data);
      })
      .catch(err => {
        setError(<div className="alert alert-warning" style={{ marginTop: '5%' }}>Error here</div>);
      });
  }, []);

  return (
    <div>
      <div className="container" style={{ textAlign: "center" }}>
        <br></br>
        <h1>Balance</h1>
        <h2>${total}</h2>
        {error}
      </div>
    </div>
  )
}

export default Balance;
