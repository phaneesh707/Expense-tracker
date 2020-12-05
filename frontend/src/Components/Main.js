import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import NavBar from "./NavBar";

import Home from "./Home";
import Expenses from "./Expenses"
import AddExpense from './AddExpense'
import Chart from './Chart'


class Main extends Component {
	    render(){
        return(
            <div>
				<NavBar/>
				{/*Render Different Component based on Route*/}
	            <Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/home' component={Home} />
					<Route path='/expenses' component={Expenses} />
					<Route path='/add' component={AddExpense} />
					<Route path='/statistic' component={Chart} />
				</Switch>
			</div>
        )
    }
}

export default Main;