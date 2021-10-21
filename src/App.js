import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Dashboard } from "../src/components/Dashboard/Dashboard";
import { Login } from "../src/components/Login/Login";
import { NotFound } from "../src/components/NotFound/NotFound";

import { Profile } from "./components/Profile/Profile";
import { PrivateRoutes } from "./PrivateRoutes";
import { EditProfile } from "./components/Profile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Switch>
        <Route path="/" component={Login} exact />
        <PrivateRoutes path="/dash" component={Dashboard} />
        <PrivateRoutes path="/profile" component={Profile} exact />
        <PrivateRoutes path="/editProfile" component={EditProfile} />

        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
