import { makeLazy } from "src/utils/lazy";

export const Accounts = makeLazy(
  () => import(/* webpackChunkName: "accounts" */ ".")
);
