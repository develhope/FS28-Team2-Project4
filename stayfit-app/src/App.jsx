import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alimentazione from './MyComponents/Alimentazione';
import Esercizio from './MyComponents/Esercizio';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Alimentazione />} />
          <Route path="/esercizio" element={<Esercizio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
