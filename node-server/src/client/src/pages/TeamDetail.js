import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectList from "./ProjectList";
import styled from "styled-components";
import Sidebar from "../components/views/Sidebar";
import Header from "../components/views/Header";
import Footer from "../components/views/Footer";

const TeamDetail = () => {
  const { tmId } = useParams();
  const [team, setTeam] = useState(null);

  const TeamDesc = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
  `;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `http://172.30.1.14:8002/api/team/readTeam/${tmId}`
        );
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeam();
  }, [tmId]);
  const mainForm = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  const StyledName = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 50px;
    flex-wrap: wrap;
  `;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `http://172.30.1.14:8002/api/team/readTeam/${tmId}`
        );
        setTeam(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeam();
  }, [tmId]);

  if (!team) return <p>Loading...</p>;

  return (
    <div>
      <TeamDesc>
        <h2>{team.tmName}</h2>
        <p>{team.tmIntro}</p>
        <hr />
      </TeamDesc>
      <ProjectList />
    </div>
  );
}

export default TeamDetail;
