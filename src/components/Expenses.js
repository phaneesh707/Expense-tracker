
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ExpenseModal from './ExpenseModal';


const Expenses = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalExpense, setModalExpense] = useState({});
  const [newExpense, setNewExpense] = useState({});
  const [userId,setUserId] = useState();

  useEffect(() => {

    const id = localStorage.getItem('userId');
    setUserId(id)
    axios
      .get(`http://localhost:8080/userexp/${id}`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        toast.success(<strong>Error geting resopnse</strong>, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  }, []);



  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/delexp/${id}`)
      .then((response) => {
        const filteredExpenses = result.filter((expense) => expense.id !== id);
        setResult(filteredExpenses);
      })
      .catch((err) => {
        setError(
          <div className="alert alert-warning" style={{ marginTop: '5%' }}>
            Error deleting expense
          </div>
        );
      });
      toast.success(<strong>Expense Deleted</strong>, {
        position: toast.POSITION.TOP_RIGHT
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = (expense) => {
    setShowModal(true);
    setModalExpense(expense);
    setNewExpense(expense);
  };

  const handleUpdate = (id) => {
    
    // handleModalShow(result.find((expense) => expense.id === id));
    axios
      .put(`http://localhost:8080/update/${id}`, newExpense)
      .then((response) => {
        setResult((prevState) =>
          prevState.map((expense) =>
            expense.id === modalExpense.id ? response.data : expense
          )
        )
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => {
        handleModalClose();
      });
  };


  
  

  const details = result.map((expense) => (
    <tr key={expense.id}>
      <td>{expense.date}</td>
      <td>{expense.title}</td>
      <td>${expense.cost}</td>
      <td>{expense.category}</td>
      <td>{expense.description}</td>
      <td>
        <Button onClick={() => handleModalShow(expense)} variant='primary'>Update</Button>
      </td>
      <td>
        <Button onClick={() => handleDelete(expense.id)} variant='danger'>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="container" style={{ textAlign: 'center' }}>
        <br />
        <h1>Expenses</h1>
        <br />
        <div>
          <Table>
            <colgroup>
              <col span="1" style={{ width: '15%' }} />
              <col span="1" style={{ width: '20%' }} />
              <col span="1" style={{ width: '15%' }} />
              <col span="1" style={{ width: '15%' }} />
              <col span="1" style={{ width: '25%' }} />
              <col span="1" style={{ width: '12.5%' }} />
              <col span="1" style={{ width: '12.5%' }} />
            </colgroup>

            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Cost</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{details}</tbody>
          </Table>
          {error}
        </div>
        <ExpenseModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        handleUpdate={handleUpdate}
        modalExpense={modalExpense}
        setNewExpense={setNewExpense}
        newExpense={newExpense}
      />
      </div>
    </div>
  );
};

export default Expenses;

