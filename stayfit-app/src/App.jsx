import './App.css';
import { TrySelect } from './MyComponents/TrySelect';
import { ToggleSwitch } from './MyComponents/ToggleSwitch';

const App = () => {
  return (
    <div className="App flex flex-col justify-center items-center gap-5">
      <TrySelect></TrySelect>
      <h1 className='text-white'>Sono un...</h1>
      <ToggleSwitch></ToggleSwitch>
    </div>
  );
};

export default App;
