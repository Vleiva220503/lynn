// useAgora.js

import { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  AGORA_APP_ID,
  TOKEN,
  CHANNEL_NAME,
  ENABLE_PRIMARY_CERTIFICATE,
} from "../../agora-config";

const useAgora = () => {
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);

  useEffect(() => {
    const initializeAgora = async () => {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        const remoteVideoTrack = user.videoTrack;
        setRemoteUsers((prevUsers) => [
          ...prevUsers,
          { uid: user.uid, videoTrack: remoteVideoTrack },
        ]);
      });

      try {
        await client.join(AGORA_APP_ID, CHANNEL_NAME, TOKEN || null);

        const [audioTrack, videoTrack] = await Promise.all([
          AgoraRTC.createMicrophoneAudioTrack(),
          AgoraRTC.createCameraVideoTrack(),
        ]);

        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);

        await client.publish([audioTrack, videoTrack]);
      } catch (error) {
        console.error("Failed to join Agora channel:", error);
      }
    };

    initializeAgora();

    return () => {
      localAudioTrack && localAudioTrack.close();
      localVideoTrack && localVideoTrack.close();
    };
  }, []);

  return {
    localAudioTrack,
    localVideoTrack,
    remoteUsers,
  };
};

export default useAgora;
