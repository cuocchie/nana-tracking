import { useState, useEffect } from 'react';

function RemainingDays({ practicedDays, plannedDays }: { practicedDays: number[]; plannedDays: number[] }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    // Calculate remaining days based on data from props
    const practicedCount = practicedDays.length;
    const plannedCount = plannedDays.length;
    const remainingCount = plannedCount - practicedCount;
    setRemaining(remainingCount > 0 ? remainingCount : 0);
  }, [practicedDays, plannedDays]);

  return (
    <div>
      <h2>Remaining Days</h2>
      <p>Remaining planned days: {remaining}</p>
      {/* Remaining Days implementation will go here */}
    </div>
  );
}

export default RemainingDays;
