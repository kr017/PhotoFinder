import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Dashboard } from "../src/components/Dashboard/Dashboard";
import { Login } from "../src/components/Login/Login";
import { NotFound } from "../src/components/NotFound/NotFound";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
