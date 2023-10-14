export const getLions = async (address) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lions/${address}`)
    const lions = await res.json()
    if (!lions.message) {
        lions
    }
    return lions
}

export const getAllButts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/butts`)
    const butts = await res.json()
    if (!butts.message) {
        butts
    }
    return butts
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
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
}

export const getFullBodyImage = async (buttId, address, sessionToken) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/full/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
            'Authorization': `${sessionToken}`,  // Specify the token
            'Address': `${address}` // Specify the address
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
}

export const getSocialImage = async (buttId, address, sessionToken) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/social/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
            'Authorization': `${sessionToken}`,  // Specify the token
            'Address': `${address}` // Specify the address
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const { error } = await res.json();
        throw new Error(error);
    }
    const image = await res.blob();
    return image;
}

export const getFullBodyThumbImage = async (buttId, address, sessionToken) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/full-thumb/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
            'Authorization': `${sessionToken}`,  // Specify the token
            'Address': `${address}` // Specify the address
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
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
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
}

export const getMediumButtImage = async (buttId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/medium/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
}

export const getSeasonalButtImage = async (buttId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/images/seasonal/${buttId}.png`, {
        method: 'GET',  // Specify the method
        headers: {
            'Content-Type': 'application/json',  // Specify the content type of the request body
        },
    });

    if (res.headers.get('Content-Type').includes('application/json')) {
        const jsonData = await res.json();
        throw new Error('Expected an image but got JSON response.');
    }
    const image = await res.blob();
    return image;
}

export const getMetadata = async (buttId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/metadata/${buttId}.json`)
    const metadata = await res.json()
    return metadata
}

export const getToken = async (address) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/token?address=${address}`)
    const token = await res.json()
    return token.token
}

export const getProof = async (address) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/proof?address=${address}`)
    const proof = await res.json()
    return proof
}

export const isAllowListActive = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/allowlist`)
    const allowlist = await res.json()
    if (allowlist.success) {
        return allowlist.isActive
    }
    return false
}

export const isMintActive = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/mint`)
    const mint = await res.json()
    if (mint.success) {
        return mint.isActive
    }
    return false
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



export const getTwitterFriendlyFullBody = async (buttId) => {
}