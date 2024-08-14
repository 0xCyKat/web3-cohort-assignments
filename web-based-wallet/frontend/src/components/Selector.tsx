import { useRecoilState } from "recoil";
import { selectedWalletState } from "../store/atom";
import { WalletType } from "../utils/constants";

const Selector = () => {
  const [selected, setSelected] = useRecoilState(selectedWalletState);

  return (
    <>
      <div className="flex flex-row justify-evenly">
        <div
          onClick={() => setSelected(WalletType.SOL)}
          className={
            "rounded-3xl cursor-pointer py-2 px-4 m-4 outline outline-1 " +
            (selected === WalletType.SOL ? "bg-black text-white transition-all ease-in-out duration-500" : "")
          }
        >
          Solana
        </div>
        <div
          onClick={() => setSelected(WalletType.ETH)}
          className={
            "rounded-3xl cursor-pointer py-2 px-4 m-4 outline outline-1 " +
            (selected === WalletType.ETH ? "bg-black text-white transition-all ease-in-out duration-500" : "")
          }
        >
          Ethereum
        </div>
      </div>
    </>
  );
};

export default Selector;
