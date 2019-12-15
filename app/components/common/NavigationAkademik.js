import React, {Component} from 'react';
import {Link} from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const {menu} = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    handleLogout = () => {
        window.sessionStorage.removeItem('role')
        window.sessionStorage.removeItem('user_id')
        window.sessionStorage.removeItem('access')
        setTimeout(() => {
            window.location = "/";
        }, 0);
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element"> <span>
                             </span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong
                                className="font-bold">AKADEMIK</strong>
                             </span> <span className="text-muted text-xs block">Setting <b className="caret"></b></span> </span>
                            </a>
                            <ul className="dropdown-menu animated fadeInLeft m-t-xs">
                                <li><Link to="/akun"><a>Akun</a></Link></li>
                                <li><a onClick={this.handleLogout}> Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            LPKN
                        </div>
                    </li>
                    <li className={this.activeRoute("/dashboard")}>
                        <Link to="/dashboard"><i className="fa fa-th-large"></i> <span
                            className="nav-label">Dashboard</span></Link>
                    </li>
                    <li>
                        <a><i className="fa fa-users"></i> <span className="nav-label">Mahasiswa</span>
                            <span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/mahasiswa")}>
                                <Link to="/mahasiswa"><span className="nav-label">Aktif</span></Link>
                            </li>
                            <li className={this.activeRoute("/nonaktif")}>
                                <Link to="/nonaktif"><span className="nav-label">Tidak Aktif</span></Link>
                            </li>
                            <li className={this.activeRoute("/magang")}>
                                <Link to="/magang"><span className="nav-label">Magang</span></Link>
                            </li>
                            <li className={this.activeRoute("/bekerja")}>
                                <Link to="/bekerja"><span className="nav-label">Bekerja</span></Link>
                            </li>
                            <li className={this.activeRoute("/pindah")}>
                                <Link to="/pindah"><span className="nav-label">Pindah Jurusan</span></Link>
                            </li>
                            <li className={this.activeRoute("/lulus")}>
                                <Link to="/lulus"><span className="nav-label">Alumni</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/matkul")}>
                        <Link to="/matkul"><i className="fa fa-book"></i> <span className="nav-label">Mata Kuliah</span></Link>
                    </li>
                    <li className={this.activeRoute("/ruangan")}>
                        <Link to="/ruangan"><i className="fa fa-home"></i> <span
                            className="nav-label">Ruangan</span></Link>
                    </li>
                    <li className={this.activeRoute("/kelas")}>
                        <Link to="/kelas"><i className="fa fa-address-card"></i> <span
                            className="nav-label">Kelas</span></Link>
                    </li>
                    <li>
                        <a><i className="fa fa-address-card"></i> <span className="nav-label">Absensi Mahasiswa</span>
                            <span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/absensi")}>
                                <Link to="/absensi"><span className="nav-label">Buat Absensi</span></Link>
                            </li>
                            <li className={this.activeRoute("/daftar-jadwal")}>
                                <Link to="/daftar-jadwal"><span className="nav-label">Daftar Hadir</span></Link>
                            </li>
                            <li className={this.activeRoute("/rekap-mahasiswa")}>
                                <Link to="/rekap-mahasiswa"><span className="nav-label">Rekap Absensi</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a><i className="fa fa-calendar"></i> <span className="nav-label">Jadwal Perkuliahan</span>
                            <span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/jadwal")}>
                                <Link to="/jadwal"><span className="nav-label">Buat Jadwal</span></Link>
                            </li>
                            <li className={this.activeRoute("/buku_besar")}>
                                <Link to="/jadwal-mahasiswa"><span className="nav-label">List Jadwal</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a><i className="fa fa-user"></i> <span className="nav-label">Dosen</span>
                            <span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/daftar-dosen")}>
                                <Link to="/daftar-dosen"><span className="nav-label">Daftar Dosen</span></Link>
                            </li>
                            <li className={this.activeRoute("/dosen")}>
                                <Link to="/dosen"><span className="nav-label">Absensi Dosen</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a><i className="fa fa-pencil"></i> <span className="nav-label">Nilai Mahasiswa</span> <span
                            className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/nilai")}>
                                <Link to="/nilai"><span className="nav-label">Rekap Nilai</span></Link>
                            </li>
                            <li className={this.activeRoute("/list-mahasiswa")}>
                                <Link to="/list-mahasiswa"><span className="nav-label">Transkrip Nilai</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/pengumuman")}>
                        <Link to="/pengumuman"><i className="fa fa-info-circle"></i> <span
                            className="nav-label">Pengumuman</span></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation