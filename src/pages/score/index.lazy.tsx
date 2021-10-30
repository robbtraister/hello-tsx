import { makeLazy } from "src/utils/lazy";

export const Score = makeLazy(
  () => import(/* webpackChunkName: "score" */ ".")
);
