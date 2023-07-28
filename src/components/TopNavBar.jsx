const TopNavBar = props => {
    return (
        <div className="topnav">
            <a href="https://twitter.com/lazybuttsnft" target="_blank" rel="noreferrer">Twitter</a>
            <a href="#mylions">My Lions</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a className="active" href="#home">Home</a>
            <a href="#mylazybutts">My Lazy Butts</a>
            <a href="#buttsopensea">LB OpenSea</a>
        </div>
    )
}

export default TopNavBar