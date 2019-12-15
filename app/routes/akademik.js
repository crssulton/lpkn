import {browserHistory, IndexRedirect, Route, Router} from "react-router";
import React from "react";
import Akun from "../views/user/akun";

let MainAkademik = require('../components/layouts/MainAkademik').default;
let DashboardAkademikView = require('../views/user/akademik/Dashboard').default;
let DaftarMahasiswaAkademik = require('../views/user/akademik/Mahasiswa').default;
let MahasiswaMagang = require('../views/user/akademik/mahasiswa_magang').default;
let MahasiswaBekerja = require('../views/user/akademik/mahasiswa_bekerja').default;
let MahasiswaNonaktif = require('../views/user/akademik/mahasiswa_nonaktif').default;
let MahasiswaLulus = require('../views/user/akademik/mahasiswa_lulus').default;
let MahasiswaPindah = require('../views/user/akademik/mahasiswa_pindah').default;
let MataKuliahAkademik = require('../views/user/akademik/Mata_Kuliah').default;
let JadwalAkademik = require('../views/user/akademik/Jadwal').default;
let ListJadwalAkademik = require('../views/user/akademik/list_jadwal').default;
let KehadiranAkademik = require('../views/user/akademik/kehadiran').default;
let RekapAbsenMahasiswa = require('../views/user/akademik/rekap_mahasiswa').default;
let PengumumanAkademik = require('../views/user/akademik/Pengumuman').default;
let RuanganAkademik = require('../views/user/akademik/Ruangan').default;
let KelasAkademik = require('../views/user/akademik/kelas').default;
let ListMahasiswaAkademik = require('../views/user/akademik/list_mahasiswa').default;
let TranskripNilaiMahasiswa = require('../views/user/akademik/transkrip').default;
let RekapAbsenDosen = require('../views/user/akademik/rekap_dosen').default;
let DosenAkademik = require('../views/user/akademik/dosen').default;
let DaftarKelasAkademik = require('../views/user/akademik/daftar_kelas').default;
let DaftarKelasMahasiswaAkademik = require('../views/user/akademik/daftar_kelas_mahasiswa').default;
let JadwalMahasiswaAkademik = require('../views/user/akademik/jadwal_mahasiswa').default;
let AbsensiAkademik = require('../views/user/akademik/absensi').default;
let DaftarAkademik = require('../views/user/akademik/daftar').default;
let NilaiMahasiswaAkademik = require('../views/user/akademik/nilai_mahasiswa').default;
let Dosen = require('../views/user/admin/dosen').default;
let ReportMahasiswaAkademik = require('../views/user/report/mahasiswa_akademik').default;


export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainAkademik}>
      <IndexRedirect to="/dashboard"/>
      <Route path="dashboard" component={DashboardAkademikView}> </Route>
      <Route path="mahasiswa" component={DaftarMahasiswaAkademik}> </Route>
      <Route path="nonaktif" component={MahasiswaNonaktif}> </Route>
      <Route path="lulus" component={MahasiswaLulus}> </Route>
      <Route path="bekerja" component={MahasiswaBekerja}> </Route>
      <Route path="magang" component={MahasiswaMagang}> </Route>
      <Route path="pindah" component={MahasiswaPindah}> </Route>
      <Route path="matkul" component={MataKuliahAkademik}> </Route>
      <Route path="jadwal" component={JadwalAkademik}> </Route>
      <Route path="akun" component={Akun}> </Route>
      <Route path="pengumuman" component={PengumumanAkademik}> </Route>
      <Route path="list-mahasiswa" component={ListMahasiswaAkademik}> </Route>
      <Route path="transkrip" component={TranskripNilaiMahasiswa}> </Route>
      <Route path="rekap-mahasiswa" component={RekapAbsenMahasiswa}> </Route>
      <Route path="ruangan" component={RuanganAkademik}> </Route>
      <Route path="daftar-kelas" component={DaftarKelasAkademik}> </Route>
      <Route path="daftar-kelas-mahasiswa" component={DaftarKelasMahasiswaAkademik}> </Route>
      <Route path="dosen" component={DosenAkademik}> </Route>
      <Route path="daftar-dosen" component={Dosen}> </Route>
      <Route path="rekap-dosen" component={RekapAbsenDosen}> </Route>
      <Route path="jadwal-mahasiswa" component={JadwalMahasiswaAkademik}> </Route>
      <Route path="kelas" component={KelasAkademik}> </Route>
      <Route path="absensi" component={AbsensiAkademik}> </Route>
      <Route path="kelas" component={KelasAkademik}> </Route>
      <Route path="daftar" component={DaftarAkademik}> </Route>
      <Route path="daftar-jadwal" component={ListJadwalAkademik}> </Route>
      <Route path="kehadiran" component={KehadiranAkademik}> </Route>
      <Route path="nilai" component={NilaiMahasiswaAkademik}> </Route>
      <Route path="akun" component={Akun}> </Route>
    </Route>
    <Route path="cetak-mahasiswa-akademik" component={ReportMahasiswaAkademik}> </Route>
  </Router>
)
