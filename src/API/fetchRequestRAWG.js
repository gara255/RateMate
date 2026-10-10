const url = 'https://api.rawg.io/api/games?key=75ec301e90a447f58b1063972438f5ac&page_size=4&search='

export default async function fetchRequestRawg(searchInput){


    const response = await fetch(`${url}${searchInput}`)

    if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`)
    }

    return response

}