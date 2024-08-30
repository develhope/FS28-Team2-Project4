const SquareButton = ({ icon }) => (
  <div className="p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    </div>
);

const Profilo = () => {
  return (
    <div className="p-3 bg-teal-800  text-white rounded-lg shadow-md cursor-pointer">
      <h2 className="text-4xl font-bold mb-4">Il tuo profilo</h2>
      <p>Gestisci le impostazioni del tuo profilo</p>
      <SquareButton
          label="Il tuo profilo"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM3 18a7 7 0 1114 0H3z" />
            </svg>
          }
        />
    </div>
  );
};

export default Profilo;


