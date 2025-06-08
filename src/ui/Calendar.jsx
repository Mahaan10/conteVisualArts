import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function Calendar({ value, onChange }) {
  return (
    <div className="relative w-full min-w-md max-w-lg">
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={(date) => {
          // لاگ بگیر ببینی واقعاً چیه
          console.log("📅 picked date:", date);
          onChange(date); // باید instance از DateObject باشه
        }}
        calendarPosition="top"
        portal={false}
        minDate={new DateObject({ calendar: persian })}
        containerClassName="w-full px-1.5"
        inputClass="
          !w-full !pr-3 !pl-3 !py-2 !text-sm !rounded-lg !border
          !border-gray-300 !bg-inherit !text-gray-900
          focus:!border-cyan-500 focus:!ring-cyan-500
          dark:!border-gray-600 dark:!bg-inherit dark:!text-white
          dark:focus:!border-cyan-500 dark:focus:!ring-cyan-500
          !shadow-sm !transition-all !duration-300
        "
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none">
        <FaRegCalendarAlt className="w-5 h-5" />
      </div>
    </div>
  );
}

export default Calendar;
