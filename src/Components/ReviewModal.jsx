export default function ReviewModal({ onClose, onSubmit  }) {

    function submitHandler(e){
        e.preventDefault()
        const form = new FormData(e.target)
        const creatingReview = {
            game: form.get('game-title'),
            rating: form.get('rating'),
            pros: form.get('pros'),
            cons: form.get('cons'),
            verdict: form.get('verdict')
        }
        
        onSubmit(creatingReview)
        
    }
    

    
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" role="dialog" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 id="modal-title">Write a review</h3>
                    <button className="modal-close" aria-label="Close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <form className="review-form" onSubmit = {submitHandler}>
                    <div className="form-group">
                        <label htmlFor="game-title" >Game</label>
                        <input
                            type="text"
                            id="game-title"
                            placeholder="Search and select a game..."
                            name ="game-title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <div className="rating-input">
                            <input type="radio" name="rating" id="r1" defaultValue={1} />
                            <label htmlFor="r1">1</label>
                            <input type="radio" name="rating" id="r2" defaultValue={2} />
                            <label htmlFor="r2">2</label>
                            <input type="radio" name="rating" id="r3" defaultValue={3} />
                            <label htmlFor="r3">3</label>
                            <input type="radio" name="rating" id="r4" defaultValue={4} />
                            <label htmlFor="r4">4</label>
                            <input type="radio" name="rating" id="r5" defaultValue={5} />
                            <label htmlFor="r5">5</label>
                            <input type="radio" name="rating" id="r6" defaultValue={6} />
                            <label htmlFor="r6">6</label>
                            <input type="radio" name="rating" id="r7" defaultValue={7} />
                            <label htmlFor="r7">7</label>
                            <input type="radio" name="rating" id="r8" defaultValue={8} />
                            <label htmlFor="r8">8</label>
                            <input type="radio" name="rating" id="r9" defaultValue={9} />
                            <label htmlFor="r9">9</label>
                            <input type="radio" name="rating" id="r10" defaultValue={10} />
                            <label htmlFor="r10">10</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="pros">Pros</label>
                            <textarea
                                id="pros"
                                rows={3}
                                placeholder="What worked..."
                                defaultValue={""}
                                name ="pros"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cons">Cons</label>
                            <textarea
                                id="cons"
                                rows={3}
                                placeholder="What didn't..."
                                defaultValue={""}
                                name ="cons"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="verdict">Your take</label>
                        <textarea
                            id="verdict"
                            rows={3}
                            placeholder="The short version..."
                            defaultValue={""}
                            name ="verdict"
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" >
                            Post review
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}