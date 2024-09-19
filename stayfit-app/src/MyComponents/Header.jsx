import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import Button from './Button';
import users from '../../database/dbProfessionista.json';

const Header = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

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
        <span className="hidden md:block text-white text-2xl font-medium">
          Stay<span className="text-secondary-green font-light">Fit</span>
        </span>
      </div>

      {/* Icone e pulsanti a destra */}
      <div className="flex items-center space-x-6">
        {/* Notifiche */}
        <div className="relative">
          <button className="text-white relative" onClick={toggleNotifications}>
            <Icon type={'notifications'} />
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
          <span className="hidden md:block text-white hover:text-secondary-green">
            Nome Utente
          </span>
        </div>

        {/* Logout */}
        <div className='w-32'>
          <Button
            type={''}
            onClick={() => navigate('/')}
            text={'Logout'}
            color={'#800E13'}
            txtcolor={'#FFF'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
