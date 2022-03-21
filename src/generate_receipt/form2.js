import React from 'react'
import { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from 'formik';
import { toast,ToastContainer } from "react-toastify";

// import { Paragraph } from '../../components/typography'
// import Button from '../../components/button'
// import Logo from '../../components/logo'

// import { ErrorMsg, div, div } from "./TextField"
// import { FormContainer, HeaderContainer } from './style'
import validate from "./validate";
import ErrorMsg from './errorMessage'
// import { generateReceipt } from '../../redux/actions/blogActions/blogAction';
import generateReceipt from '../redux/actions/generate_receipt.action';


const GenerateReceiptForm = ({generateReceiptData, generateReceipt}) => {
    useEffect(() => {}, [generateReceiptData]);

    return (
        <div >
            {/* <HeaderContainer>
                <Logo />
                <Paragraph size="18" children="Create a blog post"/>
            </HeaderContainer> */}
            <Formik
                initialValues={{
                    name: "",
                    address: "",
                    mobile_number: "",
                    total_amount_payable: ""
                }}
                validationSchema={validate}
                onSubmit={async (values, {resetForm, setSubmitting}) => {
                    const token = localStorage.getItem('token')
                    
                    if (!token) {
                        toast.error("Please Login");
                        setTimeout(()=> { window.location = "/login" }, 3000);
                    }
                    // const ImageInput = document.querySelector("#coverImage")
                    let data = new FormData()
                    data.append("name", values.name)
                    data.append("address", values.address)
                    data.append("mobile_number", values.mobile_number)
                    data.append("total_amount_payable", values.total_amount_payable)

                    // if (navigator.onLine){
                    //     await generateReceipt(data);
                    //     resetForm()
                    //     setSubmitting(false)
                    // } else {
                    //     toast.warning("Please check your internet");
                    // }

                }}
            >
            
                    { ({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, touched, isValid, dirty, isSubmitting }) => (
                        <div>
                        
                        <Form onSubmit={handleSubmit}>
                            <ToastContainer style={{ zIndex: "10" }} position="bottom-right" />
                            <div>
                                <input
                                placeholder="Name" 
                                name="name" 
                                type="text" 
                                value={values.name} 
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                            </div>
                            <ErrorMsg>
                            { touched.name && errors.name ?
                            (errors.name):null }</ErrorMsg>

                            <div>
                                <input 
                                placeholder="Address" 
                                name="address" 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                type="text"/>
                            </div>
                            <ErrorMsg>
                            { touched.address && errors.address ?
                            (errors.address):null }</ErrorMsg>

                            <div>
                                <input
                                placeholder="Mobile Number" 
                                name="mobile_number" 
                                type="text"
                                required
                                value={values.mobile_number}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                />
                            </div>
                            <ErrorMsg>
                            { touched.mobile_number && errors.mobile_number ?
                            (errors.mobile_number):null }</ErrorMsg>

                            <div>
                                <input
                                placeholder="Total Amount Payable" 
                                name="total_amount_payable" 
                                value={values.total_amount_payable}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                            </div>
                            <ErrorMsg>
                            { touched.total_amount_payable && errors.total_amount_payable ?
                            (errors.total_amount_payable):null }</ErrorMsg>

                            <button 
                            type="submit" 
                            // disabled={!(dirty && isValid) || isSubmitting}
                            >  Generate Receipt </button>
                        </Form>
                        </div> 
                    )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (store) => ({
    generateReceiptData: store.generateReceipt,
});

export default connect(mapStateToProps, { generateReceipt })(GenerateReceiptForm);
