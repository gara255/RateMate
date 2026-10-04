import ReviewCard from "./ReviewCard";

export default function CatalogSection(){
    return(
       <section className="section" id="catalog">
                <div className="wrap">
                    <div className="section-head">
                        <div>
                            <h2>Recent reviews</h2>
                            <p>Pulled straight from the catalog — pros, cons, and what people actually clicked on.</p>
                        </div>
                        <a href="#" className="btn-ghost">View all</a>
                    </div>

                    <div className="review-grid">
                        <ReviewCard/>

                        <ReviewCard/>

                        <ReviewCard/>
                    </div>
                </div>
            </section>
    )
}