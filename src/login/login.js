import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";

import LoginSchema from "./validation";
import login from "../redux/actions/auth/login.action";
import "../signup/signup.css"



const initialValues = { email: "", password: "" };

const Login = ({ loginData, login, currentUser, history }) => {

  const isAuthenticated = (loginRes, isLogin, currentUser) => {
    if (isLogin && loginRes.message === "success") {
      toast.success("Login Successful");
    setInterval(function () {
      window.location="/generate-receipt";
    }, 2500)
    } else if (isLogin && loginRes.message === "failure") {
      const err = Object.values(loginRes.errors);
      toast.error(err[0]);
    } else {
      return null;
    }
  };

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {}, [loginData, currentUser]);

  return (
    <div>
    
      <div>
        <div>
          {/* <form> */}
            <div className="form-wrapper">

              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                  setIsLogin(false);
                  await login(values);
                  setIsLogin(true);
                }}
              >
                {({ values, errors, handleChange, handleSubmit, touched }) => (
                  <form onSubmit={handleSubmit} className="container">
                    <ToastContainer />
                    <h2>Sign in to your account to continue</h2>

                    <div>
                      <label>Email</label>
                      <input
                        placeholder="email"
                        type={"email"}
                        name="email"
                        value={values.email}
                        id="email"
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div>
                      { touched.email && errors.email ?(errors.email):null }
                    </div>
                    <div>
                    <label>Password</label>
                      <input
                        placeholder="password"
                        type={"password"}
                        name="password"
                        value={values.password}
                        id="password"
                        onChange={handleChange}
                        className="input"
                      />
                     
                    <div>
                      { touched.password && errors.password ?(errors.password):null }
                    </div>
                    </div>
                    <p className="flex-end">
                      Don't Have an Account? <Link to="/"> Sign Up</Link>
                    </p>

                      <button type="submit">
                        {loginData.loading ? (
                          <ClipLoader loading={loginData.loading} />
                        ) : (
                          "Login"
                        )}
                      </button>
                  </form>
                )}
              </Formik>
            </div>
            {isAuthenticated(loginData, isLogin, currentUser)}
         
        </div>
      </div>

      <div className="footer-container">
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  loginData: store.login
});

export default connect(mapStateToProps, { login })(Login);
