import React, { useState } from 'react';
import UserDetailsModal from '../modal/UserDetailsModal';

const RedirectionUser = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        key={user.id}
        className="bg-white border border-[#5328EA] rounded-md p-4 mb-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-[#5328EA] rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {user.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-[#5328EA]">{user.userName}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {user.emailVerified ? 'Vérifié' : 'Non vérifié'}
          </span>
        </div>
      </div>
    </div>
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default RedirectionUser;