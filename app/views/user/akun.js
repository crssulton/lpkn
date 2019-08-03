import React, {Component} from 'react';
import {BASE_URL} from '../../config/config.js'
import swal from "sweetalert";
//TODO url akun double, ada akun untuk keuangan sama akun untuk akun user, ubah url nya
export default class Akun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            akun: {},
            username: "",
            password: ""
        }
    }

    componentDidMount() {
        const self = this
        let id = window.sessionStorage.getItem('user')
        fetch(BASE_URL + `/api/users/${id}/` , {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({
                akun: data
            })
        });
    }

    editUsername = () => {
        const self = this
        let akun = this.state.akun

        fetch(BASE_URL + '/api/users/' + this.state.akun.id + '/', {
            method: 'patch',
            body: JSON.stringify(this.state.akun),
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status == 200) {
                swal({
                    title: "Username berhasil diubah",
                    icon: "success",
                    text: 'Silahkan login kembali '
                })
                    .then(() => {
                        window.sessionStorage.removeItem('role')
                        window.sessionStorage.removeItem('user_id')
                        window.sessionStorage.removeItem('access')
                        setTimeout(() => {
                            window.location = "/";
                        }, 0);
                    })
            } else {
                toastr.warning("Gagal mengubah Username", "Gagal ! ")
            }
        }).then(function (data) {

        });
    }

    editPassword = () => {
        const self = this
        let akun = this.state.akun

        let data = {
            password: this.state.password
        }

        if(this.state.password != ""){
            fetch(BASE_URL + '/api/users/' + this.state.akun.id + '/change-password/', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.status == 200) {
                    swal({
                        title: "Password berhasil diubah",
                        icon: "success",
                        text: 'Silahkan login kembali '
                    })
                        .then(() => {
                            window.sessionStorage.removeItem('role')
                            window.sessionStorage.removeItem('user_id')
                            window.sessionStorage.removeItem('access')
                            setTimeout(() => {
                                window.location = "/";
                            }, 0);
                        })
                } else {
                    toastr.warning("Gagal mengubah Password", "Gagal ! ")
                }
            }).then(function (data) {

            });
        }
    }

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="row animated fadeInRight">
                    <div className="col-lg-12">
                        <div className="ibox ">
                            <div className="ibox-title">
                                <h5 style={{'cursor': 'pointer'}} onClick={() => this.props.history.goBack()}><i
                                    className="fa fa-arrow-left "></i> Kembali</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                Username
                                            </div>
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Username</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="userName"
                                                                    name="userName"
                                                                    type="email"
                                                                    className="form-control required"
                                                                    value={this.state.akun.username}
                                                                    onChange={(e) => {
                                                                        let akun = {}
                                                                        akun = this.state.akun
                                                                        akun.username = e.target.value
                                                                        this.setState({akun})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={this.editUsername}
                                                            >
                                                                Ubah Username
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                Password
                                            </div>
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Password</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="userName"
                                                                    name="userName"
                                                                    type="password"
                                                                    value={this.state.password}
                                                                    className="form-control required"
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            password: e.target.value
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={this.editPassword}
                                                            >
                                                                Ubah Password
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
