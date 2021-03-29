import DatePicker from "react-date-picker";
import "./assets/datePick.scss";
import { CalendarIcon } from "./Icons";

const DatePick = ({ setDate, dateValue }) => {
  return (
    <DatePicker
      clearIcon={null}
      calendarIcon={<CalendarIcon />}
      onChange={setDate}
      value={dateValue}
      format="dd/MM/y"
    />
  );
};

export default DatePick;
