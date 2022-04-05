import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../../redux/authRedux";
import { login, register } from "../../redux/authCrud";
import userDetails from "../userDetails";
import Button from 'react-bootstrap/Button'
function Login(props) {
  const { intl } = props;

  const initialValues = {
    email: "admin@gmail.com",
    password: "admin",
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    show_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    } else {
      x.type = "password";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    }
  }

  const formik = useFormik({
    initialValues,
    // validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      // enableLoading();
      try {
        authenticateUser(setStatus, setSubmitting, values);
      } catch (err) {
        setStatus("Oops something went wrong! Please try refreshing the page");
      }
    },
  });

  async function authenticateUser(setStatus, setSubmitting, values) {
    //userDetails.splice(0, userDetails.length);
    login(values.email, values.password).then(({ data: { email } }) => {
      props.login(email);
    });
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <div className="input-group">
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              {...formik.getFieldProps("password")}
            />{" "}
            &nbsp;
            
          </div>

          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div>
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Forgot Password
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            
          >
            <span>Sign In</span>
            {/* {loading && <span className="ml-3 spinner spinner-white"></span>} */}
          </button>
        </div>
        <p className="g-my-15 g-font-size-13">Or sign in with:Google</p>
      </form>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
