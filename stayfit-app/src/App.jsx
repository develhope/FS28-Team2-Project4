import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './MyComponents/Dashboard';
import FormCliente from './FormCliente';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form-cliente" element={<FormCliente />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



