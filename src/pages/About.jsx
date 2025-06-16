import { HiOutlineUsers } from "react-icons/hi2";

function About() {
  return (
    <div className="container">
      <div className="my-10 mx-4">
        <div className="flex items-center gap-x-2">
          <HiOutlineUsers className="w-7 h-7" />
          <p className="text-lg">درباره ما</p>
        </div>
        <div className="my-10 p-5 bg-red-700 rounded-md">
          <p className="p-5 text-center">
            آموزشگاه هنرهای تجسمی کنته در شریعتی محدوده قلهک یکی از بهترین
            آموزشگاه های هنرهای تجسمی در شمال تهران می‌باشد که با دوره‌های تخصصی
            آموزش طراحی، نقاشی، نقاشي خط، تصویرسازی، عکاسی، مجسمه سازی، سرامي
            سازى، دکوراسیون داخلى، اسکیس و راندو، پرسپکتیو تخصصى، تايپو گرافى،
            همراه با مجوز رسمی از وزارت فرهنگ و ارشاد اسلامی در خدمت هنرجویان
            مشتاق می‌باشد.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
