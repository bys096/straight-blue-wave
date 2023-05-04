import { useState } from "react";
import "./EventModal.css";
import { Button } from "react-bootstrap";

const EventModal = ({onClose, onAddEvent, selectedDate}) => {

    const [eventText, setEventText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddEvent(selectedDate, eventText);
        onClose();
    }
	return (
<div className="ModalOverlay" onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <h2>일정</h2>
      </div>
    </div>
	);
};

export default EventModal;
