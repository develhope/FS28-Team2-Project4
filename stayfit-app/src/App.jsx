import './App.css';
import MobileButton from './MyComponents/MobileButton';
import Textbox from './MyComponents/Textbox';

const App = () => {
  return (
    <div className="App">
      <Textbox id={'name'} type={'text'} label={'Nome'} />
      <MobileButton />
    </div>
  );
};

export default App;
