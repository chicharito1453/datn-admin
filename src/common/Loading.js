import Lottie from "react-lottie";
import * as waiting from "./waiting.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: waiting.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = () => {
  return (
    <div className="wraper-loading">
      <div className="loading-screen">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};
export default Loading;
