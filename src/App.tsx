import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomeWrapper from "./wrappers/HomeWrapper";

import { Header } from "./components";
import "./App.scss";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeWrapper} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
