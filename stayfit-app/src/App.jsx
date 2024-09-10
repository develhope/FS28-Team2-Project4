import './App.css';
import FormCliente from './FormCliente';
import Textbox from './MyComponents/Textbox';

const App = () => {
  return (
    <div className="App">
      <FormCliente>
        <Textbox></Textbox>
      </FormCliente>
    </div>
  );
};

export default App;
