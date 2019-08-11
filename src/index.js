import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerReducer from "./store/burgerReducer";
import adminReducer from "./store/adminReducer";
import thunk from "redux-thunk";
import authReducer from "./store/authReducer";
import filterReducer from "./store/filterReducer";
import { firebase } from "./firebase/firebase";
import { signIn } from "./store/Actions/auth";
import { getAllOrders } from "./store/Actions/get_All_Orders";
import {
  faCode,
  faHighlighter,
  faMoneyBill,
  faEnvelope,
  faThumbsUp,
  faPlus,
  faPlusCircle,
  faAngleDown,
  faCheck,
  faTimesCircle,
  faMinusCircle,
  faCheckCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

library.add(
  faMoneyBill,
  faCode,
  faHighlighter,
  faEnvelope,
  faFacebook,
  faGoogle,
  faThumbsUp,
  faPlusCircle,
  faAngleDown,
  faCheck,
  faTimesCircle,
  faMinusCircle,
  faCheckCircle,
  faTimes,
  faTwitter
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = {
  burgerReducer: burgerReducer,
  authReducer: authReducer,
  adminReducer: adminReducer,
  filterReducer: filterReducer
};
const store = createStore(
  combineReducers(rootReducer),
  composeEnhancer(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
let checker = true;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (store.getState().authReducer.sign_In_With_Email) {
      store.dispatch(signIn(user.uid));
      localStorage.setItem("id", user.uid);
      store.dispatch(getAllOrders(user.uid));
      store.dispatch({ type: "SIGNUP_LINK_FALSE" });
      if (checker) {
        ReactDOM.render(app, document.getElementById("root"));
        checker = false;
      }
      if (store.getState().adminReducer.customizedOrder) {
        history.push("/checkout");
      } else if (store.getState().adminReducer.normalOrder) {
        history.push("/checkout");
      }
    }
  } else {
    localStorage.removeItem("id");
    store.dispatch({ type: "SIGNUP_LINK_TRUE" });
    store.dispatch({ type: "CLEAR_ORDER" });
    if (checker) {
      ReactDOM.render(app, document.getElementById("root"));
      checker = false;
    }
  }
});

//FETCH ALL BURGER FROM ADMIN
firebase
  .database()
  .ref()
  .child("allBurgers")
  .on("value", snap => {
    let allBurgers = [];
    let prices = {};
    for (let key in snap.val()) {
      const info = {
        id: key,
        ...snap.val()[key]
      };
      allBurgers.push(info);
      prices[snap.val()[key].name] = snap.val()[key].price;
    }
    store.dispatch({ type: "FETCH_BURGERS_FROM_ADMIN", allBurgers, prices });
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
export default store;
