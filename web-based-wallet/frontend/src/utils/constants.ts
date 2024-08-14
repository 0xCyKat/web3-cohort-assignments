export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Wallet {
  address: string;
  path: string;
}

export enum WalletType {
  SOL,
  ETH,
}
