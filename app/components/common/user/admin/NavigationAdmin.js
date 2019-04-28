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
                        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">ADMINISTRATOR</strong>
                            </span> <span className="text-muted text-xs block">Example position<b className="caret"></b></span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#"> Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            IN+
                        </div>
                    </li>
                    <li>
                        <a><i className="fa fa-plus"></i> <span className="nav-label">Pendaftaran</span> <span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/pendaftaran")}>
                                <Link to="/pendaftaran"><span className="nav-label">Tambah Data</span></Link>
                            </li>
                            <li><Link to="/list-pendaftar"><span className="nav-label">List Pendaftaran</span></Link></li>
                        </ul>
                    </li>
                    <li>
                        <a><i className="fa fa-group"></i> <span className="nav-label">Mahasiswa</span> <span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level collapse">
                            <li className={this.activeRoute("/calon-mahasiswa")}>
                                <Link to="/calon-mahasiswa"><span className="nav-label">Calon Mahasiswa</span></Link>
                            </li>
                            <li><Link to="/mahasiswa"><span className="nav-label">Daftar Mahasiswa</span></Link></li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/dosen")}>
                        <Link to="/dosen"><i className="fa fa-user"></i> <span className="nav-label">Dosen</span></Link>
                    </li>
                    <li className={this.activeRoute("/broadcast")}>
                        <Link to="/broadcast"><i className="fa fa-bullhorn"></i> <span className="nav-label">Broadcast</span></Link>
                    </li>
                    <li className={this.activeRoute("/approve")}>
                        <Link to="/approve"><i className="fa fa-check"></i> <span className="nav-label">Approve</span></Link>
                    </li>
                    
                    <li className={this.activeRoute("/tagihan")}>
                        <Link to="/tagihan"><i className="fa fa-credit-card"></i> <span className="nav-label">Tagihan</span></Link>
                    </li>
                    <li className={this.activeRoute("/anggaran")}>
                        <Link to="/anggaran"><i className="fa fa-book"></i> <span className="nav-label">Anggaran</span></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation
// <li className={this.activeRoute("/inventaris")}>
//                         <Link to="/inventaris"><i className="fa fa-th-large"></i> <span className="nav-label">Input Inventaris</span></Link>
//                     </li>