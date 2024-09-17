import './App.css';
import { TrySelect } from './MyComponents/TrySelect';
import { ToggleSwitch } from './MyComponents/ToggleSwitch';
import { CardMenu } from './MyComponents/CardMenu';
import { SubCards } from './MyComponents/SubCards';
import { CardProvider } from './MyComponents/CardProvider';
import LoginForm from './MyComponents/LoginForm';

const App = () => {
  return (
    <div className="App flex flex-col justify-center items-center gap-5">
      <LoginForm />
      <CardProvider>
        <CardMenu></CardMenu>
        <SubCards></SubCards>
      </CardProvider>
    </div>
  );
};

export default App;
