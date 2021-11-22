import routes from "../routes/routes";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const Content = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  return (
    <div className="content">
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={route.main}
            />
          ))}
        </Routes>
      )}
    </div>
  );
};
export default Content;
