import React from 'react'
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import Akun from '../views/user/akun';

let komponen = null;

if (window.sessionStorage.getItem('access') === null || window.sessionStorage.getItem('role') === null) {
    let Login       = require('../views/landing/Login').default;
    let Registrasi  = require('../views/landing/Registrasi').default;

    komponen = (
        <Router history={browserHistory}>
            <Route path="/" component={Login}/>
            <Route path="login" component={Login}/>
            <Route path="registrasi" component={Registrasi}/>
            <Route path='*' exact={true} component={Login} />
        </Router>)
}

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') == "1") {
    let MainMhs = require('../components/layouts/MainMhs').default;
    let DashboardMhs = require('../views/user/mahasiswa/Dashboard').default;
    let JadwalMhs = require('../views/user/mahasiswa/Jadwal').default;
    let NilaiMhs = require('../views/user/mahasiswa/Nilai').default;
    let PembayaranMhs = require('../views/user/mahasiswa/Pembayaran').default;

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

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === "2") {
    let MainDosen = require('../components/layouts/MainDosen').default;
    let DashboardDosen = require('../views/user/dosen/Main').default;
    let NilaiDosen = require('../views/user/dosen/Input').default;
    let AbsenDosen = require('../views/user/dosen/Absen').default;
    let RekapAbsensiDosen = require('../views/user/dosen/rekap_absensi').default;
    let BapDosen = require('../views/user/dosen/Bap').default;
    let DaftarHadirDosen = require('../views/user/dosen/daftar_hadir').default;
    let PertemuanDosen = require('../views/user/dosen/pertemuan').default;

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

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '3') {
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
        </Router>)
}

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '4') {
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

    komponen = (
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
            <Route path="invoice-print" component={InvoicePrint}> </Route>
        </Router>)
}

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '5') {
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

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '6') {
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

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '7') {
    let MainHRD = require('../components/layouts/MainHrd').default;
    let PegawaiHRD = require('../views/user/hrd/pegawai').default;
    let JabatanHRD = require('../views/user/hrd/jabatan').default;
    let PengajuanPegawaiHRD = require('../views/user/hrd/pengajuan_pegawai').default;
    let PengajuanHRD = require('../views/user/hrd/pengajuan').default;
    let addPegawaiHRD = require('../views/user/hrd/add_pegawai').default;
    let editPegawaiHRD = require('../views/user/hrd/edit_pegawai').default;
    let CetakPegawaiHRD = require('../views/user/hrd/cetak_pegawai').default;

// let MahasiswaOwner = require('../views/user/owner/mahasiswa_old').default;

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

else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '8') {
    // Folder Owner (Role 8)
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
// REPORT
    let ReportMahasiswaAkademik = require('../views/user/report/mahasiswa_akademik').default;

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