import { useEffect, useState } from "react";
import "./WeeklyView.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const timeSlots = [
  "7am – 9am",
  "9am – 11am",
  "11am – 1pm",
  "1pm – 3pm",
  "3pm – 5pm",
  "5pm – 7pm",
  "7pm – 9pm",
  "9pm – 11pm",
  "11pm – 1am"
];

export default function WeeklyView() {
  const [cells, setCells] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/weekly")
      .then(res => res.json())
      .then(data => setCells(data));

    fetch("http://localhost:5000/api/subjects")
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);

  const saveCell = (id, subjectId) => {
    fetch(`http://localhost:5000/api/weekly/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectId })
    })
      .then(res => res.json())
      .then(updated => {
        setCells(prev =>
          prev.map(c => (c.id === id ? updated : c))
        );
        setEditingId(null);
      });
  };

  const getCell = (day, time) =>
    cells.find(c => c.day === day && c.time === time);

  const getSubject = (id) =>
    subjects.find(s => s.id === id);

  return (
    <div className="weekly-view">
      <div className="calendar-grid">
        <div className="time-header"></div>
        {days.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}

        {timeSlots.map(time => (
          <>
            <div key={time} className="time-slot">{time}</div>

            {days.map(day => {
              const cell = getCell(day, time);
              if (!cell)
                return <div key={day + time} className="calendar-cell"></div>;

              const subject = getSubject(cell.subjectId);

              return (
                <div
                  key={cell.id}
                  className="calendar-cell"
                  onClick={() => setEditingId(cell.id)}
                  style={{
                    color: subject?.color || "inherit"
                  }}
                >
                  {editingId === cell.id ? (
                    <select
                      autoFocus
                      onClick={e => e.stopPropagation()}
                      value={cell.subjectId ?? ""}
                      onChange={e =>
                        saveCell(
                          cell.id,
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                    >
                      <option value="">—</option>
                      {subjects.map(sub => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    subject ? subject?.name : ""
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}
