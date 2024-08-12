import { atom } from 'recoil';
import { Wallet } from '../utils/utils';

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