import { Table } from "react-bootstrap";
import "./CompetitorsTable.css";

const CompetitorsTable = (props) => {
  let position = 0;

  const groupFilter = props.items?.filter((competitor) => {
    return competitor.group === props.group;
  });

  const sortCompetitors = (a, b) => {
    return b.lapIds.length - a.lapIds.length;
  };

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
              <th key={index}>{index + 1}</th>
            ))}
            <th>ALL PENALTY POINTS</th>
          </tr>
        </thead>
        <tbody>
          {groupFilter?.sort(sortCompetitors).map((competitor) => (
            <tr
              key={competitor.id}
              className={`${
                competitor.isDisqualified === true ? "disqualified" : ""
              }`}
            >
              <td>{(position += 1)}</td>
              <td>{competitor.firstName}</td>
              <td>{competitor.lastName}</td>
              <td>{competitor.startingNumber}</td>
              {Array.from({ length: props.numberOfLaps }).map((_, index) => (
                <td key={index}>
                  {props.laps?.map((lap) => {
                    if (lap.competitorId === competitor.id) {
                      if (index + 1 === lap.number) {
                        
                        //penaltyPointsSum += lap.penaltyPoints
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
