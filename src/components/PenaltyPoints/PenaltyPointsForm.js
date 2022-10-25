import { useState } from "react";
import { Button, Col, Form, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import CustomButton from "../UI/Button";
import Card from "../UI/Card";
import styles from "./PenaltyPointsForm.module.css";
import axios from "axios";

const PenaltyPointsForm = () => {
  const [enteredLapNumber, setEnteredLapNumber] = useState(1);
  const [enteredPenaltyPoints, setEnteredPenaltyPoints] = useState(0);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const numberOfLaps = state[0];
  const competitors = state[1];
  const competitionId = state[2];

  const competitionIdsFilter = competitors?.filter((competitor) => {
    return competitor.competitionId === competitionId;
  });

  const currentCompetitor = (event) => {
    if (
      parseInt(event.target.value) < numberOfLaps &&
      event.target.id !== undefined
    ) {
      setValidated(false);
    }
    
    setEnteredLapNumber(parseInt(event.target.value) + 1);
    setSelectedCompetitorId(event.target.id);
  };

  console.log(enteredLapNumber)

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredLapNumber > numberOfLaps ||
      selectedCompetitorId === undefined
    ) {
      setValidated(true);
      return;
    }

    axios
      .post("https://localhost:7173/api/Lap", {
        number: enteredLapNumber,
        penaltyPoints: enteredPenaltyPoints,
        competitorId: selectedCompetitorId,
      })
      .then(() => setShow(true))
      .catch((error) => {
        console.log(error);
      });

    setEnteredLapNumber(enteredLapNumber + 1);
  };

  return (
    <div
      style={{
        backgroundColor: "#3f3f3f",
      }}
    >
      <Col xs={5} className={styles.toast}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Added penalty points</Toast.Body>
        </Toast>
      </Col>
      <div className={styles.competitions__background}>
        <div className={styles["back-to-list"]}>
          <CustomButton onClick={() => navigate(-1)}>
            <ImArrowLeft size={"1.5rem"} className={styles.icon} /> BACK TO
            <br />
            COMPETITION DETAILS
          </CustomButton>
          <CustomButton onClick={() => navigate("/")}>
            GO TO
            <br />
            COMPETITIONS LIST
          </CustomButton>
        </div>
        <Card className={styles.competitions}>
          <div className={styles.form}>
            <Form>
              <Form.Group>
                <Form.Label>PENALTY POINTS</Form.Label>
                <Form.Select
                  isInvalid={validated}
                  required
                  value={enteredPenaltyPoints}
                  onChange={(event) =>
                    setEnteredPenaltyPoints(event.target.value)
                  }
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Select>
              </Form.Group>
              <Button
                className={styles.formButton}
                variant="primary"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </Form>
          </div>
          {competitionIdsFilter?.map((competitor) => (
            <div className={styles.buttonGroup}>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value={competitor.lapIds.length}
                name="myButton"
                id={competitor.id}
                onClick={currentCompetitor}
              />

              <label
                className={styles.buttonGroup__label}
                htmlFor={competitor.id}
              >
                {competitor.firstName}
              </label>
              <label
                className={styles.buttonGroup__label}
                htmlFor={competitor.id}
              >
                {competitor.lastName}
              </label>
              <label
                className={styles.buttonGroup__label}
                htmlFor={competitor.id}
              >
                No.: {competitor.startingNumber}
              </label>
              <label
                className={styles.buttonGroup__label}
                htmlFor={competitor.id}
              >
                Group: {competitor.group}
              </label>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default PenaltyPointsForm;
