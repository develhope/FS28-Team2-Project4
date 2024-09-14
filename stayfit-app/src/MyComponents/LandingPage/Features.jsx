

const Features = () => {
  return (
    <section id="features" className="py-17 text-center">
      <h2 className="text-4xl text-white font-bold mb-7 p-2">Perchè Stay<span className="text-secondary-green">Fit</span> ?</h2>
      <div className="flex flex-col md:flex-row gap-4 p-10">
        <div className="bg-primary-blue bg-opacity-40 backdrop-blur-md text-white p-3 rounded-lg shadow-md flex-1">
          <h3 className="text-2xl font-bold mb-2 text-center md:text-left"><span className="text-secondary-green">Custom</span> Fitness</h3>
          <p className="text-left">Il nostro sistema genera routine su misura che
           si adattano perfettamente alle esigenze, capacità e obiettivi di ogni
           cliente e ti permette di monitorare i progressi, per garantire
           risultati ottimali e una gestione efficace.
           </p>
        </div>
        <div className="bg-primary-blue bg-opacity-40 backdrop-blur-md text-white p-5 rounded-lg shadow-md flex-1">
          <h3 className="text-2xl font-bold mb-2 text-center md:text-left"><span className="text-secondary-green">Custom</span> Nutrition</h3>
          <p className="text-left">Stayfit facilita la creazione di diete ecquilibrate e offre la possibilità
          di aggiornare facilmente i piani in base a cambiamenti dei clienti, assicurando
          una gestione nutrizionale precisa e flessibile.
          </p>
        </div>
        <div className="bg-primary-blue bg-opacity-40 backdrop-blur-md text-white p-5 rounded-lg shadow-md flex-1">
          <h3 className="text-2xl font-bold mb-2 text-center md:text-left"><span className="text-secondary-green">Simpl</span>ified</h3>
          <p className="text-left">Automatizza le attività quotidiane e utilizza strumenti avanzati per ottenere
          supporto continuo, permettendoti di concentrarti sull'espansione del tuo
          business e sull'ottimizzazione dei servizi per i tuoi clienti.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
