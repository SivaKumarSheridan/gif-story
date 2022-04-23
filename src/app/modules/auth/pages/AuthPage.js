import React, { useState, useEffect } from "react";
import { Link, Switch, Redirect, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard.js";
import About from "../../pages/about/About.js";
import Contact from "../../pages/contact/Contact.js";

import Login from "./Login";
export function AuthPage() {
  return (
    <>
      <div>
        
        <Switch>
        <Route path="/home" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/work" component={Dashboard} />
        <Route path="/auth/login" component={Login} />
          <Redirect from="/" exact={true} to="/home" />
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
}
