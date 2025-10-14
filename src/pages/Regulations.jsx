import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { CgMathMinus } from "react-icons/cg";
import { GoLaw } from "react-icons/go";

function TermsOfServices() {
  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div
          className="flex items-center gap-x-2"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <GoLaw className="w-7 h-7" />
          <p className="text-xl">قوانین و مقررات</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4 m-4">
        <Accordion />
      </div>
    </div>
  );
}

export default TermsOfServices;

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "ضوابط استرداد کل مبلغ شهریه به چه صورت خواهد بود؟",
      content:
        "طبق قوانین وزارت فرهنگ و ارشاد اسلامی تنها در صورتی که زمان کلاس ها تغییر یا تعویض شوند، کلاس مورد نظر برگزار نگردد، مربی توافق شده در هنگام ثبت نام تغییر داده شود و یا متقاضی تا یک هفته قبل از شروع کلاس ها اعلام انصراف کند وجه پرداختی بابت شهریه تمام و کمال به متقاضی استرداد می گردد.",
    },
    {
      title: "ضوابط استرداد بخشی از مبلغ شهریه به چه صورت خواهد بود؟",
      content:
        "در صورتیکه متقاضی بعد از شروع دوره اعلام انصراف کند، 30% از مبلغ شهریه جلسات باقی مانده به وی استرداد خواهد شد. مشروط به آنکه تعداد جلسات باقی مانده کمتر از 1/3 طول دوره نباشد وگرنه هیچ وجهی مسترد نخواهد شد. علاوه بر این در کلاس های کمتر از 10 نفر آموزشگاه های آزاد تجسمی و نمایشی در صورتی که متقاضی بعد از شروع دوره اعلام انصراف کند، هیچ وجهی مسترد نخواهد شد.",
    },
    {
      title:
        "تعهد رفتاری هنرجویان نسبت به کلاس ها و محیط آموزشگاه چه خواهد بود؟",
      content:
        "به همراه داشتن کارت عضویت در تمام طول دوره الزامیست و همچنین استفاده از تلفن همراه در کلاس و استعمال دخانیات در محیط آموزشگاه ممنوع می باشد.",
    },
    {
      title: "قوانین غیبت در کلاس ها به چه صورت خواهد بود؟",
      content:
        "در صورت غیبت هنرجو جلسه موردنظر سوخت می شود اما چنانچه کنسل شدن کلاس از طرف استاد و یا مجموعه باشد، با هماهنگی قبلی کلاس جبرانی برگزار خواهد شد.",
    },
    {
      title: "آیا آموزشگاه نسبت به اموال هنرجویان مسئول خواهد بود؟",
      content:
        "خیر، آموزشگاه هیچ گونه مسئولیتی نسبت به مفقود شدن اموال هنرجویان در محیط آموزشگاه ندارد.",
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
            <div className="p-1.5 gap-y-4">
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
