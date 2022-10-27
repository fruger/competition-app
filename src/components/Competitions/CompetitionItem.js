import { useNavigate } from "react-router-dom";
import styles from "./CompetitionItem.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";

const CompetitionsItem = (props) => {
  const navigate = useNavigate();

  let status;

  const navigateTo = () => {
    navigate(`details/${props.id}`, {
      state: [props.name, props.id, props.laps, props.competitors],
    });
    //props.onGetData();
  };

  switch (props.status) {
    case 1:
      status = "Not Started";
      break;

    case 2:
      status = "Started";
      break;

    case 3:
      status = "Finished";
      break;
    default:
      status = "Not Started"
  }

  return (
    <Card className={`${styles["competition-item"]} ${props.status === 3 ? styles.finished : ''}`}>
      <div className={styles["competition-item__description"]}>
        <h2>{props.name}</h2>
        <h4>Laps: {props.laps}</h4>
        <h4>Competitors: {props.competitors}</h4>
        <h4>Status: {status}</h4>
      </div>
      <Button onClick={navigateTo}>CHECK DETAILS</Button>
    </Card>
  );
};

export default CompetitionsItem;
