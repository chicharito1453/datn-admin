import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <div className="wraper">
      <div className="body">
        <div className="sky"></div>
        <div className="star star0"></div>
        <div className="star star1"></div>
        <div className="star star2"></div>
        <div className="star star3"></div>
        <div className="star star4"></div>
        <div className="star star5"></div>
        <div className="star star6"></div>
        <div className="star star7"></div>
        <div className="star star8"></div>
        <div className="star star9"></div>
        <div className="star star10"></div>
        <div className="star star11"></div>
        <div className="star star12"></div>
        <div className="star star13"></div>
        <div className="star star14"></div>
        <div className="star star15"></div>
        <div className="star star16"></div>
        <div className="star star17"></div>
        <div className="star star18"></div>
        <div className="star star19"></div>
        <div className="shootingstar shootingstar0"></div>
        <div className="shootingstar shootingstar1"></div>
        <div className="shootingstar shootingstar2"></div>
        <div className="sun">
          <div className="inner"></div>
        </div>
        <div className="fuji">
          <div className="snowcap"></div>
        </div>
        <div className="cloud cloud0"></div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>
        <div className="cloud cloud5"></div>
        <div className="cloud cloud6"></div>
        <div className="cloud cloud7"></div>
        <div className="cloud cloud8"></div>
        <div className="cloud cloud9"></div>
        <div className="cloud cloud10"></div>
        <div className="cloud cloud11"></div>
        <div className="cloud cloud12"></div>
        <div className="cloud cloud13"></div>
        <div className="cloud cloud14"></div>
        <div className="cloud cloud15"></div>
        <div className="cloud cloud16"></div>
        <div className="cloud cloud17"></div>
        <div className="cloud cloud18"></div>
        <div className="cloud cloud19"></div>
        <div className="greeting">
          Chúc bạn làm việc tốt ! <i class="fas fa-fist-raised"></i>
          <span>--Dropshopping web--</span>
        </div>
      </div>
    </div>
  );
};
export default Home;
