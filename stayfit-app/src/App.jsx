import './App.css';
import Button from './MyComponents/Button';
import MobileButton from './MyComponents/MobileButton';
import Textbox from './MyComponents/Textbox';

const App = () => {
  return (
    <div className="App">
      <div className="flex flex-col gap-5">
        <Textbox id={'name'} type={'text'} label={'Nome'} />
        <MobileButton />
        <Button text={'Unisciti ora!'} />
      </div>
    </div>
  );
};

export default App;
