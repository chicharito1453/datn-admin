import Lottie from "react-lottie-player";
import * as waiting from "./waiting.json";

const Loading = () => {
  return (
    <div className="wraper-loading">
      <div className="loading-screen">
        <Lottie loop animationData={waiting} play />
      </div>
    </div>
  );
};
export default Loading;
