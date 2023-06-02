import { useEffect, useState } from "react";
import "./EventModal.css";
import { Accordion, Badge, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const EventModal = ({ onClose, onAddEvent, selectedDate }) => {
	const [scheduleTitle, setScheduleTitle] = useState("");
	const [scheduleDescription, setShcheduleDescription] = useState("");
	const [startDate, setStartDate] = useState(selectedDate);
	const [endDate, setEndDate] = useState(selectedDate);
	const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

	useEffect(() => {
		if (selectedDate) {
			const savedEvents = JSON.parse(localStorage.getItem("events")) || {};
			const events = savedEvents[selectedDate] || [];
			setEventsForSelectedDate(events);
		}
	}, [selectedDate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post("http://localhost:8002/api/schedule/create", {
				schedule_title : scheduleTitle,
				schedule_description : scheduleDescription,
				start_date : startDate,
				end_date : endDate
			})
			.then((res) => {
				alert("스케줄 등록");
			})
			.catch((error) => {
				console.error(error);
				alert("스케줄 등록 실패");
			});

		onAddEvent(selectedDate, {
			scheduleTitle,
			scheduleDescription,
			startDate,
			endDate,
		});
		onClose();
	};

	return (
		<Modal show onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{selectedDate} 일정</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{eventsForSelectedDate.map((event, index) => (
					<div key={index}>
						<h5>
							<Badge style={{ backgroundColor: event.color }}>{event.title}</Badge>
						</h5>
						<p>{event.description}</p>
						<p>Start Date: {event.startDate}</p>
						<p>End Date: {event.endDate}</p>
					</div>
				))}
				<hr />
				<Accordion>
					<Accordion.Item eventKey="0">
						<Accordion.Header>일정 추가</Accordion.Header>
						<Accordion.Body>
							<Form onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label>Title</Form.Label>
									<Form.Control
										type="text"
										value={scheduleTitle}
										onChange={(e) => setScheduleTitle(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Description</Form.Label>
									<Form.Control
										type="text"
										value={scheduleDescription}
										onChange={(e) => setShcheduleDescription(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Start Date</Form.Label>
									<Form.Control
										type="date"
										value={startDate}
										onChange={(e) => setStartDate(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>End Date</Form.Label>
									<Form.Control
										type="date"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
										required
									/>
								</Form.Group>
								<Button variant="primary" type="submit">
									Add Event
								</Button>
							</Form>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Modal.Body>
		</Modal>
	);
};

export default EventModal;
