import { useState } from "react";
import Calendar from "./Calendar";

const CalendarForm = () => {
	const [events, setEvents] = useState({});

	const handleAddEvent = (event) => {
		setEvents((prevEvents) => ({
			...prevEvents,
			[event.date]: [...(prevEvents[event.date] || []), event],
		}));
	};

	return (
		<div>
			<Calendar />
		</div>
	);
};

export default CalendarForm;
