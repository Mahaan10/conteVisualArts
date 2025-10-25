import { FaWhatsapp } from "react-icons/fa6";
import { PiInfo, PiInstagramLogo, PiTelegramLogo } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";

function Contact() {
  const iconClass =
    "w-10 h-10 rounded-full bg-almond-cookie p-2 dark:bg-dark-purple transition-colors duration-300 group-hover:bg-golden-sand dark:group-hover:bg-purple-plumeria";

  const socialLinks1 = [
    {
      id: 1,
      name: "Phone",
      desc: "02122264021",
      icon: <AiOutlinePhone className={`${iconClass}`} />,
      to: "tel:+982122264021",
    },
    {
      id: 3,
      name: "Email",
      desc: "conteschool@yahoo.com",
      icon: <HiOutlineEnvelope className={`${iconClass}`} />,
      to: "mailto:conteschool@yahoo.com",
    },
  ];

  const socialLinks2 = [
    {
      id: 1,
      name: "Instagram",
      desc: "conteschool1393",
      icon: <PiInstagramLogo className={`${iconClass}`} />,
      to: "https://www.instagram.com/conteschool1393",
    },
    {
      id: 2,
      name: "Telegram",
      desc: "09125975912",
      icon: <PiTelegramLogo className={`${iconClass}`} />,
      to: "https://t.me/+989125975912",
    },
    {
      id: 3,
      name: "WhatsApp",
      desc: "09125975912",
      icon: <FaWhatsapp className={`${iconClass}`} />,
      to: "https://wa.me/+989125975912",
    },
  ];

  return (
    <div className="container">
      <div className="my-10 mx-4">
        <div
          className="flex items-center gap-x-2"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <PiInfo className="w-7 h-7" />
          <p className="text-xl">ارتباط با ما</p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
          {/* Map */}
          <div
            className="w-full h-[300px] md:h-[400px]"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.33323338748795!2d51.441219805092544!3d35.767226733739605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e05103fcbdb05%3A0x4df68982b54cc0d9!2z2KLZhdmI2LLYtNqv2KfZhyDZh9mG2LHZh9in24wg2KrYrNiz2YXbjCDaqdmG2KrZhw!5e0!3m2!1sen!2s!4v1761402416826!5m2!1sen!2s"
              className="border-0 w-full h-full rounded-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Social Links */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex flex-col gap-y-6">
              {socialLinks1.map((social) => (
                <a
                  key={social.id}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="flex flex-row-reverse items-center gap-x-2 py-2">
                    {social.icon}
                    <div className="flex flex-col">
                      <span className="text-left text-lg">{social.name}</span>
                      <span className="text-xs text-left font-iranian-sans">
                        {social.desc}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-y-6">
              {socialLinks2.map((social) => (
                <a
                  key={social.id}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="flex flex-row-reverse items-center gap-x-2 py-2">
                    {social.icon}
                    <div className="flex flex-col">
                      <span className="text-left text-lg">{social.name}</span>
                      <span className="text-xs text-left font-iranian-sans">
                        {social.desc}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
