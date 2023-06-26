import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { GrUserManager } from "react-icons/gr";

function Sidebar() {
	const [showModal, setShowModal] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userData, setUserData] = useState(null);
	const [friendId, setFriendId] = useState(null);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		const fetchFriend = async () => {
			await axios
				.get(
					`https://yjubluewave.shop/api/member/friendList/${sessionStorage.getItem(
						"memid"
					)}`
				)
				.then((res) => {
					console.log(res.data);
					const data = res.data;
					const friendsData = data.map((item) => ({
						name: item.friendName,
						id: item.friendId,
					}));
					setFriends(friendsData);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchFriend();
	}, [friendId]);

	const handleCloseModal = () => {
		setShowModal(false);
		setUserEmail("");
		setUserData(null);
	};

	const handleSearch = async () => {
		try {
			if (userEmail === sessionStorage.getItem("email")) {
				alert("자기 자신은 검색할 수 없습니다.");
			} else {
				const response = await axios
					.get(`https://yjubluewave.shop/api/member/${userEmail}`)
					.then((res) => {
						const resEmail = res.data.member_email;
						const resId = res.data.member_id;
						axios
							.get(
								`https://yjubluewave.shop/api/member/friendList/${sessionStorage.getItem(
									"memid"
								)}`
							)
							.then((res) => {
								const isFriend = res.data.some((item) => item.friendId === resId);
								if (isFriend) {
									alert("이미 친구 관계입니다.");
									setUserData(null);
								} else {
									setUserData({ email: resEmail });
									setFriendId(resId);
								}
							});
					})
					.catch((err) => {
						alert("검색에 실패했습니다.");
						console.error(err);
					});
			}
		} catch (error) {
			console.error(error);
		}
		setUserEmail("");
	};

	const addFriend = async () => {
		await axios
			.post(
				`https://yjubluewave.shop/api/member/addFriend?memId=${sessionStorage.getItem(
					"memid"
				)}&friendId=${friendId}`
			)
			.then(() => {
				alert("친구 관계가 되었습니다");
			})
			.catch((err) => {
				alert("오류가 발생했습니다");
				console.log(err);
			});
		setFriendId(null);
		setUserData(null);
	};

	const deleteFriend = async (id) => {
		await axios
			.delete(
				`https://yjubluewave.shop/api/member/deleteFriend?memId=${sessionStorage.getItem(
					"memid"
				)}&friendId=${id}`
			)
			.then((res) => {
				alert("삭제되었습니다.");
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div style={{ textAlign: "center" }}>
			<Button variant="primary" onClick={() => setShowModal(true)}>
				친구 찾기
			</Button>
			{friends.map((friend, index) => (
				<>
					<li class="sidebar-item">
						<li class="sidebar-item">
							<div class="sidebar-link" aria-expanded="false">
								<span>
									<GrUserManager size={17} />
								</span>
								<span class="hide-menu" key={index} style={{ margin: "10px 0 10px" }}>
									{friend.name}{" "}
									<Button
										variant="danger"
										onClick={() => deleteFriend(friend.id)}
										size="sm"
									>
										삭제
									</Button>
								</span>
							</div>
						</li>
					</li>
					<p></p>
				</>
			))}

			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title style={{ fontWeight: 'bold' }}>친구 찾기</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						type="text"
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						placeholder="이메일 입력"
						className="inputDe"
					/>
					<button onClick={handleSearch} className="MybtnDe" >검색</button>
					{userData ? (
						<div>
							<span style={{ fontWeight: 'bold', marginLeft: "1rem" }}>
								{userData.email}
							</span>
							
							<Button variant="primary" onClick={addFriend}
								style={{margin: "1rem"}}
							>
								추가
							</Button>
						</div>
					) : (
						<p style={{marginLeft: "0.5rem"}}>검색하신 친구가 없습니다.</p>
					)}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default Sidebar;
