import './App.css';
import Textbox from './MyComponents/Textbox';

const App = () => {
  return (
    <div className="App">
      <Textbox id={'name'} type={'text'} label={'Nome'} />
    </div>
  );
};

export default App;
