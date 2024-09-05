import './App.css';
import Button from './MyComponents/Button';
import MobileButton from './MyComponents/MobileButton';
import Textbox from './MyComponents/Textbox';
import { Card } from './MyComponents/Card';

const App = () => {
  return (
    <div className="App">
      <div className="flex flex-col gap-5">
        <Textbox id={'name'} type={'text'} label={'Nome'} />
        <MobileButton />
        <Button text={'Unisciti ora!'} />
        <div className='flex gap-7'>
        <Card title={'Clienti'} description={`Visualizza l'elenco dei tuoi clienti`} icon={'payment'}></Card>
        <Card title={'Clienti'} description={'Visualizza i tuoi clienti'} icon={'payment'}></Card>
        <Card title={'Clienti'} description={'Visualizza i tuoi clienti'} icon={'payment'}></Card>
        <Card title={'Clienti'} description={'Visualizza i tuoi clienti'} icon={'payment'}></Card>
        </div>
      </div>
    </div>
  );
};

export default App;
