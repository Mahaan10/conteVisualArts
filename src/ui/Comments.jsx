import { useState } from "react";
import {
  createTheme,
  FloatingLabel,
  Textarea,
  ThemeProvider,
  Tooltip,
} from "flowbite-react";

const customTheme = createTheme({
  floatingLabel: {
    label: {
      default: {
        outlined: {
          sm: "right-1 left-auto dark:bg-gray-950 bg-whitesmoke cursor-text",
        },
      },
    },
  },
  textarea: {
    colors: {
      gray: "bg-transparent focus:ring-0 dark:bg-transparent dark:focus:ring-0",
    },
  },
});

const Comments = () => {
  const [value, setValue] = useState(3);
  const rates = ["خیلی بد", "بد", "متوسط", "خوب", "عالی"];

  return (
    <>
      <form className="w-full max-w-md mx-auto p-4">
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
        <div className="relative h-6">
          <div className="absolute -bottom-[17px] w-full flex justify-between pointer-events-none px-2">
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
        <input
          id="range"
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 transition-discrete duration-300"
        />
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-2 mb-8">
          {rates.map((rate) => (
            <span key={rate}>{rate}</span>
          ))}
        </div>
        <div className="space-y-6">
          <ThemeProvider theme={customTheme}>
            <FloatingLabel
              variant="outlined"
              label="عنوان دیدگاه"
              sizing="sm"
              type="text"
            />
            <FloatingLabel
              variant="outlined"
              label="نکات مثبت"
              sizing="sm"
              type="text"
            />
            <FloatingLabel
              variant="outlined"
              label="نکات منفی"
              sizing="sm"
              type="text"
            />
            <Textarea
              id=""
              placeholder="توضیحات"
              required
              rows={4}
              className="resize-none"
            />
          </ThemeProvider>
        </div>
        <button className="w-full mt-6 rounded-xl bg-almond-cookie hover:bg-golden-sand dark:bg-dark-cerulean dark:hover:bg-purple-plumeria py-3 cursor-pointer text-sm transition-all duration-300">
          ثبت دیدگاه
        </button>
      </form>
    </>
  );
};

export default Comments;
