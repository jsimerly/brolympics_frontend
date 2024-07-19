import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import { AuthContextType } from "../context/auth"

const AnonymousOnlyRoute: React.FC<AnonymousOnlyRouteType> = ({children}) => {
    const { loading, loggedIn } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }
    if (loggedIn) {
        return <Navigate to="/" replace/>
    }
    return <>{children}</>
}

export default AnonymousOnlyRoute