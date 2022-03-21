import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";

import LoginSchema from "./validation";
import login from "../redux/actions/auth/login.action";



const initialValues = { email: "", password: "" };

const Login = ({ loginData, login, currentUser, history }) => {

  const isAuthenticated = (loginRes, isLogin, currentUser) => {
    if (isLogin && loginRes.message === "success") {
      // success(history, currentUser);
      toast.success("Login Successful");
      // history.push('/learn');
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
      <div className="nav-container">
      </div>
      <div className="container">
        <div>
          {/* <form> */}
            <div className="form-wrapper">

              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                  setIsLogin(false);
                  await login(values);
                  // const token = localStorage.getItem('token')
                  // await fetchUser(token)
                  setIsLogin(true);
                }}
              >
                {({ values, errors, handleChange, handleSubmit, touched }) => (
                  <form onSubmit={handleSubmit} className="form">
                    <ToastContainer />
                    <h2>Sign in to your account to continue</h2>

                    {/* <CompressInputField> */}
                    <div>
                      <input
                        placeholder="email"
                        type={"email"}
                        name="email"
                        value={values.email}
                        id="email"
                        onChange={handleChange}
                        className="input"
                      />
                    {/* </CompressInputField> */}
                    </div>
                    <div>
                      { touched.email && errors.email ?(errors.email):null }
                    </div>
                    <div>
                    {/* <CompressInputField> */}
                      <input
                        placeholder="password"
                        type={"password"}
                        name="password"
                        value={values.password}
                        id="password"
                        onChange={handleChange}
                        className="input"
                      />
                     
                    {/* </CompressInputField> */}
                    <div>
                      { touched.password && errors.password ?(errors.password):null }
                    </div>
                    </div>
                    <p className="flex-end">
                      Don't Have an Account? <Link to="/signup"> Sign Up</Link>
                    </p>

                    {/* <Position÷Button> */}
                      <button type="submit">
                        {loginData.loading ? (
                          <ClipLoader loading={loginData.loading} />
                        ) : (
                          "Login"
                        )}
                      </button>
                    {/* </Position÷Button> */}
                  </form>
                )}
              </Formik>
            </div>
            {isAuthenticated(loginData, isLogin, currentUser)}
          {/* </form> */}
          {/* <ImageDiv /> */}
        </div>
      </div>

      <div className="footer-container">
        {/* <Footer /> */}
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  loginData: store.login
});

export default connect(mapStateToProps, { login })(Login);
