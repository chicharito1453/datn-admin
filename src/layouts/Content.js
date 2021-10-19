import routes from "../routes/routes";
import Loading from "../common/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Content = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  return (
    <Router>
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        )}
      </div>
    </Router>
  );
};
export default Content;
