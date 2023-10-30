import PropType from "prop-types";
import ButtCard from "./ButtCard.jsx";

// grid for displaying butt cards
const ButtGrid = ({ butts, buttImages, myLions }) => {
  const buttCards = butts.map((butt) => {
    const buttImage = buttImages.find((buttImage) => buttImage.id === butt.id);
    return (
      <ButtCard
        butt={butt}
        key={butt.id}
        buttImage={buttImage ? buttImage.image : null}
        myLions={myLions}
      />
    );
  });

  return <div className="buttGrid">{buttCards}</div>;
};

ButtGrid.propTypes = {
  butts: PropType.array,
  buttImages: PropType.array,
  myLions: PropType.array,
};

export default ButtGrid;
