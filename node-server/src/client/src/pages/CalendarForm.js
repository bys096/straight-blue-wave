import { useState } from "react";
import Calendar from "./Calendar";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";

const CalendarForm = () => {
  const [events, setEvents] = useState({});

  const handleAddEvent = (event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [event.date]: [...(prevEvents[event.date] || []), event],
    }));
  };

  return (
    <div className="main">
      <Header />
      <div className="article">
        <Sidebar />
        <div className="section">
          <Calendar></Calendar>
        </div>
      </div>
    </div>
  );
};

export default CalendarForm;
