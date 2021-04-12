import DatePicker from "react-date-picker";
import "./assets/datePick.scss";
import BaseField from "./baseComponents/BaseField";
import { CalendarIcon } from "./Icons";

const DatePick = ({ label, setDate, dateValue }) => {
  return (
    <BaseField label={label} noInputStyle={true}>
      <DatePicker
        clearIcon={null}
        calendarIcon={<CalendarIcon />}
        onChange={setDate}
        value={dateValue}
        format="dd/MM/y"
      />
    </BaseField>
  );
};

export default DatePick;
