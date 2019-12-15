import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'

export default class Form_add_staff extends Component {

    constructor(props) {
        super(props);
        const {staf} = this.props.location.state;
        console.log(staf)
        this.state = {
            pegawai: staf,
            kampus: [],
            foto: null,
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

        if(dosen.nama_ayah != null) formData.append('nama_ayah', dosen.nama_ayah)
        if(dosen.pekerjaan_ayah != null) formData.append('pekerjaan_ayah', dosen.pekerjaan_ayah)
        if(dosen.nama_ibu != null) formData.append('nama_ibu', dosen.nama_ibu);
        if(dosen.pekerjaan_ibu != null) formData.append('pekerjaan_ibu', dosen.pekerjaan_ibu);

        if(dosen.id_facebook != null) formData.append('id_facebook', dosen.id_facebook);
        if(dosen.wa_or_line != null) formData.append('wa_or_line', dosen.wa_or_line);

        if( this.state.foto != null) formData.append('foto', this.state.foto);

        fetch(BASE_URL + '/api/mahasiswa/' + this.state.pegawai.id + '/', {
            method: 'patch',

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
                                                            <label className="col-sm-3 col-form-label">NIM</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  disabled={true}
                                                                  id="userName"
                                                                  name="userName"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.nim}
                                                                />
                                                            </div>
                                                        </div>

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
                                                            <label className="col-sm-3 col-form-label">Facebook</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="email"
                                                                  name="email"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.id_facebook}
                                                                  onChange={(e) => {
                                                                      let pegawai = {}
                                                                      pegawai = this.state.pegawai
                                                                      pegawai.id_facebook = e.target.value
                                                                      this.setState({pegawai})
                                                                  }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-group  row">
                                                            <label className="col-sm-3 col-form-label">Whatsapp</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="email"
                                                                  name="email"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.wa_or_line}
                                                                  onChange={(e) => {
                                                                      let pegawai = {}
                                                                      pegawai = this.state.pegawai
                                                                      pegawai.wa_or_line = e.target.value
                                                                      this.setState({pegawai})
                                                                  }}
                                                                />
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
                                                        <div className="form-group  row">
                                                            <label
                                                              className="col-sm-3 col-form-label">Foto</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="email"
                                                                  name="email"
                                                                  type="file"
                                                                  className="form-control required"
                                                                  onChange={(e) => {
                                                                      this.setState({foto    : e.target.files[0]})
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
                                                Data Orang Tua
                                            </div>
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">Nama Ayah</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="no_hp"
                                                                  name="no_hp"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.nama_ayah}
                                                                  onChange={(e) => {
                                                                      let pegawai = {}
                                                                      pegawai = this.state.pegawai
                                                                      pegawai.nama_ayah = e.target.value
                                                                      this.setState({pegawai})
                                                                  }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">Pekerjaan Ayah</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="no_hp"
                                                                  name="no_hp"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.pekerjaan_ayah}
                                                                  onChange={(e) => {
                                                                      let pegawai = {}
                                                                      pegawai = this.state.pegawai
                                                                      pegawai.pekerjaan_ayah = e.target.value
                                                                      this.setState({pegawai})
                                                                  }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">Nama Ibu</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="no_hp"
                                                                  name="no_hp"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.nama_ibu}
                                                                  onChange={(e) => {
                                                                      let pegawai = {}
                                                                      pegawai = this.state.pegawai
                                                                      pegawai.nama_ibu = e.target.value
                                                                      this.setState({pegawai})
                                                                  }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">Pekerjaan Ibu</label>
                                                            <div className="col-sm-9">
                                                                <input
                                                                  id="no_hp"
                                                                  name="no_hp"
                                                                  type="text"
                                                                  className="form-control required"
                                                                  value={this.state.pegawai.pekerjaan_ibu}
                                                                  onChange={(e) => {
                                                                      let pegawai = {}
                                                                      pegawai = this.state.pegawai
                                                                      pegawai.pekerjaan_ibu = e.target.value
                                                                      this.setState({pegawai})
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
