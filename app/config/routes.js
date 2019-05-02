import React from 'react';

import MainLanding from '../components/layouts/landing/MainLanding';
import MainMhs from '../components/layouts/user/mahasiswa/MainMhs';
import MainDosen from '../components/layouts/user/dosen/MainDosen';
import MainAkademik from '../components/layouts/user/akademik/MainAkademik';
import MainAdmin from '../components/layouts/user/admin/MainAdmin';
import MainHRD from '../components/layouts/user/hrd/MainHRD';
import MainOwner from '../components/layouts/user/owner/MainOwner';
import MainKeuangan from '../components/layouts/user/keuangan/MainKeuangan';
import MainKepalaCabang from '../components/layouts/user/kepala-cabang/MainKepalaCabang';

import HomeLP from '../views/landing/Home';
import LoginLP from '../views/landing/Login';
import RegistrasiLP from '../views/landing/Registrasi';

import DashboardView from '../views/mahasiswa/Dashboard';
import NilaiView from '../views/mahasiswa/Nilai';
import JadwalView from '../views/mahasiswa/Jadwal';
import PembayaranView from '../views/mahasiswa/Pembayaran';

import DashboardDosen from '../views/dosen/Main';
import NilaiDosen from '../views/dosen/Input';
import AbsenDosen from '../views/dosen/Absen';
import BapDosen from '../views/dosen/Bap';

import DashboardAkademikView from '../views/akademik/Dashboard';
import DaftarMahasiswaAkademik from '../views/akademik/Mahasiswa';
import MataKuliahAkademik from '../views/akademik/Mata_Kuliah';
// import JurusanAkademik from '../views/akademik/Jurusan';
import JadwalAkademik from '../views/akademik/Jadwal';
import PengumumanAkademik from '../views/akademik/Pengumuman';
import RuanganAkademik from '../views/akademik/Ruangan';
import KelasAkademik from '../views/akademik/kelas';

import Pendaftaran from '../views/admin/Pendaftaran';
import List_pendaftar from '../views/admin/List_pendaftar'
import Cetak_kuitansi from '../views/admin/Cetak_kuitansi';
import Anggaran from '../views/admin/Anggaran';
import Approve from '../views/admin/Approve';
import Broadcast from '../views/admin/Broadcast';
import Inventaris from '../views/admin/Inventaris';
import Perubahan from '../views/admin/Perubahan';
import Status from '../views/admin/Status';
import Dosen from '../views/admin/dosen';
import CalonMahasiswa from '../views/admin/Calon_Mahasiswa';
import MahasiswaAdmin from '../views/admin/Mahasiswa';
import TagihanAdmin from '../views/admin/Tagihan';

import DashboardOwner from '../views/owner/Dashboard';
import KampusOwner from '../views/owner/Kampus';
import HRDOwner from '../views/owner/HRD';
import AnggaranOwner from '../views/owner/Anggaran';
import Form_add_staffOwner from '../views/owner/Form_add_staff';
import Form_edit_staffOwner from '../views/owner/Form_edit_staff';
import KepalaCabangOwner from '../views/owner/Kepala_cabang';
import KelompokAkunOwner from '../views/owner/kelompok_akun';

import AkunKeuangan from '../views/keuangan/akun';
import TransaksiKeuangan from '../views/keuangan/transaksi';
import DataJurnalKeuangan from '../views/keuangan/data-jurnal';

import AdministratorKepalaCabang from '../views/kepala-cabang/administrator';
import AkademikKepalaCabang from '../views/kepala-cabang/akademik';
import DashboardKepalaCabang from '../views/kepala-cabang/dashboard';
import KeuanganKepalaCabang from '../views/kepala-cabang/keuangan';
import JurusanKepalaCabang from '../views/kepala-cabang/jurusan';

import PegawaiHRD from '../views/hrd/pegawai';
import PengajuanHRD from '../views/hrd/pengajuan';
import addPegawaiHRD from '../views/hrd/add_pegawai';
import editPegawaiHRD from '../views/hrd/edit_pegawai';


import { Route, Router, IndexRedirect, browserHistory} from 'react-router';
let komponen= null;


if(window.sessionStorage.getItem('access') === null || window.sessionStorage.getItem('role') === null) {
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainLanding}>
            <IndexRedirect to="/home" />
            <Route path="home" component={HomeLP}/>
            <Route path="login" component={LoginLP}/>
            <Route path="registrasi" component={RegistrasiLP}/>
        </Route>
    </Router> )
}
if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') == "1"){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainMhs}>
            <IndexRedirect to="/mahasiswa" />
            <Route path="mahasiswa" component={DashboardView}> </Route>
            <Route path="nilai" component={NilaiView}> </Route>
            <Route path="jadwal" component={JadwalView}> </Route>
            <Route path="pembayaran" component={PembayaranView}> </Route>
        </Route>
    </Router> )
}
if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === 'dosen'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainDosen}>
            <IndexRedirect to="/absen" />
            <Route path="main" component={DashboardDosen}> </Route>
            <Route path="nilai" component={NilaiDosen}> </Route>
            <Route path="absen" component={AbsenDosen}> </Route>
            <Route path="bap" component={BapDosen}> </Route>
        </Route>
    </Router> )
}
if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '5'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainAkademik}>
            <IndexRedirect to="/dashboard" />
            <Route path="dashboard" component={DashboardAkademikView}> </Route>
            <Route path="mahasiswa" component={DaftarMahasiswaAkademik}> </Route>
            <Route path="matkul" component={MataKuliahAkademik}> </Route>
            <Route path="jadwal" component={JadwalAkademik}> </Route>
            <Route path="pengumuman" component={PengumumanAkademik}> </Route>
            <Route path="ruangan" component={RuanganAkademik}> </Route>
            <Route path="kelas" component={KelasAkademik}> </Route>
        </Route>
    </Router> )
}
if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '3'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainAdmin}>
            <IndexRedirect to="/pendaftaran" />
            <Route path="pendaftaran" component={Pendaftaran}> </Route>
            <Route path="list-pendaftar" component={List_pendaftar}> </Route>
            <Route path="status" component={Status}> </Route>
            <Route path="broadcast" component={Broadcast}> </Route>
            <Route path="approve" component={Approve}> </Route>
            <Route path="inventaris" component={Inventaris}> </Route>
            <Route path="perubahan" component={Perubahan}> </Route>
            <Route path="anggaran" component={Anggaran}> </Route>
            <Route path="cetak" component={Cetak_kuitansi}> </Route>
            <Route path="dosen" component={Dosen}> </Route>
            <Route path="calon-mahasiswa" component={CalonMahasiswa}> </Route>
            <Route path="mahasiswa" component={MahasiswaAdmin}> </Route>
            <Route path="tagihan" component={TagihanAdmin}> </Route>
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '7'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainHRD}>
            <IndexRedirect to="/pegawai" />
            <Route path="pegawai" component={PegawaiHRD}> </Route>
            <Route path="pengajuan" component={PengajuanHRD}> </Route>
            <Route path="add-pegawai" component={addPegawaiHRD}> </Route>
            <Route path="edit-pegawai" component={editPegawaiHRD}> </Route>
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '8'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainOwner}>
            <IndexRedirect to="/dashboard" />
            <Route path="dashboard" component={DashboardOwner}> </Route>
            <Route path="kampus" component={KampusOwner}> </Route>
            <Route path="kepala" component={KepalaCabangOwner}> </Route>
            <Route path="hrd" component={HRDOwner}> </Route>
            <Route path="anggaran" component={AnggaranOwner}> </Route>
            <Route path="add-staff" component={Form_add_staffOwner}> </Route>
            <Route path="edit-staff" component={Form_edit_staffOwner}> </Route>
            <Route path="kelompok-account" component={KelompokAkunOwner}> </Route>
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '4'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainKeuangan}>
            <IndexRedirect to="/akun" />
            <Route path="akun" component={AkunKeuangan}> </Route>
            <Route path="transaksi" component={TransaksiKeuangan}> </Route>
            <Route path="jurnal" component={DataJurnalKeuangan}> </Route>
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '6'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainKepalaCabang}>
            <IndexRedirect to="/dashboard" />
            <Route path="dashboard" component={DashboardKepalaCabang}> </Route>
            <Route path="akademik" component={AkademikKepalaCabang}> </Route>
            <Route path="admin" component={AdministratorKepalaCabang}> </Route>
            <Route path="keuangan" component={KeuanganKepalaCabang}> </Route>
            <Route path="jurusan" component={JurusanKepalaCabang}> </Route>
            <Route path="add-staff" component={Form_add_staffOwner}> </Route>
            <Route path="edit-staff" component={Form_edit_staffOwner}> </Route>
        </Route>
    </Router> )
}

module.exports = komponen;

