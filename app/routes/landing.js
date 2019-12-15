import {browserHistory, Route, Router} from "react-router";
import React from "react";

let Login = require('../views/landing/Login').default;
let Registrasi = require('../views/landing/Registrasi').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="login" component={Login}/>
    <Route path="registrasi" component={Registrasi}/>
    <Route path='*' exact={true} component={Login}/>
  </Router>)
