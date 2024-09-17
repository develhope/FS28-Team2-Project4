import { useState } from 'react';
import Button from '../Button';
import FormProfessionista from '../../FormProfessionista';

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
    <section className="text-white text-center md:text-left p-12 py-20 w-full">
      <h2 className="text-5xl font-bold mb-4">
        IL BENESSERE,
        <br />
        PERSONALIZZATO.
        <br />
        SEMPLIFICATO
      </h2>
      <p className="text-xl text-white mb-6">
        Unisciti anche tu alla rivoluzione del Fitness, gestisci e monitora i
        piani di allenamento
        <br />e nutrizione dei tuoi clienti, offrendo soluzioni personalizzate
        in modo semplice e veloce.
      </p>
      <Button
        type="button"
        onClick={handleRegisterClick}
        text={'Unisciti ora!'}
      />

      {isRegisterOpen && (
        <div
          id="overlay"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-10"
        >
          <div className="relative z-20 p-10 w-[400px] h-auto bg-primary-blue border-2 border-secondary-green rounded-lg shadow-2xl">
            <button
              onClick={() => setRegisterOpen(false)}
              className="absolute top-2 right-2 text-white"
            >
              X
            </button>

            {!isLoginOpen ? (
              <FormProfessionista onClose={() => setRegisterOpen(false)} />
            ) : (
              <FormProfessionista onClose={() => setRegisterOpen(false)} />
            )}

            {!isLoginOpen && (
              <p className="text-white text-center mt-6">
                Sei già iscritto?{' '}
                <span
                  onClick={handleLoginClick}
                  className="text-secondary-green underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Presentazione;
