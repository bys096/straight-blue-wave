// TeamList.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Route, Routes } from "react-router-dom/dist";
import TeamItem from "../components/TeamItem";
import TeamCreateCard from "../components/TeamCreateCard";

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "http://172.30.1.7:8002/api/team/listTeam"
      );
      setTeams(response.data);
      console.log(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    /*const storedTeams = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key.startsWith("team")) {
				storedTeams.push(JSON.parse(sessionStorage.getItem(key)));
			}
		}
		setTeams(storedTeams);*/
    fetchTeams();
  }, []);
		fetchTeams();
	});

  return (
    <Container>
      <h1>팀 목록</h1>
      <Row>
        <Col md={4} lg={3}>
          <TeamCreateCard />
        </Col>
        {teams.map((team, index) => (
          <Col key={index} md={4} lg={3}>
            <TeamItem team={team} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamList;
