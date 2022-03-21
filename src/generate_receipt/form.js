import { Formik } from "formik";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ErrorMsg from "./errorMessage";
import generateReceipt from "../redux/actions/generate_receipt.action";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import "../signup/signup.css"



const GenerateReceiptForm = ({
  generateReceipt,
  generateReceiptData,
}) => {
  const getgenerateReceiptData = (generateReceiptData, loading) => {
    if (loading && generateReceiptData.message === "success") {
      var check = document.getElementById("check");
      
      if (check) {
        check.style.display = "";
      }
      return;
    } else if (loading && generateReceiptData.message === "failure") {
      const err = Object.values(generateReceiptData.errors)[0];
      toast.error(err[0]);
      setLoading(false)
      window.location.reload(true)
      return;
    } else {
      return null;
    }
  };

  const GeneratedPdf=()=>{
    return(
    <div>
      {
         generateReceiptData && generateReceiptData.data.pdf_url.map((pdf,index)=>{
          
             return(
               <div key={index}> <a href={pdf} target="_blank" rel="noopener noreferrer">{pdf}</a></div>
              
             )
           })
      }
    </div>
    )}
  let [loading, setLoading] = useState(false);
  console.log("from page",generateReceiptData.data)
  useEffect(() => {}, [generateReceiptData]);

  const BtnLabel = loading === false ? "Generate Receipt" : "";
  const token = localStorage.getItem('token')
  return (
    <div>
      <div className="cont">
        <Formik
          initialValues={{
            name: "",
            address: "",
            mobile_number: "",
            total_amount_payable: "",
            message: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            await generateReceipt(values,token);
            setLoading(false);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="receipt-container">
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
                <ErrorMsg>{errors.name}</ErrorMsg>
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
                <ErrorMsg>{errors.mobile_number}</ErrorMsg>
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  onChange={handleChange}
                  required
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
                  required
                  onChange={handleChange}
                  name="total_amount_payable"
                  value={values.total_amount_payable}
                  placeholder="Total Amount Payable"
                />
              </div>
              <button type="submit">
                {" "}
                {BtnLabel}
                <ClipLoader loading={loading} size={20} />
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div>
        {generateReceiptData.message === "success"? <GeneratedPdf/>:<div>Not found</div>}
      </div>
      {getgenerateReceiptData(generateReceiptData, loading)}
      
    </div>
  );
};

const mapStateToProps = (store) => ({
  generateReceiptData: store.generateReceipt,
  // token: store.login.token,
});

export default connect(mapStateToProps, { generateReceipt })(
  GenerateReceiptForm
);
