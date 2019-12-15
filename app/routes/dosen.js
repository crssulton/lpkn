import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainDosen = require('../components/layouts/MainDosen').default;
let DashboardDosen = require('../views/user/dosen/Main').default;
let NilaiDosen = require('../views/user/dosen/Input').default;
let AbsenDosen = require('../views/user/dosen/Absen').default;
let RekapAbsensiDosen = require('../views/user/dosen/rekap_absensi').default;
let BapDosen = require('../views/user/dosen/Bap').default;
let DaftarHadirDosen = require('../views/user/dosen/daftar_hadir').default;
let PertemuanDosen = require('../views/user/dosen/pertemuan').default;
let KehadiranAkademik = require('../views/user/akademik/kehadiran').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainDosen}>
      <IndexRedirect to="/absen"/>
      <Route path="jadwal" component={DashboardDosen}> </Route>
      <Route path="nilai" component={NilaiDosen}> </Route>
      <Route path="rekap-absensi" component={RekapAbsensiDosen}> </Route>
      <Route path="absen" component={AbsenDosen}> </Route>
      <Route path="bap" component={BapDosen}> </Route>
      <Route path="kehadiran" component={KehadiranAkademik}> </Route>
      <Route path="daftar-hadir" component={DaftarHadirDosen}> </Route>
      <Route path="pertemuan" component={PertemuanDosen}> </Route>
      <Route path="akun" component={Akun}> </Route>
    </Route>
  </Router>
)
