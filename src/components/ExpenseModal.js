import { Modal, Button, Form } from 'react-bootstrap';

const ExpenseModal = ({ showModal, handleModalClose, handleUpdate, modalExpense, setNewExpense, newExpense }) => {

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExpense(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newExpense.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCost">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="text"
              name="cost"
              value={newExpense.cost}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleUpdate(modalExpense.id)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
