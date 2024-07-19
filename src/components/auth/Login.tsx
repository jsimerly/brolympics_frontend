import { useState } from "react";
import EmailSignIn from "./signins/EmailSignIn";
import PhoneSignIn from "./signins/PhoneSignIn";
import ProviderSignIns from "./signins/ProviderSignIns";

const Login: React.FC = () => {
  const [signInPage, setSignInPage] = useState('email')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <div className="flex justify-around text-grey-700">
          <button 
            onClick={()=>setSignInPage('email')}
            className={`${signInPage==='email' && 'text-blue-500 semi-bold'}`}
          >
            Email
          </button>
          <div className="h-[20px] w-[1px] bg-gray-300"/>
          <button 
            onClick={()=>setSignInPage('phone')}
            className={`${signInPage==='phone' && 'text-blue-500 '}`}
          >
            Phone
          </button>
        </div>
        <div className="mt-6">
          { signInPage === 'email' ?
            <EmailSignIn/> 
            :
            <PhoneSignIn/>
          }
        </div>
        <div className="relative w-full h-[1px] bg-gray-300 my-12">
          <span className="absolute top-0 px-2 text-gray-700 transform -translate-x-1/2 -translate-y-1/2 bg-white left-1/2">
            Or Sign-In With
          </span>
        </div>
        <ProviderSignIns/>
      </div>
    </div>
  )
}

export default Login