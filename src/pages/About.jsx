import { HiOutlineUsers } from "react-icons/hi2";

function About() {
  return (
    <div className="container">
      <div className="my-10 mx-4">
        <div className="flex items-center gap-x-2">
          <HiOutlineUsers className="w-7 h-7" />
          <p className="text-lg">درباره ما</p>
        </div>
      </div>
    </div>
  );
}

export default About;
