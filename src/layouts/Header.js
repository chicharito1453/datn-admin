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
      <div className="right-area">
        <a href="/a" className="logout_btn">
          Logout
        </a>
      </div>
    </header>
  );
};
export default Header;
