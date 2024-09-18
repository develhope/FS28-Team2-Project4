import './App.css';
import { TrySelect } from './MyComponents/TrySelect';
import { ToggleSwitch } from './MyComponents/ToggleSwitch';
import { CardMenu } from './MyComponents/CardMenu';
import { SubCards } from './MyComponents/SubCards';
import { CardProvider } from './MyComponents/CardProvider';
import Header from './MyComponents/Header.jsx'

const App = () => {
  return (
    <div className="App flex flex-col justify-center items-center gap-9 min-h-screen">
    <Header/>
      <CardProvider>
        <CardMenu></CardMenu>
        <SubCards></SubCards>
      </CardProvider>
    </div>
  );
}

export default App;



