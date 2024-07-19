import { useEffect, useReducer, useRef, useState } from "react"
import { confirmPhoneSignIn, signInWithPhone } from "../../../firebase/auth"
import { parsePhoneNumber, isValidPhoneNumber, formatIncompletePhoneNumber, PhoneNumber } from 'libphonenumber-js'

const formatToE164 = (phoneNumber: string): string => {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  } else {
    return phoneNumber;
  }
};

const PhoneSignIn = () => {
  const [stage, setStage] = useState<'phone' | 'confirm'>('phone')
  const [phone, setPhone] = useState<string>('')
  const [verId, setVerId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [verCode, setVerCode] = useState<string[]>(['','','','','',''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0,6)
  },[])

  const handleSendCode = async (): Promise<void> => {
    try {
      setError('');
      const formattedPhone = formatToE164(phone)
      const resp = await signInWithPhone(formattedPhone, 'sign-in-button');
      setVerId(resp.verificationId);
      setStage('confirm')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handlePhoneChange = (value: string): void => {
    // Format the phone number as the user types
    const formattedNumber = formatIncompletePhoneNumber(value, 'US')
    setPhone(formattedNumber)
  }
  
  const handleCodeChange = (index: number, value: string): void => {
    const newVerCode = [...verCode]
    
    if (value.length === 6) {
      // Handle pasting of entire code
      for (let i = 0; i < 6; i++) {
        newVerCode[i] = value[i] || ''
      }
      setVerCode(newVerCode)
      inputRefs.current[5]?.focus()
    } else {
      // Handle single digit input
      newVerCode[index] = value.slice(-1)
      setVerCode(newVerCode)
      
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && index > 0 && verCode[index] === '') {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleConfirmCode = async (): Promise<void> => {
    try {
      setError('');
      const code = verCode.join('')
      const resp = await confirmPhoneSignIn(verId, code);
      console.log('Sign-in successful:', resp);
      // TODO: Handle successful sign-in
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  return (
    <div>
      {error && <p className="mb-4 text-error">{error}</p>}
      {stage==='phone' ? 
        <div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(555) 555-5555"
            />
          </div>
          <button
            type="button"
            id="sign-in-button"
            onClick={handleSendCode}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send Verification Code
          </button>
        </div>
        : 
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Verification Code</label>
            <div className="flex justify-between">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={6}
                  className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={verCode[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6)
                    handleCodeChange(index, pastedData)
                  }}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleConfirmCode}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Confirm Code
          </button>
        </div>
      }
    </div>
  )
}

export default PhoneSignIn