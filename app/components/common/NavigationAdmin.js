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
                                className="font-bold">ADMIN</strong>
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
                    <li>
                        <a><i className="fa fa-plus"></i> <span className="nav-label">Pendaftaran</span> <span
                            className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/pendaftaran")}>
                                <Link to="/pendaftaran">Tambah Data</Link>
                            </li>
                            <li><Link to="/list-pendaftar-online">List Pendaftaran Online</Link></li>
                            <li><Link to="/list-pendaftar">List Pendaftaran</Link></li>
                        </ul>
                    </li>
                    <li>
                        <a><i className="fa fa-group"></i> <span className="nav-label">Mahasiswa</span> <span
                            className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/calon-mahasiswa")}>
                                <Link to="/calon-mahasiswa">Calon Mahasiswa</Link>
                            </li>
                            <li><Link to="/mahasiswa">Daftar Mahasiswa</Link></li>
                        </ul>
                    </li>
                    <li>
                        <a><i className="fa fa-group"></i> <span className="nav-label">Dosen</span> <span
                            className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li>
                                <Link to="/tambah-dosen">Tambah Dosen</Link>
                            </li>
                            <li><Link to="/dosen">Daftar Dosen</Link></li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/broadcast")}>
                        <Link to="/broadcast"><i className="fa fa-bullhorn"></i> <span
                            className="nav-label">Broadcast</span></Link>
                    </li>
                    <li className={this.activeRoute("/pembayaran")}>
                        <Link to="/pembayaran"><i className="fa fa-credit-card-alt"></i> <span
                            className="nav-label">Pembayaran</span></Link>
                    </li>
                    <li className={this.activeRoute("/tagihan")}>
                        <Link to="/tagihan"><i className="fa fa-book"></i> <span
                            className="nav-label">Tagihan Mahasiswa</span></Link>
                    </li>
                    <li className={this.activeRoute("/approve")}>
                        <Link to="/approve"><i className="fa fa-check"></i> <span
                            className="nav-label">Approve</span></Link>
                    </li>
                    <li className={this.activeRoute("/anggaran")}>
                        <Link to="/anggaran"><i className="fa fa-book"></i> <span className="nav-label">Anggaran</span></Link>
                    </li>
                    <li>
                        <a><i className="fa fa-book"></i> <span className="nav-label">Aset</span> <span
                            className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/tambah-aset")}>
                                <Link to="/tambah-aset">Tambah Aset</Link>
                            </li>
                            <li><Link to="/aset">Daftar Aset</Link></li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/daftar-transaksi")}>
                        <Link to="/daftar-transaksi"><i className="fa fa-book"></i><span className="nav-label"> Daftar Transaksi</span></Link>
                    </li>
                    <li>
                        <a><i className="fa fa-book"></i> <span className="nav-label">Export Data</span> <span
                          className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/tambah-aset")}>
                                <Link to="/report-pendaftar-manual">Pendaftar Manual</Link>
                            </li>
                            <li><Link to="/report-pendaftar-online">Pendaftar Online</Link></li>
                            <li><Link to="/report-mahasiswa">Calon Mahasiswa</Link></li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/users")}>
                        <Link to="/users"><i className="fa fa-group"></i> <span
                            className="nav-label">Users</span></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation