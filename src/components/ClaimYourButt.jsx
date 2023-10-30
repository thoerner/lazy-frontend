import { Link } from "react-router-dom";

const ClaimYourButt = () => {
  return (
    <div className="card marker">
      👇 Claim your Lazy Butt! 👇
      <br />
      <br />
      <Link to="/claim">
        <button className="zoomy">Claim My Butts!</button>
      </Link>
    </div>
  );
};

export default ClaimYourButt;
