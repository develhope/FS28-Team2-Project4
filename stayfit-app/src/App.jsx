import './App.css';
import { CardMenu } from './MyComponents/CardMenu';
import { CardProvider } from './MyComponents/CardProvider';

const App = () => {
  return (
    <div className="App flex flex-col justify-center items-center gap-5">
      <CardProvider>
        <CardMenu></CardMenu>
      </CardProvider>
    </div>
  );
};

export default App;
