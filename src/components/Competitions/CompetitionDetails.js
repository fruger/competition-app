import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import styles from "./CompetitionDetails.module.css";

const CompetitionDetails = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.competitions__background}>
      <div className={styles["back-to-list"]}>
      <Button onClick={() => navigate("/")}>GO TO COMPETITIONS LIST</Button>
      </div>
      
      <Card className={styles.competitions}>
      <h1>Title</h1>
        <Button type="button">REGISTER</Button>
        <Button type="button">ADD PENALTY POINTS</Button>

        <div className={styles.competitions__groups}>
          <h4>Groups:</h4>
          <Button type="button">ALL</Button>
          <Button type="button">A</Button>
          <Button type="button">B</Button>
          <Button type="button">C</Button>
        </div>

        <h1>Results</h1>
      </Card>
    </div>
  );
};

export default CompetitionDetails;
