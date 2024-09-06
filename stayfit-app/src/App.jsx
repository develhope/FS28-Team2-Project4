import './App.css';
import Button from './MyComponents/Button';
import MobileButton from './MyComponents/MobileButton';
import Textbox from './MyComponents/Textbox';
import { CardMenu } from './MyComponents/CardMenu';

const App = () => {
  return (
    <div className="App">
      <div className="flex flex-col gap-5">
        <Textbox id={'name'} type={'text'} label={'Nome'} />
        <MobileButton />
        <Button text={'Unisciti ora!'} />
        <CardMenu></CardMenu>
      </div>
    </div>
  );
};

export default App;
