import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPhoneNumber, 
    updatePassword,
    RecaptchaVerifier,
    ApplicationVerifier,
    PhoneAuthProvider,
    signInWithCredential,
    UserCredential,
    AuthError,
    ConfirmationResult
} from "firebase/auth"
import { auth } from "./firebaseConfig"

let isDebug = import.meta.env.VITE_APP_ENV === 'DEV'

// Recaptcha Verification
let recaptchaVerifier: ApplicationVerifier | null = null;

const initializeRecaptcha = (buttonId: string): ApplicationVerifier => {
    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired');
        }
      });
    }
    return recaptchaVerifier
  };

export const clearRecaptcha = () => {
    if (recaptchaVerifier) {
        (recaptchaVerifier as any).clear();
        recaptchaVerifier = null
    }
}

// Sign-In
export const signInUserWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    try{
        const UserCredential = await signInWithEmailAndPassword(auth, email, password)
        return UserCredential
    } catch (error) {

if (error instanceof Error) {
      const authError = error as AuthError;
      let errorMessage: string;

      if (isDebug){
        console.error('Error in signInUserWithEmail:', error)
      }

      switch (authError.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'The credentials entered are invalid.'
          break;
        case 'auth/user-disabled':
          errorMessage = 'This user account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'There is no user corresponding to this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is invalid for the given email.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'A network error occurred. Please check your connection.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again later.';
      }

      throw new Error(errorMessage);
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const signInWithPhone = async (phoneNumber: string, buttonId: string): Promise<ConfirmationResult> => {
    try {
      const appVerifier = initializeRecaptcha(buttonId);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error) {
      clearRecaptcha();
      if (isDebug){
        console.error('Error in signInWithPhone:', error)
      }
  
      if (error instanceof Error) {

        const authError = error as AuthError;
        switch (authError.code) {
          case 'auth/invalid-phone-number':
            throw new Error('The phone number is not valid. Please check and try again.');
          case 'auth/missing-phone-number':
            throw new Error('Please enter a phone number.');
          case 'auth/quota-exceeded':
            throw new Error('SMS quota exceeded. Please try again later.');
          case 'auth/user-disabled':
            throw new Error('This phone number has been disabled. Please contact support.');
          case 'auth/operation-not-allowed':
            throw new Error('Phone authentication is not enabled. Please contact support.');
          default:
            throw new Error('An unexpected error occurred. Please try again later.');
        }
      } else {
        throw new Error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  export const confirmPhoneSignIn = async (verificationId: string, verificationCode: string): Promise<UserCredential> => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await signInWithCredential(auth, credential);
      clearRecaptcha(); 
      return result;
    } catch (error) {
      clearRecaptcha(); 

      if (isDebug){
        console.error('Error in confirmPhoneSignIn:', error)
      }
  
      if (error instanceof Error) {
        const authError = error as AuthError;
        switch (authError.code) {
          case 'auth/invalid-verification-code':
            throw new Error('The verification code is not valid. Please check and try again.');
          case 'auth/missing-verification-code':
            throw new Error('Please enter the verification code.');
          case 'auth/code-expired':
            throw new Error('The verification code has expired. Please request a new one.');
          default:
            throw new Error('An unexpected error occurred. Please try again later.');
        }
      } else {
        throw new Error('An unexpected error occurred. Please try again later.');
      }
    }
  };


// Create Account
export const createUserWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (isDebug) {
      console.error('Error in createUserWithEmail:', error);
    }

    if (error instanceof Error) {
      const authError = error as AuthError;
      let errorMessage: string;

      switch (authError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak. Please choose a stronger password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'A network error occurred. Please check your connection.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again later.';
      }

      throw new Error(errorMessage);
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};


// Sign Out
export const logout = () => {
    return auth.signOut()
}

// Password
export const passwordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email)
}

// export const passwordChange = (password: string) => {
//     return updatePassword(auth.currUser, password)
// }

