const TopNavBar = props => {
    return (
        <div className="topnav">
            <a href="https://twitter.com/lazybuttsnft" target="_blank" rel="noreferrer">Twitter</a>
            <a href="#mylions" target="_blank" rel="noreferrer">My Lions</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a className="active" href="#home" target="_blank" rel="noreferrer">Home</a>
            <a href="#mylazybutts" target="_blank" rel="noreferrer">My Lazy Butts</a>
            <a href="#buttsopensea" target="_blank" rel="noreferrer">LB OpenSea</a>
        </div>
    )
}

export default TopNavBar