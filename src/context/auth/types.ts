import { User } from "firebase/auth";

export interface LocationState {
    from?: {
        pathname: string
    }
}
export interface AuthContextType {
    user: User | null;
    loggedIn: boolean;
    loading: boolean;
    idToken: string | null;
    handleSuccessfulLogin: () => void;
    refreshIdToken: () => Promise<string | null>;
}

export interface AuthProviderProps{
    children: React.ReactNode;
}