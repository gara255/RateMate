const apiKey = import.meta.env.VITE_SUPABASE_KEY
const url = import.meta.env.VITE_SUPABASE_URL
const authUrl = import.meta.env.VITE_SUPABASE_AUTH_URL

export default async function fetchRequest(path = '/', method = 'GET', data = null, signal = null) {
   return baseRequest(url, path, method, data, signal)

}

async function baseRequest(url, path = '/', method = 'GET', data = null, signal = null) {
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
     if (signal) {
        options.signal = signal
    }
    const response = await fetch(`${url}${path}`, options)

    if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`)
    }

    return response
}
export const authRequest = async (path = '/', method = 'GET', data = null, signal = null) => {
    return baseRequest(authUrl, path, method, data, signal)
}

