import { useState } from 'react';

const Header = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <header className="p-4 flex justify-between items-center w-full">
      {/* Logo e nome app */}
      <div className="flex items-center space-x-6">
        <img
          src="src/assets/img/STAYFit(transparent).png"
          alt="StayFit"
          className="h-14 w-14"
        />
        <span className="hidden md:block text-white text-2xl font-bold">
          Stay<span className="text-secondary-green">Fit</span>
        </span>
      </div>

      {/* Icone e pulsanti a destra */}
      <div className="flex items-center space-x-6">
        {/* Notifiche */}
        <div className='relative'>
        <button className="text-white relative" onClick={toggleNotifications}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.003 6.003 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3a2.032 2.032 0 01-.595 1.595L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
          </svg>
          {/* Badge Notifiche */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            1
          </span>
        </button>

         {/* Menu delle notifiche */}
         {isNotificationsOpen && (
          <div className="absolute mt-2 w-64 bg-primary-blue border border-gray-300 rounded-lg shadow-lg z-10">
            <div className="p-6">
              <h2 className="text-white font-bold">Notifiche</h2>
              <ul className="mt-4 p-3 space-y-2 cursor-pointer hover:bg-light-blue-shadow">
                <li className="text-white">Notifica 1</li>
              </ul>
            </div>
          </div>

        )}
         </div>


        {/* Avatar utente */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="/src/assets/img/avatar.webp"
            alt="User Avatar"
            className="h-12 w-12 rounded-full"
          />
          <span className="hidden md:block text-white font-bold text-xl hover:text-secondary-green">Nome Utente</span>
        </div>

        {/* Logout */}
        <button className="hidden md:block text-white bg-red-500 px-5 py-2 rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
