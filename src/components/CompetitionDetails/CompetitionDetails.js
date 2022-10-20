import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CompetitionDetails.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CompetitorSignUp from "./CompetitorSignUp";
import CompetitorsTable from "./CompetitorsTable";

const CompetitionDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSigningUp, setIsSigningUp] = useState();
  const [competitors, setCompetitors] = useState();

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

  const startSigningUpHandler = () => {
    setIsSigningUp(true);
  };

  const stopSigningUpHandler = () => {
    setIsSigningUp(false);
  };

  const competitionId = state[1];
  const laps = state[2];

  return (
    <div
      style={{
        backgroundColor: "#3f3f3f",
      }}
    >
      <div className={styles.competitions__background}>
        <div className={styles["back-to-list"]}>
          <Button onClick={() => navigate("/")}>GO TO COMPETITIONS LIST</Button>
        </div>

        <Card className={styles.competitions}>
          <h1>{state[0]}</h1>

          <Button type="button" onClick={startSigningUpHandler}>
            SIGN UP
          </Button>
          <Button type="button">ADD PENALTY POINTS</Button>

          <div className={styles.competitions__groups}>
            <h4>Groups:</h4>
            <Button type="button">ALL</Button>
            <Button type="button">A</Button>
            <Button type="button">B</Button>
            <Button type="button">C</Button>
          </div>

          <CompetitorsTable
            laps={laps}
            competitionId={competitionId}
            items={competitors}
          />
        </Card>
      </div>

      <CompetitorSignUp
        onCancel={stopSigningUpHandler}
        show={isSigningUp}
        onGetCompetitor={getCompetitors}
        competitionId={competitionId}
      />
    </div>
  );
};

export default CompetitionDetails;
