const SquareButton = ({ icon }) => (
  <div className="p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    </div>
);
const Statistiche = () => {
  return (
    <div className="p-3 bg-teal-800  text-white rounded-lg shadow-md cursor-pointer">
      <h2 className="text-4xl font-bold mb-4">Statistiche</h2>
      <p>Analizza le decorrenze e i dati dei tuoi piani</p>
      <SquareButton
          label="Statistiche"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 11a1 1 0 011-1h1v9a1 1 0 11-2 0v-8zm5-5a1 1 0 011-1h1v14a1 1 0 11-2 0V6zm5 8a1 1 0 011-1h1v6a1 1 0 11-2 0v-5zm5-10a1 1 0 011-1h1v16a1 1 0 11-2 0V4z" />
            </svg>
          }
        />
    </div>
  );
};

export default Statistiche;

