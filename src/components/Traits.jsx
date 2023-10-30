import PropType from 'prop-types'
import { useState, useEffect } from 'react'

const Traits = ({ buttMetadata }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [traitValues, setTraitValues] = useState(null)

    function buttId(name) {
        return name?.split('#')[1] ?? ''
    }

    function getTraitValues() {
        if (!buttMetadata.attributes) return
        const traitValues = buttMetadata.attributes.map((trait) => {
            return trait.value
        })
        setTraitValues(traitValues)
    }

    useEffect(() => {
        if (!buttMetadata) return
        getTraitValues()
        setIsLoading(false)
    }, [buttMetadata])

    return ( !buttMetadata ? null :
        <div className="traits">
            <a href={isLoading ? '#' : `https://api.the3dkings.io/api/metadata/${buttId(buttMetadata.name)}.json`} target="_blank" rel="noreferrer">
                <div className="traits-values">
                    <div className="trait-value">
                        <span className="buttModalBold">Butt Background:</span> {!isLoading && traitValues ? traitValues[0] : null } <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Butt:</span> {!isLoading && traitValues ? traitValues[1] : null} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Bodygear Bottom:</span> {!isLoading && traitValues ?  traitValues[2] : null} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Accessories:</span> {!isLoading && traitValues ? traitValues[3] : null} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Tail Tuft:</span> {!isLoading && traitValues ? traitValues[4] : null} <br />
                    </div>
                </div>
            </a>
        </div>
    )
}

Traits.propTypes = {
    buttMetadata: PropType.object.isRequired
}

export default Traits