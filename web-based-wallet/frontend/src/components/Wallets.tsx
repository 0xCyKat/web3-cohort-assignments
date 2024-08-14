import { useRecoilValue } from "recoil";
import { walletsState } from "../store/atom";

const Wallets = () => {
  const wallets = useRecoilValue(walletsState);

  return (
    <div>
      {
        wallets.length === 0 ? (
          <div className="font-bold font-poppins text-center">No wallets available</div>
        ) : (
          wallets.map((wallet, index) => (
            <div
              key={index}
              className="p-3 rounded-lg shadow-md border-black m-2 break-all "
            >
              <span className="">
                <span className="font-semibold">Address - </span>
                <span className="font-poppins">{wallet.address}</span>
              </span>
              <br />
              <span>
                <span className="font-semibold">Path - </span>
                <span className="font-poppins">{wallet.path}</span>
              </span>
            </div>
          ))
        )
      }
    </div>
  );
};

export default Wallets;
