import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainAdmin = require('../components/layouts/MainAdmin').default;
let Pendaftaran = require('../views/user/admin/Pendaftaran').default;
let List_pendaftar = require('../views/user/admin/List_pendaftar').default
let List_pendaftar_online = require('../views/user/admin/List_pendaftar_online').default;
let Cetak_kuitansi = require('../views/user/admin/Cetak_kuitansi').default;
let Anggaran = require('../views/user/admin/Anggaran').default;
let Users = require('../views/user/admin/users').default;
let addDosen = require('../views/user/admin/addDosen').default;
let editDosen = require('../views/user/admin/editDosen').default;
let Approve = require('../views/user/admin/Approve').default;
let Broadcast = require('../views/user/admin/Broadcast').default;
let Inventaris = require('../views/user/admin/Inventaris').default;
let Perubahan = require('../views/user/admin/Perubahan').default;
let Status = require('../views/user/admin/Status').default;
let Dosen = require('../views/user/admin/dosen').default;
let CalonMahasiswa = require('../views/user/admin/Calon_Mahasiswa').default;
let MahasiswaAdmin = require('../views/user/admin/Mahasiswa').default;
let EditMahasiswa = require('../views/user/admin/edit_mahasiswa').default;
let Tagihan = require('../views/user/admin/Tagihan').default;
let PengajuanAdmin = require('../views/user/admin/pengajuan').default;
let PembayaranAdmin = require('../views/user/admin/pembayaran').default;
let AsetAdmin = require('../views/user/admin/aset').default;
let TambahAset = require('../views/user/admin/tambah_aset').default;
let ReportPendaftarOnline = require('../views/user/admin/report_pendaftar_online').default;
let ReportPendaftarManual = require('../views/user/admin/report_pendaftar_manual').default;
let ReportMahasiswa = require('../views/user/admin/report_mahasiswa').default;
let DaftarTransaksiAdmin = require('../views/user/admin/daftar-transaksi').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainAdmin}>
      <IndexRedirect to="/pendaftaran"/>
      <Route path="pendaftaran" component={Pendaftaran}> </Route>
      <Route path="list-pendaftar" component={List_pendaftar}> </Route>
      <Route path="list-pendaftar-online" component={List_pendaftar_online}> </Route>
      <Route path="status" component={Status}> </Route>
      <Route path="broadcast" component={Broadcast}> </Route>
      <Route path="approve" component={Approve}> </Route>
      <Route path="tambah-dosen" component={addDosen}> </Route>
      <Route path="users" component={Users}> </Route>
      <Route path="edit-dosen" component={editDosen}> </Route>
      <Route path="inventaris" component={Inventaris}> </Route>
      <Route path="perubahan" component={Perubahan}> </Route>
      <Route path="anggaran" component={Anggaran}> </Route>
      <Route path="cetak" component={Cetak_kuitansi}> </Route>
      <Route path="dosen" component={Dosen}> </Route>
      <Route path="aset" component={AsetAdmin}> </Route>
      <Route path="tambah-aset" component={TambahAset}> </Route>
      <Route path="calon-mahasiswa" component={CalonMahasiswa}> </Route>
      <Route path="mahasiswa" component={MahasiswaAdmin}> </Route>
      <Route path="edit-mahasiswa" component={EditMahasiswa}> </Route>
      <Route path="tagihan" component={Tagihan}> </Route>
      <Route path="pengajuan" component={PengajuanAdmin}> </Route>
      <Route path="pembayaran" component={PembayaranAdmin}> </Route>
      <Route path="akun" component={Akun}> </Route>
      <Route path="report-pendaftar-manual" component={ReportPendaftarManual}> </Route>
      <Route path="report-pendaftar-online" component={ReportPendaftarOnline}> </Route>
      <Route path="report-mahasiswa" component={ReportMahasiswa}> </Route>
      <Route path="daftar-transaksi" component={DaftarTransaksiAdmin}> </Route>
    </Route>
  </Router>
)