import Button from "../UI/Button";
import "./CompetitionForm.css";

const CompetitionForm = () => {
  return (
    <form>
      <div className="new-competition__controls">
        <div className="new-competition__control">
          <label>NAME</label>
          <input type="text" />
        </div>
        <div className="new-competition__control">
          <label>NUMBER OF LAPS (5-10)</label>
          <input type="number" min="5" step="1" max="10" />
        </div>
      </div>
      <Button type="submit">CREATE COMPETITIONS</Button>
    </form>
  );
};

export default CompetitionForm;
