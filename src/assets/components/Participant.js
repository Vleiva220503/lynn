import React from "react";
import Video from "./Video";

const Participant = ({ user }) => {
  return (
    <div className="participant">
      <Video track={user.videoTrack} />
      <div>{user.uid}</div>
    </div>
  );
};

export default Participant;
