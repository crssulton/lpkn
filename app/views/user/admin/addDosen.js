import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'

export default class addDosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dosen: {},
            sertifikat: null,
            ijazah: null,
            kampus: []
        }
    }

    componentWillMount() {
        const self = this

        fetch(BASE_URL + '/api/kampus/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                kampus: data.results
            })
        });
    }

    addStaff = () => {
        const self = this
        let dosen = this.state.dosen
        let formData = new FormData()

        if(dosen.nama != null) formData.append('nama', dosen.nama);
        if(dosen.no_hp != null) formData.append('no_hp', dosen.no_hp);
        if(dosen.email != null) formData.append('email', dosen.email);
        if(dosen.alamat != null) formData.append('alamat', dosen.alamat);
        if(dosen.tempat_lahir != null) formData.append('tempat_lahir'   , dosen.tempat_lahir);
        if(dosen.tgl_lahir != null) formData.append('tgl_lahir', dosen.tgl_lahir)
        if(dosen.jenis_kelamin != null) formData.append('jenis_kelamin', dosen.jenis_kelamin)
        if(dosen.agama != null) formData.append('agama', dosen.agama)
        if(dosen.pendidikan_terakhir != null) formData.append('pendidikan_terakhir', dosen.pendidikan_terakhir)
        if(dosen.status_menikah != null) formData.append('status_menikah', dosen.status_menikah)

        if( this.state.ijazah != null) formData.append('ijazah', this.state.ijazah)
        if( this.state.sertifikat != null) formData.append('sertifikat', this.state.sertifikat)

        fetch(BASE_URL + '/api/dosen/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            },
            body: formData
        }).then(function (response) {
            if (response.status == 201) {
                toastr.success("Data berhasil ditambahkan", "Sukses ! ")
                self.props.history.push('/dosen')
            } else {
                toastr.warning("Gagal menambahkan Data", "Gagal ! ")
            }
        }).then(function (data) {

        });
    }

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="row animated fadeInRight">
                    <div className="col-lg-12">
                        <div className="ibox ">
                            <div className="ibox-title">
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                Data Dosen
                                            </div>
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Nama</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="userName"
                                                                    name="userName"
                                                                    type="text"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.nama}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.nama = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="alamat"
                                                                    name="alamat"
                                                                    type="text"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.alamat}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.alamat = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Tmpt
                                                                Lahir</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="tempat_lahir"
                                                                    name="tempat_lahir"
                                                                    type="text"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.tempat_lahir}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.tempat_lahir = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Tgl Lahir</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="tgl_lahir"
                                                                    name="tgl_lahir"
                                                                    type="date"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.tgl_lahir}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.tgl_lahir = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">J.
                                                                Kelamin</label>
                                                            <div className="col-sm-9">
                                                                <select
                                                                    id="jenis_kelamin"
                                                                    name="jenis_kelamin"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.jenis_kelamin}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.jenis_kelamin = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                >
                                                                    <option value="">Pilih Jenis Kelamin</option>
                                                                    <option value="L">Laki - Laki</option>
                                                                    <option value="P">Perempuan</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Agama</label>
                                                            <div className="col-sm-9">
                                                                <select
                                                                    id="agama"
                                                                    name="agama"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.agama}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.agama = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                >
                                                                    <option value="">Pilih Agama</option>
                                                                    <option value="islam">Islam</option>
                                                                    <option value="hindu">Hindu</option>
                                                                    <option value="budha">Budha</option>
                                                                    <option value="protestan">Protestan</option>
                                                                    <option value="katolik">Katolik</option>
                                                                    <option value="konghucu">Konghucu</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Email</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.email}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.email = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label
                                                                className="col-sm-3 col-form-label">Pendidikan</label>
                                                            <div className="col-sm-9">
                                                                <select
                                                                    id="agama"
                                                                    name="agama"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.pendidikan_terakhir}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.pendidikan_terakhir = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                >
                                                                    <option value="">Pilih</option>
                                                                    <option value="smp">SMP</option>
                                                                    <option value="sma/smk">SMA/SMK</option>
                                                                    <option value="s1">S1</option>
                                                                    <option value="s2">S2</option>
                                                                    <option value="s3">S3</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Status</label>
                                                            <div className="col-sm-9">
                                                                <select
                                                                    id="agama"
                                                                    name="agama"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.status_menikah}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.status_menikah = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                >
                                                                    <option value="">Pilih</option>
                                                                    <option value="sudah_menikah">Sudah Menikah</option>
                                                                    <option value="belum_menikah">Belum Menikah</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">No HP</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="number"
                                                                    className="form-control required"
                                                                    value={this.state.dosen.no_hp}
                                                                    onChange={(e) => {
                                                                        let dosen = {}
                                                                        dosen = this.state.dosen
                                                                        dosen.no_hp = e.target.value
                                                                        this.setState({dosen})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                Dokumen Dosen
                                            </div>
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Ijazah</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="userName"
                                                                    name="userName"
                                                                    type="file"
                                                                    className="form-control required"
                                                                    onChange={(e) => {
                                                                        this.setState({ijazah : e.target.files[0]})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label
                                                                className="col-sm-3 col-form-label">Sertifikat</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="file"
                                                                    className="form-control required"
                                                                    onChange={(e) => {
                                                                        this.setState({sertifikat    : e.target.files[0]})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <center>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.addStaff}
                                    >
                                        Tambah Data
                                    </button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
