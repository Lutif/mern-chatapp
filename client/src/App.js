import React, { useState } from "react";
import "./App.css";
import { connect, Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import Message from "./components/Message";
import Register from "./components/Register";
import setAuth from "./utils/setAuth";
import Navbar from './components/Navbar'
import { Landing } from "./components/Landing";
import About from "./components/About";
import  Verify  from "./components/Verify";

if (localStorage.token) {
  setAuth(localStorage.token);
}
// console.log(store)
const App = () => {
  const [user, setUser] = useState({});
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/chat">
          <ChatPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default connect()(App);
