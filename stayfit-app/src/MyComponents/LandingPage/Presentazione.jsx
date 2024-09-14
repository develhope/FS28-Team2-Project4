import { useState } from 'react';
import Button from '../MyComponents/Button';
import FormProfessionista from '../../FormProfessionista';

const Presentazione = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <section className="text-white text-center md:text-left p-12 py-20 w-full">
      <h2 className="text-5xl font-bold mb-4">
        IL BENESSERE,
        <br></br>
        PERSONALIZZATO.
        <br></br>
        SEMPLIFICATO
      </h2>
      <p className="text-xl text-white mb-6">
        Unisciti anche tu alla rivoluzione del Fitness, gestisci e monitora i
        piani di allenamento
        <br></br>e nutrizione dei tuoi clienti, offrendo soluzioni
        personalizzate in modo semplice e veloce.
      </p>
      <Button
        type="button"
        onClick={() => setRegisterOpen(true)}
        text={'Unisciti ora!'}
      />

      {isRegisterOpen && (
        <div className='h-full w-full flex justify-center items-center z-10'>
          <div className="flex justify-center items-center z-10 p-10 w-[400px] h-[350px] fixed bg-primary-blue border-2 border-secondary-green rounded-lg shadow-2xl">
            <FormProfessionista onClose={() => setRegisterOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Presentazione;
