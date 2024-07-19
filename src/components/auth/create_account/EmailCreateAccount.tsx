import { useState } from "react"
import { createUserWithEmail } from "../../../firebase/auth" 

const EmailCreateAccount = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>('')

    const handleCreateAccount = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            await createUserWithEmail(email, password)
            // Handle successful account creation (e.g., redirect to dashboard)
        } catch (err) {
            if (err instanceof Error) {
                // Capture the specific error message
                setError(err.message)
            } else {
                // Fallback error message
                setError("An unexpected error occurred. Please try again.")
            }
        }
    }

    return (
        <div className="w-full">
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
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                />
            </div>
            <button
                type="button"
                onClick={handleCreateAccount}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Create Account
            </button>
        </div>
    )
}

export default EmailCreateAccount