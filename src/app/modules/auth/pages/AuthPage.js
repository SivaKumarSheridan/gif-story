import React from "react";
import {  Switch, Redirect, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Home from "../../pages/Home";

export function AuthPage() {
  return (
    <>
      <div>
        
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/signup" component={Signup} />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
          <Redirect from="/" exact={true} to="/home" />
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
}
