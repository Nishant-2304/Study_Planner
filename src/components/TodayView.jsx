import { useEffect, useMemo, useState } from "react";
import "./TodayView.css";

export default function TodayView() {
  const [slots, setSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/today")
      .then(res => res.json())
      .then(data => setSlots(data));

    fetch("http://localhost:5000/api/subjects")
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);

  // 🔥 THIS IS THE FIX
  const subjectMap = useMemo(() => {
    return Object.fromEntries(
      subjects.map(s => [s.id, s])
    );
  }, [subjects]);

  const saveSlot = (id, subjectId) => {
    fetch(`http://localhost:5000/api/today/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectId })
    })
      .then(res => res.json())
      .then(updated => {
        setSlots(prev =>
          prev.map(s => (s.id === id ? updated : s))
        );
        setEditingId(null);
      });
  };

  return (
    <div className="today-view">
      <div className="today-timeline">
        {slots.map(slot => {
          const subject = subjectMap[slot.subjectId];

          return (
            <div
              key={slot.id}
              className="task-block"
              onClick={() => setEditingId(slot.id)}
            >
              <span className="time">{slot.time}</span>

              {editingId === slot.id ? (
                <select
                  autoFocus
                  onClick={e => e.stopPropagation()}
                  value={slot.subjectId ?? ""}
                  onChange={e =>
                    saveSlot(
                      slot.id,
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
                <span
                  className="task"
                  style={{
                    color: subject ? subject.color : "#999"
                  }}
                >
                  {subject ? subject.name : "—"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
