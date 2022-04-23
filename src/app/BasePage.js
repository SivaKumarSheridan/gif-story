import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { LayoutSplashScreen } from "./GifStorySplashScreen";

const Dashboard = lazy(() =>
  import("./modules/pages/Dashboard")
);


const About = lazy(() =>
  import("./modules/pages/about/About")
);


const Contact = lazy(() =>
  import("./modules/pages/contact/Contact")
);


export default function BasePage() {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={Dashboard} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
