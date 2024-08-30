const SquareButton = ({ icon }) => (
  <div className="p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    </div>
);

const Supporto = () => {
  return (
    <div className="p-3 bg-teal-800  text-white rounded-lg shadow-md cursor-pointer">
      <h2 className="text-4xl font-bold mb-4">Supporto</h2>
      <p>Stai riscontrando un problema? Contattaci!</p>
      <SquareButton
          label="Supporto"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927C9.562 1.617 11.056 1 12.5 1c2.485 0 4.5 2.015 4.5 4.5S14.985 10 12.5 10h-1a1 1 0 00-1 1v4H9a1 1 0 110-2h1V7a1 1 0 011-1h2a2.5 2.5 0 10-2.551-4.073l-.8-.707A4.5 4.5 0 0112.5 0C15.538 0 18 2.462 18 5.5S15.538 11 12.5 11h-1a2.5 2.5 0 00-2.5 2.5v4a1 1 0 01-2 0v-4a2.5 2.5 0 00-2.5-2.5h-1A1.5 1.5 0 012 10v-1a1.5 1.5 0 011.5-1.5h1A4.5 4.5 0 019.049 2.927z" />
            </svg>
          }
        />
    </div>
  );
};

export default Supporto;



