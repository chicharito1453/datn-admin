import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes/routes";
import Loading from "../components/Loading";
import Login from "../views/login/Login";

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
        <Switch>
          <Route path="/login" exact={true} component={() => <Login />} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={() => {
                return localStorage.getItem("myData") ? (
                  route.main
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { next: route.path } }}
                  />
                );
              }}
            />
          ))}
        </Switch>
      )}
    </div>
  );
};
export default Content;
