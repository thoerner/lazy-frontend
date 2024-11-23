import PropTypes from 'prop-types';
import { useState } from 'react';
import '../styles/ThanksgivingSelector.css';

const ThanksgivingSelector = ({ myLions, selectedLionId, onConfirm, onCancel }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [customLionId, setCustomLionId] = useState('');

  const handleFriendToggle = (lionId) => {
    if (selectedFriends.includes(lionId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== lionId));
    } else if (selectedFriends.length < 4) {
      setSelectedFriends([...selectedFriends, lionId]);
    }
  };

  const handleCustomLionAdd = () => {
    const lionId = parseInt(customLionId);
    if (isNaN(lionId) || lionId < 0 || lionId > 9999) {
      alert('Please enter a valid Lion ID (0-9999)');
      return;
    }
    if (lionId.toString() === selectedLionId) {
      alert('This Lion is already at the head of the table!');
      return;
    }
    if (selectedFriends.includes(lionId.toString())) {
      alert('This Lion is already invited!');
      return;
    }
    if (selectedFriends.length >= 4) {
      alert('You can only invite up to 4 friends!');
      return;
    }
    setSelectedFriends([...selectedFriends, lionId.toString()]);
    setCustomLionId('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomLionAdd();
    }
  };

  return (
    <div className="thanksgivingSelector">
      <div className="thanksgivingHeader">
        <h3>Select Lions to Join Your Thanksgiving Dinner</h3>
        <p>Choose up to 4 friends to join your lion at the table</p>
      </div>

      <div className="customLionInput">
        <input
          type="number"
          min="0"
          max="9999"
          value={customLionId}
          onChange={(e) => setCustomLionId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter any Lion ID (0-9999)"
        />
        <button onClick={handleCustomLionAdd}>Add Lion</button>
      </div>
      
      <div className="selectedFriends">
        {selectedFriends.map(lionId => (
          <div key={lionId} className="selectedFriend">
            #{lionId}
            <button onClick={() => handleFriendToggle(lionId)}>✕</button>
          </div>
        ))}
      </div>

      <div className="divider">
        <span>Your Lions</span>
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