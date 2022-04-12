import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as Yup from "yup";
import * as auth from "../../redux/authRedux";
import "./Login.css";
import { login } from "../../redux/authCrud";
import userDetails from "../userDetails";
import { Row, Col, Container, Alert, Spinner } from "react-bootstrap";
import firebase from "../../../firebase/firebase";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        authenticateUser(setStatus, setSubmitting, values).catch((error) => {
          setStatus(error.message);
        });
      } catch (err) {
        setStatus(err.message);
        setLoading(false);
        setSubmitting(false)
      }
    },
  });

  async function authenticateUser(setStatus, setSubmitting, values) {
    login(values.email, values.password)
      .then(({ data: { email } }) => {
        props.login(email);
      })
      .catch((error) => {
        setStatus(error.message);
        setLoading(false);
        setSubmitting(false)
      });
  }

  async function loginWithGoogle() {
    setGoogleLoading(true);
    firebase
      .socialLogin()
      .then((response) => {
        userDetails.push({
          id: response.user.uid,
          username: response.user.displayName,
          email: response.user.email,
        });
        setGoogleLoading(false);
        props.login(response.user.email);
      })
      .catch((error) => {
        formik.setStatus(error.message);
        setGoogleLoading(false);
      });
  }

  return (
    <div className="login-body">
      <Container>
        <h1 className="login-title">Log in to your Gif Story</h1>
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
            <Row>
              <Col md="auto">
                <Link
                  to="/auth/forgot-password"
                  className="text-dark-50 text-hover-primary my-3 mr-2"
                  id="kt_login_forgot"
                >
                  <u style={{ color: "white" }}>Forgot Password ?</u>
                </Link>
              </Col>
              <Col md="auto">
                <span>
                  Don't have an account?{" "}
                  <Link to="/auth/signup">
                    {" "}
                    <u style={{ color: "#FFC300" }}>Sign Up</u>
                  </Link>
                </span>
              </Col>
            </Row>

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
          <p style={{ textAlign: "center", marginTop: "10px" }}>Or</p>
          <div className="login-btn-container">
            <button
              type="button"
              className="google-login-btn"
              onClick={loginWithGoogle}
            >
              <span>Sign in with Google</span>
              {googleLoading && (
                <Spinner animation="border" style={{ marginLeft: "20px" }} />
              )}
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
