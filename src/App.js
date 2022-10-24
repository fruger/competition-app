import CompetitionDetails from "./components/CompetitionDetails/CompetitionDetails";
import Competitions from "./components/Competitions/Competitions";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import PenaltyPointsForm from "./components/PenaltyPoints/PenaltyPointsForm";

const App = () => {
  const [competitions, setCompetitions] = useState();

  const getCompetitionHandler = (competition) => {
    setCompetitions(() => competition);
    console.log("app.js", competitions);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Competitions onGetCompetitionsData={getCompetitionHandler} />
          }
        />
        <Route
          path="/details"
          element={<CompetitionDetails items={competitions} />}
        />
        <Route
          path="/penalty"
          element={<PenaltyPointsForm />}
        />
      </Routes>
    </div>
  );
};

export default App;
