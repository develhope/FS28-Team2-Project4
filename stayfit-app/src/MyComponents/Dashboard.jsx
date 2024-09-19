import Header from "./Header";
import { CardProvider } from "./CardProvider";
import { CardMenu } from "./CardMenu";


const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <CardProvider>
        <CardMenu></CardMenu>
      </CardProvider>
    </div>
  );
};

export default Dashboard;

