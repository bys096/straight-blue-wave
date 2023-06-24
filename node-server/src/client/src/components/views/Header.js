import { useState } from "react";
import Container from "react-bootstrap/Container";
import {
	Nav,
	Navbar,
	Offcanvas,
	Button,
	OverlayTrigger,
	Accordion,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import logo from "../../assets/logo.png";
import Brainstorming from "../guideline/Brainstorming";
import Brainwriting from "../guideline/Brainwriting";
import KJmapping from "../guideline/KJmapping";
import Mindmap from "../guideline/Mindmap";
import SCAMPER from "../guideline/SCAMPER";
import Sixthinkinghats from "../guideline/Sixthinkinghats";
import Synectics from "../guideline/Synectics";
import Meetingprocess from "../guideline/Meetingprocess";
import Meetingmindset from "../guideline/Meetingmindset";
import PopOver from "../PopOver";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import l1 from "../../assets/1_1.png";

function Header() {
	const ref = useRef(null);
	const dispatch = useDispatch();
	const [showHelp, setShowHelp] = useState(false);
	const [showNotify, setShowNotify] = useState(false);

	const [helpContent, setHelpContent] = useState("");
	const [previousContent, setPreviousContent] = useState("");

	const [target, setTarget] = useState(null);

	const handleCloseHelp = () => {
		setShowHelp(false);
		setPreviousContent("");
	};

	const handleShowHelp = (content) => {
		setHelpContent(content);
		setPreviousContent(helpContent);
		setShowHelp(true);
	};

	const handleGoBack = () => {
		setHelpContent("guide");
		setPreviousContent("");
	};

	const handleShowNotify = (e) => {
		setShowNotify(!showNotify);
		setTarget(e.target);
	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="white" variant="white" sticky="top" className="shadow-sm">
				<Container style={{ display: "flex", justifyContent: "space-between" }}>
					<Navbar.Brand>
						<Link to="/LoggedIn">
							<img
								src={l1}
								width="60"
								height="40"
								className="d-inline-block align-top"
								alt="React Bootstrap logo"
							/>
						</Link>
					</Navbar.Brand>
					<Navbar.Brand style={{ color: "#0085AD", margin: "0 20px 0 -10px" }}>
						<Link to="/LoggedIn" style={{ textDecoration: "none", color: "#0085AD" }}>
							Blue
							<span style={{ color: "black" }}>Wave</span>
						</Link>
					</Navbar.Brand>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav style={{ marginLeft: "auto" }}>
							<Nav.Link
								onClick={() => handleShowHelp("guide")}
								style={{ cursor: "pointer" }}
							>
								도움말
							</Nav.Link>
							<Nav.Link onClick={handleShowNotify}>
								<AiOutlineBell size={"1.5rem"} />
							</Nav.Link>
							<Nav.Link>
								<Link to="/setting" style={{ textDecoration: "none", color: "#0085AD" }}>
									설정
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link
									to="/"
									style={{ textDecoration: "none", color: "#0085AD" }}
									onClick={() => {
										dispatch(logout());
										sessionStorage.clear();
									}}
								>
									로그아웃
								</Link>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Offcanvas
				show={showHelp}
				onHide={handleCloseHelp}
				placement="end"
				scroll={true}
				backdrop={false}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>도움말</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Accordion>
						{helpContent === "guide" && (
							<>
								<p>
									블루웨이브에선 여러분들의 회의를 돕기 위한 회의 가이드라인을
									제공합니다. 회의 진행을 하다 막히신다면 저희 가이드라인을 참조해보시길
									바랍니다.
								</p>
								<p>아래에서 원하는 섹션을 선택하세요:</p>

								<ul>
									<li>
										<Button
											variant="primary"
											onClick={() => handleShowHelp("idea-generation")}
										>
											아이디어 창출 기법
										</Button>
									</li>
									<li>
										<Button
											variant="primary"
											onClick={() => handleShowHelp("meeting-process")}
										>
											회의 진행 방식
										</Button>
									</li>
									<li>
										<Button
											className="primary"
											onClick={() => handleShowHelp("meeting-mindset")}
										>
											회의 진행 마음가짐
										</Button>
									</li>
								</ul>
							</>
						)}
						{helpContent === "idea-generation" && (
							<>
								<h4>아이디어 창출 기법</h4>
								<ul>
									<li onClick={() => handleShowHelp("brainstorming")}>브레인스토밍</li>
									<li onClick={() => handleShowHelp("brainwriting")}>브레인라이팅</li>
									<li onClick={() => handleShowHelp("kjmapping")}>KJ법</li>
									<li onClick={() => handleShowHelp("mindmap")}>마인드맵</li>
									<li onClick={() => handleShowHelp("synectics")}>시네틱스</li>
									<li onClick={() => handleShowHelp("scamper")}>스캠퍼</li>
									<li onClick={() => handleShowHelp("sixthinkinghats")}>여섯색깔모자</li>
								</ul>
								<Button variant="primary" onClick={handleGoBack}>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "meeting-process" && (
							<>
								<Meetingprocess></Meetingprocess>
								<Button variant="primary" onClick={handleGoBack}>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "meeting-mindset" && (
							<>
								<Meetingmindset></Meetingmindset>
								<Button variant="primary" onClick={handleGoBack}>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "brainstorming" && (
							<>
								<Brainstorming></Brainstorming>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "brainwriting" && (
							<>
								<Brainwriting></Brainwriting>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "kjmapping" && (
							<>
								<KJmapping></KJmapping>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "mindmap" && (
							<>
								<Mindmap></Mindmap>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "scamper" && (
							<>
								<SCAMPER></SCAMPER>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "sixthinkinghats" && (
							<>
								<Sixthinkinghats></Sixthinkinghats>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
						{helpContent === "synectics" && (
							<>
								<Synectics></Synectics>
								<Button
									variant="primary"
									onClick={() => handleShowHelp("idea-generation")}
								>
									뒤로 가기
								</Button>
							</>
						)}
					</Accordion>
				</Offcanvas.Body>
			</Offcanvas>

			{showNotify && <PopOver ref={ref} target={target} show={showNotify} />}
		</>
	);
}

export default Header;
