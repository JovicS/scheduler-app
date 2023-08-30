import { useState } from "react";
import DatePickerComponent from "../DatePicker/DatePicker.components";
import data from "../../config/mock3.json";
import { useTranslation } from "react-i18next";

function InitCalendarLogic() {
  const { i18n } = useTranslation();
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });

  const company = data.company;
  const dateFormat = (date) =>
    date
      .toLocaleDateString(i18n.language, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
      .split(",");

  const getDaysInMonth = () => {
    const numberOfDaysInMonth = new Date(
      date.year,
      date.month + 1,
      0
    ).getDate();
    let days = [];
    for (let i = 1; i <= numberOfDaysInMonth; i++) {
      days.push(new Date(date.year, date.month, i));
    }
    return days;
  };

  const handlePrevMonth = () => {
    if (date.month > 0) {
      setDate((prev) => ({
        month: prev.month - 1,
        year: prev.year,
      }));
    } else {
      setDate((prev) => ({
        month: 11,
        year: prev.year - 1,
      }));
    }
  };

  const handleNextMonth = () => {
    if (date.month < 11) {
      setDate((prev) => ({
        month: prev.month + 1,
        year: prev.year,
      }));
    } else {
      setDate((prev) => ({
        month: 0,
        year: prev.year + 1,
      }));
    }
  };

  const props = {
    date,
    handleNextMonth,
    handlePrevMonth,
    setDate,
  };

  const DateComponent = () => <DatePickerComponent props={props} />;

  const actionScroll = () => {
    setScroll({ x: window.scrollX, y: window.scrollY });
  };
  window.addEventListener("scroll", actionScroll);

  const hexToRgbA = (props) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(props.hex)) {
      c = props.hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${
        props.opacity
      })`;
    }
    throw new Error("Bad Hex");
  };

  return {
    getDaysInMonth,
    company,
    DateComponent,
    dateFormat,
    hexToRgbA,
    scroll,
  };
}

export default InitCalendarLogic;
