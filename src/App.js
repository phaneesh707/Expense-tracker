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
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);



 
  return (
    <div>
        
      <BrowserRouter>
        <Routes>
        {/* {isLoggedIn && <NavBar /> } */}
        {/* <Route path='*' element={<NavBar/>} /> */}
        <Route
            path="/"
            element={<><NavBar/> <Home /> </>}
          />
          <Route path='/expenses' element={<><NavBar/><Expenses/></>} />
          <Route path='/add' element={<><NavBar/><AddExpense/></>} />
          <Route path='/statistic' element={<><NavBar/><Chart/></>} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
         
      </BrowserRouter>
    </div>
  );
}

export default App;
