import { FaWhatsapp } from "react-icons/fa6";
import { PiInfo, PiInstagramLogo, PiTelegramLogo } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { LiaFaxSolid } from "react-icons/lia";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";

function Contact() {
  const linkClassName =
    "py-2 w-48 transition-colors duration-300 rounded-lg bg-almond-cookie dark:bg-dark-purple hover:bg-golden-sand dark:hover:bg-purple-plumeria";

  const socialLinks1 = [
    {
      id: 1,
      name: "Phone",
      desc: "02166957831",
      icon: <AiOutlinePhone className="w-10 h-10" />,
      to: "",
    },
    {
      id: 2,
      name: "Fax",
      desc: "02166958237",
      icon: <LiaFaxSolid className="w-10 h-10" />,
      to: "",
    },
    {
      id: 3,
      name: "Email",
      desc: "conteschool@yahoo.com",
      icon: <HiOutlineEnvelope className="w-10 h-10" />,
      to: "",
    },
  ];

  const socialLinks2 = [
    {
      id: 1,
      name: "Instagram",
      desc: "conteschool/",
      icon: <PiInstagramLogo className="w-10 h-10" />,
      to: "",
    },
    {
      id: 2,
      name: "Telegram",
      desc: "conteschool/",
      icon: <PiTelegramLogo className="w-10 h-10" />,
      to: "",
    },
    {
      id: 3,
      name: "WhatsApp",
      desc: "conteschool/",
      icon: <FaWhatsapp className="w-10 h-10" />,
      to: "",
    },
  ];

  return (
    <div className="container">
      <div className="my-10 mx-4">
        <div className="flex items-center gap-x-2">
          <PiInfo className="w-7 h-7" />
          <p className="text-xl">ارتباط با ما</p>
        </div>
        {/*  */}
        <div className="flex justify-between mt-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
          {/* Map */}
          <div className="max-w-2xl h-[300px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d742.1623561773503!2d51.440924030625744!3d35.767144374428554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e05103fcbdb05%3A0x4df68982b54cc0d9!2z2KLZhdmI2LLYtNqv2KfZhyDZh9mG2LHZh9in24wg2KrYrNiz2YXbjCDaqdmG2KrZhw!5e0!3m2!1sen!2s!4v1747742787956!5m2!1sen!2s"
              //width="600"
              //height="450"
              className="border-0 w-[250px] md:w-[600px] h-full rounded-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Social Links */}
          <div className="flex justify-between items-center w-full mx-10">
            <div className="flex flex-col gap-y-10">
              {socialLinks2.map((social) => (
                <Link key={social.id} to={social.to} className="">
                  <div
                    className={`flex justify-center items-center flex-row-reverse gap-x-2 ${linkClassName}`}
                  >
                    {social.icon}
                    <div className="flex flex-col">
                      <span className="text-left text-lg">{social.name}</span>
                      <span className="text-xs text-left font-iranian-sans">
                        {social.desc}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-y-10">
              {socialLinks1.map((social) => (
                <Link key={social.id} to={social.to} className="">
                  <div
                    className={`flex items-center flex-row-reverse justify-center gap-x-2 ${linkClassName}`}
                  >
                    {social.icon}
                    <div className="flex flex-col">
                      <span className="text-left text-lg">{social.name}</span>
                      <span className="text-xs text-left font-iranian-sans">
                        {social.desc}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
