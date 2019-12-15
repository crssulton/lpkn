import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainMhs = require('../components/layouts/MainMhs').default;
let DashboardMhs = require('../views/user/mahasiswa/Dashboard').default;
let JadwalMhs = require('../views/user/mahasiswa/Jadwal').default;
let NilaiMhs = require('../views/user/mahasiswa/Nilai').default;
let PembayaranMhs = require('../views/user/mahasiswa/Pembayaran').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainMhs}>
      <IndexRedirect to="/mahasiswa"/>
      <Route path="mahasiswa" component={DashboardMhs}> </Route>
      <Route path="nilai" component={NilaiMhs}> </Route>
      <Route path="jadwal" component={JadwalMhs}> </Route>
      <Route path="pembayaran" component={PembayaranMhs}> </Route>
      <Route path="akun" component={Akun}> </Route>
    </Route>
  </Router>
)