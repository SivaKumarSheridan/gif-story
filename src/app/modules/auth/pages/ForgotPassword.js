import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as Yup from "yup";
import * as auth from "../../redux/authRedux";
import "./Login.css";
import { Container, Alert } from "react-bootstrap";
import firebase from "../../../firebase/firebase";

function ForgotPassword(props) {
  const initialValues = {
    email: "",
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      firebase.auth
        .sendPasswordResetEmail(values.email)
        .then((response) => {
          setStatus("Password Reset Link sent to the registered email");
          setSubmitting(false);
        })
        .catch((error) => {
          setStatus(error.message);
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="login-body">
      <Container>
        <h1 className="login-title">Forgotten Password ?</h1>
        <p style={{ textAlign: "center", color: "#DFDFDF" }}>
          Enter your email to reset your password
        </p>
        <form onSubmit={formik.handleSubmit} className="login-form">
          {formik.status ? (
            <Alert
              variant="danger"
              onClose={() => formik.setStatus("")}
              dismissible
            >
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
                <span>Reset Password</span>
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
