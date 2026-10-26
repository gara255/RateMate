import { Link, useNavigate } from "react-router"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import ReviewModal from "./ReviewModal"
import fetchRequest from "../API/fetchRequestToOurDB"

export default function Header() {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const [showReviewModal, setShowReviewModal] = useState(false)

    const handleLogout = () => {
        setAuth(null)
        navigate("/")
    }

    const openWriteReview = () => {
        setShowReviewModal(true)
    }

    const closeModalHandler = () => setShowReviewModal(false)

    const submitUserReview = async (review) => {
        try {
            const reviewWithAuthor = {
                ...review,
                author_id: auth?.user?.id ?? null,
                author_username: auth?.user?.user_metadata?.username ?? "Anonymous",
            }

            await fetchRequest('/Reviews', 'POST', reviewWithAuthor, null, auth?.access_token)
            closeModalHandler()
            navigate('/Catalog')
        } catch (error) {
            alert(`Error adding review: ${error.message}`)
        }
    }

    return (
        <>
            <header>
                <nav className="wrap">
                    <Link to="/" className="logo">Rate<span>Mate</span></Link>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/Catalog">Catalog</Link>
                    </div>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        

                        {auth?.user ? (
                            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: "16px" }}>
                                <button className="nav-write-btn" onClick={openWriteReview}>Write a review</button>
                                <Link to={`/Profile/${auth.user.id}`} className="nav-user">
                                    {auth.user.user_metadata?.username || auth.user.email}
                                </Link>
                                <button className="nav-ghost" onClick={handleLogout}>Log out</button>
                            </div>
                        ) : (
                            <Link to="/Register" className="nav-cta">Sign up</Link>
                        )}
                    </div>
                </nav>

            </header>
            {showReviewModal && <ReviewModal onClose={closeModalHandler} onSubmit={submitUserReview} />}
        </>
    )
}