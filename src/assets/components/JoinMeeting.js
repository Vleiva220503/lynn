import React, { useState } from 'react';
import useAgora from '../hooks/useAgora';
import Participant from './Participant';
import Video from './Video'; 
import AdminPanel from './AdminPanel'; 

const JoinMeeting = () => {
  const { localAudioTrack, localVideoTrack, remoteUsers } = useAgora();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="meeting">
      <div className="local">
        <Video track={localVideoTrack} />
      </div>
      <div className="remote">
        {remoteUsers.map(user => (
          <Participant key={user.uid} user={user} />
        ))}
      </div>
      {isAdmin && <AdminPanel participants={remoteUsers} />}
    </div>
  );
};

export default JoinMeeting;
