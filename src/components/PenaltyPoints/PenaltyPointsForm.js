import { Table } from "react-bootstrap";
import Card from "../UI/Card";
import styles from "./PenaltyPointsForm.module.css";

const PenaltyPointsForm = () => {
  return (
    <div
      style={{
        backgroundColor: "#3f3f3f",
      }}
    >
      <Card className={styles.competitions}>
        <h2>Odcinek:</h2>
        <h2>Punkty karne:</h2>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="competitorsTable__table"
        >
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>NUMBER</th>
              <th>GROUP</th>
              <th>ALL PENALTY POINTS</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </Card>
    </div>
  );
};

export default PenaltyPointsForm;
