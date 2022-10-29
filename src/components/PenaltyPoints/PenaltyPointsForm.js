import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import axios from "axios";
import CustomButton from "../UI/Button";
import Card from "../UI/Card";
import CustomToast from "../UI/CustomToast";
import styles from "./PenaltyPointsForm.module.css";

const PenaltyPointsForm = () => {
  const [enteredLapNumber, setEnteredLapNumber] = useState(1);
  const [enteredPenaltyPoints, setEnteredPenaltyPoints] = useState(0);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState();
  const [competitors, setCompetitors] = useState();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const numberOfLaps = state[0];
  const competitionId = state[1];

  let newCompetitor;
  let newPenaltyPointsSum = 0;

  const getCompetitors = () => {
    axios
      .get("https://localhost:7173/api/Competitor")
      .then((res) => {
        setCompetitors(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCompetitors();
  }, []);

  const competitionIdsFilter = competitors?.filter((competitor) => {
    return competitor.competitionId === competitionId;
  });

  const currentCompetitorChangeHandler = (event) => {
    if (event.target.id !== undefined) {
      setValidated(false);
    }

    setSelectedCompetitorId(event.target.id);
  };

  const penaltyPointsChangeHandler = (event) => {
    if (event.target.value !== undefined) {
      setValidated(false);
    }
    setEnteredPenaltyPoints(event.target.value);
  };

  const lapNumberChangeHandler = (event) => {
    if (event.target.value !== undefined) {
      setValidated(false);
    }
    setEnteredLapNumber(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (selectedCompetitorId === undefined) {
      setValidated(true);
      setShow({
        bg: "danger",
        delay: "4000",
        title: "Failure",
        message: "Select a competitor",
      });
      return;
    }

    newCompetitor = competitors.filter(
      (competitor) => competitor.id === selectedCompetitorId
    );

    newCompetitor.map((competitor) => {
      if (competitor.lapIds.length >= numberOfLaps) {
        setValidated(true);
        setShow({
          bg: "danger",
          delay: "4000",
          title: "Failure",
          message: "Cannot add any more penalty points",
        });
        return;
      } else if (enteredLapNumber <= competitor.lapIds.length) {
        setValidated(true);
        setShow({
          bg: "danger",
          delay: "4000",
          title: "Failure",
          message: "Select correct lap (Points has already been added)",
        });
        return;
      } else if (parseInt(enteredLapNumber) !== competitor.lapIds.length + 1) {
        setValidated(true);
        setShow({
          bg: "danger",
          delay: "4000",
          title: "Failure",
          message: "Select correct lap (Previous lap was not rated)",
        });
        return;
      } else {
        axios
          .post("https://localhost:7173/api/Lap", {
            number: enteredLapNumber,
            penaltyPoints: enteredPenaltyPoints,
            competitorId: selectedCompetitorId,
          })
          .then(() => {
            getCompetitors();
            setShow({
              bg: "success",
              delay: "1500",
              title: "Success",
              message: "Added penalty points",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      newPenaltyPointsSum = competitor.penaltyPointsSum;
      newPenaltyPointsSum += parseInt(enteredPenaltyPoints);

      axios
        .put(
          "https://localhost:7173/api/Competitor/penaltysum/" +
            selectedCompetitorId,
          {
            id: selectedCompetitorId,
            penaltyPointsSum: newPenaltyPointsSum,
          }
        )
        .then()
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#3f3f3f",
      }}
    >
      <CustomToast
        className={styles.toast}
        show={show}
        onClose={() => setShow(false)}
        delay={show.delay}
        bg={show.bg}
        title={show.title}
        message={show.message}
      />

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
                <Form.Label>LAP NUMBER</Form.Label>
                <Form.Select
                  isInvalid={validated}
                  required
                  value={enteredLapNumber}
                  onChange={lapNumberChangeHandler}
                >
                  {Array.from({ length: numberOfLaps }).map((_, index) => (
                    <option key={index}>{index + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>PENALTY POINTS</Form.Label>
                <Form.Select
                  isInvalid={validated}
                  required
                  value={enteredPenaltyPoints}
                  onChange={penaltyPointsChangeHandler}
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
            <div key={competitor.id} className={styles.buttonGroup}>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value={competitor}
                name="myButton"
                id={competitor.id}
                onClick={currentCompetitorChangeHandler}
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
              <label
                className={styles.buttonGroup__label}
                htmlFor={competitor.id}
              >
                Laps: {competitor.lapIds.length}
              </label>
              <label
                className={styles.buttonGroup__label}
                htmlFor={competitor.id}
              >
                Pen. pts sum: {competitor.penaltyPointsSum}
              </label>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default PenaltyPointsForm;
