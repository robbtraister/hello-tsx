import { BrowserRouter } from "react-router-dom";

import { Body } from "./components/presentational/body";
import { Footer } from "./components/presentational/footer";
import { Header } from "./components/presentational/header";
import { Pages } from "./pages";

import storeContext, { Store } from "./contexts/store";
import userContext, { User } from "./contexts/user";

export function App({ user, store }: { user: User; store: Store }) {
  return (
    <userContext.Provider value={user}>
      <storeContext.Provider value={store}>
        <BrowserRouter basename={process.env.PUBLIC_PATH || "/"}>
          <Header />
          <Body>
            <Pages />
          </Body>
          <Footer />
        </BrowserRouter>
      </storeContext.Provider>
    </userContext.Provider>
  );
}
