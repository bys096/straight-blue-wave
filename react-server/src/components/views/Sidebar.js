import {React, useEffect, useState, useRef} from "react";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({width = 280, children}) => {
	const [isOpen, setOpen] = useState(false);
	const [xPosition, setX] = useState(width);
	const side = useRef();

	const toggleMenu = () => {
		if (xPosition > 0) {
			setX(0);
			setOpen(true);
		} else {
			setX(width);
			setOpen(false);
		}
	};

	const handleClose = async (e) => {
		let sideArea = side.current;
		let sideChildren = side.current.contains(e.target);
		if (isOpen && (!sideArea || !sideChildren)) {
			await setX(width);
			await setOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleClose);
		return () => {
			window.removeEventListener("click", handleClose);
		};
	});

	return (
		<Container>
			<div className="container">
				<div
					ref={side}
					className="sideBar"
					style={{
						width: `${width}px`,
						height: "100%",
						transform: `translatex(${-xPosition}px)`,
					}}>
					<button onClick={() => toggleMenu()} className="button">
						{isOpen ? (
							<span>X</span>
						) : (
							<img src="images/avatar.png" alr="contact open button" className="openBtn" />
						)}
					</button>

					<div className="content">{children}</div>
				</div>
			</div>
		</Container>
	);
};

export default Sidebar;
