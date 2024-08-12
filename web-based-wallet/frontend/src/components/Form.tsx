import axios from "axios";
import { BACKEND_URL, Wallet } from "../utils/utils";
import { useSetRecoilState, useRecoilState } from "recoil";
import { countState, mnemonicState, walletsState } from "../store/atom";

const Form = () => {
  const [mnemonic, setMnemonic] = useRecoilState<string>(mnemonicState);
  const [count, setCount] = useRecoilState<number>(countState);
  const setWallets = useSetRecoilState<Wallet[]>(walletsState);

  const handleGenerateMnemonic = async () => {
    const res = await axios.get(BACKEND_URL + "/mnemonic");
    setMnemonic(res.data.mnemonic);
  };

  const generateWallets = async () => {
    const res = await axios.post(BACKEND_URL + "/wallets", { mnemonic, count });

    setWallets(res.data.wallets);
    setMnemonic("");
    setCount(0);
  };

  return (
    <>
      <div className="flex flex-col h-fit justify-center w-1/2 shadow-md p-5 rounded-lg">
        <div className="m-3 text-lg font-poppins flex flex-col items-center justify-center sm:flex-row">
          <img
            src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032"
            alt=""
            className="h-5 w-5 mx-2"
          />
          <span className="text-[rgb(153,69,255)]">Solify</span>
          <span className="mx-2 text-center">Solana Wallet Generator</span>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-black cursor-pointer mx-2 "
              onClick={handleGenerateMnemonic}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mx-2 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(mnemonic)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
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
            className="bg-black w-fit h-fit py-2 px-4 text-white rounded-lg m-2 font-poppins"
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
