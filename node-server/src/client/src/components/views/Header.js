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
          <Link to="/LoggedIn">
            <img
              src={logo}
              width="60"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Brand style={{ color: "blue", margin: "0 10px 0 -10px" }}>
          <Link to="/LoggedIn" style={{ textDecoration: "none" }}>
            Blue<span style={{ color: "black" }}>Wave</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginLeft: "auto" }}>
            <Nav.Link>
              <Link to="/community" style={{ textDecoration: "none" }}>
                커뮤니티
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/shopping" style={{ textDecoration: "none" }}>
                쇼핑몰
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/setting" style={{ textDecoration: "none" }}>
                설정
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                로그아웃
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
