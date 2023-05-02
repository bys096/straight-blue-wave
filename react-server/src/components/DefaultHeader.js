import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";

function DefaultHeader() {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="white"
			variant="white"
			sticky="top"
		>
			<Container>
				<Navbar.Brand>
					<img
						src={logo}
						width="60"
						height="40"
						className="d-inline-block align-top"
						alt="React Bootstrap logo"
					/>
				</Navbar.Brand>
				<Navbar.Brand style={{ color: "blue", margin: "0 10px 0 -10px" }}>
					Blue<span style={{ color: "black" }}>Wave</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavDropdown
							title="제품"
							id="collasible-nav-dropdown"
							style={{ margin: "0 10px" }}
						>
							<NavDropdown.Item href="">팀 관리</NavDropdown.Item>
							<NavDropdown.Item href="">프로젝트 관리</NavDropdown.Item>
							<NavDropdown.Item href="">커뮤니티</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="자료" id="collasible-nav-dropdown">
							<NavDropdown.Item href="">가이드와 튜토리얼</NavDropdown.Item>
							<NavDropdown.Item href="">도움말 센터</NavDropdown.Item>
							<NavDropdown.Item href="">Something</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link style={{ margin: "0 20px" }}>
							<Link to="/LoggedIn" style={{ textDecoration: "none" }}>
								로그인
							</Link>
						</Nav.Link>
						<Link to="/SignUp">
							<Button variant="primary">회원가입</Button>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default DefaultHeader;
