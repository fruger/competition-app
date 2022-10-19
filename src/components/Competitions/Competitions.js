import axios from "axios";
import { useEffect, useState } from "react";
import CompetitionForm from "../NewCompetition/CompetitionForm";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CompetitionItem from "./CompetitionItem";
import styles from "./Competitions.module.css";

const Competitions = (props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [competition, setCompetition] = useState();

  useEffect(() => {
    getCompetition();
  }, []);

  const getCompetition = () => {
    axios
      .get("https://localhost:7173/api/Competition")
      .then((res) => {
        //console.log(res.data);
        setCompetition(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startCreatingHandler = () => {
    setIsCreating(true);
  };

  const stopCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div>
      {isCreating && (
        <CompetitionForm
          onCancel={stopCreatingHandler}
          onGetCompetition={getCompetition}
        />
      )}

      <Card className={styles.competitions__background}>
        <div className={styles.competitions__create}>
          <Button type="button" onClick={startCreatingHandler}>
            CREATE COMPETITION
          </Button>
        </div>
        <Card className={styles.competitions}>
          {competition?.length === 0 && <h1>Found no competitions.</h1>}
          {competition?.map((competition) => (
            <CompetitionItem
              key={competition.id}
              name={competition.name}
              laps={competition.laps}
              competitors={competition.competitorIds.length}
            />
          ))}
        </Card>
      </Card>
    </div>
  );
};

export default Competitions;
