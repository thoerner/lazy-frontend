import { useState, useEffect } from 'react'

const quotes = [
    "Unleash the roar, claim your score!",
    "Every lion deserves its pride. Claim yours now!",
    "In the digital savannah, every lion finds its stride.",
    "Claiming today keeps the FOMO away!",
    "Where there's a lion, there's a roar. Make yours heard!",
    "Paws, claim, roar! Dive into the NFT lore.",
    "Become a part of the tale, where Lazy Lions prevail.",
    "The art of claiming is just a click away.",
    "Hear the digital roar? It's your Lazy Butt waiting to be explored!",
    "Where 3D glasses gleam, your Lazy Butt is ready to beam!",
    "In the NFT jungle, let your Lazy Butt mingle!",
    "The pride awaits, don't hesitate. Claim your fate!",
    "Roaring in 3D has never been this breezy!",
    "Join the pride's stride, one Lazy Butt at a time.",
    "Every claim is a roar in the vast NFT lore.",
    "Your lion. Your claim. Your fame.",
    "Unleash the roar, claim your lore!",
    "Every lion deserves its distinguished half. Claim yours now.",
    "Make your pride heard. Claim today!",
    "A roar louder, with every claim you make.",
    "Elevate your collection. Add a Lazy Butt to your pride.",
    "In the world of NFTs, it's not just about owning; it's about belonging.",
    "Roaring just got a little louder. Make your claim!",
    "Add depth to your digital savannah. Claim your Lazy Butt.",
    "Stay ahead in the digital jungle. Every claim counts.",
    "3D Kings envision. You claim. Together, we roar louder.",
    "Claiming isn't just an action; it's a statement. Make yours.",
    "Pioneering the future of NFTs, one claim at a time.",
    "Join the chorus of roaring lions. Start with a claim.",
    "Your Lazy Lion awaits its better half. Don't keep it waiting.",
    "By the vision of 3D Kings, make your claim felt in the digital wilderness.",
    "Join the pride. Claim your roar.",
    "Every lion deserves its better half.",
    "Make your collection roar louder with Lazy Butts.",
    "Where two worlds converge: Lions & Butts.",
    "A lion's pride is in its claim.",
    "Roar louder, claim prouder.",
    "Your Lazy Lion's journey is not complete without its Butt.",
    "Dive deeper into the digital savannah. Claim now.",
    "Elevate your NFT experience, one claim at a time.",
    "Witness the fusion of artistry and blockchain. Make your claim today.",
    "Your Lazy Lion awaits its other half. Don't keep it waiting.",
    "In the world of Lazy Lions, two halves make a roaring whole.",
    "It's not just about ownership, it's about the complete experience.",
    "The pride grows stronger with every claim.",
    "Add another roar to your digital jungle. Claim your Lazy Butt.",
    "Seize the moment, enhance your collection.",
    "Where every claim echoes with a lion's roar.",
    "Your claim today is a roar for tomorrow.",
]

const RandomQuote = () => {
    const [quote, setQuote] = useState(quotes[0])

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length)
            setQuote(quotes[randomIndex])
        }, 10 * 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <p className="quote">{quote}</p>
    )
}

export default RandomQuote