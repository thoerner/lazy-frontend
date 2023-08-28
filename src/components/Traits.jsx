import { useState, useEffect } from 'react'
import { useIsMobile } from '../utils/tools'

const Traits = ({ buttMetadata }) => {
    const isMobile = useIsMobile()

    const [isLoading, setIsLoading] = useState(true)
    const [traitValues, setTraitValues] = useState(null)

    function buttId(name) {
        return name.split('#')[1]
    }

    function getTraitValues() {
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

    return (
        <div className="traits">
            <a href={isLoading ? '#' : `https://api.the3dkings.io/api/metadata/${buttId(buttMetadata.name)}.json`} target="_blank" rel="noreferrer">
                <div className="traits-values">
                    <div className="trait-value">
                        <span className="buttModalBold">Butt Background:</span> {isLoading ? null : traitValues[0]} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Butt:</span> {isLoading ? null : traitValues[1]} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Bodygear Bottom:</span> {isLoading ? null : traitValues[2]} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Accessories:</span> {isLoading ? null : traitValues[3]} <br />
                    </div>
                    <div className="trait-value">
                        <span className="buttModalBold">Tail Tuft:</span> {isLoading ? null : traitValues[4]} <br />
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Traits