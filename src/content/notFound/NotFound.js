const NotFound = () => {
  return (
    <div className="container">
      <div className="containerGhost">
        <div id="background"></div>
        <div className="top">
          <h1>404</h1>
          <h3>page not found</h3>
        </div>
        <div className="containerGhost">
          <div className="ghost-copy">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
          </div>
          <div className="ghost">
            <div className="face">
              <div className="eye"></div>
              <div className="eye-right"></div>
              <div className="mouth"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
