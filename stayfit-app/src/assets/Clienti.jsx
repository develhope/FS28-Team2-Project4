const SquareButton = ({ icon }) => (
  <div className="p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    </div>
);

const Clienti = () => {
  return (
    <div className="p-3 bg-teal-800  text-white rounded-lg shadow-md cursor-pointer">
      <h2 className="text-4xl font-bold mb-4">Clienti</h2>
      <p>Visualizza elenco dei tuoi clienti.</p>
      <SquareButton
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm4-3a3 3 0 106 0 3 3 0 00-6 0zM8 10a4 4 0 00-4 4v2h12v-2a4 4 0 00-4-4H8zM2 14a4 4 0 014-4h2a4 4 0 014 4v2H2v-2z" />
            </svg>
          }
        />
    </div>
  );
};


export default Clienti;
