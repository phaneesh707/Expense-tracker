// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/login', { email, password });
//       console.log(response.data);
//       localStorage.setItem('isLoggedIn', true);
//       localStorage.setItem('userid', response.data.id);
//       navigate("/home");
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6 mx-auto">
//           <div className="card">
//             <div className="card-header">
//               <h4>Login</h4>
//             </div>
//             <div className="card-body">
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Email address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">
//                   Login
//                 </button>
//               </form>
//               <p className="mt-3">
//                 Don't have an account? <Link to="/signup">Sign up</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate  = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });
      console.log(response.data);
      
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userid', response.data.id);
      setIsLoggedIn(true);
      navigate('/expenses');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSingin = () => {
    navigate('/signup');
  }
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        <p className='text-center mt-3'><span>OR</span></p>
        <Button variant="dark" onClick={handleSingin} className="w-100 mt-3">
              New user ? Sign up
        </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
