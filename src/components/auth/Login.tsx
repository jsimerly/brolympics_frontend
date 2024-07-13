import { useState } from "react";
import { useAuth } from "../../context/auth";
import { useVerification } from "./authMethods";

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [verCode, setVerCode] = useState('')
  const [verId, setVerId] = useState('')
  const [error, setError] = useState<string | null>(null)
  // const { user, loading } = useAuth()

  const { signInWithEmail, signInWithPhone, signInWithGoogle, signInWithFacebook} = useVerification()

  const handleEmailLogin = async () => {
    const { success, error } = await signInWithEmail(email, password)
    if (!success){
      setError(error)
    } else {
      // TODO route to homepage
    }
  }

  const handlePhoneLogin = async () => {
    const { success, error } = await signInWithPhone(phone)
    if (!success){
      setError(error)
    } else {
      // TODO route to homepage
    }
  }

  const handleGoogleLogin = async () => {
    const { success, error } = await signInWithGoogle()
    if (!success){
      setError(error)
    } else {
      // TODO route to homepage
    }
  }

  const handleFacebookLogin = async () => {
    const { success, error } = await signInWithFacebook()
    if (!success){
      setError(error)
    } else {
      // TODO route to homepage
    }
  }


  return (
    <div>
        Login Here
    </div>
  )
}

export default Login