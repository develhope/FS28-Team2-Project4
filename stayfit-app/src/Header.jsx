import STAYFit from './assets/img/STAYFit(transparent).png'

const Header = () => {
  return (
    <header className= " p-4">
    <img src={STAYFit} alt="Stayfit Logo" className="absolute top-5 md:top-12 right-5 md:right-10 w-20 md:w-40 h-auto" />
    <h2 className="block md:hidden border-b-2 border-custom-green text-4xl text-white font-bold mb- py-8 text-center">Stay<span className="text-custom-green">Fit</span></h2>
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
