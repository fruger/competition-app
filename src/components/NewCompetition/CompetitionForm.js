import { useState } from "react";
import Button from "../UI/Button";
import "./CompetitionForm.css";

const CompetitionForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredLaps, setEnteredLaps] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const lapsChangeHandler = (event) => {
    setEnteredLaps(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const competitionData = {
      name: enteredName,
      laps: enteredLaps,
    };

    console.log(competitionData);
    setEnteredName("");
    setEnteredLaps("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-competition__controls">
        <div className="new-competition__control">
          <label>NAME</label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
        </div>
        <div className="new-competition__control">
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
      <Button type="submit">CREATE COMPETITION</Button>
    </form>
  );
};

export default CompetitionForm;
