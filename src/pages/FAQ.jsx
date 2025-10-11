import { useState } from "react";
import { BsQuestionDiamond, BsPlusLg } from "react-icons/bs";
import { CgMathMinus } from "react-icons/cg";

function FAQ() {
  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div
          className="flex items-center gap-x-2"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <BsQuestionDiamond className="w-7 h-7" />
          <p className="text-xl">سوالات متداول</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4 m-4">
        <Accordion />
      </div>
    </div>
  );
}

export default FAQ;

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "پرداخت مبلغ شهریه به چه صورت خواهد بود؟",
      content: "مبلغ شهریه در زمان ثبت نام به صورت کامل باید پرداخت گردد.",
    },
    {
      title: "چه زمانی باید در کلاس حضور داشته باشم؟",
      content: "حضور در کلاس قبل از ورود استاد الزامیست.",
    },
    {
      title: "آیا روز و ساعت کلاس ها قابل تغییر اند؟",
      content: "خیر، روز و ساعت کلاس ها بعد از شروع دوره قابل تغییر نمی باشد.",
    },
  ];

  return (
    <div className="px-1 sm:px-4 col-span-full">
      {accordionData.map((item, index) => (
        <div
          key={index}
          className="border-b last-of-type:border-0 border-black/20 dark:border-neutral-200/20 mb-2"
        >
          <button
            className={`w-full flex justify-between items-center text-start leading-8 py-4 px-1.5 rounded-t-lg cursor-pointer dark:bg-gray-900 bg-gray-200 text-xs sm:text-xl ${
              openIndex === index &&
              " text-inherit dark:text-inherit rounded border-b border-black/20 dark:border-neutral-200/20"
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <span
              className={`transform transition-transform duration-700 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              {openIndex === index ? (
                <CgMathMinus className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10" />
              ) : (
                <BsPlusLg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10" />
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              openIndex === index
                ? "max-h-fit scale-100 py-4"
                : "max-h-0 scale-95"
            }`}
          >
            <div className="p-1.5 gap-y-4 w-full">
              <div className="flex flex-col text-sm sm:text-base">
                <p className="flex items-center justify-start leading-8">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
