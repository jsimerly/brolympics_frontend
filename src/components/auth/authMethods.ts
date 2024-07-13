import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithPhoneNumber, 
    RecaptchaVerifier, 
    AuthError,
    AuthErrorCodes
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { FacebookAuthProvider } from "firebase/auth/web-extension";

type AuthFunction<T extends any[]> = (...args: T) => Promise<any>

function withErrorHandling<T extends any[]>(authFunction: AuthFunction<T>): 
    (...args: T) => Promise<{ success: boolean; error: string | null }> {
        return async (...args: T) => {
            try {
                await authFunction(...args);
                return { success: true, error: null };
            } catch (error) {
                const authError = error as AuthError;
                switch (authError.code) {
                    case AuthErrorCodes.INVALID_PASSWORD:
                    case AuthErrorCodes.USER_DELETED:
                        return { success: false, error: "Incorrect email or password. Please try again." };
                    case AuthErrorCodes.USER_DISABLED:
                        return { success: false, error: "This account has been disabled. Please contact support." };
                    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
                        return { success: false, error: "Too many failed attempts. Please try again later." };
                    case AuthErrorCodes.EMAIL_EXISTS:
                        return { success: false, error: "An account with this email already exists." };
                    case AuthErrorCodes.OPERATION_NOT_ALLOWED:
                        return { success: false, error: "This operation is not allowed. Please contact support." };
                    case AuthErrorCodes.INVALID_PHONE_NUMBER:
                        return { success: false, error: "The phone number is invalid. Please check and try again." };
                    // Add more cases as needed
                    default:
                        console.error("Authentication error:", authError);
                        return { success: false, error: "An unexpected error occurred. Please try again later." };
                }
            }
        };
}

export function useVerification() {
    // Sign In
    const signInWithEmail = withErrorHandling(
        (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
    );

    const signInWithPhone = withErrorHandling(
        (phoneNumber: string) => {
            const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {'size': 'invisible'});
            return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        }
    );
    
    const signInWithGoogle = withErrorHandling(
        () => {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
        }
    );

    const signInWithFacebook = withErrorHandling(
        () => {
            const provider = new FacebookAuthProvider();
            return signInWithPopup(auth, provider) 
        }
    )

    return {
        signInWithEmail,
        signInWithPhone,
        signInWithGoogle,
        signInWithFacebook

    };
}

// TODO
export function useCreateAccount() {
    
}