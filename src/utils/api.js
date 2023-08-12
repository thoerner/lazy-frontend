
export const getLions = async (address) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lions/${address}`)
    const lions = await res.json()
    if (!lions.message) {
        lions
    }
    return lions
}

export const getButts = async (address) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/butts/${address}`)
    const butts = await res.json()
    if (!butts.message) {
        butts
    }
    return butts
}

export const getToken = async (address) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/token?address=${address}`)
    const token = await res.json()
    return token.token
}

export const verifySignature = async (token, signature, address) => {
    const params = {
        token,
        signature,
        address
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    const data = await res.json()
    return data
}

export const checkSignature = async (params) => {

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    const data = await res.json()

    return data
}

export const getFullResButt = async (buttId) => {
}

export const getFullBody = async (buttId) => {
}

export const getTwitterFriendlyFullBody = async (buttId) => {
}