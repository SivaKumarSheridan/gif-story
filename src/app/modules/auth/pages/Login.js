import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";
import {injectIntl } from "react-intl";
import * as auth from "../../redux/authRedux";
import { login } from "../../redux/authCrud";
import { Container } from "react-bootstrap";
import "./Login.css"
function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
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
      <div className="login-body">
      <Container>
        <h1 className="login-title">Log in to your Portfolio</h1>
        <form onSubmit={formik.handleSubmit} className="login-form">
          {formik.status ? (
            <Alert
              variant="danger"
              onClose={() => formik.setStatus("")}
              dismissible
            >
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{formik.status}</p>
            </Alert>
          ) : null}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Email"
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message-container">
                <div className="error-message">{formik.errors.email}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              {...formik.getFieldProps("password")}
            />{" "}
            &nbsp;
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message-container">
                <div className="error-message" style={{ marginTop: "-20px" }}>
                  {formik.errors.password}
                </div>
              </div>
            ) : null}
          </div>
          <div>
            
            <div className="login-btn-container">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="login-btn"
              >
                <span>Sign In</span>
                {loading && (
                  <Spinner animation="border" style={{ marginLeft: "20px" }} />
                )}
              </button>
            </div>
          </div>
          
        </form>
      </Container>
    </div>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
