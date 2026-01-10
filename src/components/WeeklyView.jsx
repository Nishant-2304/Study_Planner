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
  return (
    <div className="weekly-view">

      <div className="calendar-grid">
        {/* Header row */}
        <div className="time-header"></div>
        {days.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}

        {/* Time rows */}
        {timeSlots.map((slot) => (
          <>
            <div key={slot} className="time-slot">
              {slot}
            </div>

            {days.map((day) => (
              <div key={day + slot} className="calendar-cell">
                {/* future task block */}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}