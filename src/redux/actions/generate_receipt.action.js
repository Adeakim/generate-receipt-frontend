import { GENERATE_RECEIPT_FAILED, GENERATE_RECEIPT_SUCCESS } from "../actions/types";
import { retrieveErrMessage } from "../../utils/helper";
import request from "../../request";
import headers from "../../request";
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
  try {
      const token = localStorage.getItem('token')
      const res = await request.post("http://127.0.0.1:8000/api/v1/generate-receipt", payload, headers(token));
      toast.success("Post added successful");
      // setTimeout(()=> { window.location = "http://127.0.0.1:8000/api/v1/generate-receipt/" }, 2000);
      return dispatch(generateReceiptSuccess(res));
  } catch (error) {
      const err = retrieveErrMessage(error);
      const e = Object.values(err.errors)[0];
      toast.error(e[0])
      return dispatch(generateReceiptFailed(err));
  }
};

// const GenerateReceipt = (payload) => async (dispatch) => {
// const token = localStorage.getItem('token');
//   try {
//     const res = await request.post("https://receipt-generator-api.herokuapp.com/api/v1/generate-receipt/", payload, headers(token));
//     console.log(res)
//     return dispatch(GenerateReceiptSuccess(res));
//   } catch (error) {
//     const err = retrieveErrMessage(error);
//     return dispatch(GenerateReceiptFailed(err));
//   }
// };

export default generateReceipt;

// import { ActionTypes } from "../../actions/blogActions/blogActionType";
// import { retrieveErrMessage } from "../../../utils/helper";
// import request, { headers } from "../../../request";
// import { toast } from "react-toastify";

// export const setBlog = (blogs) => {
//   return {
//     type: ActionTypes.SHOW_BLOGS,
//     payload: blogs,
//   };
// };

// export const blogDetail = (blog) => {
//   return {
//     type: ActionTypes.BLOG_DETAIL,
//     payload: blog,
//   };
// };

// export const blogComments = (comments) => {
//   return {
//     type: ActionTypes.BLOG_COMMENTS,
//     payload: comments,
//   };
// };


// export const removeSelectedBlog = () => {
//   return {
//     type: ActionTypes.REMOVE_SELECTED_BLOG,
//   };
// };

// export const postBlogSuccess = (payload) => ({
//   type: ActionTypes.POST_BLOG_SUCCESS,
//   payload,
// });

// export const postBlogFailed = (payload) => ({
//   type: ActionTypes.POST_BLOG_FAILED,
//   payload,
// });

// const generateReceipt = (payload) => async (dispatch) => {
//   try {
//       const token = localStorage.getItem('token')
//       const res = await request.post("/blogs/", payload, headers(token));
//       toast.success("Post added successful");
//       setTimeout(()=> { window.location = "/blogs" }, 2000);
//       return dispatch(postBlogSuccess(res));
//   } catch (error) {
//       const err = retrieveErrMessage(error);
//       const e = Object.values(err.errors)[0];
//       toast.error(e[0])
//       return dispatch(postBlogFailed(err));
//   }
// };

// export default generateReceipt