import STAYFit from './assets/img/STAYFit(transparent).png'

const Header = () => {
  return (
    <header className= " p-4 flex justify-between items-center">
    <img src={STAYFit} alt="Stayfit Logo" className="absolute top-14 right-8 w-40 h-auto" />
      {/* <h1 className="text-white text-3xl font-bold text-center mb-4">Stayfit</h1> */}
      {/* <nav>
        <ul className="flex space-x-4">
          <li><a href="#Impostazioni" className="text-white">Impostazioni</a></li>
          <li><a href="#Home" className="text-white">Home</a></li>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold">
          Login
        </button>
        </ul>
      </nav> */}
    </header>
  );
};

export default Header;
