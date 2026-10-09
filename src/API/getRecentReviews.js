const apiKey = 'sb_publishable_9qhBP--rQvNZ3G9lzPtYXg_qRRPpByS'

export default async function getRecentReviews (){

     let recentReviews = await fetch('https://wuhbloysiszrtkjsigmo.supabase.co/rest/v1/Reviews?select=*&order=created_at.desc&limit=3', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
        },
        
    })
    .then(res => res.json())
    .then(data => {
        return data})
    
    return recentReviews
}
    
