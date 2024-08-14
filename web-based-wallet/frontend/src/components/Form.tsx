import axios from "axios";
import { GenerateMnemonicIcon, CopyIcon, WallifyIcon } from "../utils/utils";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  countState,
  mnemonicState,
  selectedWalletState,
  walletsState,
} from "../store/atom";
import { BACKEND_URL, Wallet, WalletType } from "../utils/constants";

const Form = () => {
  const [mnemonic, setMnemonic] = useRecoilState<string>(mnemonicState);
  const [count, setCount] = useRecoilState<number>(countState);
  const setWallets = useSetRecoilState<Wallet[]>(walletsState);
  const selected = useRecoilValue(selectedWalletState);

  const generateWallets = async () => {
    const res = await axios.post(BACKEND_URL + "/wallets", { mnemonic, count, selected });

    setWallets(res.data.wallets);
    setMnemonic("");
    setCount(0);
  };

  return (
    <>
      <div className="flex flex-col h-fit justify-center w-full sm:w-1/2 p-4 shadow-md rounded-lg">
        <div className="m-3 text-lg font-poppins flex flex-col items-center justify-center sm:flex-row">
          <WallifyIcon />
          <span className="font-semibold font-sans">Wallify</span>
          <span className="mx-2 text-center">
            <span>
              {selected === WalletType.SOL ? "Solana" : "Ethereum"}
            </span>{" "}
            Wallet Generator
          </span>
        </div>
        <div className="flex flex-col items-center w-full sm:flex-row">
          <input
            value={mnemonic || ""}
            type="text"
            placeholder="Enter mnemonic"
            className="border border-1 border-black p-2 rounded-lg m-2 w-full font-poppins"
            onChange={(e) => setMnemonic(e.target.value)}
          />
          <div className="flex flex-row m-2">
            <GenerateMnemonicIcon />
            <CopyIcon mnemonic={mnemonic} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full sm:flex-row">
          <input
            className="border border-1 border-black p-2 rounded-lg m-2 w-full font-poppins sm:w-1/2"
            placeholder="Enter no of wallets"
            type="number"
            value={count === 0 ? "" : count}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <button
            className="bg-black w-fit h-fit py-2 px-4 text-white rounded-lg m-2 font-poppins hover:bg-slate-800"
            onClick={generateWallets}
          >
            Generate
          </button>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Form;
