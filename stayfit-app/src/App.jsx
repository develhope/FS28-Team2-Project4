import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './MyComponents/Dashboard';
import FormCliente from './FormCliente';
import LandingPage from './LandingPage';
import Alimentazione from './MyComponents/Alimentazione';
import Esercizio from './MyComponents/Esercizio';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form-cliente" element={<FormCliente />} />
          <Route path="/alimentazione/:clientId" element={<Alimentazione />} />
          <Route path="/esercizio" element={<Esercizio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
