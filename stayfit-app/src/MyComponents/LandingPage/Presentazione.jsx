import { useState } from 'react';
import Button from '../Button';
import FormProfessionista from '../../FormProfessionista';
import LoginForm from '../LoginForm';

const Presentazione = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'overlay') {
      setRegisterOpen(false);
    }
  };

  return (
    <section className="text-white text-center md:text-left p-8 py-14 md:p-10 md:py-16 lg:p-12 lg:py-20 w-full">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4">
        IL BENESSERE,
        <br />
        PERSONALIZZATO.
        <br />
        SEMPLIFICATO
      </h2>
      <div className='md:max-w-[65vw]'>
        <p className="text-[15px] lg:text-lg text-white mb-6">
          Unisciti anche tu alla rivoluzione del Fitness, gestisci e monitora i
          piani di allenamento e nutrizione dei tuoi clienti, offrendo soluzioni personalizzate
          in modo semplice e veloce.
        </p>
      </div>
      <div className="md:w-32">
        <Button
          type="button"
          onClick={handleRegisterClick}
          text={'Unisciti ora!'}
        />
      </div>

      {isRegisterOpen && (
        <div
          id="overlay"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-10"
        >
          {!isLoginOpen ? (
            <FormProfessionista
              onClose={() => setRegisterOpen(false)}
              onChange={handleLoginClick}
            />
          ) : (
            <LoginForm onClose={() => setRegisterOpen(false)} />
          )}
        </div>
      )}
    </section>
  );
};

export default Presentazione;
