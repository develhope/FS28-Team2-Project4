
import Clienti from './Clienti';
import Piani from './Piani';
import Statistiche from './Statistiche';
import Iscrizione from './Iscrizione';
import Supporto from './Supporto';
import Profilo from './Profilo';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-9 bg-teal-700 min-h-screen">
      <Clienti />
      <Piani />
      <Statistiche />
      <Iscrizione />
      <Supporto />
      <Profilo />
    </div>
  );
};

export default Dashboard;

