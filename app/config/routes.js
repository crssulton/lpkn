import React from 'react';
import cookie from 'react-cookies';

import MainLanding from '../components/layouts/landing/MainLanding';
import MainMhs from '../components/layouts/user/mahasiswa/MainMhs';
import MainDosen from '../components/layouts/user/dosen/MainDosen';
import MainAkademik from '../components/layouts/user/akademik/MainAkademik';
import MainAdmin from '../components/layouts/user/admin/MainAdmin';

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


import { Route, Router, IndexRedirect, browserHistory} from 'react-router';
let komponen= null;
console.log(cookie.load('access')+" "+cookie.load('role')+" "+cookie.load('user_id'))
if((cookie.load('access') === 'undefined' && cookie.load('role') === 'undefined') || (cookie.load('access') === undefined && cookie.load('role') === undefined)){
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
if(cookie.load('access') !== 'undefined' && cookie.load('role') == "1"){
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
if(cookie.load('access') !== 'undefined' && cookie.load('role') === 'dosen'){
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
if(cookie.load('access') !== 'undefined' && cookie.load('role') === '5'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainAkademik}>
            <IndexRedirect to="/dashboard" />
            <Route path="dashboard" component={DashboardAkademikView}> </Route>
            <Route path="mahasiswa" component={DaftarMahasiswaAkademik}> </Route>
            <Route path="matkul" component={MataKuliahAkademik}> </Route>
            <Route path="jadwal" component={JadwalAkademik}> </Route>
            <Route path="pengumuman" component={PengumumanAkademik}> </Route>
        </Route>
    </Router> )
}
if(cookie.load('access') !== 'undefined' && cookie.load('role') === '3'){
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

module.exports = komponen;

