import { Formik } from "formik";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ErrorMsg from "./errorMessage";
import validate from "./validate";
import signup from "../redux/actions/auth/signup.action";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
// import "./signup.css"
import "./signup.css"

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
    <div className="cont">
      <div >
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
            <form onSubmit={handleSubmit} id="cont">
              <ToastContainer style={{ zIndex: "10" }} position="bottom-left" />
              <div>
                <label>Name</label>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Full Name"
                required
                value={values.name}
                onBlur={handleBlur}
              />
              </div>
              <div>
              <label>Email</label>
              <input
                type="email"
                onChange={handleChange}
                value={values.email}
                name="email"
                required
                placeholder="Email Address"
              />
              <ErrorMsg>{errors.email}</ErrorMsg>
              </div>
              <div>
              <label>Mobile Number</label>
              <input
                type="text"
                onChange={handleChange}
                required
                name="mobile_number"
                value={values.mobile_number}
                placeholder="Mobile Number"
              />
               </div>
               <div>
               <label>Address</label>
               <input
                type="text"
                onChange={handleChange}
                name="address"
                required
                value={values.address}
                placeholder="Address"
              />
              </div>
              <div>
              <label>Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                required
                value={values.password}
                placeholder="Password"
              />
              <ErrorMsg>{errors.password}</ErrorMsg>
              </div>
              <div>
              <label>Confirm Password</label>
              <input
                type="password"
                onChange={handleChange}
                required
                name="confirm_password"
                value={values.confirm_password}
                placeholder="Confirm Password"
              />
              </div>
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
