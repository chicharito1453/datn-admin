import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./layouts/Content";
import Header from "./layouts/Header";
import NavMobile from "./layouts/NavMobile";
import Sidebar from "./layouts/Sidebar";
import "./App.scss";

function App() {
  useEffect(() => {
    document.querySelector(".content").style.height =
      window.innerHeight - 60 + "px";
  }, []);

  return (
    <Router>
      <input type="checkbox" id="check" />
      <Header />
      <NavMobile />
      <Sidebar />
      <Content />
    </Router>
  );
}

export default App;
