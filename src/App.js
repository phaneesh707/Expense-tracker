import { BrowserRouter, Route, Routes, useNavigate ,Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';
import Chart from './components/Chart';
import { useEffect, useState } from "react";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  

 
  return (
    <div>
      {
        isLoggedIn ? <NavBar /> : null
      }
      
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path='/expenses' element={<Expenses/>} />
          <Route path='/add' element={<AddExpense/>} />
          <Route path='/statistic' element={<Chart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
         
      </BrowserRouter>
    </div>
  );
}

export default App;
