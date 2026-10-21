const apiKey = import.meta.env.VITE_RAWG_SEARCH_KEY
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=4&search=`

export default async function fetchRequestRawg(searchInput){


    const response = await fetch(`${url}${searchInput}`)

    if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`)
    }

    return response

}