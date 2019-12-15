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
                                className="font-bold">DOSEN</strong>
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
                    <li className={this.activeRoute("/absen")}>
                        <Link to="/absen"><i className="fa fa-th-large"></i> <span
                            className="nav-label">Dashboard</span></Link>
                    </li>
                    <li>
                        <a><i className="fa fa-address-card"></i> <span className="nav-label">Daftar Hadir</span> <span
                            className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/pertemuan")}>
                                <Link to="/pertemuan"><span className="nav-label">Daftar Pertemuan</span></Link>
                            </li>
                            <li className={this.activeRoute("/rekap-absensi")}>
                                <Link to="/rekap-absensi"><span className="nav-label">Rekap Absensi</span></Link>
                            </li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/jadwal")}>
                        <Link to="/jadwal"><i className="fa fa-calendar"></i> <span className="nav-label">Jadwal</span></Link>
                    </li>
                    <li className={this.activeRoute("/nilai")}>
                        <Link to="/nilai"><i className="fa fa-plus"></i> <span className="nav-label">Input Nilai</span></Link>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Navigation