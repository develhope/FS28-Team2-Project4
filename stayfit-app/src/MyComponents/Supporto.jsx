import Button from './Button.jsx';

export const Supporto = () => {
  return (
    <>
      <div className="bg-activated-card text-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-col justify-center text-start mt-5">
            <header className="mb-6">
              <h3 className="text-3xl font-bold mb-2 text-secondary-green">
                Supporto
              </h3>
              <p className="text-lg">
                Hai bisogno di assistenza? Siamo qui per aiutarti!
              </p>
            </header>
            <section className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-secondary-green">
                Domande Frequenti
              </h3>
              <div className="accordion">
                <div className="bg-activated-card p-4 rounded-lg mb-2 cursor-pointer">
                  <h3 className="font-bold">
                    Come posso reimpostare la mia password?
                  </h3>
                  <p className="text-sm mt-2 hidden">
                    Clicca su Hai dimenticato la password? nella schermata di
                    login e segui le istruzioni.
                  </p>
                </div>
                <div className="bg-activated-card p-4 rounded-lg mb-2 cursor-pointer">
                  <h3 className="font-bold">
                    Come posso aggiornare le mie informazioni di pagamento?
                  </h3>
                  <p className="text-sm mt-2 hidden">
                    Accedi al tuo profilo e vai alla sezione di pagamento per
                    aggiornare i dettagli.
                  </p>
                </div>
              </div>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-secondary-green">
                Contattaci
              </h2>
              <p className="mb-4">
                Hai ancora bisogno di aiuto? Contatta il nostro team!
              </p>
            </section>
          </div>
          <section className="mb-5 py-10 flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold mb-4 text-secondary-green">
              Invia una richiesta di supporto
            </h3>
            <form className="bg-primary-blue p-4 rounded-lg shadow-md w-full">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="name">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-light-blue-shadow p-2 w-full rounded-md"
                  placeholder="Il tuo nome"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-light-blue-shadow p-2 w-full rounded-md"
                  placeholder="Il tuo indirizzo email"
                />
              </div>
              <div className="mb-2 py-4">
                <label className="block mb-2" htmlFor="message">
                  Descrizione del problema
                </label>
                <textarea
                  id="message"
                  className="bg-light-blue-shadow p-2 w-full rounded-md"
                  placeholder="Descrivi il tuo problema"
                ></textarea>
              </div>
              <div className='flex justify-center'>
                <Button text={'Invia Richiesta'} type={'button'}></Button>
              </div>
            </form>
          </section>
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Link utili
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <a
              href="#"
              className="bg-primary-blue p-4 rounded-lg shadow-lg block text-white"
            >
              Consulta la guida rapida
            </a>
            <a
              href="#"
              className="bg-primary-blue p-4 rounded-lg shadow-lg block text-white"
            >
              Visita la community
            </a>
          </div>
        </section>
      </div>
    </>
  );
};
