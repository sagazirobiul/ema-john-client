import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>Email: {loggedInUser.email}</h2>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
              <Shop></Shop>
          </Route>
          <Route path="/review">
              <Review/>
          </Route>
          <PrivateRoute path="/inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
              <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipment">
              <Shipment/>
          </PrivateRoute>
          <Route exact path="/">
              <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
