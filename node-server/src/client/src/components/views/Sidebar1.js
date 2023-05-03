import React from "react";
import {Nav} from "react-bootstrap";

function Sidebar(props) {
	return (
		<div>
			팀 목록입니다.
			<Nav>
				<Nav.Link href="#">Link 1</Nav.Link>
				<Nav.Link href="#">Link 2</Nav.Link>
				<Nav.Link href="#">Link 3</Nav.Link>
				<Nav.Link href="#">Link 4</Nav.Link>
			</Nav>
		</div>
	);
}

export default Sidebar;
