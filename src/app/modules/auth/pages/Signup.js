import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as Yup from "yup";
import * as auth from "../../redux/authRedux";
import "./Login.css";
import { Container, Alert } from "react-bootstrap";
import firebase from "../../../firebase/firebase";

function Signup(props) {
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
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
    validationSchema: SignupSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      try {
        registerUser(setStatus, setSubmitting, values);
      } catch (err) {
        setStatus("Oops something went wrong! Please try refreshing the page");
      }
    },
  });

  async function registerUser(setStatus, setSubmitting, values) {
    firebase
      .signupUser(values.email, values.password, values.name)
      .then((response) => {
        console.log(response);
        //navigate to login page
        history.push("/auth/login");
      })
      .catch((error) => {
        //setStatus(error.message)
        console.log(error);
      });
    setSubmitting(false);
    formik.resetForm();
  }

  return (
    <div className="login-body">
      <Container>
        <h1 className="login-title">Sign up to your Gif Story</h1>
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
          <div className="">
            <input
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              {...formik.getFieldProps("name")}
            />{" "}
            &nbsp;
          </div>
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
            <p>
              Already have an account?{" "}
              <Link to="/auth/login">
                {" "}
                <u style={{ color: "#FFC300" }}>Log in</u>
              </Link>
            </p>

            <div className="login-btn-container">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="login-btn"
              >
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Signup));
