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
            <th>NO.</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            {Array.from({ length: props.laps }).map((_, index) => (
              <th key={index}>{(lapsNumber += 1)}</th>
            ))}
            <th>ALL PENALTY POINTS</th>
          </tr>
        </thead>
        <tbody>
          {groupFilter?.map((competitor) => (
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
          <tr>
            <td colSpan={props.laps + 4}>
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
