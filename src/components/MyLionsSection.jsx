import { useState, useEffect } from 'react'
import MyLions from './MyLions'
import EmptyLion from '../assets/lion-silhouette.png'

const MyLionsSection = ({ isConnected, myLions, handleLionClick, selectedLions, address, myButts }) => {
    const [isLoadingPage, setIsLoadingPage] = useState(true)

    useEffect(() => {
        if (isConnected && myLions.length > 0) {
            setIsLoadingPage(false)
        }
    }, [isConnected, myLions])

    return (
        <div className="claim-area-left">
            <div className="claim-area-left-title">
                <h3>My Lazy Lions</h3>
                {myLions.length > 0 && isConnected ?
                    <p style={{ color: selectedLions.length === 5 ? '#00caf8' : '#aaa', fontSize: "1rem" }}>{selectedLions.length === 5 ? `Max Lions Selected` : `Choose Your Lion(s)`}</p>
                    :
                    null
                }
            </div>
            <div className="claim-area-left-info">
                <div className={`my-lions-container ${!isConnected ? 'empty' : null}`}>
                    {!isConnected ?
                        <div className="my-lions-empty">
                            <p>Connect your wallet to view your Lazy Lions.</p>
                        </div> :
                        isLoadingPage ? 
                        <div className='loading-container'>
                            <div className="loading"></div>
                        </div> 
                        : isConnected && myLions.length === 0 ?
                        <div className="my-lions-empty">
                            <p>You don't own any Lazy Lions yet.</p>
                            <p>Head over to the <a href="https://opensea.io/collection/lazy-lions" target='_blank' rel="noreferrer">Lazy Lions OpenSea</a> page to find some.</p>
                            <img src={EmptyLion} alt="Empty Lion" style={{ maxWidth: '250px' }} />
                        </div>
                        :
                        isConnected ?
                            <MyLions
                                lions={myLions}
                                butts={myButts}
                                handleLionClick={handleLionClick}
                                selectedLions={selectedLions}
                                address={address}
                            />
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default MyLionsSection