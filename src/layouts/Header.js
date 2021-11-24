import { memo } from "react";

const Header = () => {
  return (
    <header>
      <label htmlFor="check">
        <i className="fas fa-bars" id="sidebar_btn"></i>
      </label>
      <div className="left-area">
        <h3>
          Admin <span>Management</span>
        </h3>
      </div>
      {localStorage.getItem("myData") && (
        <div className="right-area">
          <a href="/a" className="logout_btn">
            Logout
          </a>
        </div>
      )}
    </header>
  );
};
export default memo(Header);
