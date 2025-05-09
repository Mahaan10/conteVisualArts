import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="border-t border-light-shade-yellow dark:border-moderate-violet transition-colors duration-300">
      <div className="flex flex-col">
        <div className="-mb-20">
          <img
            src="images/footer.png"
            loading="lazy"
            width="1440"
            height="400"
            alt=""
            className="object-cover w-full"
          />
        </div>
        <div className="flex flex-col gap-5 w-full sm:gap-3">
          <div className="w-full flex justify-between px-24 items-center sm:px-5">
            <div className="flex gap-10 sm:flex-wrap sm:gap-5">
              <div className="flex flex-col gap-y-2">
                <p className="text-lg">دوره های پرطرفدار</p>
                <div className="flex flex-col gap-y-1 text-xs opacity-75">
                  <Link to="/courses/portrait">نقاشی چهره</Link>
                  <Link to="/courses/portrait">نقاشی طبیعت</Link>
                  <Link to="/courses/portrait">نقاشی از روی عکس</Link>
                  <Link to="/courses/portrait">نقاشی به سبک سورئالیسم</Link>
                  <Link to="/courses/portrait">نقاشی به سبک رئالیسم</Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-lg">دسترسی سریع</p>
                <div className="flex flex-col gap-y-1 text-xs opacity-75">
                  <Link to="/courses/portrait">همه دوره ها</Link>
                  <Link to="/courses/portrait">آثار هنرجویان</Link>
                  <Link to="/courses/portrait">اخبار و رویدادها</Link>
                  <Link to="/courses/portrait">درباره ما</Link>
                  <Link to="/courses/portrait">ارتباط با ما</Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-lg">راهنما و پشتیبانی</p>
                <div className="flex flex-col gap-y-1 text-xs opacity-75">
                  <Link to="/courses/portrait">سوالات متداول(FAQ)</Link>
                  <Link to="/courses/portrait">قوانین و مقررات</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>صفحات اجتماعی</h1>
              <div className="flex flex-col gap-y-1">
                <div className="">
                  <span>تلفن پشتیبانی:</span>
                  <Link to="">021-66957831</Link>
                </div>
                <div className="">
                  <span>ایمیل:</span>
                  <Link to="">conteschool@yahoo.com</Link>
                </div>
                <div className="">{/* Social Links */}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <img src="images/Logo.jpg" alt="" className="w-44" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
