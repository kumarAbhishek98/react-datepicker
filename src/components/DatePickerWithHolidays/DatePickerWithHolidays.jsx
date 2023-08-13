import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerWithHolidays.css";
import { isSameDay } from "date-fns";

export function DatePickerWithHolidays() {
  const [startDate, setStartDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  const highlightDates = [
    { date: new Date(2023, 0, 26), name: "Republic Day" },
    { date: new Date(2023, 2, 29), name: "Holi" },
    { date: new Date(2023, 3, 2), name: "Good Friday" },
    { date: new Date(2023, 3, 14), name: "Ambedkar Jayanti" },
    { date: new Date(2023, 4, 1), name: "International Labour Day" },
  ];

  const highlightDate = (date) =>
    highlightDates.some((highlight) => isSameDay(date, highlight.date))
      ? "highlighted"
      : undefined;

  const renderTooltip = (date) => {
    const highlight = highlightDates.find((highlight) =>
      isSameDay(date, highlight.date)
    );
    if (highlight) {
      return (
        <div className="tooltip">
          <span className="tooltip-name">{highlight.name} - </span>
          <span className="tooltip-date">{date.toDateString()}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="custom-datepicker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        highlightDates={highlightDates.map((highlight) => highlight.date)}
        customDayClassName={highlightDate}
        placeholderText="Highlighting holidays"
        renderDayContents={(day, date) => (
          <div
            className="date-wrapper"
            onMouseEnter={() => setHoveredDate(date)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            {date.getDate()}
            {hoveredDate && isSameDay(date, hoveredDate) && renderTooltip(date)}
          </div>
        )}
      />
    </div>
  );
}
