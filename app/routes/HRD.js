import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainHRD = require('../components/layouts/MainHrd').default;
let PegawaiHRD = require('../views/user/hrd/pegawai').default;
let JabatanHRD = require('../views/user/hrd/jabatan').default;
let PengajuanPegawaiHRD = require('../views/user/hrd/pengajuan_pegawai').default;
let PengajuanHRD = require('../views/user/hrd/pengajuan').default;
let addPegawaiHRD = require('../views/user/hrd/add_pegawai').default;
let editPegawaiHRD = require('../views/user/hrd/edit_pegawai').default;
let CetakPegawaiHRD = require('../views/user/hrd/cetak_pegawai').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainHRD}>
      <IndexRedirect to="/pegawai"/>
      <Route path="akun" component={Akun}> </Route>
      <Route path="pegawai" component={PegawaiHRD}> </Route>
      <Route path="pengajuan" component={PengajuanHRD}> </Route>
      <Route path="pengajuan-gaji" component={PengajuanPegawaiHRD}> </Route>
      <Route path="add-pegawai" component={addPegawaiHRD}> </Route>
      <Route path="edit-pegawai" component={editPegawaiHRD}> </Route>
      <Route path="jabatan" component={JabatanHRD}> </Route>
    </Route>
    <Route path="cetak-pegawai" component={CetakPegawaiHRD}> </Route>
  </Router>
)