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
                        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">DOSEN</strong>
                         </span> <span className="text-muted text-xs block">Example position<b className="caret"></b></span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#"> Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            IN+
                        </div>
                    </li>
                    <li className={this.activeRoute("/absen")}>
                        <Link to="/absen"><i className="fa fa-th-large"></i> <span className="nav-label">Absen Mahasiswa</span></Link>
                    </li>
                    <li className={this.activeRoute("/main")}>
                        <Link to="/main"><i className="fa fa-group"></i> <span className="nav-label">Jadwal</span></Link>
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