import React, { useState } from 'react';
import useAgora from './assets/hooks/useAgora';
//import JoinMeeting from './components/JoinMeeting';
import JoinMeeting from './assets/components/JoinMeeting';

const App = () => {
  const { localAudioTrack, localVideoTrack, remoteUsers } = useAgora();
  const [isInCall, setIsInCall] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  const handleCreateCall = () => {
    setIsInCall(true);
  };

  const handleJoinCall = () => {
    setIsInCall(true);
  };

  const handleLeaveCall = () => {
    setIsInCall(false);
  };

  const handleToggleParticipantModal = () => {
    setShowParticipantModal(prevState => !prevState);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isInCall ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Bienvenido a la Aplicación de Videollamadas</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg m-4"
            onClick={handleCreateCall}
          >
            Crear Llamada
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg m-4"
            onClick={handleJoinCall}
          >
            Unirme a Llamada
          </button>
        </div>
      ) : (
        <JoinMeeting />
      )}

      {showParticipantModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Participantes</h2>
            <div className="overflow-y-auto max-h-96">
              {remoteUsers.map(user => (
                <div key={user.uid} className="flex items-center justify-between p-3 mb-4 bg-gray-200 rounded-lg">
                  <p className="font-bold">Usuario: {user.uid}</p>
                </div>
              ))}
            </div>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg mt-4"
              onClick={handleToggleParticipantModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
