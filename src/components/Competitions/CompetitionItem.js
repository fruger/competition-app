import { useNavigate } from "react-router-dom";
import styles from "./CompetitionItem.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";

const CompetitionsItem = (props) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("details", { state: [props.name, props.id, props.laps, props.competitors] });
    props.onGetData();
  };

  return (
    <Card className={styles["competition-item"]}>
      <div className={styles["competition-item__description"]}>
        <h2>{props.name}</h2>
        <h4>Laps: {props.laps}</h4>
        <h4>Competitors: {props.competitors}</h4>
      </div>
      <Button onClick={navigateTo}>CHECK DETAILS</Button>
    </Card>
  );
};

export default CompetitionsItem;
