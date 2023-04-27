import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="white"
			variant="white"
			sticky="top"
		>
			<Container style={{ display: "flex", justifyContent: "space-between" }}>
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
					<Nav style={{ marginLeft: "auto" }}>
						<Nav.Link>
							<Link to="">커뮤니티</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="">쇼핑몰</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/">로그아웃</Link>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
