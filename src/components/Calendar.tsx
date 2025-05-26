import { useState } from 'react';

function Calendar({ practicedDays, plannedDays }: { practicedDays: string[]; plannedDays: string[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 6 for Saturday

    const calendarDays = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isPracticed = practicedDays.some(practicedDateString => {
        const [year, month, day] = practicedDateString.split('-').map(Number);
        const practicedDate = new Date(year, month - 1, day); // Month is 0-indexed
        return practicedDate.getFullYear() === currentDate.getFullYear() &&
               practicedDate.getMonth() === currentDate.getMonth() &&
               practicedDate.getDate() === i;
      });
      const isPlanned = plannedDays.some(plannedDateString => {
        const [year, month, day] = plannedDateString.split('-').map(Number);
        const plannedDate = new Date(year, month - 1, day);
        return plannedDate.getFullYear() === currentDate.getFullYear() &&
               plannedDate.getMonth() === currentDate.getMonth() &&
               plannedDate.getDate() === i;
      });
      let dayClassName = 'calendar-day';
      if (isPracticed) {
        dayClassName += ' practiced';
      } else if (isPlanned) {
        dayClassName += ' planned';
      }

      calendarDays.push(
        <div
          key={`day-${i}`}
          className={dayClassName}
        >
          {i}
          {isPracticed && <span className="practiced-emoji">💪</span>}
        </div>
      );
    }

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerCells = daysOfWeek.map(day => (
      <div key={day} className="day-of-week-header">{day}</div>
    ));

    return (
      <div className="calendar-grid">
        {headerCells}
        {calendarDays}
      </div>
    );
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-container">
      <h2>
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h2>
      <button onClick={() => changeMonth(-1)}>&lt;</button>
      <button onClick={() => changeMonth(1)}>&gt;</button>
      {renderCalendar()}
    </div>
  );
}

export default Calendar;
