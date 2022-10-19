import CompetitionDetails from "./components/Competitions/CompetitionDetails";
import Competitions from "./components/Competitions/Competitions";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [competitions, setCompetitions] = useState();
  
  const getCompetitionHandler = (competition) => {
    setCompetitions(() => competition);
    console.log("app.js", competitions);
  };

  return (
    <div>
      <Routes>
        <Route path="/details" element={<CompetitionDetails items={competitions}/>} />
        <Route
          path="/"
          element={
            <Competitions onGetCompetitionsData={getCompetitionHandler} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
