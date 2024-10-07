import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alimentazione from './MyComponents/Alimentazione';
import './App.css';
import { CardCliente } from './MyComponents/CardCliente';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Alimentazione />} />
          <Route path="/cardcliente" element={<CardCliente />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
