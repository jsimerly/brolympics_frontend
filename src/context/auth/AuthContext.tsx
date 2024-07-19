import { createContext, useContext, useEffect, useState} from "react"
import { browserLocalPersistence, getIdToken, onAuthStateChanged, setPersistence, User } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { AuthContextType, AuthProviderProps, LocationState } from "./types"
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context =  useContext(AuthContext)
    if (context === undefined){
        throw new Error('useAuth must be within an AuthProvider')
    }
    return context
}

export function AuthProvider({children}: AuthProviderProps): JSX.Element {
    const [user, setuser] = useState<User | null>(null)
    const [loggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);
    const [idToken, setIdToken] = useState<string | null>(null);

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const initAuth = async () => {
            await setPersistence(auth, browserLocalPersistence)

            const unsubscribe = onAuthStateChanged(auth, initializeUser);
            return unsubscribe;
        }
        initAuth()
    },[])

    async function initializeUser(user: User | null) {
        if (user) {
            setuser({...user})
            setUserLoggedIn(true);

            try {
                const token = await getIdToken(user)
                setIdToken(token)
            } catch (error){
                console.error('Error getting ID Token:', error)
                setIdToken(null);
            }
        } else {
            setuser(null)
            setUserLoggedIn(false);
            setIdToken(null)
        }
        setLoading(false)
    }

    async function refreshIdToken() {
        if (user) {
            try {
                const newToken = await getIdToken(user, true); // Force refresh
                setIdToken(newToken);
                return newToken;
            } catch (error) {
                console.error("Error refreshing ID token:", error);
                return null;
            }
        }
        return null;
    }

    const handleSuccessfulLogin = (): void => {

        const state: LocationState | null = location.state
        const prevLoc: string = state?.from?.pathname || '/'
        navigate(prevLoc, {replace: true})
    }

    const value: AuthContextType = {
        user,
        loggedIn,
        loading,
        idToken,
        handleSuccessfulLogin,
        refreshIdToken
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}




