import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import l1 from "../assets/1_1.png";
import { Link } from "react-router-dom";

function DefaultHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 45) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      className={`navbar navbar-expand-lg px-4 px-lg-5 py-3 py-lg-0 shadow-sm ${
        isScrolled ? "sticky-top shadow-sm " : ""
      }`}
      //   style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      <a href="/" className="navbar-brand p-0">
        <img
          src={l1}
          width="60"
          height="40"
          className="d-inline-block align-top loMa"
          alt="React Bootstrap logo"
        />
        <font style={{ color: "#0085AD", margin: "0 10px 0 -10px" }}>
          Blue<font style={{ color: "black" }}>Wave</font>
        </font>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav py-0">
          {/* <a href="#" className="nav-item nav-link"> */}
          <a href="#" className="nav-item nav-link active">
            Home
          </a>
          <a
            href="#"
            className="nav-link dropdown-toggle active"
            data-bs-toggle="dropdown"
          >
            제품
          </a>
          <a
            href="#"
            className="nav-link dropdown-toggle active"
            data-bs-toggle="dropdown"
          >
            자료
          </a>
        </div>

        <div className="button-container">
          <Link to="/login" style={{ margin: "0 20px" }}>
            <button className="Mybtn">로그인</button>
          </Link>
          <Link to="/SignUp" style={{ margin: "0 20px" }}>
            <button className="MybtnColor">회원가입</button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

export default DefaultHeader;
