import { useEffect, useState } from "react";
import "./EventModal.css";
import { Accordion, Badge, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventModal = ({ onClose, /*onAddEvent*/ selectedDate }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState(selectedDate);
	const [endDate, setEndDate] = useState(selectedDate);
	const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (selectedDate) {
			const savedEvents = JSON.parse(localStorage.getItem("schedules")) || {};
			const events = savedEvents[selectedDate] || [];
			setEventsForSelectedDate(events);
		}
	}, [selectedDate]);

	const createSchecule = async () => {
		try {
			const res = await axios.post("http://localhost:8002/api/schedule/create", {
				schedule_title: title,
				schedule_description: description,
				start_date: startDate,
				end_date: endDate,
				prj_id: sessionStorage.getItem("prjid"),
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		createSchecule();
		onClose();
	};

	const handleDeleteSchedule = async (scheduleId) => {
		try {
			if (scheduleId) {
				await axios.delete(`http://localhost:8002/api/schedule/delete/${scheduleId}`);
				const updatedEvents = eventsForSelectedDate.filter(schedule => schedule.schedule_id !== scheduleId);
				setEventsForSelectedDate(updatedEvents);
			}
		} catch (error) {
			console.log(error);
			alert("스케줄 삭제에 실패하였습니다.");
		}
	};

	const handleModifySchedule = () => {};

	return (
		<Modal show onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{selectedDate} 일정 </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{eventsForSelectedDate.map((schedule, index) => (
					<div key={index}>
						<h5>
							<Badge>{schedule.schedule_title}</Badge>
						</h5>
						<p>{schedule.schedule_description}</p>
						<p>Start Date: {schedule.start_date}</p>
						<p>End Date: {schedule.end_date}</p>
						<Button onClick={() => handleDeleteSchedule(schedule.schedule_id)}>삭제</Button>
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
