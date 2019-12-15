import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainKeuangan = require('../components/layouts/MainKeuangan').default;
let AkunKeuangan = require('../views/user/keuangan/akun').default;
let TransaksiKeuangan = require('../views/user/keuangan/transaksi').default;
let DaftarTransaksi = require('../views/user/keuangan/daftar_transaksi').default;
let DataJurnalKeuangan = require('../views/user/keuangan/data-jurnal').default;
let TransaksiBukuBesar = require('../views/user/keuangan/transaksi_buku_besar').default;
let NeracaSaldoAkhir = require('../views/user/keuangan/neraca_saldo_akhir').default;
let JurnalUmum = require('../views/user/keuangan/jurnal_umum').default;
let BukuBesar = require('../views/user/keuangan/buku_besar').default;
let Laporan = require('../views/user/keuangan/Laporan').default;
let TambahAset = require('../views/user/admin/tambah_aset').default;
let AsetAdmin = require('../views/user/admin/aset').default;
let Tagihan = require('../views/user/admin/Tagihan').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainKeuangan}>
      <IndexRedirect to="/akun"/>
      <Route path="tambah-aset" component={TambahAset}> </Route>
      <Route path="aset" component={AsetAdmin}> </Route>
      <Route path="akun" component={AkunKeuangan}> </Route>
      <Route path="transaksi" component={TransaksiKeuangan}> </Route>
      <Route path="jurnal" component={DataJurnalKeuangan}> </Route>
      <Route path="jurnal-umum" component={JurnalUmum}> </Route>
      <Route path="ayat_jurnal_penyesuaian" component={Laporan}> </Route>
      <Route path="penutup_jurnal" component={Laporan}> </Route>
      <Route path="transaksi-buku-besar" component={TransaksiBukuBesar}> </Route>
      <Route path="buku_besar" component={BukuBesar}> </Route>
      <Route path="saldo_sementara" component={Laporan}> </Route>
      <Route path="neraca_lanjut" component={Laporan}> </Route>
      <Route path="daftar-transaksi" component={DaftarTransaksi}> </Route>
      <Route path="rugi_laba" component={Laporan}> </Route>
      <Route path="perubahan_modal" component={Laporan}> </Route>
      <Route path="neraca_akhir" component={NeracaSaldoAkhir}> </Route>
      <Route path="tagihan" component={Tagihan}> </Route>
      <Route path="akun" component={Akun}> </Route>
    </Route>
  </Router>
)