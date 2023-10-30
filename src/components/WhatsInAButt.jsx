import PropType from 'prop-types'
import HowToBuildAButt from '../assets/traits-explained.png'

const WhatsInAButt = ({ isMobile }) => {
    return (
        <div className="card" style={!isMobile ? null : null}>
            {isMobile ? <h2>What&apos;s in a Butt?</h2> :
                <h1>What&apos;s in a Butt?</h1>
            }
            <img src={HowToBuildAButt} className="how-to-build-a-butt" alt="How to build a butt" />
            {isMobile ? <div className="howto" alt="How to build a butt" ></div> : null}
        </div>
    )
}

WhatsInAButt.propTypes = {
    isMobile: PropType.bool.isRequired,
}

export default WhatsInAButt