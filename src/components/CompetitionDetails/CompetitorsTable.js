import { Table } from "react-bootstrap";
import "./CompetitorsTable.css";

const CompetitorsTable = (props) => {
  let tableNumber = 0;
  let lapsNumber = 0;

  const competitionIdsFilter = props.items?.filter((competitor) => {
    return competitor.competitionId === props.competitionId;
  });

  console.log(competitionIdsFilter);

  return (
    <div>
      <h6 className="competitorstable">Group A</h6>

      <Table
        striped
        bordered
        hover
        variant="dark"
        className="competitorstable__table"
      >
        <thead>
          <tr>
            <th>NO.</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            
          

            {Array.from({ length: props.laps }).map((_, index) => (
            <th key={index}>{lapsNumber += 1}</th>
          ))}
        
            <th>ALL PENALTY POINTS</th>
          </tr>
        </thead>
        <tbody>
          {competitionIdsFilter?.map((competitor) => (
            <tr>
              <td>{(tableNumber += 1)}</td>
              <td>{competitor.firstName}</td>
              <td>{competitor.lastName}</td>
              {Array.from({ length: props.laps }).map((_, index) => (
            <th key={index}></th>
          ))}
              <td>{competitor.penaltyPointsSum}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {competitionIdsFilter?.length === 0 && (
        <h2 className="competitorstable__table">FOUND NO COMPETITORS</h2>
      )}
    </div>
  );
};

export default CompetitorsTable;
