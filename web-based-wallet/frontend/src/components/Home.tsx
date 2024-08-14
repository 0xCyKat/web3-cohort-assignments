
import Form from "./Form";
import Selector from "./Selector";
import Wallets from "./Wallets";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Selector />
      <div className="flex-none flex items-center justify-center p-2 h-1/3 mx-3 sm:mx-0.5">
        <Form />
      </div>

      <div className="flex-grow flex justify-center overflow-y-auto p-2 mt-7 w-full no-scrollbar h-1/2">
        <Wallets />
      </div>
    </div>
  );
};



export default Home;
