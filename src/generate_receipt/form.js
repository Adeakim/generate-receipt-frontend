import { Formik } from "formik";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ErrorMsg from "./errorMessage";
import validate from "./validate";
import generateReceipt from "../redux/actions/generate_receipt.action";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";


const GenerateReceiptForm = ({ generateReceipt,token, generateReceiptData }) => {
  const getgenerateReceiptData = (generateReceiptData, loading) => {
    if (loading && generateReceiptData.message === "success") {
      var check = document.getElementById("check");
      if (check) {
        check.style.display = "";
      }
      toast.success("receipt generated successful");
      return;
    } else if (loading && generateReceiptData.message === "failure") {
      const err = Object.values(generateReceiptData.errors)[0];
      toast.error(err[0]);
      return;
    } else {
      return null;
    }
  };
  let [loading, setLoading] = useState(false);
  useEffect(() => {}, [generateReceiptData]);

  const BtnLabel = loading === false ? "Sign Up" : "";

  return (
    <div>
      <div className="cont">
        <Formik
          initialValues={{
            name: "",
            address: "",
            mobile_number: "",
            total_amount_payable: "",
            // message: "",
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            setLoading(true);
            await generateReceipt(values);
            setLoading(false);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ToastContainer style={{ zIndex: "10" }} position="bottom-left" />
              <div>
                <label>Name</label>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Full Name"
                value={values.name}
                onBlur={handleBlur}
              />
              <ErrorMsg>{errors.name}</ErrorMsg>
              </div>
              <div>
              <label>Mobile Number</label>
              <input
                type="text"
                onChange={handleChange}
                name="mobile_number"
                value={values.mobile_number}
                placeholder="Mobile Number"
              />
               <ErrorMsg>{errors.mobile_number}</ErrorMsg>
               </div>
               <div>
               <label>Address</label>
               <input
                type="text"
                onChange={handleChange}
                name="address"
                value={values.address}
                placeholder="Address"
              />
              <ErrorMsg>{errors.address}</ErrorMsg>
              </div>
              <div>
              <label>Total Amount Payable</label>
              <input
                type="text"
                onChange={handleChange}
                name="total_amount_payable"
                value={values.total_amount_payable}
                placeholder="Total Amount Payable"
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
      {getgenerateReceiptData(generateReceiptData, loading)}
    </div>
  );
};

const mapStateToProps = (store) => ({
  generateReceiptData: store.generateReceipt,
  token: store.login.token,
});

export default connect(mapStateToProps, { generateReceipt })(GenerateReceiptForm);
