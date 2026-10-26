// src/Components/StatSection.jsx
import { useEffect, useState } from "react"
import fetchRequest from "../API/fetchRequestToOurDB"

export default function StatSection() {
    const [reviewNum, setReviewNum] = useState()
    const [reactionNum, setReactionNum] = useState()

    useEffect(() => {
        async function loadCounts() {
            const reviewsData = await fetchRequest('/Reviews?select=*')
                .then(res => res.json())
            setReviewNum(reviewsData.length)

            const reactionsData = await fetchRequest('/Reactions?select=*')
                .then(res => res.json())
            setReactionNum(reactionsData.length)
        }
        loadCounts()
    }, [])

    return (
        <div className="stat-strip">
            <div className="wrap">
                <div><strong>{reviewNum}</strong> reviews posted</div>
                <div><strong>{reactionNum}</strong> reactions given</div>
                <div><strong>🔥💀🤝</strong> reactions, not stars</div>
            </div>
        </div>
    )
}