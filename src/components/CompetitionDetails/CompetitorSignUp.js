import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

const CompetitorSignUp = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredGroup, setEnteredGroup] = useState("A");
  const [enteredStartingNumber, setEnteredStartingNumber] = useState(props.competitors + 1);
  const [validated, setValidated] = useState(false);

  const firstNameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setValidated(false);
    }
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setValidated(false);
    }
    setEnteredLastName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      enteredFirstName.trim().length === 0 ||
      enteredLastName.trim().length === 0
    ) {
      setValidated(true);
      return;
    }

    axios
      .post("https://localhost:7173/api/Competitor", {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        group: enteredGroup,
        competitionId: props.competitionId,
        startingNumber: enteredStartingNumber,
      })
      .then(() => props.onGetCompetitor())
      .catch((error) => {
        console.log(error);
      });

    setEnteredStartingNumber(enteredStartingNumber + 1);
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredLastName}
              onChange={lastNameChangeHandler}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Group</Form.Label>
            <Form.Select
              required
              value={enteredGroup}
              onChange={(event) => setEnteredGroup(event.target.value)}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modalform__control">
        <Button variant="primary" onClick={submitHandler}>
          SUBMIT
        </Button>
        <Button variant="secondary" onClick={props.onCancel}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompetitorSignUp;
