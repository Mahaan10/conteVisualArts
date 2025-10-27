import { FaWhatsapp } from "react-icons/fa6";
import { PiInfo, PiInstagramLogo, PiTelegramLogo } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineEnvelope } from "react-icons/hi2";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import Leaflet marker images for React
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Helper component to handle map clicks
function MapClickHandler({ onClick }) {
  useMapEvent("click", onClick);
  return null;
}

function Contact() {
  const socialLinks1 = [
    {
      id: 1,
      name: "تلفن",
      icon: <AiOutlinePhone className="w-6 h-6" />,
      to: "tel:+982122264021",
    },
    {
      id: 2,
      name: "ایمیل",
      icon: <HiOutlineEnvelope className="w-6 h-6" />,
      to: "mailto:conteschool@yahoo.com",
    },
  ];

  const socialLinks2 = [
    {
      id: 1,
      name: "اینستاگرام",
      icon: <PiInstagramLogo className="w-6 h-6" />,
      to: "https://www.instagram.com/conteschool1393",
    },
    {
      id: 2,
      name: "تلگرام",
      icon: <PiTelegramLogo className="w-6 h-6" />,
      to: "https://t.me/+989125975912",
    },
    {
      id: 3,
      name: "واتس اپ",
      icon: <FaWhatsapp className="w-6 h-6" />,
      to: "https://wa.me/+989125975912",
    },
  ];

  // Location coordinates
  const latitude = 35.7672381;
  const longitude = 51.4412066;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

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
          {/* Leaflet Map */}
          <div
            className="w-full h-[300px] md:h-[400px]"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <MapContainer
              center={[latitude, longitude]}
              zoom={30}
              style={{ height: "100%", width: "100%", cursor: "pointer" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  آموزشگاه هنرهای تجسمی کنته
                  <br />
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    دریافت مسیر در گوگل مپس
                  </a>
                </Popup>
              </Marker>

              {/* MapClickHandler makes whole map clickable */}
              <MapClickHandler
                onClick={() => window.open(googleMapsUrl, "_blank")}
              />
            </MapContainer>
          </div>

          {/* Social Links */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex flex-col items-center gap-y-6">
              {socialLinks1.map((social) => (
                <a
                  key={social.id}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-x-2 p-4 bg-almond-cookie dark:bg-dark-purple rounded-lg hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300 cursor-pointer w-45"
                >
                  {social.icon}
                  <span className="text-lg">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-y-6">
              {socialLinks2.map((social) => (
                <a
                  key={social.id}
                  href={social.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-x-2 p-4 bg-almond-cookie dark:bg-dark-purple rounded-lg hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300 cursor-pointer w-45"
                >
                  {social.icon}
                  <span className="text-lg">{social.name}</span>
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
