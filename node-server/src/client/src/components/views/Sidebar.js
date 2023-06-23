import React, { useState } from "react";
import { Accordion, Image } from "react-bootstrap";
// import "../../assets/css/simplebar.css";
import "../../assets/css/styles.min.css";

import Sidebar1 from "./Sidebar1";
import Sidebar3 from "./Sidebar3";
import "./Sidebar.css";
import { useSelector } from "react-redux";

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Avatar, CardActionArea, Stack } from "@mui/material";

const hstyle = {
	color: "black",
	backgroundColor: "blue",
	fontFamily: "Arial",
};

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [activeComponent, setActiveComponent] = useState("team");
	const member = useSelector((state) => state.authReducer.user);

	const changeActiveComponent = (component) => {
		setActiveComponent(component);
	};

	const renderActiveComponent = () => {
		switch (activeComponent) {
			case "team":
				return <Sidebar1 />;
			case "friend":
				return <Sidebar3 />;
			default:
				return <Sidebar1 />;
		}
	};

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			class="page-wrapper d-flex "
			id="page-wrapper"
			data-layout="vertical"
			data-navbarbg="skin6"
			data-sidebartype="full"
			data-sidebar-position="fixed"
			data-header-position="fixed"
		>
			<aside class="left-sidebar">
				<div>
					{/* <div class="brand-logo d-flex align-items-center justify-content-between">
						<a href="./index.html" class="text-nowrap logo-img">
							<img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
						</a>
					</div> */}
{/* 
					<Card sx={{ maxWidth: 345 }}>
						<CardActionArea>
							<CardContent>
								<Typography variant="h5" component="div" noWrap>
									<Stack direction="row" spacing={5}>
										<Avatar src={member.memberPhoto} sx={{ width: 40, height: 40 }} />
										{member.memberNick}
									</Stack>
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card> */}

					<nav class="sidebar-nav" data-simplebar="true">
						<ul id="sidebarnav">
							<li class="nav-small-cap">
								<i class="ti ti-dots nav-small-cap-icon fs-4"></i>
								<span class="hide-menu">Home</span>
							</li>

							<Accordion flush alwaysOpen>
								<Accordion.Item eventKey="team">
									<Accordion.Header>Teams</Accordion.Header>
									<Accordion.Body>
										<Sidebar1 />
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="friend">
									<Accordion.Header>Friends</Accordion.Header>
									<Accordion.Body>
										<Sidebar3 />
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</ul>
					</nav>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
