import React, { Component } from 'react';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    handleLogout= () =>{
        window.sessionStorage.removeItem('role')
        window.sessionStorage.removeItem('user_id')
        window.sessionStorage.removeItem('access')
        setTimeout(() => {
            window.location = "/";
        },0);
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                             </span>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">KEPALA CABANG</strong>
                             </span> <span className="text-muted text-xs block">Setting <b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInLeft m-t-xs">
                                    <li><a onClick={this.handleLogout}> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                LPKN
                            </div>
                        </li>
                        <li className={this.activeRoute("/jurusan")}>
                            <Link to="/jurusan"><i className="fa fa-graduation-cap"></i> <span className="nav-label">Jurusan</span></Link>
                        </li>
                        <li className={this.activeRoute("/admin")}>
                            <Link to="/admin"><i className="fa fa-users"></i> <span className="nav-label">Administrator</span></Link>
                        </li>
                        <li className={this.activeRoute("/akademik")}>
                            <Link to="/akademik"><i className="fa fa-book"></i> <span className="nav-label">Akademik</span></Link>
                        </li>
                        <li className={this.activeRoute("/keuangan")}>
                            <Link to="/keuangan"><i className="fa fa-credit-card-alt"></i> <span className="nav-label">Keuangan</span></Link>
                        </li>
                        <li>
                            <a><i className="fa fa-database"></i> <span className="nav-label">View Kampus</span> <span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/mahasiswa">Mahasiswa</Link>
                                </li>
                                <li><Link to="/tagihan">Pembayaran Mahasiswa</Link></li>
                                <li><Link to="/dosen">Dosen</Link></li>
                                <li><Link to="/staff">Staff</Link></li>
                            </ul>
                        </li>
                        <li>
                            <a><i className="fa fa-book"></i> <span className="nav-label">Report Keuangan</span> <span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li className={this.activeRoute("/neraca_saldo_awal")}>
                                    <Link to="/neraca_saldo_awal"><span className="nav-label">Neraca Saldo Awal</span></Link>
                                </li>
                                <li className={this.activeRoute("/jurnal-umum")}>
                                    <Link to="/jurnal-umum"><span className="nav-label">Jurnal Umum</span></Link>
                                </li>
                                <li className={this.activeRoute("/ayat_jurnal_penyesuaian")}>
                                    <Link to="/ayat_jurnal_penyesuaian"><span className="nav-label">Ayat Jurnal Penyesuaian</span></Link>
                                </li>
                                <li className={this.activeRoute("/penutup_jurnal")}>
                                    <Link to="/penutup_jurnal"><span className="nav-label">Jurnal Penutup</span></Link>
                                </li>
                                <li className={this.activeRoute("/buku_besar")}>
                                    <Link to="/buku_besar"><span className="nav-label">Buku Besar</span></Link>
                                </li>
                                <li className={this.activeRoute("/saldo_sementara")}>
                                    <Link to="/saldo_sementara"><span className="nav-label">Neraca Saldo Sementara</span></Link>
                                </li>
                                <li className={this.activeRoute("/neraca_lanjut")}>
                                    <Link to="/neraca_lanjut"><span className="nav-label">Neraca Lajur</span></Link>
                                </li>
                                <li className={this.activeRoute("/rugi_laba")}>
                                    <Link to="/rugi_laba"><span className="nav-label">Rugi/Laba</span></Link>
                                </li>
                                <li className={this.activeRoute("/perubahan_modal")}>
                                    <Link to="/perubahan_modal"><span className="nav-label">Perubahan Modal</span></Link>
                                </li>
                                <li className={this.activeRoute("/neraca_akhir")}>
                                    <Link to="/neraca_akhir"><span className="nav-label">Neraca Akhir</span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
            </nav>
        )
    }
}

export default Navigation