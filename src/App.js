import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from './Components/Header/Header.component.Jsx'
import HomePage from "./Pages/Homepage/homepage.component.jsx";
import ShopPage from "./Pages/shop/shop.component.jsx";

function App() {
  return (
    <div className="App">
    <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
