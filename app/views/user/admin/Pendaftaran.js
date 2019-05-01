import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js'

class Pendaftaran extends Component {

    constructor(props){
        // window.location.reload();
        super(props);
        this.state ={
            jurusans: [],
            kampus: [],
            pendaftar: {},
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount = () => {
        const self = this
        fetch(BASE_URL + '/api/jurusan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                jurusans: data.results
            })
        });
    
        fetch(BASE_URL + '/api/kampus/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                kampus: data.results
            })
        });
    }

    handleSubmit = (e) => {

        toastr.options = {
          "closeButton": true,
          "debug": false,
          "progressBar": true,
          "preventDuplicates": false,
          "positionClass": "toast-top-right",
          "onclick": null,
          "showDuration": "400",
          "hideDuration": "1000",
          "timeOut": "7000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        e.preventDefault()
        const self = this
        self.setState({
            loading: !this.state.loading
        })
        fetch(BASE_URL + '/api/pendaftaran/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',     
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')             
            },
            body: JSON.stringify(this.state.pendaftar)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            if(data.non_field_errors != null) {
                toastr.error("Data mahasiswa gagal ditambahkan", "Error ! ")
            }else{
                self.setState({
                    loading: !self.state.loading,
                    alert: !self.state.alert
                })
                toastr.success("Data mahasiswa berhasil ditambahkan", "Sukses ! ")
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Pendaftaran Manual</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-plus"></i> Tambah Data</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label className="col-lg-4 col-form-label">Nama</label>
                                            <div className="text-right col-lg-8">
                                                <input 
                                                    value={this.state.pendaftar.nama}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.nama = e.target.value
                                                        pendaftar.nama_ayah = "Muhram"
                                                        pendaftar.nama_ibu = "Siti Rochmiyati"
                                                        this.setState({pendaftar})
                                                    }}
                                                    type="text" 
                                                    className="form-control m-b" 
                                                    name="nama"
                                                    />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Alamat</label>
                                            <div className="text-right col-lg-8">
                                                <textarea 
                                                    value={this.state.pendaftar.alamat}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.alamat = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    style={{'width':'100%', 'height':'50px'}}
                                                    className="form-control m-b" 
                                                    name="alamat"
                                                />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Tempat Lahir</label>
                                            <div className="text-right col-lg-8">
                                                <input 
                                                    value={this.state.pendaftar.tempat_lahir}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.tempat_lahir = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    type="text" 
                                                    className="form-control m-b" 
                                                    name="tempat_lahir"
                                                    />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Tanggal Lahir</label>
                                            <div className="text-right col-lg-8">
                                                <input 
                                                    value={this.state.pendaftar.tgl_lahir}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.tgl_lahir = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    type="date" 
                                                    className="form-control m-b" 
                                                    name="tgl_lahir"
                                                    />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Jenis Kelamin</label>
                                            <div className="text-right col-lg-8">
                                                <select className="form-control m-b"
                                                    value={this.state.pendaftar.jenis_kelamin}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.jenis_kelamin = e.target.value
                                                        this.setState({pendaftar})
                                                    }} 
                                                    name="jenis_kelamin">
	                                                <option >Pilih</option>
	                                                <option value="L">Laki - Laki</option>
	                                                <option value="P">Perempuan</option>
	                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="col-lg-4 col-form-label">No. Hp</label>
                                            <div className="text-right col-lg-8">
                                                <input 
                                                    value={this.state.pendaftar.no_hp}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.no_hp = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    type="text" 
                                                    className="form-control m-b" 
                                                    name="no_hp"
                                                    />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Email</label>
                                            <div className="text-right col-lg-8">
                                                <input 
                                                    value={this.state.pendaftar.email}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.email = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    type="email" 
                                                    className="form-control m-b" 
                                                    name="email"
                                                    />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Asal Sekolah</label>
                                            <div className="text-right col-lg-8">
                                                <input 
                                                    value={this.state.pendaftar.asal_sekolah}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.asal_sekolah = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    type="text" 
                                                    className="form-control m-b" 
                                                    name="asal_sekolah"
                                                    />
                                            </div>
                                            <label className="col-lg-4 col-form-label">Jurusan</label>
                                            <div className="text-right col-lg-8">
                                                <select 
                                                    value={this.state.pendaftar.jurusan}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.jurusan = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="jurusan" 
                                                    name="jurusan" 
                                                    className="form-control m-b">
                                                    <option value="">Pilih Jurusan</option>
                                                    {
                                                        this.state.jurusans.map((jurusan, i) => 
                                                            <option key={i} value={jurusan.id}>{jurusan.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <label className="col-lg-4 col-form-label">Kampus</label>
                                            <div className="text-right col-lg-8">
                                                <select 
                                                    value={this.state.pendaftar.kampus}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.kampus = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control m-b">
                                                    <option value="">Pilih Kampus</option>
                                                    {
                                                        this.state.kampus.map((kampus,i) => 
                                                            <option key={i} value={kampus.id}>{kampus.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-9"></div>
                                        <div className="text-right col-lg-3">
                                            <button
                                                className="btn btn-primary block full-width m-b" 
                                                onClick={this.handleSubmit}>
                                                { this.state.loading ? "Loading..." : <i className="fa fa-plus"> Tambah </i> }
                                            </button>
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

export default Pendaftaran