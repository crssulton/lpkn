import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainOwner = require('../components/layouts/MainOwner').default;
let MahasiswaOwner = require('../views/user/owner/Mahasiswa').default;
let MahasiswaMagangOwner = require('../views/user/owner/mahasiswa_magang').default;
let MahasiswaBekerjaOwner = require('../views/user/owner/mahasiswa_bekerja').default;
let MahasiswaNonaktifOwner = require('../views/user/owner/mahasiswa_nonaktif').default;
let MahasiswaLulusOwner = require('../views/user/owner/mahasiswa_lulus').default;
let MahasiswaPindahOwner = require('../views/user/owner/mahasiswa_pindah').default;
let DosenOwner = require('../views/user/owner/dosen').default;
let DashboardOwner = require('../views/user/owner/Dashboard').default;
let KampusOwner = require('../views/user/owner/Kampus').default;
let HRDOwner = require('../views/user/owner/HRD').default;
let PerubahanTransaksi = require('../views/user/owner/perubahan_transaksi').default;
let Form_add_staffOwner = require('../views/user/owner/Form_add_staff').default;
let Form_edit_staffOwner = require('../views/user/owner/Form_edit_staff').default;
let KepalaCabangOwner = require('../views/user/owner/Kepala_cabang').default;
let KelompokAkunOwner = require('../views/user/owner/kelompok_akun').default;
let ApproveGajiOwner = require('../views/user/owner/approve_gaji').default;
let PengajuanGajiOwner = require('../views/user/owner/pengajuan_gaji').default;
let PengajuanAnggaranOwner = require('../views/user/owner/pengajuan_anggaran').default;
let AnggaranOwner = require('../views/user/owner/Anggaran').default;
let StaffOwner = require('../views/user/owner/staff').default;
let AsetAdmin = require('../views/user/admin/aset').default;
let Tagihan = require('../views/user/admin/Tagihan').default;
let DaftarTransaksi = require('../views/user/keuangan/daftar_transaksi').default;
let TransaksiBukuBesar = require('../views/user/keuangan/transaksi_buku_besar').default;
let NeracaSaldoAkhir = require('../views/user/keuangan/neraca_saldo_akhir').default;
let JurnalUmum = require('../views/user/keuangan/jurnal_umum').default;
let BukuBesar = require('../views/user/keuangan/buku_besar').default;
let Laporan = require('../views/user/keuangan/Laporan').default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainOwner}>
      <IndexRedirect to="/kampus"/>
      <Route path="akun" component={Akun}> </Route>
      <Route path="dashboard" component={DashboardOwner}> </Route>
      <Route path="kampus" component={KampusOwner}> </Route>
      <Route path="kepala" component={KepalaCabangOwner}> </Route>
      <Route path="hrd" component={HRDOwner}> </Route>
      <Route path="anggaran" component={AnggaranOwner}> </Route>
      <Route path="perubahan-transaksi" component={PerubahanTransaksi}> </Route>
      <Route path="pengajuan-gaji" component={PengajuanGajiOwner}> </Route>
      <Route path="pengajuan-anggaran" component={PengajuanAnggaranOwner}> </Route>
      <Route path="add-staff" component={Form_add_staffOwner}> </Route>
      <Route path="edit-staff" component={Form_edit_staffOwner}> </Route>
      <Route path="kelompok-account" component={KelompokAkunOwner}> </Route>
      <Route path="approve-gaji" component={ApproveGajiOwner}> </Route>
      <Route path="daftar-transaksi" component={DaftarTransaksi}> </Route>
      {/*<Route path="mahasiswa" component={MahasiswaOwner}> </Route>*/}
      <Route path="mahasiswa" component={MahasiswaOwner}> </Route>
      <Route path="nonaktif" component={MahasiswaNonaktifOwner}> </Route>
      <Route path="lulus" component={MahasiswaLulusOwner}> </Route>
      <Route path="bekerja" component={MahasiswaBekerjaOwner}> </Route>
      <Route path="magang" component={MahasiswaMagangOwner}> </Route>
      <Route path="pindah" component={MahasiswaPindahOwner}> </Route>
      <Route path="dosen" component={DosenOwner}> </Route>
      <Route path="transaksi-buku-besar" component={TransaksiBukuBesar}> </Route>
      <Route path="aset" component={AsetAdmin}> </Route>
      <Route path="staff" component={StaffOwner}> </Route>
      <Route path="tagihan" component={Tagihan}> </Route>
      <Route path="jurnal-umum" component={JurnalUmum}> </Route>
      <Route path="ayat_jurnal_penyesuaian" component={Laporan}> </Route>
      <Route path="penutup_jurnal" component={Laporan}> </Route>
      <Route path="buku_besar" component={BukuBesar}> </Route>
      <Route path="saldo_sementara" component={Laporan}> </Route>
      <Route path="neraca_lanjut" component={Laporan}> </Route>
      <Route path="rugi_laba" component={Laporan}> </Route>
      <Route path="perubahan_modal" component={Laporan}> </Route>
      <Route path="neraca_akhir" component={NeracaSaldoAkhir}> </Route>
    </Route>
  </Router>
)