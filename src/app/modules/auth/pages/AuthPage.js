import React, { useState, useEffect } from "react";
import { Link, Switch, Redirect, Route } from "react-router-dom";
import Login from "./Login";
export function AuthPage() {
  return (
    <>
      <div>
        Welcome To Gif Story Landing Page
        <Switch>
          <Route path="/auth/login" component={Login} />
          <Redirect from="/auth" exact={true} to="/auth/login" />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </>
  );
}
