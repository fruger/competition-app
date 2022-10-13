import { useState } from "react";
import CompetitionForm from "../NewCompetition/CompetitionForm";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CompetitionItem from "./CompetitionItem";
import "./Competitions.css";

const Competitions = (props) => {
  const [isCreate, setIsCreating] = useState(false);

  const startCreatingHandler = () => {
    setIsCreating(true);
  };

  const saveCompetitionDataHandler = (enteredCompetitionData) => {
    const competitionData = {
      ...enteredCompetitionData,
      id: Math.random().toString(),
    };
    props.onAddCompetition(competitionData);
  };

  const stopCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div>
      {isCreate && (
        <CompetitionForm
          onSaveCompetitionData={saveCompetitionDataHandler}
          onCancel={stopCreatingHandler}
        />
      )}
      <Card className="competitions__background">
        <div className="competitions__create">
          <Button type="button" onClick={startCreatingHandler}>
            CREATE COMPETITION
          </Button>
        </div>
        <Card className="competitions">
          {props.items.map((competition) => (
            <CompetitionItem
              key = {competition.id}
              name={competition.name}
              laps={competition.laps}
              competitors={competition.competitors}
            />
          ))}
        </Card>
      </Card>
    </div>
  );
};

export default Competitions;
