import { FourSquare, ThreeDot } from "react-loading-indicators";

function Loading() {
  return (
    <div className="col-span-full flex justify-center items-center">
      <FourSquare
        color={["#ecc779", "#a87e4e", "#463758", "#b4a2d0"]}
        easing="ease-in"
        size="large"
        text="Conte School"
        textColor="#a87e4e"
      />
    </div>
  );
}

export default Loading;

export function Loader() {
  return (
    <ThreeDot
      color={["#ecc779", "#a87e4e", "#463758", "#b4a2d0"]}
      easing="ease-in"
      size="small"
    />
  );
}
