import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import Footer from "../components/views/Footer";
import axios from "axios";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8002/api/team/teamMemList/${sessionStorage.getItem(
          "tmid"
        )}`
      )
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="article">
        <Sidebar />
        <div className="section">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>팀 이름</th>
                <th>팀 직책</th>
                <th>가입날짜</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.teamMemberId}>
                  <td>{member.teamName}</td>
                  <td>{member.teamPosition}</td>
                  <td>{member.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MemberList;
