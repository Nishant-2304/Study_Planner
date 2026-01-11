import { useEffect, useState } from "react";
import "./Subjects.css";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4f46e5");
  const [target, setTarget] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/subjects")
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);

  const addSubject = () => {
    if (!name || !target) return;

    fetch("http://localhost:5000/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        color,
        targetHours: Number(target)
      })
    })
      .then(res => res.json())
      .then(newSubject => {
        setSubjects(prev => [...prev, newSubject]);
        setName("");
        setTarget("");
      });
  };

  const deleteSubject = (id) => {
    fetch(`http://localhost:5000/api/subjects/${id}`, {
      method: "DELETE"
    }).then(() => {
      setSubjects(prev => prev.filter(s => s.id !== id));
    });
  };

  return (
    <div className="subjects-panel">
      <h3>Subjects</h3>

      <div className="subject-input">
        <input id="subject-name"
          placeholder="Subject name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input id="target-hours"
          type="number"
          placeholder="Target hrs/week"
          value={target}
          onChange={e => setTarget(e.target.value)}
        />
        <input id="color-picker"
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <button className="add-button" onClick={addSubject}>Add</button>
      </div>

      <ul className="subject-list">
        {subjects.map(sub => (
          <li key={sub.id} style={{ borderLeft: `6px solid ${sub.color}` }}>
            <div>
              <strong id="sub_name">{sub.name}</strong>
              <span id="sub_hrs">{sub.targetHours} hrs/week</span>
            </div>
            <button className="add-button" onClick={() => deleteSubject(sub.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
