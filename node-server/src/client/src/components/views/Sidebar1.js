import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/styles.min.css";
import { useDispatch } from "react-redux";
import { teamConnect } from "../../actions/team";

function Sidebar(props) {
	const [teams, setTeams] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchTeam = async () => {
			await axios
				.get(
					`http://localhost:8002/api/team/list/${sessionStorage.getItem("memid")}`
				)
				.then((res) => {
					setTeams(res.data.dtoList);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchTeam();
	}, []);

	return (
		<div style={{ }}>
			

					{teams.map((team, index) => (
						<Link
							to={`/team/${team.teamId}`}
							className="text-decoration-none"
							onClick={() => {
								sessionStorage.setItem("tmid", team.teamId);
								dispatch(teamConnect(team))
							}}
						>
							<li class="sidebar-item">
								<a class="sidebar-link" href="./ui-card.html" aria-expanded="false">
									<span>
										<i class="ti ti-cards"></i>
									</span>
									<span class="hide-menu">{team.teamName}</span>
								</a>
							</li>
						</Link>
					))}

		</div>
	);
}

export default Sidebar;
