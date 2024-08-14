import express, { Express } from "express";
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import { Wallet, WalletType } from "./utils";
import { HDKey } from "micro-ed25519-hdkey";
import { ethers } from "ethers";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cors());

const generateSOLWallets = (mnemonic: string, count: number): Wallet[] => {
  const seed = mnemonicToSeedSync(mnemonic);

  const wallets: Wallet[] = [];

  for (let i = 1; i <= count; i++) {
    const path = `m/44'/501'/0'/${i}'`;
    const hd = HDKey.fromMasterSeed(seed.toString("hex"));
    const keypair = Keypair.fromSeed(hd.derive(path).privateKey);

    const wallet = {
      address: keypair.publicKey.toBase58(),
      path,
    };

    wallets.push(wallet);
  }

  return wallets;
};

const generateETHWallets = (mnemonic: string, count: number): Wallet[] => {
  const masterNode = ethers.Wallet.fromPhrase(mnemonic);
  const wallets: Wallet[] = [];

  for (let i = 0; i < count; i++) {
    const childNode = masterNode.derivePath(`0/${i}`); // Derive from master node
    wallets.push({
      address: childNode.address,
      path: `m/44'/60'/0'/0/${i}`, // Store full path for reference
    });
  }

  return wallets;
};

app.post("/wallets", (req, res) => {
  const { count, mnemonic, selected } = req.body;
  if (!validateMnemonic(mnemonic)) {
    return res.status(422).send({
      error: "Invalid mnemonic",
    });
  }

  const wallets: Wallet[] = [];
  (selected === WalletType.SOL ? generateSOLWallets : generateETHWallets)(
    mnemonic,
    count
  ).forEach((wallet) => {
    wallets.push(wallet);
  });

  res.send({ wallets });
});

app.get("/mnemonic", (req, res) => {
  const mnemonic = generateMnemonic();
  res.send({ mnemonic });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
