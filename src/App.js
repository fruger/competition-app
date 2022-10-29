import { Route, Routes } from "react-router-dom";
import Competitions from "./components/Competitions/Competitions";
import CompetitionDetails from "./components/CompetitionDetails/CompetitionDetails";
import PenaltyPointsForm from "./components/PenaltyPoints/PenaltyPointsForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Competitions />} />
      <Route path="/details/:id" element={<CompetitionDetails />} />
      <Route path="/details/:id/penalty" element={<PenaltyPointsForm />} />
    </Routes>
  );
};

export default App;
