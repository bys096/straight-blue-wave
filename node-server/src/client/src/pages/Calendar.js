import React, {useState} from "react";
import "./Calendar.css";
import EventModal from "./EventModal";

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
	const [events, setEvents] = useState({});
	const [selectedDate, setSelectedDate] = useState();

	const addEvent = (date, event) => {
		setEvents((prevEvents) => ({
			...prevEvents,
			[date]: prevEvents[date] ? [...prevEvents[date], event] : [event],
		}));
	};

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
		dates.push({date: i, isCurrentMonth: true});
	}

	//이전 월 날짜 표시
	const daysInPrevMonth = getDaysInMonth(
		currentDate.getMonth(),
		currentDate.getFullYear()
	);
	for (let i = 1; i <= firstDayOfMonth; i++) {
		dates.unshift({date: daysInPrevMonth - i + 1, isCurrentMonth: false});
	}

	//다음 월 날짜 표시
	let nextMonthDate = 1;
	while (dates.length % 7 !== 0) {
		dates.push({date: nextMonthDate++, isCurrentMonth: false});
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
	};

	return (
		<div className="CalendarWrapper">
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
					{week.map(({date, isCurrentMonth}, i) => {
						const formattedDate = `${currentDate.getFullYear()}-${String(
							currentDate.getMonth() + 1
						).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

						return (
							<div
								className={`DateCell ${
									isCurrentMonth ? "currentMonth" : "otherMonth"
								}`}
								key={i}
								onClick={handleDateClick}
								data-date={formattedDate}
								data-is-current-month={isCurrentMonth}>
								{date}
								{isCurrentMonth &&
									events[formattedDate]?.map((event, idx) => (
										<div className="Event" key={idx}>
											{event}
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
					onAddEvent={addEvent}
					selectedDate={selectedDate}
				/>
			)}
		</div>
	);
};

export default Calendar;
