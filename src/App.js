import Competitions from "./components/Competitions/Competitions";
import NewCompetition from "./components/NewCompetition/NewCompetition";

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

function App() {
  return (
    <div>
      <NewCompetition />
      <Competitions items={DUMMY_COMPETITIONS} />
    </div>
  );
}

export default App;
