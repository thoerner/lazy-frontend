import ButtCard from "./ButtCard.jsx";

// grid for displaying butt cards
const ButtGrid = ({ butts }) => {

    const buttCards = butts.map((butt) => {
        return (
            <ButtCard butt={butt} key={butt.id} />
        )
    })

    return (
        <div className="buttGrid">
            {buttCards}
        </div>
    )
}

export default ButtGrid