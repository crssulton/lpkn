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
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">MAHASISWA</strong>
                             </span> <span className="text-muted text-xs block">Setting <b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInLeft m-t-xs">
                                    <li><a onClick={this.handleLogout}> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                LPKN
                            </div>
                        </li>
                        <li className={this.activeRoute("/mahasiswa")}>
                            <Link to="/mahasiswa"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span></Link>
                        </li>
                        <li className={this.activeRoute("/nilai")}>
                            <Link to="/nilai"><i className="fa fa-book"></i> <span className="nav-label">Nilai</span></Link>
                        </li>
                        <li className={this.activeRoute("/jadwal")}>
                            <Link to="/jadwal"><i className="fa fa-calendar"></i> <span className="nav-label">Jadwal</span></Link>
                        </li>
                        <li className={this.activeRoute("/pembayaran")}>
                            <Link to="/pembayaran"><i className="fa fa-university"></i> 

                                <span className="nav-label">Pembayaran </span>
                                <span className="badge badge-warning">1</span>

                            </Link>
                        </li>
                    </ul>

            </nav>
        )
    }
}

export default Navigation