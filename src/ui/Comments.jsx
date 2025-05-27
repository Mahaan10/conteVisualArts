import { useState } from "react";
import { Tooltip } from "flowbite-react";

const Comments = () => {
  const [value, setValue] = useState(3);
  const rates = ["خیلی بد", "بد", "متوسط", "خوب", "عالی"];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label htmlFor="range" className="block mb-2 text-sm font-medium">
        امتیاز دهید:
        <span className="mx-2">
          {value === "1"
            ? "خیلی بد"
            : value === "2"
            ? "بد"
            : value === "3"
            ? "متوسط"
            : value === "4"
            ? "خوب"
            : "عالی"}
        </span>
      </label>

      {/* نقاط راهنما با Tooltip */}
      <div className="relative h-6">
        <div className="absolute -bottom-[15.5px] w-full flex justify-between pointer-events-none px-2">
          {[1, 2, 3, 4, 5].map((num, idx) => (
            <div key={num} className="relative pointer-events-auto">
              <Tooltip
                content={[1, 2, 3, 4, 5][idx]}
                trigger="hover"
                placement="top"
              >
                <span
                  className={`w-1 h-1 rounded-full block transition-transform ${
                    value == num ? "bg-gray-500 scale-125" : "bg-gray-400"
                  }`}
                />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      {/* اسلایدر */}
      <input
        id="range"
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 transition-discrete duration-300"
      />

      {/* لیبل‌ها */}
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        {rates.map((rate) => (
          <span key={rate}>{rate}</span>
        ))}
      </div>
    </div>
  );
};

export default Comments;
