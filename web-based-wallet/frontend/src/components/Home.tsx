
import Form from "./Form";
import Wallets from "./Wallets";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex-none flex items-center justify-center p-4 h-1/2">
        <Form />
      </div>

      <div className="flex-grow flex justify-center overflow-auto p-4 w-full no-scrollbar h-1/2">
        <Wallets />
      </div>
    </div>
  );
};



export default Home;
