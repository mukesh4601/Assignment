
import React from "react";
import "./style.scss"
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./Store/Reducers/index";
//  Routing Includes
import Login from "./components/welcome/login";
import Calender from "./components/calender/calender"
import Register from "./components/register/register"



import Cookies from "js-cookie"
const history = createBrowserHistory();
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25
    })) ||
  compose;
const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

const isAuthenticated = () => {
  return !!Cookies.get("token");
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const routing = (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={() => { return <Login /> }} name="login" />
        <Route exact path="/login" component={() => { return <Login /> }} name="login" />
        <PrivateRoute exact path="/dashboard" component={() => { return <Calender /> }} name="Choose Date Page" />
        <Route exact path="/register" component={() => { return <Register /> }} name="Register Page" />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.querySelector('#app'));
serviceWorker.unregister();