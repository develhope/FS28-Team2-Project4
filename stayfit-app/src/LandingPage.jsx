import Header from './MyComponents/LandingPage/Header';
import Presentazione from './MyComponents/LandingPage/Presentazione';
import Features from './MyComponents/LandingPage/Features';
import Footer from './MyComponents/LandingPage/Footer';
import backgroundImage from './assets/img/background.jpg';


function LandingPage() {
  return (
    <div
     className="min-h-screen bg-cover bg-center relative"
     style={{
        backgroundImage: `linear-gradient(to bottom, rgba(1, 40, 47, 0.5), rgba(1, 40, 47,0.5)), url(${backgroundImage})`
      }}
    >
      <Header />
      <Presentazione />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
