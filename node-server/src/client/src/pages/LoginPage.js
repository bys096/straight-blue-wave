import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginPage() {
	const [userid, setUserid] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.post("여기에컨트롤러url", {
			userid,
			password,
		});
		console.log(response.data); // 서버로부터 받은 응답을 출력
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Userid"
					value={userid}
					onChange={(e) => setUserid(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			<Link to="/LoggedIn" style={{ textDecoration: "none" }}>
				메인페이지로 이동
			</Link>
		</>
	);
}

export default LoginPage;
