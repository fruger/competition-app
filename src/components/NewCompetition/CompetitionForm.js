import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "./CompetitionForm.css";

const AddForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredLaps, setEnteredLaps] = useState("");
  const [validated, setValidated] = useState(false);

  const nameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setValidated(false);
    }
    setEnteredName(event.target.value);
  };

  const lapsChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setValidated(false);
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
      setValidated(true);
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
    <Modal className="modalform" show={props.show}>
      <Modal.Header className="modalform__control">
        <Modal.Title>CREATE COMPETITION</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalform__control">
        <Form validated={validated}>
          <Form.Group>
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
      <Modal.Footer className="modalform__control">
        <Button variant="primary" onClick={submitHandler}>
          SUBMIT
        </Button>
        <Button
          type="reset"
          defaultValue="Reset"
          variant="secondary"
          onClick={props.onCancel}
        >
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddForm;
