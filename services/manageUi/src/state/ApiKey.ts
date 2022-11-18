import {atom, AtomEffect} from "recoil";

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};


type ApiKeys = {key: string, name: string, baseUrl: string, created?: string}[]

export const apiKeysState = atom<ApiKeys>({
  key: 'apiKeys',
  default: [],
  effects: [
    localStorageEffect('api_keys'),
  ]
})
