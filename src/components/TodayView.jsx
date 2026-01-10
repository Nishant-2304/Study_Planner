import { useEffect, useState } from "react";
import "./TodayView.css";

export default function TodayView() {
  const [slots, setSlots] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [input, setInput] = useState("");

  // load today's timetable
  useEffect(() => {
    fetch("http://localhost:5000/api/today")
      .then(res => res.json())
      .then(data => setSlots(data));
  }, []);

  // save edited slot
  const saveTask = (id) => {
    fetch(`http://localhost:5000/api/today/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input })
    })
      .then(res => res.json())
      .then(updated => {
        setSlots(prev =>
          prev.map(s => (s.id === id ? updated : s))
        );
        setEditingId(null);
        setInput("");
      });
  };

  return (
    <div className="today-view">
      <div className="today-timeline">
        {slots.map(slot => (
          <div
            key={slot.id}
            className="task-block"
            onClick={() => {
              setEditingId(slot.id);
              setInput(slot.task);
            }}
          >
            <span className="time">{slot.time}</span>

            {editingId === slot.id ? (
              <input
                autoFocus
                className="task"
                value={input}
                placeholder="Add task..."
                onChange={e => setInput(e.target.value)}
                onBlur={() => saveTask(slot.id)}
                onKeyDown={e => e.key === "Enter" && saveTask(slot.id)}
              />
            ) : (
              <span className="task">
                {slot.task || "—"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
