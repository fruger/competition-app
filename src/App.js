import CompetitionDetails from "./components/Competitions/CompetitionDetails";
import Competitions from "./components/Competitions/Competitions";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/details" element={<CompetitionDetails />} />
        <Route path="/" element={<Competitions />} />
      </Routes>
    </div>
  );
};

export default App;
