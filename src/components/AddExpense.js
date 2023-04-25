import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExpense = (props) => {
	const [userId,setUserId] = useState();
	const [expense, setExpense] = useState({
		date: '',
		title: '',
		category: '',
		description: '',
		cost: '',
	});

	const changeHandler = (event) => {
		setExpense({ ...expense, [event.target.name]: event.target.value });
	};

	const addExpense = (event) => {
		event.preventDefault();
		if (expense.date && expense.title && expense.category && expense.description && expense.cost) {
			console.log("addExp",expense);
			axios.post(`http://localhost:8080/addExp/${userId}`, expense);
			toast.success(<strong>Expense Added</strong>, {
				position: toast.POSITION.TOP_RIGHT
			});
			
		}else{
			console.log("error in addExp");
			toast.warning(<strong>Enter all the details</strong>, {
				position: toast.POSITION.TOP_RIGHT
			  });
		}
	};

	const cancel = () => {
		setExpense({
			date:'',title:'',category:'',description:'',cost:''
		})
	};

	

	useEffect(() => {
	  const userId = localStorage.getItem('userid');
	  setUserId(userId);
	}, [])
	

	return (
		<div>
			<ToastContainer />
			<div className='container'>
				<br />
				<h1 style={{ textAlign: 'center' }}>Add an Expense</h1>
				<br />
				<div className='form-container'>
					<form autoComplete='off'>
						<div className='form-group'>
							<label htmlFor='title'> Title </label>
							<input id='title' placeholder='Enter title' className='form-control' name='title' onChange={changeHandler} required />
						</div>
						<div className='form-group'>
							<label htmlFor='category'> Category </label>
							<select id='category' className='form-control' name='category' onChange={changeHandler} required>
								<option value=''>Select category</option>
								<option value='groceries'>Groceries</option>
								<option value='bills'>Bills</option>
								<option value='entertainment'>Entertainment</option>
								<option value='transport'>Transport</option>
								<option value='food'>Food</option>
								<option value='health'>Helath</option>
								<option value='travel'>Travel</option>
							</select>
						</div>
						<div className='form-group'>
							<label htmlFor='description'> Description </label>
							<input id='description' placeholder='Enter description' className='form-control' name='description' onChange={changeHandler} required />
						</div>
						<div className='form-group'>
							<label htmlFor='cost'> Cost </label>
							<div className='form-inline'>
		
								<input type='number' id='cost' placeholder='Enter cost' className='form-control' step='0.01' name='cost' onChange={changeHandler} required />
							</div>
						</div>
						<div className='form-group'>
							<label htmlFor='date'> Date </label>
							<input type='date' id='date' className='form-control' name='date' onChange={changeHandler} required />
						</div>
						<button type='submit' className='btn btn-success' onClick={addExpense}>
							Add
						</button>
						&nbsp;&nbsp;
						<button className='btn btn-danger' onClick={cancel}>
							Cancel
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddExpense;
