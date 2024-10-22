import { useState, useEffect } from 'react';
import Button from './Button';

export const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [birthDate, setBirthDate] = useState(null)

  useEffect(() => {
    const userToParse = localStorage.getItem('user');
    const userInfo = JSON.parse(userToParse);
    if (userInfo) {
      setUserInfo(userInfo);
      if(userInfo.birth_date) {
      const isoDateString = userInfo.birth_date;
      const date = new Date(isoDateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('it-IT', options);
      setBirthDate(formattedDate)
      }
    } else {
      setUserInfo(null);
    }
  }, []);

  const loadingMsg = 'Caricamento...';

  return (
    <div className="bg-activated-card text-white text-left p-6 rounded-lg shadow-md dropdown md:flex md:flex-col md:items-center">
      <section className="flex justify-center items-center gap-5">
        <img
          src="src/assets/img/avatar.webp"
          alt="profile-picture"
          className="w-32 h-32"
        />
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-secondary-green">
            {userInfo
              ? `${userInfo.first_name} ${userInfo.last_name}`
              : loadingMsg}
          </h3>
          <p className="">
            Username:{' '}
            <span className="font-bold">
              {userInfo ? `${userInfo.username}` : loadingMsg}
            </span>
          </p>
          <p className="">
            Email:{' '}
            <span className="font-bold">
              {userInfo ? `${userInfo.email}` : loadingMsg}
            </span>
          </p>
          <p className="">
            Data di nascita:{' '}
            <span className="font-bold">
              {userInfo ? `${birthDate}` : loadingMsg}
            </span>
          </p>
          <p className="">
            Telefono:{' '}
            <span className="font-bold">
              {userInfo ? `${userInfo.phone}` : loadingMsg}
            </span>
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-5 mt-10 justify-center items-center">
        <Button type={'button'} text={'Modifica dati personali'} />
        <Button type={'button'} text={`Modifica dati d'accesso`} />
        <Button type={'button'} text={'Cambia metodo di pagamento'}></Button>
      </section>
      <section className="flex flex-col items-center justify-center gap-5 mt-10">
        <a className="underline" href="#">
          Informativa sulla privacy
        </a>
        <a className="underline" href="#">
          Termini e condizioni aggiornati
        </a>
      </section>
    </div>
  );
};
