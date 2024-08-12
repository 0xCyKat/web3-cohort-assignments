
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Wallet {
    publicKey: string;
    path: string;
}