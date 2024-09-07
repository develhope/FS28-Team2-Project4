import './App.css';
import Button from './MyComponents/Button';
import MobileButton from './MyComponents/MobileButton';
import Textbox from './MyComponents/Textbox';
import { CardMenu } from './MyComponents/CardMenu';
import { SubCards } from './MyComponents/subCards';
import { CardProvider } from './MyComponents/CardProvider';

const App = () => {
  return (
    <div className="App">
      <div className="flex flex-col gap-5">
        <Textbox id={'name'} type={'text'} label={'Nome'} />
        <MobileButton />
        <Button text={'Unisciti ora!'} />
        <CardProvider>
          <CardMenu></CardMenu>
          <SubCards></SubCards>
        </CardProvider>
      </div>
    </div>
  );
};

export default App;
