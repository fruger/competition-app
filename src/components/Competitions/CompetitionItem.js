import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import "./CompetitionItem.css";

const CompetitionsItem = (props) => {
  const navigate = useNavigate();

  const navigateTo =()=>{
    navigate("details")
    props.onGetData();
  }

  return (
    <Card className="competition-item">
      <div className="competition-item__description">
        <h2>{props.name}</h2>
        <h4>Laps: {props.laps}</h4>
        <h4>Competitors: {props.competitors}</h4>
      </div>
      <Button onClick={navigateTo}>
        CHECK DETAILS
      </Button>
    </Card>
  );
};

export default CompetitionsItem;
