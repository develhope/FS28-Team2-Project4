import './App.css';
import { TrySelect } from './MyComponents/TrySelect';
import { ToggleSwitch } from './MyComponents/ToggleSwitch';
import { CardMenu } from './MyComponents/CardMenu';
import { SubCards } from './MyComponents/SubCards';
import { CardProvider } from './MyComponents/CardProvider';

const App = () => {
  return (
    <div className="App flex flex-col justify-center items-center gap-5">
      <TrySelect></TrySelect>
      <h1 className="text-white">Sono un...</h1>
      <ToggleSwitch></ToggleSwitch>
      <CardProvider>
        <CardMenu></CardMenu>
        <SubCards></SubCards>
      </CardProvider>
    </div>
  );
};

export default App;
