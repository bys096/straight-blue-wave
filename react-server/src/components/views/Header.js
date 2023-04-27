import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../../pages/Login"
import {Col, Container, Row} from "react-bootstrap";

function Header(props) {
	return (
		<div>
			<Container>
				<div>
					<Row className="justify-content-between">
						<Col xs="auto">
						<h1>Blue Wave</h1>
						</Col>
						<Col xs="auto">
							<Routes>
	
							</Routes>
						</Col>
					</Row>
				</div>
			</Container>
			<hr />
		</div>
	);
}

export default Header;
