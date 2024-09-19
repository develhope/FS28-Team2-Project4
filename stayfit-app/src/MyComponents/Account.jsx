import Button from "./Button";

export const Account = () => {
    return (
      <div className="bg-activated-card text-white text-left p-6 rounded-lg shadow-md dropdown md:flex md:flex-col md:items-center">
          <section className="flex justify-center items-center gap-5">
            <img src="src/assets/img/avatar.webp" alt="profile-picture" className="w-32 h-32" />
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-secondary-green">Mario Rossi</h3>
                <p className="">Username: <span className="font-bold">mario.rossi10</span></p>
                <p className="">Email: <span className="font-bold">mario.rossi@gmail.com</span></p>
                <p className="">Data di nascita: <span className="font-bold">10/10/1978</span></p>
                <p className="">Telefono: <span className="font-bold">+39 328 123 4567</span></p>
            </div>
          </section>
          <section className="flex flex-col gap-5 mt-10">
            <Button type={"button"} text={"Modifica dati personali"} />
            <Button type={"button"} text={`Modifica dati d'accesso`} />
            <Button type={"button"} text={"Cambia metodo di pagamento"}></Button>
          </section>
          <section className="flex flex-col items-center justify-center gap-5 mt-10">
            <a className="underline" href="#">Informativa sulla privacy</a>
            <a className="underline" href="#">Termini e condizioni aggiornati</a>
          </section>
      </div>
    );
  };
