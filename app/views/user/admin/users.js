import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import swal from 'sweetalert';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            selectedJurusan: 'all',
            form: false,
            username: '',
            selected: null,
            dosenBaru: {},
            add: true,
            addForm: true,
            kampus: [],
            jurusans: [],
        }
    }

    componentDidMount() {
        const self = this;

        //TODO jangan munculin saat first load
        fetch(BASE_URL + '/api/users/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                users: data.results,
                loading: !self.state.loading
            })
        });
    }

    resetAkun = (id) => {
        const self = this;
        swal({
            title: "Reset Password ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willTerima) => {
                if (willTerima) {
                    let data = {
                        password: (+new Date).toString(36).slice(-6)
                    };

                    fetch(BASE_URL + '/api/users/' + id + '/change-password/', {
                        method: 'post',
                        body: JSON.stringify(data),
                        headers: {
                            'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status == 200) {
                            swal({
                                title: 'Password Baru adalah : ' + data.password,
                                icon: "success"
                            })
                        } else {
                            toastr.warning("Gagal mengubah Password", "Gagal ! ")
                        }
                    }).then(function (data) {

                    });
                }
            });
    };

    onFilterData = () => {
        const self = this;
        let username = this.state.username;

        this.setState({loading: true});

        fetch(BASE_URL + `/api/users/?username=${username}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({
                users: data,
                loading: !self.state.loading
            })
        });
    };

    render() {
        const styletb = {
            borderCollapse: 'collapse',
            borderSpacing: 0,
            borderStyle: 'solid',
            width: '100%',
            fontSize: '12px'
        };
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Daftar Users</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Users</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                    <h5><i className="fa fa-list "></i> Daftar Users</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <label className="form-label">Username : </label>
                                        </div>
                                        <div className="col-lg-3"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <input
                                                type="text"
                                                value={this.state.username}
                                                onChange={(e) => this.setState({username: e.target.value})}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-lg-3">
                                            <button
                                                onClick={this.onFilterData}
                                                className="btn btn-info"
                                                type="button"
                                            >
                                                <i className="fa fa-filter"/> Filter
                                            </button>

                                            <button
                                                onClick={() => {
                                                    const self = this;
                                                    this.fetchTransaksi();
                                                    this.setState({
                                                        username: ""
                                                    });
                                                }}
                                                style={{marginLeft: "5px"}}
                                                className="btn btn-warning"
                                                type="button"
                                            >
                                                <i className="fa fa-close"/> Reset
                                            </button>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="hr-line-dashed"/>
                                    {
                                        this.state.loading ?
                                            <div className="spiner-example">
                                                <div className="sk-spinner sk-spinner-double-bounce">
                                                    <div className="sk-double-bounce1"></div>
                                                    <div className="sk-double-bounce2"></div>
                                                </div>
                                            </div> :

                                            <div className="table-responsive">
                                                <table className="table table-striped" align="right">
                                                    <thead>
                                                    <tr>
                                                        <th>NO.</th>
                                                        <th>USERNAME</th>
                                                        <th>EMAIL</th>
                                                        <th>ROLE</th>
                                                        <th>RESET</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.users.filter(item => item.role != 8).map((user, key) =>
                                                            <tr key={key}>
                                                                <td>{key + 1}</td>
                                                                <td>{user.username}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.role_display}</td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => this.resetAkun(user.id)}
                                                                        className="btn btn-warning btn-sm"
                                                                        type="button"
                                                                    ><i className="fa fa-refresh"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}

export default Users