import { atom } from 'recoil';

export const authAtom = atom({
  key: 'auth',
  default: {
    user: null,
    isAuthenticated: false,
  },
});
