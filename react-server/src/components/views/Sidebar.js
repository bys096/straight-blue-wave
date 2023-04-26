import React, {useState} from "react";
import {Route, Routes, Link} from "react-router-dom";
import {Nav, Button} from "react-bootstrap";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import Sidebar3 from "./Sidebar3";
import "./Sidebar.css";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [teamButton, setTeamButton] = useState(false);
	const [projectButton, setProjectButton] = useState(false);
	const [friendButton, setFriendButton] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
				<Button className="toggle-btn" onClick={toggleSidebar}>
					{!isOpen ? ">" : "<"}
				</Button>
				{isOpen && (
					<span>
						<Nav className="flex-column">
							<Link className="nav-link" to="/">
								팀
							</Link>
							<Link className="nav-link" to="/">
								프로젝트
							</Link>
							<Link className="nav-link" to="/">
								친구
							</Link>
						</Nav>
					</span>
				)}
			</div>
		</>
	);
};

export default Sidebar;
