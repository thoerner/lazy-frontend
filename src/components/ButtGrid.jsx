import ButtCard from "./ButtCard.jsx";
import CubCard from "./CubCard.jsx";

// grid for displaying butt cards
const ButtGrid = ({ butts, buttImages, cubImages, cubImagesLoading, myLions, myCubs }) => {

    console.log("cubImagesLoading: ", cubImagesLoading)
    const buttCards = butts.map((butt) => {
        const buttImage = buttImages.find(buttImage => buttImage.id === butt.id)
        return (
            <ButtCard butt={butt} key={butt.id} buttImage={buttImage ? buttImage.image : null} myLions={myLions} />
        )
    })

    const cubCards = myCubs.map((cub) => {
        const cubImage = cubImages.find(cubImage => cubImage.id === cub.id)
        return (
            <CubCard butt={cub} key={cub.id} buttImage={cubImage ? cubImage.image : null} myLions={myLions} cubImagesLoading={cubImagesLoading} />
        )
    })

    return (
        <div className="buttGrid">
            {buttCards}
            {cubCards}
        </div>
    )
}

export default ButtGrid