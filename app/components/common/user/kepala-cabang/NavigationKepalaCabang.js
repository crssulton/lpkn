import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';
import cookie from 'react-cookies';

class Navigation extends Component {

    constructor(props){
        super(props);
        this.state = {
            akademik: {}
        }
    }

    componentWillMount(){
        const self = this
        fetch('http://lpkn.itec.my.id:9000/api/akademik/' +  window.sessionStorage.getItem('user_id')+'/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                akademik: data
            })
        });
    }

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
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Akademik</strong>
                             </span> <span className="text-muted text-xs block">{this.state.akademik.nama}<b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a href="#"> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                IN+
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