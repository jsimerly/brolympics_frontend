import EmailCreateAccount from "./create_account/EmailCreateAccount"



const SignUp = () => {
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Create Account</h2>
        <div className="flex justify-around text-grey-700">
            <EmailCreateAccount/>
        </div>
      </div>
    </div>
  )
}

export default SignUp