
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

export const getFullResButtImage = async (buttId, address, sessionToken) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/butt/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
            'Authorization': `${sessionToken}`,  // Specify the token
            'Address': `${address}` // Specify the address
        },
    });
    
    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
        console.log(jsonData);
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
}

export const getSmallButtImage = async (buttId, address, sessionToken) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/small/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
            'Authorization': `${sessionToken}`,  // Specify the token
            'Address': `${address}` // Specify the address
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
        console.log(jsonData);
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
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

export const checkSession = async (params) => {
    console.log(JSON.stringify(params))

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    const data = await res.json()
    console.log(JSON.stringify(data))

    return data
}

export const getFullResButt = async (buttId) => {
}

export const getFullBody = async (buttId) => {
}

export const getTwitterFriendlyFullBody = async (buttId) => {
}