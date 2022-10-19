import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import './AddForm.css'

const AddForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredLaps, setEnteredLaps] = useState("");
  const [isValid, setIsValid] = useState(true);

  const nameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredName(event.target.value);
  };

  const lapsChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredLaps(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      enteredName.trim().length === 0 ||
      10 < enteredLaps ||
      5 > enteredLaps
    ) {
      setIsValid(false);
      return;
    }

    axios
      .post("https://localhost:7173/api/Competition", {
        name: enteredName,
        laps: enteredLaps,
      })
      .then(() => props.onGetCompetition())
      .catch((error) => {
        console.log(error);
      });
    props.onCancel();
  };

  return (
    <Modal className="addform" show={props.show}>
      <Modal.Header className="addform__control">
        <Modal.Title>CREATE COMPETITION</Modal.Title>
      </Modal.Header>
      <Modal.Body className="addform__control">
        <Form validated={!isValid}>
          <Form.Group validated={!isValid}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredName}
              onChange={nameChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Number of laps (5-10)</Form.Label>
            <Form.Control
              type="number"
              required
              min="5"
              step="1"
              max="10"
              value={enteredLaps}
              onChange={lapsChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number of laps between 5 and 10.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="addform__control">
        <Button variant="primary" onClick={submitHandler}>
          SUBMIT
        </Button>
        <Button type="reset" defaultValue="Reset" variant="secondary" onClick={props.onCancel}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddForm;
