import "./App.css";
import { useEffect, useState } from "react";
import { Button, Image, ToggleButton } from "react-bootstrap";

import TeamsTable from "./components/TeamsTable";
import DriversTable from "./components/DriversTable";

import "bootstrap/dist/css/bootstrap.min.css";

const testing = process.env.NODE_ENV === "test";

const apiUrl = `${testing ? "http://localhost" : ""}/api`;

function App() {
  const [seasons, setSeasons] = useState([]);
  const [driverRankings, setDriverRankings] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const [isTeams, setIsTeams] = useState();
  const [seasonSelected, setSeasonSelected] = useState();

  useEffect(() => {
    fetch(`${apiUrl}/seasons`)
      .then((res) => res.json())
      .then((res) => setSeasons(res.response));
  }, []);

  async function handleSeasonClick(season) {
    await getDataFromAPI(isTeams, season);
    setSeasonSelected(season);
  }

  async function changeDisplayType(e) {
    const isChecked = e.currentTarget.checked;
    await getDataFromAPI(isChecked, seasonSelected);
    setIsTeams(isChecked);
  }

  async function getDataFromAPI(isTeamSelected, season) {
    const driversOrTeams = isTeamSelected ? "teams" : "drivers";
    if (season) {
      const res = await fetch(
        `${apiUrl}/rankings/${driversOrTeams}?season=${season}`
      );
      const json = await res.json();
      const { response } = json;
      if (driversOrTeams === "drivers") {
        setDriverRankings(response);
      }
      if (driversOrTeams === "teams") {
        setTeamRankings(response);
      }
    }
  }

  return (
    <div className="App">
      <div style={{ backgroundColor: "black" }}>
        <Image src="https://e2.365dm.com/22/03/768x432/skysports-f1-its-only-live-once_5708736.jpg?20220316191225" />
      </div>
      <h1>Seasons</h1>
      <div>
        {seasons.map((s) => (
          <Button
            key={`season-button-${s}`}
            data-testid={`season-button-${s}`}
            style={{ margin: "10px" }}
            onClick={(e) => handleSeasonClick(s)}
            variant="primary"
          >
            {s}
          </Button>
        ))}
      </div>
      Click to switch:
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        data-testid={`teams-button`}
        type="checkbox"
        variant="outline-primary"
        checked={isTeams}
        value="1"
        onChange={changeDisplayType}
      >
        {isTeams ? "Teams" : "Drivers"}
      </ToggleButton>
      <h1>Rankings for season {seasonSelected}</h1>
      {
        <>
          {isTeams ? (
            <TeamsTable data={teamRankings} />
          ) : (
            <DriversTable data={driverRankings} />
          )}
        </>
      }
    </div>
  );
}

export default App;
