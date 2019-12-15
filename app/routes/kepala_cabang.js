import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainKepalaCabang = require('../components/layouts/MainKepalaCabang').default;
let AdministratorKepalaCabang = require('../views/user/kepala_cabang/administrator').default;
let AkademikKepalaCabang = require('../views/user/kepala_cabang/akademik').default;
let DashboardKepalaCabang = require('../views/user/kepala_cabang/dashboard').default;
let KeuanganKepalaCabang = require('../views/user/kepala_cabang/keuangan').default;
let JurusanKepalaCabang = require('../views/user/kepala_cabang/jurusan').default;
let PengajuanKepalaCabang = require('../views/user/kepala_cabang/pengajuan').default;
let AnggaranKepalaCabang = require('../views/user/kepala_cabang/Anggaran').default;
let MahasiswaKepalaCabang = require('../views/user/kepala_cabang/mahasiswa').default;
let DosenKepalaCabang = require('../views/user/kepala_cabang/dosen').default;
let StaffKepalaCabang = require('../views/user/kepala_cabang/staff').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainKepalaCabang}>
      <IndexRedirect to="/jurusan"/>
      <Route path="akun" component={Akun}> </Route>
      <Route path="dashboard" component={DashboardKepalaCabang}> </Route>
      <Route path="akademik" component={AkademikKepalaCabang}> </Route>
      <Route path="admin" component={AdministratorKepalaCabang}> </Route>
      <Route path="keuangan" component={KeuanganKepalaCabang}> </Route>
      <Route path="jurusan" component={JurusanKepalaCabang}> </Route>
      <Route path="add-staff" component={Form_add_staffOwner}> </Route>
      <Route path="edit-staff" component={Form_edit_staffOwner}> </Route>
      <Route path="anggaran" component={AnggaranKepalaCabang}> </Route>
      <Route path="pengajuan" component={PengajuanKepalaCabang}> </Route>
      <Route path="perubahan" component={Perubahan}> </Route>
      <Route path="mahasiswa" component={DaftarMahasiswaAkademik}> </Route>
      <Route path="nonaktif" component={MahasiswaNonaktif}> </Route>
      <Route path="lulus" component={MahasiswaLulus}> </Route>
      <Route path="bekerja" component={MahasiswaBekerja}> </Route>
      <Route path="magang" component={MahasiswaMagang}> </Route>
      <Route path="pindah" component={MahasiswaPindah}> </Route>
      <Route path="dosen" component={DosenKepalaCabang}> </Route>
      <Route path="staff" component={StaffKepalaCabang}> </Route>
      <Route path="transaksi-buku-besar" component={TransaksiBukuBesar}> </Route>
      <Route path="tagihan" component={Tagihan}> </Route>
      <Route path="transaksi-buku-besar" component={TransaksiBukuBesar}> </Route>
      <Route path="jurnal-umum" component={JurnalUmum}> </Route>
      <Route path="ayat_jurnal_penyesuaian" component={Laporan}> </Route>
      <Route path="penutup_jurnal" component={Laporan}> </Route>
      <Route path="buku_besar" component={BukuBesar}> </Route>
      <Route path="aset" component={AsetAdmin}> </Route>
      <Route path="saldo_sementara" component={Laporan}> </Route>
      <Route path="neraca_lanjut" component={Laporan}> </Route>
      <Route path="rugi_laba" component={Laporan}> </Route>
      <Route path="perubahan_modal" component={Laporan}> </Route>
      <Route path="neraca_akhir" component={NeracaSaldoAkhir}> </Route>
    </Route>
  </Router>
)