import { useState } from "react"
import { signInUserWithEmail } from "../../../firebase/auth"
import { useAuth } from "../../../context/auth"


const EmailSignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>('')
    const { handleSuccessfulLogin } = useAuth()

    const handleEmailLogin = async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      setError(null)
      try {
        await signInUserWithEmail(email, password)
        handleSuccessfulLogin()
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          console.log(err)
        } else {
          setError("An unexpected error occurred. Please try again.")
          console.log(err)
        }
      }
    }

  return (
    <div>
      {error && <p className="mb-4 text-error">{error}</p>}
      <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">Email</label>
          <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
          />
      </div>
      <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
      </div>
      <button
          type="button"
          onClick={handleEmailLogin}
          className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign-In with Email
        </button>
        <div className="flex justify-center">
          <a className='underline' href='/create-account'>Don't have an account, sign-up here.</a>
        </div>
    </div>
  )
}

export default EmailSignIn