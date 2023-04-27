import React from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import Footer from "../components/views/Footer";

import "./LoggedIn.css";
import VideoCall from "../components/views/VideoCall";
function LoggedIn() {
	return (
		<div className="main">
			<Header />
			<div className="article">
				<Sidebar />
				<VideoCall />
			</div>
			<Footer />
		</div>
	);
}

export default LoggedIn;
