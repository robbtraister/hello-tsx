import { createContext, useContext } from "react";

import storeData from "public/store.json";
export type Store = typeof storeData;

const storeContext = createContext<Store>({
  accounts: [],
  budget: [],
  goals: {
    debt: [],
    savings: [],
  },
  retirement: [],
  score: {
    value: NaN,
    peer: NaN,
    entries: [],
  },
  transactions: [],
});

function useStore() {
  return useContext(storeContext);
}

export default storeContext;

export { useStore };
