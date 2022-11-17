import {atom} from "recoil";


export const apiKeyState = atom<string|null>({
  key: 'apiKey',
  default: null
})
