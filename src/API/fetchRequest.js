const apiKey = 'sb_publishable_9qhBP--rQvNZ3G9lzPtYXg_qRRPpByS'
const url = 'https://wuhbloysiszrtkjsigmo.supabase.co/rest/v1'

export default async function fetchRequest(path = '/', method = 'GET', data = null) {
    const options = {
        headers: {
            apiKey,
        }
    }
    if (method !== 'GET') {
        options.method = method
    }
    if (data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }
    const response = await fetch(`${url}${path}`, options)

    if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`)
    }

    return response
}

