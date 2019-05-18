import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'
import {browserHistory} from 'react-router';

export default class Form_add_staff extends Component {

	constructor(props){
        super(props);

        const {staf} = this.props.location.state

        this.state = {
            pegawai: staf,
            kampus: []
        }
        
    }

    componentWillMount(){
    	const self = this

		fetch(BASE_URL + '/api/kampus/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				kampus: data.results
			})
		});
    }

    editStaff = () =>  {
    	const {title} = this.props.location.state
    	const self = this
    	let pegawai = this.state.pegawai

    	fetch(BASE_URL + '/api/pegawai/' + this.state.pegawai.id + '/', {
			method: 'put',
			body: JSON.stringify(this.state.pegawai),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			console.log(response)
			if(response.status == 200){
				toastr.success("Data berhasil diubah", "Sukses ! ")
				self.props.history.goBack()
			}else{
				toastr.warning("Gagal mengubah Data", "Gagal ! ")
			}
		}).then(function(data) {

		});
    }

	render(){
		const {title} = this.props.location.state
		return(
			<div className="wrapper wrapper-content">
                <div className="row animated fadeInRight">
                    <div className="col-lg-12">
                        <div className="ibox ">
                            <div className="ibox-title">
                                <h5 style={{'cursor': 'pointer'}} onClick={() => this.props.history.goBack() }> <i className="fa fa-arrow-left "></i> Kembali</h5>
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
												            <label className="col-sm-3 col-form-label">NIK</label>
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
												            <label className="col-sm-3 col-form-label">Jabatan</label>
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
												            <label className="col-sm-3 col-form-label">Tmpt Lahir</label>
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
												            <label className="col-sm-3 col-form-label">J. Kelamin</label>
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
												            <label className="col-sm-3 col-form-label">Pendidikan</label>
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

												        <div className="form-group  row">
												            <label className="col-sm-3 col-form-label">Foto</label>
												            <div className="col-sm-9">
												                <input 
												                    id="id_facebook" 
												                    name="id_facebook" 
												                    type="file" 
												                    className="form-control required"
												                    onChange={(e) => {
												                    	let pegawai = {}
												                    	pegawai = this.state.foto
												                    	pegawai.foto = e.target.value
												                    	this.setState({pegawai})
												                    }}
												                    />
												            </div>
												        </div>

												        <div className="form-group  row">
												            <label className="col-sm-3 col-form-label">Keterangan</label>
												            <div className="col-sm-9">
												                <input 
												                    id="wa_or_line" 
												                    name="wa_or_line" 
												                    type="text" 
												                    className="form-control required"
												                    onChange={(e) => {
												                    	let pegawai = {}
												                    	pegawai = this.state.keterangan
												                    	pegawai.keterangan = e.target.value
												                    	this.setState({pegawai})
												                    }}
												                    />
												            </div>
												        </div>

												        
												    </div>
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
		)
	}

}
