import { FourSquare } from "react-loading-indicators";

function Loading() {
  return (
    <div className="col-span-full flex justify-center items-center">
      <FourSquare
        color={["#1e7b1e", "#28a428", "#32cd32", "#5bd75b"]}
        easing="ease-in"
        size="large"
        text="Conte School"
      />
    </div>
  );
}

export default Loading;
