import React from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import SpecificBurger from "./containers/SpecificBurger/SpecificBurger";
import Checkout from "./containers/Checkout/Checkout";
import TotalOrders from "./containers/TotalOrders/TotalOrders";
import NotFound from "./containers/NotFound/NotFound";
import Signup from "./containers/Signup/Signup";
import Signin from "./containers/Signin/Signin";
import Layout from "./components/Layout/Layout";
import NewDashboard from "./containers/NewDashboard/NewDashboard";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Menu from "./containers/Menu/Menu";
import ContactUs from "./containers/ContactUs/ContactUs";
import NewProducts from "./containers/NewProducts/NewProducts";
import MenuItem from "./containers/MenuItem/MenuItem";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={NewDashboard} />
      <Route path="/burger/:id" component={SpecificBurger} />
      <Route path="/burgerBuilder" component={BurgerBuilder} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <PrivateRoute path="/orders" component={TotalOrders} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/menu" component={Menu} />
      <Route path="/menuitem/:itemName" component={MenuItem} />
      <Route path="/contactus" component={ContactUs} />
      <Route path="/newproducts" component={NewProducts} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
