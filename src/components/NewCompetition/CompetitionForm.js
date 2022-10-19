import { useState } from "react";
import Button from "../UI/Button";
import styles from "./CompetitionForm.module.css";
import Card from "../UI/Card";
import axios from "axios";

const CompetitionForm = (props) => {
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
    <form>
      <div className={styles.backdrop} onClick={props.onCancel} />
      <Card
        className={`${styles["new-competition"]} ${styles["new-competition__modal"]}`}
      >
        <div className={`${styles["new-competition__controls"]}`}>
          <div
            className={`${styles["new-competition__control"]} ${
              !isValid && styles.invalid
            }`}
          >
            <label>NAME</label>
            <input
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
            />
          </div>
          <div
            className={`${styles["new-competition__control"]} ${
              !isValid && styles.invalid
            }`}
          >
            <label>NUMBER OF LAPS (5-10)</label>
            <input
              type="number"
              min="5"
              step="1"
              max="10"
              value={enteredLaps}
              onChange={lapsChangeHandler}
            />
          </div>
        </div>
        <Button onClick={submitHandler}>CREATE COMPETITION</Button>
        <Button onClick={props.onCancel}>CLOSE</Button>
      </Card>
    </form>
  );
};

export default CompetitionForm;
