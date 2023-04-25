import { BrowserRouter, Route, Routes } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "./NavBar";
import Expenses from "./Expenses";
import AddExpense from './AddExpense';
import Chart from './Chart';
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    if(!localStorage.getItem("isLoggedIn")){
      window.location.href = "/login";
    }
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Home;
