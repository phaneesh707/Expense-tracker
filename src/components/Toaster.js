// import Toast from 'react-bootstrap/Toast';

function Toaster({head,body}) {
  return (
    <Toast>
      <Toast.Header>
        
        <strong className="me-auto">{head}</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

export default Toaster;