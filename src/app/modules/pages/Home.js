import React from "react";
import {  injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as auth from "../redux/authRedux";
import Dashboard from "./Dashboard";
import { Footer } from "./footer/Footer";
function Home(){

    return(<>
    <Dashboard/>
    <Footer/>
    </>)
}

export default injectIntl(connect(null, auth.actions)(Home));