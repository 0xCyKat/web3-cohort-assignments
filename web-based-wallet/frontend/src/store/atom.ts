import { atom } from 'recoil';
import { Wallet, WalletType } from '../utils/constants';

export const countState = atom<number>({
    key: 'countState',
    default: 0
});

export const mnemonicState = atom<string>({
    key: 'mnemonicState',
    default: ''
});

export const walletsState = atom<Wallet[]>({
    key: 'walletsState',
    default: []
});


export const selectedWalletState = atom<WalletType>({
    key: 'selectedWalletState',
    default: WalletType.SOL
});