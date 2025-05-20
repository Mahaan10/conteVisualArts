import { PiInfo } from "react-icons/pi";

function Contact() {
  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div className="flex items-center gap-x-2">
          <PiInfo className="w-7 h-7" />
          <p className="text-xl">ارتباط با ما</p>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default Contact;
