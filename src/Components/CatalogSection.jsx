export default function CatalogSection(){
    return(
       <section class="section" id="catalog">
                <div class="wrap">
                    <div class="section-head">
                        <div>
                            <h2>Recent reviews</h2>
                            <p>Pulled straight from the catalog — pros, cons, and what people actually clicked on.</p>
                        </div>
                        <a href="#" class="btn-ghost">View all</a>
                    </div>

                    <div class="review-grid">
                        <article class="card">
                            <div class="card-cover">cover art</div>
                            <div class="card-top">
                                <div>
                                    <h3>Hollow Signal</h3>
                                    <div class="by">by Marin</div>
                                </div>
                                <div class="score">8.4</div>
                            </div>
                            <p class="verdict">Atmosphere carries the first act harder than the combat does — worth it for the sound design alone.</p>
                            <div class="pc-row">
                                <div>👍 Pros: 3</div>
                                <div>👎 Cons: 1</div>
                            </div>
                            <div class="reactions">
                                <span class="pill">🔥 24</span>
                                <span class="pill">💀 6</span>
                                <span class="pill">🤝 11</span>
                            </div>
                        </article>

                        <article class="card">
                            <div class="card-cover">cover art</div>
                            <div class="card-top">
                                <div>
                                    <h3>Fracture Line</h3>
                                    <div class="by">by Deyan</div>
                                </div>
                                <div class="score">6.1</div>
                            </div>
                            <p class="verdict">Fun with a full squad, rough solo. Matchmaking needs another pass before launch season.</p>
                            <div class="pc-row">
                                <div>👍 Pros: 2</div>
                                <div>👎 Cons: 4</div>
                            </div>
                            <div class="reactions">
                                <span class="pill">👍 19</span>
                                <span class="pill">💀 14</span>
                                <span class="pill">😴 3</span>
                            </div>
                        </article>

                        <article class="card">
                            <div class="card-cover">cover art</div>
                            <div class="card-top">
                                <div>
                                    <h3>Coastline '91</h3>
                                    <div class="by">by Petra</div>
                                </div>
                                <div class="score">9.0</div>
                            </div>
                            <p class="verdict">The writing does the heavy lifting here. Short, but I didn't want it to end.</p>
                            <div class="pc-row">
                                <div>👍 Pros: 5</div>
                                <div>👎 Cons: 0</div>
                            </div>
                            <div class="reactions">
                                <span class="pill">🔥 41</span>
                                <span class="pill">🤝 20</span>
                                <span class="pill">😢 8</span>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
    )
}