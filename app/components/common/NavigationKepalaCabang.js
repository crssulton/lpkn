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
                        <li className={this.activeRoute("/dashboard")}>
                            <Link to="/dashboard"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span></Link>
                        </li>
                        <li className={this.activeRoute("/jurusan")}>
                            <Link to="/jurusan"><i className="fa fa-users"></i> <span className="nav-label">Jurusan</span></Link>
                        </li>
                        <li className={this.activeRoute("/admin")}>
                            <Link to="/admin"><i className="fa fa-users"></i> <span className="nav-label">Administrator</span></Link>
                        </li>
                        <li className={this.activeRoute("/akademik")}>
                            <Link to="/akademik"><i className="fa fa-book"></i> <span className="nav-label">Akademik</span></Link>
                        </li>
                        <li className={this.activeRoute("/keuangan")}>
                            <Link to="/keuangan"><i className="fa fa-home"></i> <span className="nav-label">Keuangan</span></Link>
                        </li>
                        <li className={this.activeRoute("/anggaran")}>
                            <Link to="/anggaran"><i className="fa fa-calendar"></i> <span className="nav-label">Approve Anggaran</span></Link>
                        </li>
                        <li className={this.activeRoute("/perubahan")}>
                            <Link to="/perubahan"><i className="fa fa-info-circle"></i> <span className="nav-label">Perubahan Data</span></Link>
                        </li>
                    </ul>
            </nav>
        )
    }
}

export default Navigation