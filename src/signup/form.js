import { Formik } from "formik";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ErrorMsg from "./errorMessage";
import validate from "./validate";
import signup from "../redux/actions/auth/signup.action";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";

// import input from "./input";

const FormDiv = ({ signup, signupData }) => {
  const getSignUpData = (signupData, loading) => {
    if (loading && signupData.message === "success") {
      var check = document.getElementById("check");
      if (check) {
        check.style.display = "";
      }
      toast.success("Sign up successful");
      return;
    } else if (loading && signupData.message === "failure") {
      const err = Object.values(signupData.errors)[0];
      toast.error(err[0]);
      return;
    } else {
      return null;
    }
  };
  let [loading, setLoading] = useState(false);
  useEffect(() => {}, [signupData]);

  const BtnLabel = loading === false ? "Sign Up" : "";

  return (
    <div>
      <div className="cont">
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile_number: "",
            password: "",
            message: "",
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            setLoading(true);
            await signup(values);
            setLoading(false);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ToastContainer style={{ zIndex: "10" }} position="bottom-left" />
              <input
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Full Name"
                value={values.name}
                onBlur={handleBlur}
              />
              <ErrorMsg>{errors.name}</ErrorMsg>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="Email Address"
              />
              <ErrorMsg>{errors.email}</ErrorMsg>
              <input
                type="text"
                onChange={handleChange}
                name="mobile_number"
                value={values.mobile_number}
                placeholder="Mobile Number"
              />
               <ErrorMsg>{errors.mobile_number}</ErrorMsg>
               <input
                type="text"
                onChange={handleChange}
                name="address"
                value={values.address}
                placeholder="Address"
              />
              <ErrorMsg>{errors.address}</ErrorMsg>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={values.password}
                placeholder="Password"
              />
              <ErrorMsg>{errors.password}</ErrorMsg>
             
              {/* <ErrorMsg>{errors.password}</ErrorMsg> */}
              <input
                type="confirm_password"
                onChange={handleChange}
                name="confirm_password"
                value={values.confirm_password}
                placeholder="Confirm Password"
              />
              <ErrorMsg>{errors.password}</ErrorMsg>
              <p center="flex-end">
                Already have an account? &nbsp; <a href="/login">Login</a>{" "}
              </p>
              <button type="submit">
                {" "}
                {BtnLabel}
                <ClipLoader loading={loading} size={20} />
              </button>
            </form>
          )}
        </Formik>
      </div>
      {getSignUpData(signupData, loading)}
    </div>
  );
};

const mapStateToProps = (store) => ({
  signupData: store.signup,
});

export default connect(mapStateToProps, { signup })(FormDiv);
