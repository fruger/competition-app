import Card from "../UI/Card";
import CompetitionItem from "./CompetitionItem";
import './Competitions.css'

const Competitions = (props) => {
  return (
    <Card className="competitions">
      <CompetitionItem
        name={props.items[0].name}
        laps={props.items[0].laps}
        competitors={props.items[0].competitors}
      />
      <CompetitionItem
        name={props.items[1].name}
        laps={props.items[1].laps}
        competitors={props.items[1].competitors}
      />
      <CompetitionItem
        name={props.items[2].name}
        laps={props.items[2].laps}
        competitors={props.items[2].competitors}
      />
    </Card>
  );
};

export default Competitions;
