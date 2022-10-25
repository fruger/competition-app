import { Table } from "react-bootstrap";
import "./CompetitorsTable.css";

const CompetitorsTable = (props) => {
  let tableNumber = 0;
  let lapsNumber = 0;

  const competitionIdsFilter = props.items?.filter((competitor) => {
    return competitor.competitionId === props.competitionId;
  });

  const groupFilter = competitionIdsFilter?.filter((competitor) => {
    return competitor.group === props.group;
  });

  return (
    <div>
      <h6 className="competitorsTable">Group {props.group}</h6>

      <Table
        striped
        bordered
        hover
        variant="dark"
        className="competitorsTable__table"
      >
        <thead>
          <tr>
            <th>POS.</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>NUMBER</th>
            {Array.from({ length: props.numberOfLaps }).map((_, index) => (
              <th key={index}>{(lapsNumber += 1)}</th>
            ))}
            <th>ALL PENALTY POINTS</th>
          </tr>
        </thead>
        <tbody>
          {groupFilter?.map((competitor) => (
            <tr key={competitor.id}>
              <td>{(tableNumber += 1)}</td>
              <td>{competitor.firstName}</td>
              <td>{competitor.lastName}</td>
              <td>{competitor.startingNumber}</td>
              {Array.from({ length: props.numberOfLaps }).map((_, index) => (
                <td key={index}>
                  {props.laps.map((lap) => {
                    if (lap.competitorId === competitor.id) {
                      if (index + 1 === lap.number) {
                        return lap.penaltyPoints;
                      }
                    }
                    return "";
                  })}
                </td>
              ))}

              <td>{competitor.penaltyPointsSum}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={props.numberOfLaps + 5}>
              {groupFilter?.length === 0 && (
                <h2 className="competitorsTable__table">
                  No competitors found
                </h2>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CompetitorsTable;
