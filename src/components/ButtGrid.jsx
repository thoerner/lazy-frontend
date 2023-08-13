import ButtCard from "./ButtCard.jsx";

// grid for displaying butt cards
const ButtGrid = ({ butts, buttImages }) => {

    const buttCards = butts.map((butt) => {
        const buttImage = buttImages.find(buttImage => buttImage.id === butt.id)
        return (
            <ButtCard butt={butt} key={butt.id} buttImage={buttImage ? buttImage.image : null} />
        )
    })

    return (
        <div className="buttGrid">
            {buttCards}
        </div>
    )
}

export default ButtGrid