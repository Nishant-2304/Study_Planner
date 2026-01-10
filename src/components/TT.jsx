import "./TT.css"
import { useState } from "react";
import TodayView from "./TodayView";
import WeeklyView from "./WeeklyView";

export default function Home() {
  const [mode, setMode] = useState("today");

  return (
    <div className="home">
      <div className="top-bar">
        <h2>{mode === "today" ? "Today's Schedule" : "This Week's Schedule"}</h2>

        <div className="mode-toggle">
          <button
            className={mode === "today" ? "active" : ""}
            onClick={() => setMode("today")}
          >
            Today
          </button>
          <button
            className={mode === "weekly" ? "active" : ""}
            onClick={() => setMode("weekly")}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="view-container">
        {mode === "today" && <TodayView />}
        {mode === "weekly" && <WeeklyView />}
      </div>
    </div>
  );
}