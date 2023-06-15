import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      await axios
        .get(
          `http://localhost:8002/api/team/list/${sessionStorage.getItem(
            "memid"
          )}`
        )
        .then((res) => {
          setTeams(res.data.dtoList);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchTeam();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {teams.map((team, index) => (
        <Link
          to={`/team/${team.teamId}`}
          className="text-decoration-none"
          onClick={() => {
            sessionStorage.setItem("tmid", team.teamId);
          }}
        >
          <p
            className="sidebarname"
            key={index}
            style={{ margin: "20px 0 20px" }}
          >
            {team.teamName}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
