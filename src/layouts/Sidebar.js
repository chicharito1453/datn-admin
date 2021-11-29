import Menu from "../components/Menu";
import { getFromLocalStorage } from "../utils/localStorage/localStorage";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile_info">
        {!getFromLocalStorage("myData") || (
          <img
            src={
              getFromLocalStorage("myData").image || "/assets/img/avatar.png"
            }
            className="profile_image"
            alt=""
          />
        )}
        <h4>
          {getFromLocalStorage("myData")
            ? getFromLocalStorage("myData").username
            : "Vui lòng đăng nhập!"}
        </h4>
      </div>
      <Menu />
    </div>
  );
};
export default Sidebar;
