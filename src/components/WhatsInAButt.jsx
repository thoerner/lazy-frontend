import HowToBuildAButt from '../assets/how-to-build-a-butt.jpeg'

const WhatsInAButt = ({ isMobile }) => {
    return (
        <div className="card" style={!isMobile ? null : null}>
            {isMobile ? <h2>What's in a Butt?</h2> :
                <h1>What's in a Butt?</h1>
            }
            <img src={HowToBuildAButt} className="how-to-build-a-butt" alt="How to build a butt" />
            {isMobile ? <div className="howto" alt="How to build a butt" ></div> : null}
        </div>
    )
}

export default WhatsInAButt