import React from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import Footer from "../components/views/Footer";

import "./LoggedIn.css";
import VideoCall from "../pages/MainPage";
import TeamList from "./TeamList";
function LoggedIn() {

	return (
		<div className="main">
			<Header />

			<div className="article">
				<Sidebar />

				<div className="section">
					<TeamList />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default LoggedIn;
