import ButtLogo from './ButtLogo.jsx'
import TeamInfo from './TeamInfo.jsx'
import HowToBuildAButt from '../assets/how-to-build-a-butt.jpeg'

const Main = ({ isMobile }) => {
    return (
        <div className="main">
            <div>
                <ButtLogo
                    isMobile={isMobile}
                />
            </div>
            <div className="card" style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center' }}>
                <span style={{ margin: '0 auto' }}>Lazy Butts GIF</span>
            </div>
            <div className="card">
                <h1>Behind the Tail</h1>
                <h2>The Lazy Butts Story</h2>
                <p>Welcome to the extraordinary kingdom of the 3D Kings! We are a group of playful and mighty Lazy Lions, who've ventured far beyond the savannah and into the realm of the NFTs!</p>
                <p>In our dynamic jungle, we are not just about the roars, the mane, or the striking, swaggering stride; we're about the whole lion! So, we thought - why stop at the top half? Let's give our pride something to truly ROAR about! And thus, the Lazy Butts NFT was born.</p>
                <p>As the 3D Kings, we understand that every lion in our pride is a complete individual - from the tip of their majestic mane right down to their unique and expressive...well...butts. We realized our community was missing something crucial: a bottom half!</p>
                <p>Lazy Butts NFT is our fun and quirky answer to the partial portrayal of our mighty lions. We decided it was high time we extended our majesty to encompass our whole selves! It's our way of adding a little bit more lion to the pride, bringing some levity and humor to the blockchain, and creating a fuller, well-rounded NFT experience.</p>
                <p>Each Lazy Butt NFT is an unofficial extension designed especially for the Lazy Lion NFT holders. And just like our original Lazy Lions, these unique extensions are as diverse and distinctive as the lions in our pride. Whether your lion has a shiny, glittering bottom or a rugged, warrior's wear, the Lazy Butts NFT lets you express your full lion-ness in a whole new way.</p>
                <p>So come join the hilarity, embrace the charm, and let's ROAR with laughter together! Adopt a Lazy Butt today, and show the world that your Lazy Lion truly is the king of the NFT jungle, from top to bottom!</p>
            </div>
            <div className="card" style={!isMobile ? null : null}>
                {isMobile ? <h2>What's in a Butt?</h2> :
                    <h1>What's in a Butt?</h1>
                }
                <img src={HowToBuildAButt} className="how-to-build-a-butt" alt="How to build a butt" />
                {isMobile ? <div className="howto" alt="How to build a butt" ></div> : null}
            </div>
            <div className="card">
                👇 Claim your Lazy Butt! 👇<br /><br />
                <button>Add Sass to My Lion's...!</button>
            </div>
            <div className="card" style={{ width: '500px', height: '300px', display: 'flex', alignItems: 'center' }}>
                <span style={{ margin: '0 auto' }}>Infographic of mint funds allocation</span>
            </div>
            <div className="card">
                <h2>Embrace the Full ROAR of Your Lion with <span style={{ fontSize: 'larger' }}>Lazy Butts</span>!</h2>
                <p style={{ fontSize: '50px', margin: '0' }}>🦁 🍑</p>
                <p>What embodies the spirit of a lion? Is it the majestic stride, the wind rustling through the mane, or the striking, earth-shaking roar? We believe it's all about the Pride! And in our diverse Pride of Lazy Lions, we've made a thunderous #ROAR that echoes through the NFT landscape.</p>
                <p>Our ever-passionate Lazy Lion owners simply can't get enough of showing off their kings of the jungle. From vibrant illustrations to awe-inspiring derivatives, the creativity and joy our community expresses through their lions is truly inspiring.</p>
                <p>As the 3D Kings, we're always looking out for our Pride. We saw an opportunity to help you express your lion even more boldly, extending its splendor and ROAR! Our vision? To provide a new dimension of expression and opportunity for our community members to enhance their unique IP.</p>
                <p>Blessed with a troupe of incredibly talented individuals in our Pride, we devised a plan to offer a low-cost claim for all lion holders, all while supporting the growth of the 3D Kings community. A significant portion of the funds raised through Lazy Butts will go directly to the 3D Kings Community Wallet, further fueling our collective efforts.</p>
                <p>Everyone who had a paw in crafting the Lazy Butts project is a proud owner of a 3D Lazy NFT. It's worth noting, however, that while we all are a part of the Lazy Lions community, Lazy Butts is not officially affiliated with the Lazy Lions project.</p>
                <p>Lazy Butts is an independent venture, created by lions, for lions. A delightful, full-bodied expression of our love for our Lazy Lions, and a testament to the creativity, fun, and camaraderie within our Pride. Embrace the ROAR, adopt a Lazy Butt today!</p>
                <p style={{ fontSize: '50px', margin: '0' }}>🦁 👑 🎉</p>
            </div>
            <div className="card" style={!isMobile ? { maxWidth: '90vw', flexWrap: 'wrap' } : null}>
                <TeamInfo
                    isMobile={isMobile}
                />
            </div>
        </div>
    )
}

export default Main;