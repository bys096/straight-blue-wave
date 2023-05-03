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
        <h2>일정 추가</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            placeholder="일정을 입력해주세요"
          />
          <Button type="submit">저장</Button>
        </form>
      </div>
    </div>
	);
};

export default EventModal;
