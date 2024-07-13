import { createContext, useEffect, useState, useContext } from "react"
import { User } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { AuthContextType, AuthProviderProps } from "./types"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: AuthProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })
        return () => unsubscribe()
    }, [])

    const value = {user, loading};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}