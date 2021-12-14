const Header = () => {
  function handleLogout() {
    localStorage.removeItem("myData");
    window.location.reload();
  }

  return (
    <header>
      <label htmlFor="check">
        <i className="fas fa-bars" id="sidebar_btn"></i>
      </label>
      <div className="left-area">
        <h3>
          Admin <span>OKTEAM</span>
        </h3>
      </div>
      {localStorage.getItem("myData") && (
        <div className="right-area">
          <b
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
            className="logout_btn"
          >
            Logout
          </b>
        </div>
      )}
    </header>
  );
};
export default Header;
