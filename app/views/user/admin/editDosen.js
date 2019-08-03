import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'

export default class Form_add_staff extends Component {

    constructor(props) {
        super(props);
        const {staf} = this.props.location.state
        this.state = {
            pegawai: staf,
            kampus: [],
            sertifikat: null,
            ijazah: null
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

    editStaff = () => {
        const self = this
        let dosen = this.state.pegawai
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

        fetch(BASE_URL + '/api/dosen/' + this.state.pegawai.id + '/', {
            method: 'put',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            },
            body: formData
        }).then(function (response) {
            if (response.status == 200) {
                toastr.success("Data berhasil diubah", "Sukses ! ")
                self.props.history.goBack()
            } else {
                toastr.warning("Gagal mengubah Data", "Gagal ! ")
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
                                <h5 style={{'cursor': 'pointer'}} onClick={() => this.props.history.goBack()}><i
                                    className="fa fa-arrow-left "></i> Kembali</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-primary">
                                            <div className="panel-heading">
                                                Data Diri
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
                                                                    value={this.state.pegawai.nama}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.nama = e.target.value
                                                                        this.setState({pegawai})
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
                                                                    value={this.state.pegawai.alamat}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.alamat = e.target.value
                                                                        this.setState({pegawai})
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
                                                                    value={this.state.pegawai.tempat_lahir}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.tempat_lahir = e.target.value
                                                                        this.setState({pegawai})
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
                                                                    value={this.state.pegawai.tgl_lahir}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.tgl_lahir = e.target.value
                                                                        this.setState({pegawai})
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Agama</label>
                                                            <div className="col-sm-9">
                                                                <select
                                                                    id="agama"
                                                                    name="agama"
                                                                    className="form-control required"
                                                                    value={this.state.pegawai.agama}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.agama = e.target.value
                                                                        this.setState({pegawai})
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

                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">J.
                                                                Kelamin</label>
                                                            <div className="col-sm-9">
                                                                <select
                                                                    id="jenis_kelamin"
                                                                    name="jenis_kelamin"
                                                                    className="form-control required"
                                                                    value={this.state.pegawai.jenis_kelamin}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.jenis_kelamin = e.target.value
                                                                        this.setState({pegawai})
                                                                    }}
                                                                >
                                                                    <option value="">Pilih Jenis Kelamin</option>
                                                                    <option value="L">Laki - Laki</option>
                                                                    <option value="P">Perempuan</option>
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
                                                                    value={this.state.pegawai.email}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.email = e.target.value
                                                                        this.setState({pegawai})
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
                                                                    value={this.state.pegawai.pendidikan_terakhir}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.pendidikan_terakhir = e.target.value
                                                                        this.setState({pegawai})
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
                                                                    value={this.state.pegawai.status_menikah}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.status_menikah = e.target.value
                                                                        this.setState({pegawai})
                                                                    }}
                                                                >
                                                                    <option value="">Pilih</option>
                                                                    <option value="sudah_menikah">Sudah Menikah</option>
                                                                    <option value="belum_menikah">Belum Menikah</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">No Hp</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                    id="no_hp"
                                                                    name="no_hp"
                                                                    type="number"
                                                                    className="form-control required"
                                                                    value={this.state.pegawai.no_hp}
                                                                    onChange={(e) => {
                                                                        let pegawai = {}
                                                                        pegawai = this.state.pegawai
                                                                        pegawai.no_hp = e.target.value
                                                                        this.setState({pegawai})
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
                                                                        this.setState({ijazah    : e.target.files[0]})
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
                                                        <br/><br/>
                                                    </div>
                                                    <center>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={this.editStaff}
                                                        >
                                                            Ubah Data
                                                        </button>
                                                    </center>
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
