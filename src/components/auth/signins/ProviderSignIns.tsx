import { useState } from "react"
import googleIcon from '../../../assets/images/icons/sign_in_google.png'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";



const ProviderSignIns = () => {
    const [error, setError] = useState<string | null>('')

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

  return (
    <div>
        {error && <p className="mb-4 text-error">{error}</p>}
        <div className="flex justify-center gap-6">
            
            <button
                type='button'
                onClick={handleGoogleLogin}
            >
                <img src={googleIcon} className="max-h-[60px]"/>
            </button>
        </div>
    </div>
  )
}

export default ProviderSignIns