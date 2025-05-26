import { useState } from 'react';

function Planner() {
  // Dummy data for planned days (e.g., array of day numbers)
  const [plannedDays, setPlannedDays] = useState([1, 7, 14, 21, 28]); // Example: days 1, 7, 14, 21, 28 are planned

  return (
    <div>
      <h2>Planned Days</h2>
      <ul>
        {plannedDays.map(day => (
          <li key={day}>Day {day}</li>
        ))}
      </ul>
      {/* Planner implementation will go here */}
    </div>
  );
}

export default Planner;
