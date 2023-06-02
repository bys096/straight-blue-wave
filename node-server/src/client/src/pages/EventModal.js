import { useEffect, useState } from "react";
import "./EventModal.css";
import { Accordion, Badge, Button, Form, Modal } from "react-bootstrap";

const EventModal = ({ onClose, onAddEvent, selectedDate }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
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

	const handleSubmit = (e) => {
		e.preventDefault();

		onAddEvent(selectedDate, { title, description, startDate, endDate });
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
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Description</Form.Label>
									<Form.Control
										type="text"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
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
