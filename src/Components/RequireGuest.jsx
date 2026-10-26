import { Navigate } from "react-router"
import useAuth from "../hooks/useAuth"

export default function RequireGuest({ children }) {
    const { auth } = useAuth()

    if (auth?.user) {
        return <Navigate to="/" replace />
    }

    return children
}