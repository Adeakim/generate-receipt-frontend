import { Suspense } from 'react'
import { Routes ,Route } from 'react-router-dom';
import MyLoader from '../../utils/loader';

// import Login from '../../pages/login/login';
// import SignUp from '../../signup/form';
import SignUp from '../../signup';
import Login from "../../login/login"

import PrivateRoute from '../protectedRoute';
import GenerateReceipt from '../../generate_receipt/GenerateReceipt';

// import React from 'react'

// function SignUp() {
//   return (
//     <div>
//      <h1>welcome</h1> 
//     </div>
//   )
// }



const App = () => (
  <Suspense fallback={
    <div>
      <MyLoader />
    </div>
  }>
    <Routes>
      {/* <ProtectedRoute exact path='/generate-receipt' element={<GenerateReceipt/>} /> */}
      
      {/* <Route exact path='/generate-receipt' element={<PrivateRoute/>}> */}
      <Route exact path='/generate-receipt' element={<GenerateReceipt/>}/>
{/* </Route> */}

      {/* <Route exact path='/login' component={Login}/> */}
      <Route exact path='/signup' element={<SignUp/>} />
      <Route exact path='/login' element={<Login/>} />
      
        
      
    </Routes>
  </Suspense>
)

export default App
