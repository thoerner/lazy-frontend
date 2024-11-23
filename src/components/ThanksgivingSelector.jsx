import PropTypes from 'prop-types';
import { useState } from 'react';
import '../styles/ThanksgivingSelector.css';

const ThanksgivingSelector = ({ myLions, selectedLionId, onConfirm, onCancel }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleFriendToggle = (lionId) => {
    if (selectedFriends.includes(lionId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== lionId));
    } else if (selectedFriends.length < 4) {
      setSelectedFriends([...selectedFriends, lionId]);
    }
  };

  return (
    <div className="thanksgivingSelector">
      <div className="thanksgivingHeader">
        <h3>Select Lions to Join Your Thanksgiving Dinner</h3>
        <p>Choose up to 4 friends to join your lion at the table</p>
      </div>
      
      <div className="friendsGrid">
        {myLions
          .filter(lion => lion.id !== selectedLionId)
          .map(lion => (
            <div 
              key={lion.id}
              className={`friendOption ${selectedFriends.includes(lion.id) ? 'selected' : ''}`}
              onClick={() => handleFriendToggle(lion.id)}
            >
              <img src={lion.image} alt={`Lion #${lion.id}`} />
              <div className="friendLabel">#{lion.id}</div>
            </div>
          ))}
      </div>

      <div className="thanksgivingActions">
        <button className="cancelButton" onClick={onCancel}>
          Cancel
        </button>
        <button className="confirmButton" onClick={() => onConfirm(selectedFriends)}>
          Confirm ({selectedFriends.length}/4 Selected)
        </button>
      </div>
    </div>
  );
};

ThanksgivingSelector.propTypes = {
  myLions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedLionId: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ThanksgivingSelector; 