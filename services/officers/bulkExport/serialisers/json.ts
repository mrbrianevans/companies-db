import {Serialiser} from "./serialise.js";

export const serialiseJson: Serialiser = (record) => {
  // this can be made faster by using a JSONSchema compiled stringify function such as https://github.com/fastify/fast-json-stringify
  return JSON.stringify(record) + '\n'
};
