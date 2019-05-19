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
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">KEUANGAN</strong>
                             </span> <span className="text-muted text-xs block">Setting <b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInLeft m-t-xs">
                                    <li><a onClick={this.handleLogout}> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                LPKN
                            </div>
                        </li>
                        <li className={this.activeRoute("/akun")}>
                            <Link to="/akun"><i className="fa fa-book"></i> <span className="nav-label">Akun</span></Link>
                        </li>
                        <li className={this.activeRoute("/tagihan")}>
                            <Link to="/tagihan"><i className="fa fa-book"></i> <span className="nav-label">Pembayaran Mahasiswa</span></Link>
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
                                <li className={this.activeRoute("/transaksi-buku-besar")}>
                                    <Link to="/transaksi-buku-besar"><span className="nav-label">Transaksi Buku Besar</span></Link>
                                </li>
                                <li className={this.activeRoute("/buku_besar")}>
                                    <Link to="/buku_besar"><span className="nav-label">Ringkasan Buku Besar</span></Link>
                                </li>
                                <li className={this.activeRoute("/neraca_akhir")}>
                                    <Link to="/neraca_akhir"><span className="nav-label">Neraca Saldo</span></Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
            </nav>
        )
    }
}

export default Navigation