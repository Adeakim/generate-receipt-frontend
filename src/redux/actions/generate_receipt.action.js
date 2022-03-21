import { GENERATE_RECEIPT_FAILED, GENERATE_RECEIPT_SUCCESS } from "../actions/types";
import { retrieveErrMessage } from "../../utils/helper";
import request from "../../request";
import {headers }from "../../request";
import { toast } from "react-toastify";


const generateReceiptSuccess = (payload) => ({
  type: GENERATE_RECEIPT_SUCCESS,
  payload,
});

const generateReceiptFailed = (payload) => ({
  type: GENERATE_RECEIPT_FAILED,
  payload,
});
const generateReceipt = (payload) => async (dispatch) => {
  const token = localStorage.getItem('token')
  try {
      
      console.log("token",token)
      const res = await request.post("/generate-receipt/",payload,headers(token));
      console.log("token",res)
      toast.success("Receipt generated successfully");
      // setTimeout(()=> { window.location = "/generate-receipt/" }, 2000);
      return dispatch(generateReceiptSuccess(res));
  } catch (error) {
      const err = retrieveErrMessage(error);
      const e = Object.values(err.errors)[0];
      toast.error(e)
      return dispatch(generateReceiptFailed(err));
  }
};

export default generateReceipt;

