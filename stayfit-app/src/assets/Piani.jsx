const SquareButton = ({ icon }) => (
  <div className="p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    </div>
);

const Piani = () => {
  return (
    <div className="p-3 bg-teal-800  text-white rounded-lg shadow-md cursor-pointer">
      <h2 className="text-4xl font-bold mb-4">I tuoi piani</h2>
      <p>Esplora e modifica i piani personalizzati dei tuoi clienti</p>
      <SquareButton
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3 11a1 1 0 01-1 1H8a1 1 0 010-2h4a1 1 0 011 1zm0-4a1 1 0 01-1 1H8a1 1 0 010-2h4a1 1 0 011 1zM7 7h6a1 1 0 110 2H7a1 1 0 110-2z" />
            </svg>
          }
        />
    </div>
  );
};

export default Piani;

