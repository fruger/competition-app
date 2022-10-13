import { useState } from "react";
import Competitions from "./components/Competitions/Competitions";

const DUMMY_COMPETITIONS = [
  {
    id: "c1",
    name: "Competitions1",
    laps: 5,
    competitors: 17,
  },
  {
    id: "c2",
    name: "Competitions2",
    laps: 10,
    competitors: 14,
  },
  {
    id: "c3",
    name: "Competitions3",
    laps: 6,
    competitors: 8,
  },
];

const App = () => {
  const [competitions, setCompetitions] = useState(DUMMY_COMPETITIONS);

  const addCompetitionHandler = (competition) => {
    setCompetitions((prevCompetitions) => {
      return [competition, ...prevCompetitions];
    });
  };

  return (
    <div>
      <Competitions
        items={competitions}
        onAddCompetition={addCompetitionHandler}
      />
    </div>
  );
};

export default App;
