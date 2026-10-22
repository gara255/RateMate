import { useEffect, useState } from "react"
import fetchRequest from "../API/fetchRequestToOurDB"

export default function StatSection() {

    const [reviewNum, setReviewNum] = useState()

    useEffect(() => {
        async function loadCount() {
            const currentReviewsNum = await fetchRequest('/Reviews?select=*')
                .then(res => res.json())
                .then(data => data.length)

            setReviewNum(currentReviewsNum)
        }
        loadCount()
    }, [])

    return (
        <div className="stat-strip">
            <div className="wrap">
                <div><strong>{reviewNum}</strong>reviews posted</div>
                <div><strong>38</strong> DELETE OR CHAGE IT</div>
                <div><strong>🔥💀👍</strong>reactions, not stars</div>
            </div>
        </div>
    )
}