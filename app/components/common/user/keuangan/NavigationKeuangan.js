import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
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

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                             </span>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> 
                                <span className="block m-t-xs"> 
                                    <strong className="font-bold">KEUANGAN</strong>
                                </span> 
                                <span className="text-muted text-xs block">Keluar<b className="caret"></b></span> 
                            </span> </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a href="#"> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                LPKN
                            </div>
                        </li>
                        <li className={this.activeRoute("/akun")}>
                            <Link to="/akun"><i className="fa fa-book"></i> <span className="nav-label">Akun</span></Link>
                        </li>
                        <li className={this.activeRoute("/transaksi")}>
                            <Link to="/transaksi"><i className="fa fa-calendar"></i> <span className="nav-label">Transaksi</span></Link>
                        </li>
                        <li className={this.activeRoute("/jurnal")}>
                            <Link to="/jurnal"><i className="fa fa-calendar"></i> <span className="nav-label">Data Jurnal</span></Link>
                        </li>
                        <li>
                            <a><i className="fa fa-book"></i> <span className="nav-label">Report</span> <span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/neraca-saldo-awal"><span className="nav-label">Neraca Saldo Awal</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Jurnal Umum</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Ayat Jurnal Penyesuaian</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Jurnal Penutup</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Buku Besar</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Neraca Saldo Sementara</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Neraca Lajur</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Rugi/Laba</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Perubahan Modal</span></Link>
                                </li>
                                <li className={this.activeRoute("/pendaftaran")}>
                                    <Link to="/pendaftaran"><span className="nav-label">Neraca Akhir</span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

            </nav>
        )
    }
}

export default Navigation