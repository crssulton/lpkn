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

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element"> <span>
                            </span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Example user</strong>
                            </span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#"> Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            LPKN
                        </div>
                    </li>
                    <li className={this.activeRoute("/pendaftaran")}>
                        <Link to="/pendaftaran"><i className="fa fa-th-large"></i> <span className="nav-label">Pendaftaran</span></Link>
                    </li>
                    <li className={this.activeRoute("/status")}>
                        <Link to="/status"><i className="fa fa-th-large"></i> <span className="nav-label">Input Status</span></Link>
                    </li>
                    <li className={this.activeRoute("/broadcast")}>
                        <Link to="/broadcast"><i className="fa fa-th-large"></i> <span className="nav-label">Broadcast</span></Link>
                    </li>
                    <li className={this.activeRoute("/approve")}>
                        <Link to="/approve"><i className="fa fa-th-large"></i> <span className="nav-label">Approve</span></Link>
                    </li>
                    <li className={this.activeRoute("/inventaris")}>
                        <Link to="/inventaris"><i className="fa fa-th-large"></i> <span className="nav-label">Input Inventaris</span></Link>
                    </li>
                    <li className={this.activeRoute("/perubahan")}>
                        <Link to="/perubahan"><i className="fa fa-th-large"></i> <span className="nav-label">Perubahan Data</span></Link>
                    </li>
                    <li className={this.activeRoute("/anggaran")}>
                        <Link to="/anggaran"><i className="fa fa-th-large"></i> <span className="nav-label">Anggaran</span></Link>
                    </li>
                    <li className={this.activeRoute("/cetak")}>
                        <Link to="/cetak"><i className="fa fa-th-large"></i> <span className="nav-label">Cetak Kuitansi</span></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation