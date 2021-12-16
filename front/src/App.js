import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Private from "./views/Private";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";
import './App.css';
import injectContext from './store/appContext';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/private" component={Private} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default injectContext(App);
