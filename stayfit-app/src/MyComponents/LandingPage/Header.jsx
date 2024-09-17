import STAYFit from '../../assets/img/STAYFit(transparent).png'


const Header = () => {
  return (
    <header className= " p-4">
    <img src={STAYFit} alt="Stayfit Logo" className="absolute top-5 md:top-12 right-5 md:right-10 w-20 md:w-40 h-auto" />
    <h2 className="block md:hidden border-b-2 border-secondary-green text-4xl text-white font-bold mb- py-8 text-center">Stay<span className="text-custom-green">Fit</span></h2>
    </header>
  );
};

export default Header;
