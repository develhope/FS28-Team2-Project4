import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const Supporto = ({ isSelected }) => {
  const [showSupportDetails, setShowSupportDetails] = useState(false);

  useEffect(() => {
    // Controllo se la card selezionata è "Supporto"
    if (isSelected === 4) {
      setShowSupportDetails(true);
    } else {
      setShowSupportDetails(false);
    }
  }, [isSelected]);

  return (
    <>
      {showSupportDetails && (
        <div className="bg-activated-card text-white p-6 rounded-lg shadow-md mt-6">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Supporto</h1>
            <p className="text-lg">Hai bisogno di assistenza? Siamo qui per aiutarti!</p>
          </header>

          {/* Sezione FAQ */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Domande Frequenti</h2>
            <div className="accordion">
              <div className="bg-activated-card p-4 rounded-lg mb-2 cursor-pointer">
                <h3 className="font-bold">Come posso reimpostare la mia password?</h3>
                <p className="text-sm mt-2 hidden">
                  Clicca su Hai dimenticato la password? nella schermata di login e segui le istruzioni.
                </p>
              </div>
              <div className="bg-activated-card p-4 rounded-lg mb-2 cursor-pointer">
                <h3 className="font-bold">Come posso aggiornare le mie informazioni di pagamento?</h3>
                <p className="text-sm mt-2 hidden">
                  Accedi al tuo profilo e vai alla sezione di pagamento per aggiornare i dettagli.
                </p>
              </div>
            </div>
          </section>

          {/* Sezione di Contatto */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Contattaci</h2>
            <p className="mb-4">Hai ancora bisogno di aiuto? Contatta il nostro team!</p>
            <button className="bg-green-400 text-activated-card p-3 rounded-lg shadow-md">
              Contattaci ora
            </button>
          </section>

          {/* Form di Supporto */}
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Invia una richiesta di supporto</h2>
            <form className="bg-activated-card p-4 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="bg-light-blue-shadow p-2 w-full rounded-md"
                  placeholder="Il tuo nome"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-light-blue-shadow p-2 w-full rounded-md"
                  placeholder="Il tuo indirizzo email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="message">Descrizione del problema</label>
                <textarea
                  id="message"
                  className="bg-light-blue-shadow p-2 w-full rounded-md"
                  placeholder="Descrivi il tuo problema"
                ></textarea>
              </div>
              <button className="bg-green-400 text-activated-card p-3 rounded-lg shadow-md">
                Invia richiesta
              </button>
            </form>
          </section>

          {/* Link utili */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Link utili</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <a href="#" className="bg-activated-card p-4 rounded-lg shadow-md block text-green-400 underline">
                Consulta la guida rapida
              </a>
              <a href="#" className="bg-activated-card p-4 rounded-lg shadow-md block text-green-400 underline">
                Visita la community
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
