import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
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
  const [competition, setCompetition] = useState();
  //const [isFinished, setIsFinished] = useState(false);
  const [laps, setLaps] = useState();
  const [group, setGroup] = useState("All");

  const competitionId = state[1];
  const numberOfLaps = state[2];
  const competitorIds = state[3];
  const competitionStatus = state[4];

  const navigateTo = () => {
    navigate("penalty", {
      state: [numberOfLaps, competitionIdsFilter, competitionId],
    });
  };

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

  useEffect(() => {
    const identifier = setInterval(() => {
      getCompetitors();
    }, 2000);

    return () => {
      clearInterval(identifier);
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7173/api/Lap")
      .then((res) => {
        setLaps(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getCompetition = () => {
    axios
      .get("https://localhost:7173/api/Competition/" + competitionId)
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

  useEffect(() => {
    const identifier = setInterval(() => {
      getCompetition();
    }, 2000);

    return () => {
      clearInterval(identifier);
    };
  }, []);

  const competitionIdsFilter = competitors?.filter((competitor) => {
    return competitor.competitionId === competitionId;
  });

  const checkIsDisqualified = () => {
    competitionIdsFilter?.map((competitor) => {
      if (competitor.lapIds.length < numberOfLaps) {
        axios
          .put(
            "https://localhost:7173/api/Competitor/disqualified/" +
              competitor.id,
            {
              id: competitor.id,
              isDisqualified: true,
            }
          )
          .then(() => getCompetitors())
          .catch((error) => {
            console.log(error);
          });
      }
      return null;
    });
  };

  const startCompetition = () => {
    editCompetition(2);
  };

  const stopCompetition = () => {
    editCompetition(3);
    checkIsDisqualified();
  };

  const editCompetition = (statusValue) => {
    axios
      .put("https://localhost:7173/api/Competition/" + competitionId, {
        id: competitionId,
        status: statusValue,
      })
      .then(() => getCompetition())
      .catch((error) => {
        console.log(error);
      });
  };

  const startSigningUpHandler = () => {
    setIsSigningUp(true);
  };

  const stopSigningUpHandler = () => {
    setIsSigningUp(false);
  };

  const setCurrentGroup = (event) => {
    setGroup(event.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#3f3f3f",
      }}
    >
      <div className={styles.competitions__background}>
        <div className={styles["back-to-list"]}>
          <Button onClick={() => navigate("/")}>
            <ImArrowLeft size={"1.5rem"} className={styles.icon} />
            GO TO
            <br />
            COMPETITIONS LIST
          </Button>
        </div>

        <Card className={styles.competitions}>
          <h1>{state[0]}</h1>

          {competition?.status === 1 ? (
            <Button type="button" onClick={startSigningUpHandler}>
              SIGN UP
            </Button>
          ) : null}
          {competition?.status === 2 ? (
            <Button onClick={navigateTo}>ADD PENALTY POINTS</Button>
          ) : null}

          {competition?.status < 2 ? (
            <div className={styles.start}>
              <Button onClick={startCompetition}>START</Button>
            </div>
          ) : null}
          {competition?.status === 2 ? (
            <div className={styles.stop}>
              <Button onClick={stopCompetition}>STOP</Button>
            </div>
          ) : null}
          <div className={styles.competitions__groups}>
            <h4>Groups:</h4>

            <div className={styles.buttonGroup}>
              <input
                className={styles.buttonGroup__input}
                type="radio"
                value="All"
                name="myButton"
                id="buttonAll"
                onClick={setCurrentGroup}
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
                onClick={setCurrentGroup}
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
                onClick={setCurrentGroup}
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
                onClick={setCurrentGroup}
              />
              <label className={styles.buttonGroup__label} htmlFor="buttonC">
                C
              </label>
            </div>
          </div>

          {group === "All" ? (
            <>
              <CompetitorsTable
                numberOfLaps={numberOfLaps}
                competitionId={competitionId}
                items={competitionIdsFilter}
                laps={laps}
                competitionStatus={competitionStatus}
                group="A"
                //isDisqualified={isDisqualified}
              />
              <CompetitorsTable
                numberOfLaps={numberOfLaps}
                competitionId={competitionId}
                items={competitionIdsFilter}
                laps={laps}
                competitionStatus={competitionStatus}
                group="B"
                //isDisqualified={isDisqualified}
              />
              <CompetitorsTable
                numberOfLaps={numberOfLaps}
                competitionId={competitionId}
                items={competitionIdsFilter}
                laps={laps}
                competitionStatus={competitionStatus}
                group="C"
                //isDisqualified={isDisqualified}
              />
            </>
          ) : (
            <CompetitorsTable
              numberOfLaps={numberOfLaps}
              competitionId={competitionId}
              items={competitionIdsFilter}
              laps={laps}
              competitionStatus={competitionStatus}
              group={group}
              //isDisqualified={isDisqualified}
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
