import React, { useEffect, useState } from "react";
import "./Calendar.css";
import EventModal from "./EventModal";
import { Badge } from "react-bootstrap";
import axios from "axios";

import Notification from "./notification";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

// 해당 월의 총 일수
function getDaysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

// 해당 월의 시작일
function getFirstDayOfMonth(month, year) {
	return new Date(year, month - 1, 1).getDay();
}

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState();

	const [schedules, setSchedules] = useState([]);
	const [boards, setBoards] = useState([]);
	const [posts, setPosts] = useState([]);

	const [reload, setReload] = useState(true);

	// useEffect(() => {
	// 	const savedSchedules = JSON.parse(localStorage.getItem("schedules")) || {};
	// 	setSchedules(savedSchedules);
	// }, []);

	// 보드를 가져오는 함수
	const fetchBoards = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8002/api/board/list/${sessionStorage.getItem("prjid")}`
			);
			setBoards(response.data);

			return response.data; // boards를 반환
		} catch (error) {
			console.error("An error occurred while fetching the boards:", error);
		}
	};

	// 각 보드에서 포스트를 가져오는 함수
	const fetchPosts = async (brdid) => {
		try {
			const response = await axios.post(`http://localhost:8002/api/post/list`, {
				page: 1,
				size: 10,
				boardId: brdid,
			});
			const fetchedPosts = response.data.dtoList;

			fetchedPosts.forEach((post) => {
				if (post.meeting_date) {
					let meetingDate = new Date(post.meeting_date);

					const formattedDate = `${meetingDate.getFullYear()}-${String(
						meetingDate.getMonth() + 1
					).padStart(2, "0")}-${String(meetingDate.getDate()).padStart(2, "0")}`;

					setPosts((prevPosts) => {
						const newSchedules = { ...prevPosts };

						if (!newSchedules[formattedDate]) {
							newSchedules[formattedDate] = [];
						}
						if (
							!newSchedules[formattedDate].find(
								(schedule) => schedule.post_id === post.post_id
							)
						) {
							newSchedules[formattedDate].push({
								post_id: post.post_id,
								post_name: post.post_name,
								post_meeting_date: post.meeting_date,
								post_content: post.post_content,
							});
						}

						return newSchedules;
					});
				}
			});
		} catch (error) {
			console.error("An error occurred while fetching the posts:", error);
		}
	};
	// 스케줄을 가져오는 함수
	const fetchSchedules = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8002/api/schedule/list/${sessionStorage.getItem("prjid")}`
			);
			const fetchedData = response.data;

			setSchedules((prevEvents) => {
				const newSchedules = { ...prevEvents };

				fetchedData.forEach((item) => {
					if (item.startDate && item.endDate) {
						let start = new Date(item.startDate);
						const end = new Date(item.endDate);
						const dateArray = [];

						while (start <= end) {
							dateArray.push(new Date(start));
							start.setDate(start.getDate() + 1);
						}

						dateArray.forEach((date) => {
							const formattedDate = `${date.getFullYear()}-${String(
								date.getMonth() + 1
							).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

							if (!newSchedules[formattedDate]) {
								newSchedules[formattedDate] = [];
							}
							if (
								!newSchedules[formattedDate].find(
									(schedule) => schedule.schedule_id === item.scheduleId
								)
							) {
								newSchedules[formattedDate].push({
									schedule_id: item.scheduleId,
									schedule_description: item.scheduleDescription,
									schedule_title: item.scheduleTitle,
									start_date: item.startDate,
									end_date: item.endDate,
								});
							}
						});
					}
				});
				// localStorage.setItem("schedules", JSON.stringify(newSchedules));
				setReload(false);
				return newSchedules;
			});
		} catch (error) {
			console.error("An error occurred while fetching the schedules:", error);
		}
	};

	
	useEffect(() => {
		const fetchData = async () => {
			const fetchedBoards = await fetchBoards();
			fetchedBoards.forEach((board) => {
				fetchPosts(board.brd_id);
			});
			console.log(posts);
			fetchSchedules();
		};
		fetchData();
	}, [reload]);

	// const addEvent = (startDate, event) => {
	// 	// startDate와 endDate 사이의 모든 날짜 가져오기
	// 	const start = new Date(startDate);
	// 	const end = new Date(event.endDate);
	// 	const dateArray = [];

	// 	while (start <= end) {
	// 		dateArray.push(new Date(start));
	// 		start.setDate(start.getDate() + 1);
	// 	}

	// 	setEvents((prevEvents) => {
	// 		const newEvents = { ...prevEvents };

	// 		// 각 날짜에 이벤트 추가
	// 		dateArray.forEach((date) => {
	// 			const formattedDate = `${date.getFullYear()}-${String(
	// 				date.getMonth() + 1
	// 			).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	// 			newEvents[formattedDate] = newEvents[formattedDate]
	// 				? [...newEvents[formattedDate], event]
	// 				: [event];
	// 		});

	// 		// 변경된 이벤트를 localStorage에 저장
	// 		localStorage.setItem("events", JSON.stringify(newEvents));

	// 		return newEvents;
	// 	});
	// };

	const daysInMonth = getDaysInMonth(
		currentDate.getMonth() + 1,
		currentDate.getFullYear()
	);
	const firstDayOfMonth = getFirstDayOfMonth(
		currentDate.getMonth() + 1,
		currentDate.getFullYear()
	);

	const dates = [];

	// 현재 월에 날짜 표시
	for (let i = 1; i <= daysInMonth; i++) {
		dates.push({ date: i, isCurrentMonth: true });
	}

	//이전 월 날짜 표시
	const daysInPrevMonth = getDaysInMonth(
		currentDate.getMonth(),
		currentDate.getFullYear()
	);
	for (let i = 1; i <= firstDayOfMonth; i++) {
		dates.unshift({ date: daysInPrevMonth - i + 1, isCurrentMonth: false });
	}

	//다음 월 날짜 표시
	let nextMonthDate = 1;
	while (dates.length % 7 !== 0) {
		dates.push({ date: nextMonthDate++, isCurrentMonth: false });
	}

	const weeks = [];
	let currentWeek = [];

	dates.forEach((dateObj, index) => {
		currentWeek.push(dateObj);

		if ((index + 1) % 7 === 0 || index === dates.length - 1) {
			weeks.push(currentWeek);
			currentWeek = [];
		}
	});

	const handleNextMonth = () => {
		setCurrentDate(
			(prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
		);
	};

	const handlePrevMonth = () => {
		setCurrentDate(
			(prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
		);
	};

	const handleDateClick = (e) => {
		const selectedDate = e.target.dataset.date;
		const isCurrentMonth = e.target.dataset.isCurrentMonth === "true";
		if (isCurrentMonth) {
			console.log(`선택된 날짜 : ${selectedDate}`);
			setIsModalOpen(true);
			setSelectedDate(selectedDate);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setReload(true);
	};

	return (
		<div className="CalendarWrapper">
			<Notification></Notification>
			<div className="CalendarHeader">
				<button onClick={handlePrevMonth}>이전</button>
				<h2>
					{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
				</h2>
				<button onClick={handleNextMonth}>다음</button>
			</div>
			<div className="DaysRow">
				{daysOfWeek.map((day, index) => (
					<div className="DayName" key={index}>
						{day}
					</div>
				))}
			</div>
			{weeks.map((week, index) => (
				<div className="DaysRow" key={index}>
					{week.map(({ date, isCurrentMonth }, i) => {
						const formattedDate = `${currentDate.getFullYear()}-${String(
							currentDate.getMonth() + 1
						).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

						return (
							<div
								className={`DateCell ${isCurrentMonth ? "currentMonth" : "otherMonth"}`}
								key={i}
								onClick={handleDateClick}
								data-date={formattedDate}
								data-is-current-month={isCurrentMonth}
							>
								{date}
								{/* {isCurrentMonth &&
									events[formattedDate]?.map((event, idx) => (
										<div
											className="Event"
											key={idx}
											onClick={(e) => {
												e.stopPropagation();
												setSelectedDate(formattedDate);
												setIsModalOpen(true);
											}}
										>
											<Badge pill>{event.title}</Badge>
										</div>
									))} */}
								{isCurrentMonth &&
									schedules[formattedDate]?.map((schedule, idx) => (
										<div
											className="schedules"
											key={idx}
											onClick={(e) => {
												e.stopPropagation();
												setSelectedDate(formattedDate);
												setIsModalOpen(true);
											}}
										>
											<Badge pill>{schedule.schedule_title}</Badge>
										</div>
									))}

								{isCurrentMonth &&
									posts[formattedDate]?.map((post, idx) => (
										<div
											className="schedules"
											key={idx}
											onClick={(e) => {
												e.stopPropagation();
												setSelectedDate(formattedDate);
												setIsModalOpen(true);
											}}
										>
											<Badge pill bg="danger">
												{post.post_name}
											</Badge>
										</div>
									))}
							</div>
						);
					})}
				</div>
			))}
			{isModalOpen && (
				<EventModal
					onClose={handleCloseModal}
					//  onAddEvent={isUpdate}
					selectedDate={selectedDate}
					postList={posts}
					scheduleList={schedules}
				/>
			)}
		</div>
	);
};

export default Calendar;
