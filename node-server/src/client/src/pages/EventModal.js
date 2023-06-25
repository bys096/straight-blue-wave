import { useEffect, useState } from "react";
import "./EventModal.css";
import { Accordion, Badge, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Notification from "./notification";
import io from "socket.io-client";

const EventModal = ({
  onClose,
  /*onAddEvent*/ selectedDate,
  scheduleList,
  postList,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);
  const [postsForSelectedDate, setPostsForSelectedDate] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const savedEvents = JSON.parse(localStorage.getItem("schedules")) || {};
      const events = scheduleList[selectedDate] || [];
      const posts = postList[selectedDate] || [];
      setEventsForSelectedDate(events);
      setPostsForSelectedDate(posts);
    }
  }, []);

  const createSchecule = async () => {
    try {
      const res = await axios
        .post("http://localhost:8002/api/schedule/create", {
          schedule_title: title,
          schedule_description: description,
          start_date: startDate,
          end_date: endDate,
          prj_id: sessionStorage.getItem("prjid"),
        })
        .then((res) => {
          console.log(res);
          const schedule_id = res.data.scheduleId;
          // Collect the event data
          const eventData = {
            prjRoom: sessionStorage.getItem("prjroom"),
            prjName: sessionStorage.getItem("prjname"),
            post_name: title,
            post_content: description,
            schedule_id: schedule_id,
            post_id: "",
            team_id: sessionStorage.getItem("tmid"),
          };

          // Emit the event data through the socket
          socket.emit("eventData", eventData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const socket = io();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the schedule
    await createSchecule();
    onClose();
  };

  const DeleteSchedule = async (scheduleId) => {
    try {
      if (scheduleId) {
        await axios.delete(
          `http://localhost:8002/api/schedule/delete/${scheduleId}`
        );
        const updatedEvents = eventsForSelectedDate.filter(
          (schedule) => schedule.schedule_id !== scheduleId
        );
        setEventsForSelectedDate(updatedEvents);
      }
    } catch (error) {
      console.log(error);
      alert("스케줄 삭제에 실패하였습니다.");
    }
  };

  const handleDelete = (scheduleId) => {
    DeleteSchedule(scheduleId);
  };

  const handleModifySchedule = () => {};

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedDate} 일정</Modal.Title>
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
            <Button onClick={() => handleDelete(schedule.schedule_id)}>
              삭제
            </Button>
          </div>
        ))}
        {postsForSelectedDate.map((post, index) => (
          <div key={index}>
            <Badge bg="danger">
              <h5>{post.post_name}</h5>
            </Badge>
            <p>{post.post_content}</p>
            <p>회의일자 : {post.post_meeting_date}</p>
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
