import express, { Express } from "express";
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from '@solana/web3.js';
import { HDKey } from 'micro-ed25519-hdkey'
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cors());

interface Wallets {
  publicKey: string;
  path: string 
}

const generateWallets = (mnemonic: string, count: number): Wallets[] => {
  const seed = mnemonicToSeedSync(mnemonic);

  const wallets: Wallets[] = [];

  for (let i = 1; i <= count; i++) {

    const path = `m/44'/501'/0'/${i}'`;
    const hd = HDKey.fromMasterSeed(seed.toString("hex")); 
    const keypair = Keypair.fromSeed(hd.derive(path).privateKey);

    const wallet = {
      publicKey: keypair.publicKey.toBase58(),
      path
    };

    wallets.push(wallet);
  }

  return wallets;
};


app.post("/wallets", (req, res) => {
  console.log(req.body);
  const { count, mnemonic } = req.body;
  if (!validateMnemonic(mnemonic)) {
    return res.status(422).send({
      error: "Invalid mnemonic",
    });
  }

  const wallets = generateWallets(mnemonic, count);
  res.send({ wallets });
});

app.get("/mnemonic", (req, res) => {
  const mnemonic = generateMnemonic();
  res.send({ mnemonic });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
}); 