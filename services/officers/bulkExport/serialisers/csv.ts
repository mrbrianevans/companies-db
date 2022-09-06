import {Serialiser} from "./serialise.js";

export const serialiseCsv: Serialiser = (record) => {
  // this probably needs to be done by an external package such as Papa
  return Object.values(record).join(',')
};
