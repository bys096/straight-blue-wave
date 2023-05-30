import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Route, Routes } from "react-router-dom/dist";
import TeamItem from "../components/TeamItem";
import TeamCreateCard from "../components/TeamCreateCard";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  if (sessionStorage.getItem("memid") == null) {
    window.location.reload();
  }

  const fetchTeams = async () => {
    const response = axios
      .get(
        `http://172.30.1.85:8002/api/team/list/${sessionStorage.getItem(
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

  useEffect(() => {
    fetchTeams();
  }, []);

  const onTeamCreated = () => {
    fetchTeams();
  };

  return (
    <Container>
      <h1>팀 목록</h1>
      <Row>
        <Col md={4} lg={3}>
          <TeamCreateCard onTeamCreated={onTeamCreated} />
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
