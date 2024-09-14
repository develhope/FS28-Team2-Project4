
import Header from './Header';
import Presentazione from './Parte1';
import Features from './Features';
import Footer from './Footer';
import backgroundImage from './assets/img/background.jpg';


function App() {
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

export default App;
