import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CompetitionDetails.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CompetitorSignUp from "./CompetitorSignUp";
import CompetitorsTable from "./CompetitorsTable";

const CompetitionDetails = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSigningUp, setIsSigningUp] = useState();
  const [competitors, setCompetitors] = useState();
  const [group, setGroup] = useState("All");

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

  const setCurrentGroup = (groupValue) => {
    setGroup(groupValue);
  };

  const competitionId = state[1];
  const laps = state[2];
  const competitorIds = state[3];

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
          <Button onClick={() => navigate("/penalty")}>ADD PENALTY POINTS</Button>
          <div className={styles.competitions__groups}>
            <h4>Groups:</h4>

            <div className={styles.buttonGroup}>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value="All"
                name="myButton"
                id="buttonAll"
                onClick={(event) => setCurrentGroup(event.target.value)}
              />
              <label className={styles.buttonGroup__label} htmlFor="buttonAll">
                All
              </label>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value="A"
                name="myButton"
                id="buttonA"
                onClick={(event) => setCurrentGroup(event.target.value)}
              />
              <label className={styles.buttonGroup__label} htmlFor="buttonA">
                A
              </label>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value="B"
                name="myButton"
                id="buttonB"
                onClick={(event) => setCurrentGroup(event.target.value)}
              />
              <label className={styles.buttonGroup__label} htmlFor="buttonB">
                B
              </label>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value="C"
                name="myButton"
                id="buttonC"
                onClick={(event) => setCurrentGroup(event.target.value)}
              />
              <label className={styles.buttonGroup__label} htmlFor="buttonC">
                C
              </label>
            </div>
          </div>

          {group === "All" ? (
            <>
              <CompetitorsTable
                laps={laps}
                competitionId={competitionId}
                items={competitors}
                group="A"
              />
              <CompetitorsTable
                laps={laps}
                competitionId={competitionId}
                items={competitors}
                group="B"
              />
              <CompetitorsTable
                laps={laps}
                competitionId={competitionId}
                items={competitors}
                group="C"
              />
            </>
          ) : (
            <CompetitorsTable
              laps={laps}
              competitionId={competitionId}
              items={competitors}
              group={group}
            />
          )}
        </Card>
      </div>

      <CompetitorSignUp
        onCancel={stopSigningUpHandler}
        show={isSigningUp}
        onGetCompetitor={getCompetitors}
        competitionId={competitionId}
        competitors={competitorIds}
      />
    </div>
  );
};

export default CompetitionDetails;
