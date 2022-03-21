import { Suspense } from 'react'
import { Routes ,Route } from 'react-router-dom';
import MyLoader from '../../utils/loader';
import SignUp from '../../signup';
import Login from "../../login/login"

import GenerateReceipt from '../../generate_receipt/GenerateReceipt';




const App = () => (
  <Suspense fallback={
    <div>
      <MyLoader />
    </div>
  }>
    <Routes>
     
      <Route exact path='/generate-receipt' element={<GenerateReceipt/>}/>
      <Route exact path='/' element={<SignUp/>} />
      <Route exact path='/login' element={<Login/>} />
      
        
      
    </Routes>
  </Suspense>
)

export default App
