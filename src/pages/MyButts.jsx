
const ButtCard = ({butt}) => {
    return (
        <div className="buttCard">
            <i
                className="fas fa-butt"
                style={{ fontSize: "100px", color: "white" }}
            ></i>
            <h3>Butt #{butt.buttId}</h3>
        </div>
    )
}

const ButtGrid = ({butts}) => {

    const buttCards = butts.map((butt) => {
        return (
            <ButtCard butt={butt} key={butt.buttId}/>
        )
    })

    return (
        <div className="buttGrid">
            {buttCards}
        </div>       
    )
}

const MyButts = ({butts = [{buttId: 1}, {buttId: 2}]}) => {

    return (
        <div>
            <h1>My Lazy Butts</h1>
            <ButtGrid butts={butts}/>
        </div>
    )
}

export default MyButts