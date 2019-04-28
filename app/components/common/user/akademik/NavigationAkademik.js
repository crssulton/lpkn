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
        fetch('http://lpkn.itec.my.id:9000/api/akademik/' + cookie.load('user_id')+'/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token')
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
                        <li className={this.activeRoute("/mahasiswa")}>
                            <Link to="/mahasiswa"><i className="fa fa-users"></i> <span className="nav-label">Mahasiswa</span></Link>
                        </li>
                        <li className={this.activeRoute("/matkul")}>
                            <Link to="/matkul"><i className="fa fa-book"></i> <span className="nav-label">Mata Kuliah</span></Link>
                        </li>
                        <li className={this.activeRoute("/jadwal")}>
                            <Link to="/jadwal"><i className="fa fa-calendar"></i> <span className="nav-label">Jadwal Perkuliahan</span></Link>
                        </li>
                        <li className={this.activeRoute("/pengumuman")}>
                            <Link to="/pengumuman"><i className="fa fa-info-circle"></i> <span className="nav-label">Pengumuman</span></Link>
                        </li>
                    </ul>

            </nav>
        )
    }
}

export default Navigation