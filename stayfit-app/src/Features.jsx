

const Features = () => {
  return (
    <section id="features" className="py-17 bg-teal-700 text-center">
      <h2 className="text-4xl font-bold mb-10 p-2">Perchè StayFit?</h2>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-2xl font-bold mb-2">Custom Fitness</h3>
          <p>Il nostro sistema genera routine su misura che
           si adattano perfettamente alle esigenze, capacità eoviettivi di ogni
           cliente e ti permette di monitorare i progressi, per garantire
           risultati ottimali e una gestione efficace.
           </p>
        </div>
        <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-2xl font-bold mb-2">Custom Nutrition</h3>
          <p>Stayfit facilita la creazione di diete ecquilibrate e offre la possibilità
          di aggiornare facilmente i piani in base a cambiamenti dei clienti, assicurando
          una gestione nutrizionale precisa e flessibile.
          </p>
        </div>
        <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-2xl font-bold mb-2">Simplified</h3>
          <p>Automatizza le attività quotidiane e utilizza strumenti avanzati per ottenere
          supporto continuo, permettendoti di concentrarti sull'espansione del tuo 
          business e sull'ottimizzazione dei servizi per i tuoi clienti.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
