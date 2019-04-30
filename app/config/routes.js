import React from 'react'
import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

// Folder Landing (Role 0)
import Login from '../views/landing/Login';
import Registrasi from '../views/landing/Registrasi';

// Folder Mahasiswa (Role 1)
import MainMhs from '../components/layouts/MainMhs';
import DashboardMhs from '../views/user/mahasiswa/Dashboard';
import JadwalMhs from '../views/user/mahasiswa/Jadwal';
import NilaiMhs from '../views/user/mahasiswa/Nilai';
import PembayaranMhs from '../views/user/mahasiswa/Pembayaran';

// Folder Dosen (Role 2)
import MainDosen from '../components/layouts/MainDosen';
import DashboardDosen from '../views/user/dosen/Main';
import NilaiDosen from '../views/user/dosen/Input';
import AbsenDosen from '../views/user/dosen/Absen';
import BapDosen from '../views/user/dosen/Bap';

// Folder Admin (Role 3)
import MainAdmin from '../components/layouts/MainAdmin';
import Pendaftaran from '../views/user/admin/Pendaftaran';
import List_pendaftar from '../views/user/admin/List_pendaftar'
import Cetak_kuitansi from '../views/user/admin/Cetak_kuitansi';
import Anggaran from '../views/user/admin/Anggaran';
import Approve from '../views/user/admin/Approve';
import Broadcast from '../views/user/admin/Broadcast';
import Inventaris from '../views/user/admin/Inventaris';
import Perubahan from '../views/user/admin/Perubahan';
import Status from '../views/user/admin/Status';
import Dosen from '../views/user/admin/dosen';
import CalonMahasiswa from '../views/user/admin/Calon_Mahasiswa';
import MahasiswaAdmin from '../views/user/admin/Mahasiswa';
import TagihanAdmin from '../views/user/admin/Tagihan';

// Folder Keuangan (Role 4)
import MainKeuangan from '../components/layouts/MainKeuangan';
import TransaksiKeuangan from '../views/user/keuangan/Transaksi';
import LaporanKeuangan from '../views/user/keuangan/Laporan';

// Folder Akademik (Role 5)
import MainAkademik from '../components/layouts/MainAkademik';
import DashboardAkademikView from '../views/user/akademik/Dashboard';
import DaftarMahasiswaAkademik from '../views/user/akademik/Mahasiswa';
import MataKuliahAkademik from '../views/user/akademik/Mata_Kuliah';
import JadwalAkademik from '../views/user/akademik/Jadwal';
import PengumumanAkademik from '../views/user/akademik/Pengumuman';

// Folder Kepala Cabang (Role 6)
import MainKepalaCabang from '../components/layouts/MainKepalaCabang';
import DataCabang from '../views/user/kepala_cabang/Data_Cabang';
import ReviewApprove from '../views/user/kepala_cabang/Review_and_approve';

// Folder HRD (Role 7)
import MainHRD from '../components/layouts/MainHrd';
import Pegawai from '../views/user/hrd/Pegawai';
import Pengajuan from '../views/user/hrd/Pengajuan';

// Folder Owner (Role 8)
import MainOwner from '../components/layouts/MainOwner';
import DashboardOwner from '../views/user/owner/Dashboard';
import KampusOwner from '../views/user/owner/Kampus';
import HRDOwner from '../views/user/owner/HRD';
import AnggaranOwner from '../views/user/owner/Anggaran';
import KepalaCabangOwner from '../views/user/owner/Kepala_cabang';

let komponen= null;

if(window.sessionStorage.getItem('access') === null || window.sessionStorage.getItem('role') === null) {
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="login" component={Login}/>
        <Route path="registrasi" component={Registrasi}/>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') == "1"){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainMhs}>
            <IndexRedirect to="/mahasiswa" />
            <Route path="mahasiswa" component={DashboardMhs}> </Route>
            <Route path="nilai" component={NilaiMhs}> </Route>
            <Route path="jadwal" component={JadwalMhs}> </Route>
            <Route path="pembayaran" component={PembayaranMhs}> </Route>
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === "2"){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainDosen}>
            <IndexRedirect to="/absen" />
            <Route path="jadwal" component={DashboardDosen}> </Route>
            <Route path="nilai" component={NilaiDosen}> </Route>
            <Route path="absen" component={AbsenDosen}> </Route>
            <Route path="bap" component={BapDosen}> </Route>
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

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '4'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainKeuangan}>
            <IndexRedirect to="/transaksi" />
            <Route path="transaksi" component={TransaksiKeuangan}> </Route>
            <Route path="laporan" component={LaporanKeuangan}> </Route>
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
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '6'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainKepalaCabang}>
            <IndexRedirect to="/data_cabang" />
            <Route path="data_cabang" component={DataCabang}> </Route>
            <Route path="review_approve" component={ReviewApprove}> </Route>
        </Route>
    </Router> )
}

if(window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '7'){
    komponen = (
    <Router history={browserHistory}>
        <Route path="/" component={MainHRD}>
            <IndexRedirect to="/pegawai" />
            <Route path="pegawai" component={Pegawai}> </Route>
            <Route path="pengajuan" component={Pengajuan}> </Route>
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
        </Route>
    </Router> )
}

module.exports = komponen;