import React from 'react';

const AdminPanel = ({ participants, onAccept, onReject }) => {
  return (
    <div className="admin-panel">
      {participants.map((participant, index) => (
        <div key={index}>
          <span>{participant.uid}</span>
          <button onClick={() => onAccept(participant.uid)}>Accept</button>
          <button onClick={() => onReject(participant.uid)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
