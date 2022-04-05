import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { LayoutSplashScreen } from "./GifStorySplashScreen";

const Dashboard = lazy(() =>
  import("./modules/pages/Dashboard")
);

const Fav = lazy(()=>
import("./modules/pages/fav/Fav")
);

export default function BasePage() {
  const user = useSelector((state) => state.auth.user, shallowEqual);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/myfav" component={Fav} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
