import { Outlet } from "react-router-dom";

function PagesLayout() {
  return (
    <div className="bg-linen max-w-screen p-5 font-iranian-sans">
      <div className="bg-whitesmoke rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default PagesLayout;
