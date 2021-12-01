import Menu from "../components/Menu";
import { getFromLS } from "../utils/localStorage/localStorage";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile_info">
        {!getFromLS("myData") || (
          <img
            src={getFromLS("myData").image || "/assets/img/avatar.png"}
            className="profile_image"
            alt=""
          />
        )}
        <h4>
          {getFromLS("myData")
            ? getFromLS("myData").username
            : "Vui lòng đăng nhập!"}
        </h4>
      </div>
      <Menu />
    </div>
  );
};
export default Sidebar;
