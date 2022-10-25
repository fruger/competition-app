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

  const getCompetition = () => {
    axios
      .get("https://localhost:7173/api/Competition")
      .then((res) => {
        setCompetition(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCompetition();
  }, []);

  // const getData = () => {
  //   props.onGetCompetitionsData(competition);
  // };

  const startCreatingHandler = () => {
    setIsCreating(true);
  };

  const stopCreatingHandler = () => {
    setIsCreating(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#3f3f3f",
      }}
    >
      <Card className={styles.competitions__background}>
        <div className={styles.competitions__create}>
          <Button type="button" onClick={startCreatingHandler}>
            CREATE COMPETITION
          </Button>
        </div>
        <Card className={styles.competitions}>
          {competition?.length === 0 && <h1>No competitions found.</h1>}
          {competition?.map((competition) => (
            <CompetitionItem
              key={competition.id}
              id = {competition.id}
              name={competition.name}
              laps={competition.laps}
              competitors={competition.competitorIds.length}
              status={competition.status}
              //onGetData={getData}
            />
          ))}
        </Card>
      </Card>

      <CompetitionForm
        onCancel={stopCreatingHandler}
        onGetCompetition={getCompetition}
        show={isCreating}
      />
    </div>
  );
};

export default Competitions;
