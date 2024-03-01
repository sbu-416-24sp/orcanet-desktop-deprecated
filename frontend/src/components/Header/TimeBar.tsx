import { useEffect, useState } from "react";
import { Clock } from "react-bootstrap-icons";

const TimeBar = () => {
  const [time, setTime] = useState(new Date());

  const update = () => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  };

  useEffect(update, []);

  const formattedTime: string = time.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const date: string = time.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [m, d, y]: string[] = date.split(" ");
  const day: string = d.replace(",", "");

  return (
    <div className="time-bar">
      <div className="time">
        <Clock />
        <span className="time-text">{formattedTime}</span>
      </div>
      <span className="separator"></span>
      <div className="date">
        <span className="date-text">
          {day} {m} {y}
        </span>
      </div>
    </div>
  );
};

export default TimeBar;
