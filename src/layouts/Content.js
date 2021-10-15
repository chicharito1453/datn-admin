import routes from "../routes/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Content = () => {
  return (
    <Router>
      <div className="content">
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
      </div>
    </Router>
  );
};
export default Content;
