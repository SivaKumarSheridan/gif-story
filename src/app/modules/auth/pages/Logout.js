import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutSplashScreen } from "../../../GifStorySplashScreen";
import * as auth from "../../redux/authRedux";
import firebase from "../../../firebase/firebase";
class Logout extends Component {
  componentDidMount() {
    firebase.auth.signOut().then((response) => {
       this.props.logout();
    });
  }

  render() {
    const { hasAuthToken } = this.props;
    return hasAuthToken ? (
      <LayoutSplashScreen />
    ) : (
      <Redirect to="/auth/login" />
    );
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout);
