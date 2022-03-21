// import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_BASE_URL

// export default axios.create({
//   baseURL: BASE_URL
// });


// export const headers = (token) => {
//   return {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     }
//   }
// }

import axios from 'axios';

export default axios.create({
  baseURL: "https://receipt-generator-api.herokuapp.com/api/v1/"
});

export const headers = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
};
