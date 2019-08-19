// eslint-disable-next-line no-unused-vars
import React from 'react'
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
// Folder Landing (Role 0)
import Akun from '../views/user/akun';
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
import RekapAbsensiDosen from '../views/user/dosen/rekap_absensi';
import BapDosen from '../views/user/dosen/Bap';
import DaftarHadirDosen from '../views/user/dosen/daftar_hadir';
import PertemuanDosen from '../views/user/dosen/pertemuan';
// Folder Admin (Role 3)
import MainAdmin from '../components/layouts/MainAdmin';
import Pendaftaran from '../views/user/admin/Pendaftaran';
import List_pendaftar from '../views/user/admin/List_pendaftar'
import List_pendaftar_online from '../views/user/admin/List_pendaftar_online'
import Cetak_kuitansi from '../views/user/admin/Cetak_kuitansi';
import Anggaran from '../views/user/admin/Anggaran';
import Users from '../views/user/admin/users';
import addDosen from '../views/user/admin/addDosen';
import editDosen from '../views/user/admin/editDosen';
import Approve from '../views/user/admin/Approve';
import Broadcast from '../views/user/admin/Broadcast';
import Inventaris from '../views/user/admin/Inventaris';
import Perubahan from '../views/user/admin/Perubahan';
import Status from '../views/user/admin/Status';
import Dosen from '../views/user/admin/dosen';
import CalonMahasiswa from '../views/user/admin/Calon_Mahasiswa';
import MahasiswaAdmin from '../views/user/admin/Mahasiswa';
import Tagihan from '../views/user/admin/Tagihan';
import PengajuanAdmin from '../views/user/admin/pengajuan';
import PembayaranAdmin from '../views/user/admin/pembayaran';
import AsetAdmin from '../views/user/admin/aset';
import TambahAset from '../views/user/admin/tambah_aset';
import ReportPendaftarOnline from '../views/user/admin/report_pendaftar_online';
import ReportPendaftarManual from '../views/user/admin/report_pendaftar_manual';
import ReportMahasiswa from '../views/user/admin/report_mahasiswa';
import DaftarTransaksiAdmin from '../views/user/admin/daftar-transaksi';
// Folder Keuangan (Role 4)DaftarTransaksi
import MainKeuangan from '../components/layouts/MainKeuangan';
import AkunKeuangan from '../views/user/keuangan/akun';
import TransaksiKeuangan from '../views/user/keuangan/transaksi';
import DaftarTransaksi from '../views/user/keuangan/daftar_transaksi';
import DataJurnalKeuangan from '../views/user/keuangan/data-jurnal';
import TransaksiBukuBesar from '../views/user/keuangan/transaksi_buku_besar';
import NeracaSaldoAkhir from '../views/user/keuangan/neraca_saldo_akhir';
import JurnalUmum from '../views/user/keuangan/jurnal_umum';
import BukuBesar from '../views/user/keuangan/buku_besar';
import InvoicePrint from '../views/user/keuangan/invoice_print';
import Laporan from '../views/user/keuangan/Laporan';
// Folder Akademik (Role 5)
import MainAkademik from '../components/layouts/MainAkademik';
import DashboardAkademikView from '../views/user/akademik/Dashboard';
import DaftarMahasiswaAkademik from '../views/user/akademik/Mahasiswa';
import MahasiswaMagang from '../views/user/akademik/mahasiswa_magang';
import MahasiswaBekerja from '../views/user/akademik/mahasiswa_bekerja';
import MahasiswaNonaktif from '../views/user/akademik/mahasiswa_nonaktif';
import MahasiswaLulus from '../views/user/akademik/mahasiswa_lulus';
import MahasiswaPindah from '../views/user/akademik/mahasiswa_pindah';
import MataKuliahAkademik from '../views/user/akademik/Mata_Kuliah';
import JadwalAkademik from '../views/user/akademik/Jadwal';
import ListJadwalAkademik from '../views/user/akademik/list_jadwal';
import KehadiranAkademik from '../views/user/akademik/kehadiran';
import RekapAbsenMahasiswa from '../views/user/akademik/rekap_mahasiswa';
import PengumumanAkademik from '../views/user/akademik/Pengumuman';
import RuanganAkademik from '../views/user/akademik/Ruangan';
import KelasAkademik from '../views/user/akademik/kelas';
import ListMahasiswaAkademik from '../views/user/akademik/list_mahasiswa';
import TranskripNilaiMahasiswa from '../views/user/akademik/transkrip';
import RekapAbsenDosen from '../views/user/akademik/rekap_dosen';
import DosenAkademik from '../views/user/akademik/dosen';
import DaftarKelasAkademik from '../views/user/akademik/daftar_kelas';
import DaftarKelasMahasiswaAkademik from '../views/user/akademik/daftar_kelas_mahasiswa';
import JadwalMahasiswaAkademik from '../views/user/akademik/jadwal_mahasiswa';
import AbsensiAkademik from '../views/user/akademik/absensi';
import DaftarAkademik from '../views/user/akademik/daftar';
import NilaiMahasiswaAkademik from '../views/user/akademik/nilai_mahasiswa';
// Folder Kepala Cabang (Role 6)
import MainKepalaCabang from '../components/layouts/MainKepalaCabang';
import AdministratorKepalaCabang from '../views/user/kepala_cabang/administrator';
import AkademikKepalaCabang from '../views/user/kepala_cabang/akademik';
import DashboardKepalaCabang from '../views/user/kepala_cabang/dashboard';
import KeuanganKepalaCabang from '../views/user/kepala_cabang/keuangan';
import JurusanKepalaCabang from '../views/user/kepala_cabang/jurusan';
import PengajuanKepalaCabang from '../views/user/kepala_cabang/pengajuan';
import AnggaranKepalaCabang from '../views/user/kepala_cabang/Anggaran';
import MahasiswaKepalaCabang from '../views/user/kepala_cabang/mahasiswa';
import DosenKepalaCabang from '../views/user/kepala_cabang/dosen';
import StaffKepalaCabang from '../views/user/kepala_cabang/staff';
// Folder HRD (Role 7)
import MainHRD from '../components/layouts/MainHrd';
import PegawaiHRD from '../views/user/hrd/pegawai';
import JabatanHRD from '../views/user/hrd/jabatan';
import PengajuanPegawaiHRD from '../views/user/hrd/pengajuan_pegawai';
import PengajuanHRD from '../views/user/hrd/pengajuan';
import addPegawaiHRD from '../views/user/hrd/add_pegawai';
import editPegawaiHRD from '../views/user/hrd/edit_pegawai';
import CetakPegawaiHRD from '../views/user/hrd/cetak_pegawai';
// Folder Owner (Role 8)
import MainOwner from '../components/layouts/MainOwner';
// import MahasiswaOwner from '../views/user/owner/mahasiswa_old';
import MahasiswaOwner from '../views/user/owner/Mahasiswa';
import MahasiswaMagangOwner from '../views/user/owner/mahasiswa_magang';
import MahasiswaBekerjaOwner from '../views/user/owner/mahasiswa_bekerja';
import MahasiswaNonaktifOwner from '../views/user/owner/mahasiswa_nonaktif';
import MahasiswaLulusOwner from '../views/user/owner/mahasiswa_lulus';
import MahasiswaPindahOwner from '../views/user/owner/mahasiswa_pindah';
import DosenOwner from '../views/user/owner/dosen';
import DashboardOwner from '../views/user/owner/Dashboard';
import KampusOwner from '../views/user/owner/Kampus';
import HRDOwner from '../views/user/owner/HRD';
import PerubahanTransaksi from '../views/user/owner/perubahan_transaksi';
import Form_add_staffOwner from '../views/user/owner/Form_add_staff';
import Form_edit_staffOwner from '../views/user/owner/Form_edit_staff';
import KepalaCabangOwner from '../views/user/owner/Kepala_cabang';
import KelompokAkunOwner from '../views/user/owner/kelompok_akun';
import ApproveGajiOwner from '../views/user/owner/approve_gaji';
import PengajuanGajiOwner from '../views/user/owner/pengajuan_gaji';
import PengajuanAnggaranOwner from '../views/user/owner/pengajuan_anggaran';
import AnggaranOwner from '../views/user/owner/Anggaran';
import StaffOwner from '../views/user/owner/staff';
// REPORT
import ReportMahasiswaAkademik from '../views/user/report/mahasiswa_akademik';


let komponen = null;

if (window.sessionStorage.getItem('access') === null || window.sessionStorage.getItem('role') === null) {
    komponen = (
        <Router history={browserHistory}>
            <Route path="/" component={Login}/>
            <Route path="login" component={Login}/>
            <Route path="registrasi" component={Registrasi}/>
            <Route path='*' exact={true} component={Login} />
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') == "1") {
    komponen = (
        <Router history={browserHistory}>
            <Route path="/" component={MainMhs}>
                <IndexRedirect to="/mahasiswa"/>
                <Route path="mahasiswa" component={DashboardMhs}> </Route>
                <Route path="nilai" component={NilaiMhs}> </Route>
                <Route path="jadwal" component={JadwalMhs}> </Route>
                <Route path="pembayaran" component={PembayaranMhs}> </Route>
                <Route path="akun" component={Akun}> </Route>
            </Route>
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === "2") {
    komponen = (
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
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '3') {
    komponen = (
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
                <Route path="tagihan" component={Tagihan}> </Route>
                <Route path="pengajuan" component={PengajuanAdmin}> </Route>
                <Route path="pembayaran" component={PembayaranAdmin}> </Route>
                <Route path="akun" component={Akun}> </Route>
                <Route path="report-pendaftar-manual" component={ReportPendaftarManual}> </Route>
                <Route path="report-pendaftar-online" component={ReportPendaftarOnline}> </Route>
                <Route path="report-mahasiswa" component={ReportMahasiswa}> </Route>
                <Route path="daftar-transaksi" component={DaftarTransaksiAdmin}> </Route>
            </Route>
            <Route path="invoice-print" component={InvoicePrint}> </Route>
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '4') {
    komponen = (
        <Router history={browserHistory}>
            <Route path="/" component={MainKeuangan}>
                <IndexRedirect to="/akun"/>
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
            <Route path="invoice-print" component={InvoicePrint}> </Route>
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '5') {
    komponen = (
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
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '6') {
    komponen = (
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
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '7') {
    komponen = (
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
        </Router>)
}

if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '8') {
    komponen = (
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
        </Router>)
}

module.exports = komponen;