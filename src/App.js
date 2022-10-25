import CompetitionDetails from "./components/CompetitionDetails/CompetitionDetails";
import Competitions from "./components/Competitions/Competitions";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import PenaltyPointsForm from "./components/PenaltyPoints/PenaltyPointsForm";

const App = () => {
  // const [competitions, setCompetitions] = useState();

  // const getCompetitionHandler = (competition) => {
  //   setCompetitions(() => competition);
  //   console.log("app.js", competitions);
  // };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Competitions />
          }
        />
        <Route
          path="/details/:id"
          element={<CompetitionDetails />}
        />
        <Route
          path="/details/:id/penalty"
          element={<PenaltyPointsForm />}
        />
      </Routes>
    </div>
  );
};

export default App;
