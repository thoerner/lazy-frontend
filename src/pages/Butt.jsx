import { useState, useEffect } from 'react'
import PropType from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import { useIsMobile } from '../utils/tools.js'
import { getMediumButtImage, getSmallButtImage, getMetadata } from '../utils/api.js'
import LionNotFound from '../assets/404.png'
import Traits from '../components/Traits.jsx'
import '../styles/Butt.css'

const ButtNav = ({ nextPage, prevPage }) => {
    return (
        <div className="buttNav">
            <Link to={`/butt/${prevPage}`} className="buttNavButton">
                <div className="buttNavButtonInner">
                    <span className="buttNavButtonText">{`Prev`}</span>
                </div>
            </Link>
            <Link to={`/butt/${nextPage}`} className="buttNavButton">
                <div className="buttNavButtonInner">
                    <span className="buttNavButtonText">{`Next`}</span>
                </div>
            </Link>
        </div>
    )
}

ButtNav.propTypes = {
    nextPage: PropType.number.isRequired,
    prevPage: PropType.number.isRequired,
}

const Butt = () => {
    const isMobile = useIsMobile()
    const { id } = useParams()
    const [buttImage, setButtImage] = useState(null)
    const [buttMetadata, setButtMetadata] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [buttFetched, setButtFetched] = useState(false)
    const [metadataFetched, setMetadataFetched] = useState(false)

    useEffect(() => {
        const fetchButtImage = async () => {
            try {
                let buttImageBlob
                if (isMobile) {
                    buttImageBlob = await getSmallButtImage(id)
                } else {
                    buttImageBlob = await getMediumButtImage(id)
                }
                const buttImageUrl = URL.createObjectURL(buttImageBlob)
                setButtImage(buttImageUrl)
            } catch (error) {
                if (error.message === 'Expected an image but got JSON response.') {
                    console.log('This butt has not been minted yet.')
                }
            }
            setButtFetched(true)
        }
        const fetchMetadata = async () => {
            const metadata = await getMetadata(id)
            setButtMetadata(metadata)
            setMetadataFetched(true)
        }
        setIsLoading(true)
        fetchButtImage()
        fetchMetadata()
    }, [id])

    const nextPage = parseInt(id) + 1
    const prevPage = parseInt(id) - 1

    useEffect(() => {
        if (buttFetched && metadataFetched) {
            setIsLoading(false)
            setButtFetched(false)
            setMetadataFetched(false)
        }
    }, [buttFetched, metadataFetched])

    return (
        <div className="buttPage">
            {isLoading ?
                <>
                    {isMobile ?
                            <h2 style={{ fontSize: '2rem' }}>Lazy Butt #{id}</h2> :
                            <h1>Lazy Butt #{id}</h1>
                        }
                    <div className="buttLoadingContainer">
                        <div className="loading"></div>
                    </div>
                    <ButtNav nextPage={nextPage} prevPage={prevPage} />
                </>
                :
                buttMetadata.attributes ?
                    <>
                        {isMobile ?
                            <h2 style={{ fontSize: '2rem' }}>Lazy Butt #{id}</h2> :
                            <h1>Lazy Butt #{id}</h1>
                        }
                        <div className="buttImageContainer">
                            {buttMetadata && <Traits buttMetadata={buttMetadata} />}
                            <a href={buttImage} target="_blank" rel="noreferrer">
                                <img src={buttImage} alt="butt" />
                            </a>
                        </div>
                        <ButtNav nextPage={nextPage} prevPage={prevPage} />
                    </> :
                    <>
                        {isMobile ?
                            <><h1>Err 404</h1><h2>Butt #{id} Not Found</h2></> :
                            <h1>Err 404: Butt #{id} Not Found</h1>}
                        <img src={LionNotFound} alt="404" />
                        <ButtNav nextPage={nextPage} prevPage={prevPage} />
                    </>
            }
        </div>
    )
}

export default Butt