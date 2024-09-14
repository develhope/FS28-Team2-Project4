

const Presentazione = () => {
  return (
    <section className="text-white text-center md:text-left p-12 py-20 w-full">
      <h2 className="text-5xl font-bold mb-4">IL BENESSERE,
      <br></br>
       PERSONALIZZATO.
       <br></br>
        SEMPLIFICATO
       </h2>
      <p className="text-xl text-white mb-6">Unisciti anche tu alla rivoluzione del Fitness,
      gestisci e monitora i piani di allenamento
      <br></br>
       e nutrizione dei tuoi clienti,
      offrendo soluzioni personalizzate in modo semplice e veloce.
      </p>
      <button className="w-[300px] h-10 border-2 rounded-[6px] outline-none border-custom-green text-primary-blue font-bold
                  bg-custom-green glow-button transition-all duration-300 ease-in-out active:bg-transparent
                  active:text-custom-green active:border-opacity-60">
        Unisciti ora!
      </button>
    </section>
  );
};

export default Presentazione;
