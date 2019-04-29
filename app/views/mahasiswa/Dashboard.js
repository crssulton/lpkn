import React, { Component } from 'react';
import cookie from 'react-cookies';
import {BASE_URL} from '../../config/config.js'

class Dashboard extends Component {

	constructor(props){
        super(props);
        this.state ={
            mahasiswa: [],
            loading: true
        }
    }

    componentDidMount(){
    	const self = this
		fetch(BASE_URL + '/api/mahasiswa/1/', {
			method: 'GET',
			headers: {
				'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJha2FkZW1pazEiLCJleHAiOjE1NTQwNzg0MjAsImVtYWlsIjoiIn0.lSNi_8XtzTP_jeldmMUic27TuHlYMCCNN47tyZgOLy0'
			}
		}).then(function(response) {
			console.log(response)
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				mahasiswa: data,
				loading: !self.state.loading
			})
		});
    }

    handleChangeMahasiswa = () => {
    	const self = this
    	console.log(cookie.load('user_id'))
    	console.log(JSON.stringify(self.state.mahasiswa))
		fetch('http://lpkn.itec.my.id:9000/api/mahasiswa/1/', {
			method: 'put',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			},
			body: JSON.stringify(self.state.mahasiswa)
		}).then(function(response) {
			console.log(response)
			return response.json();
		}).then(function(data) {
			console.log(data)
		});	
    }

    onChangeAlamat = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.alamat = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeTempatLahir = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.tempat_lahir = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeTglLahir = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.tgl_lahir = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeJenisKelamin = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.jenis_kelamin = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeAgama = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.agama = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeNoHp = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.no_hp = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeEmail = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.email = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeFacebook = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.id_facebook = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeWa = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.wa_or_line = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeAsalSekolah = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.asal_sekolah = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeTahunTamat = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.tahun_tamat = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeTinggiBadan = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.tinggi_badan = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeBeratBadan = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.berat_badan = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeNamaAyah = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.nama_ayah = e.target.value
    	this.setState({mahasiswa})
    }
    onChangePekerjaanAyah = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.pekerjaan_ayah = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeNamaIbu = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.nama_ibu = e.target.value
    	this.setState({mahasiswa})
    }
    onChangePekerjaanIbu = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.pekerjaan_ibu = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeAlamatWali = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.alamat_wali = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeTahunAngkatan = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.tahun_angkatan = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeAngkatan = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.angkatan = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeStatus = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.aktif = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeJurusan = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.jurusan = e.target.value
    	this.setState({mahasiswa})
    }
    onChangeKampus = e => {
    	let mahasiswa = {...this.state.mahasiswa}
    	mahasiswa.kampus = e.target.value
    	this.setState({mahasiswa})
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-10">
		                <h2>Dashboard Mahasiswa</h2>
		            </div>
		            <div className="col-lg-2">

		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
		            <div className="row">
		                {
		                	this.state.loading?
		                	<div className="spiner-example">
                                <div className="sk-spinner sk-spinner-double-bounce">
                                    <div className="sk-double-bounce1"></div>
                                    <div className="sk-double-bounce2"></div>
                                </div>
                            </div>
		                	:
		                	<div>
			                	<div className="col-md-4">
				                    <div className="ibox ">
				                        <div className="ibox-title">
				                            <h5>Mahasiswa</h5>
				                        </div>
				                        <div>
				                            <div className="ibox-content no-padding border-left-right">
				                                <img alt="image" width="100%" className="img-fluid" src="http://help.wojilu.com/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg"/>
				                            </div>
				                            <div className="ibox-content profile-content">
				                                <h3 style={{'textAlign': 'center'}}><strong>{this.state.mahasiswa.nama}</strong></h3>
				                                <p style={{'textAlign': 'center'}}>{this.state.mahasiswa.nim}</p>
				                                <p style={{'textAlign': 'center'}}><span className="badge badge-primary">{this.state.mahasiswa.status}</span></p>

				                                <div>
												    <div className="full-height-scroll">
												    	<table className="table">
												    		<tr>
												    			<td><b>Jurusan</b></td>
												    			<td>: Pariwisata</td>
												    		</tr>
												    		<tr>
												    			<td><b>Tempat Lahir</b></td>
												    			<td>: {this.state.mahasiswa.tempat_lahir}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Tgl Lahir</b></td>
												    			<td>: {this.state.mahasiswa.tgl_lahir}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Jenis Kelamin</b></td>
												    			<td>: {this.state.mahasiswa.jenis_kelamin}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Agama</b></td>
												    			<td>: {this.state.mahasiswa.agama}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Tahun Tamat</b></td>
												    			<td>: {this.state.mahasiswa.tahun_tamat}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Asal Sekolah</b></td>
												    			<td>: {this.state.mahasiswa.asal_sekolah}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Tahun Angkatan</b></td>
												    			<td>: {this.state.mahasiswa.tahun_angkatan}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Angkatan Ke-</b></td>
												    			<td>: {this.state.mahasiswa.angkatan}</td>
												    		</tr>
												    		<tr>
												    			<td><b>Kampus</b></td>
												    			<td>: {this.state.mahasiswa.kampus}</td>
												    		</tr>
												    	</table>
													</div>
				                                </div>
				                                
				                            </div>
				                    </div>
				                </div>
				                    </div>
				                <div className="col-md-8">
				                    <div className="tabs-container">
				                        <ul className="nav nav-tabs" role="tablist">
				                            <li className="active"><a className="nav-link" data-toggle="tab" href="#tab-1"> Informasi Mahasiswa</a></li>
				                            <li>
				                            	<a className="nav-link" data-toggle="tab" href="#tab-2"> Pengumuman</a>
				                            </li>
				                        </ul>
				                        <div className="tab-content">
				                            <div role="tabpanel" id="tab-1" className="tab-pane active">
				                                <div className="panel-body">
				                                	<div className="ibox-content">
							                           
							                                <div className="form-group  row"><label className="col-sm-2 col-form-label">Alamat</label>
							                                    <div className="col-sm-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.alamat} 
							                                    		type="text" 
							                                    		name="alamat"
							                                    		onChange={this.onChangeAlamat}
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-sm-2 col-form-label">No Hp</label>
							                                    <div className="col-sm-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.no_hp} 
							                                    		type="text" 
							                                    		onChange={this.onChangeNoHp}
							                                    		name="no_hp"
							                                    		className="form-control"/> 
							                                    </div>
							                                </div>
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-sm-2 col-form-label">Email</label>
							                                    <div className="col-sm-10">
								                                    <input 
								                                    	value={this.state.mahasiswa.email} 
								                                    	type="text" 
								                                    	onChange={this.onChangeEmail}
								                                    	name="email"
								                                    	className="form-control" 
								                                    	name="password"/>
							                                    </div>
							                                </div>
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-sm-2 col-form-label">Facebook</label>
							                                    <div className="col-sm-10">
							                                    	<input 
							                                    	value={this.state.mahasiswa.id_facebook} 
							                                    	type="text" 
							                                    	onChange={this.onChangeFacebook}
							                                    	name="id_facebook"
							                                    	className="form-control"/>
							                                    </div>
							                                </div>
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Whatsapp</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.wa_or_line} 
							                                    		type="text" 
							                                    		disabled=""
							                                    		onChange={this.onChangeWa}
							                                    		name="wa_or_line" 
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Tinggi Badan</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.tinggi_badan} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangeTinggiBadan}
							                                    		name="tinggi_badan"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Berat Badan</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.berat_badan} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangeBeratBadan}
							                                    		name="berat_badan"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Nama Ayah</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.nama_ayah} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangeNamaAyah}
							                                    		name="nama_ayah"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Pekerjaan Ayah</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.pekerjaan_ayah} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangePekerjaanAyah}
							                                    		name="pekerjaan_ayah"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Nama Ibu</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.nama_ibu} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangeNamaIbu}
							                                    		name="nama_ibu"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Pekerjaan Ibu</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.pekerjaan_ibu} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangePekerjaanIbu}
							                                    		name="pekerjaan_ibu"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row"><label className="col-lg-2 col-form-label">Alamat Wali</label>
							                                    <div className="col-lg-10">
							                                    	<input 
							                                    		value={this.state.mahasiswa.alamat_wali} 
							                                    		type="text" 
							                                    		disabled="" 
							                                    		onChange={this.onChangeAlamatWali}
							                                    		name="alamat_wali"
							                                    		className="form-control"/>
							                                    </div>
							                                </div>
							                                
							                                <div className="hr-line-dashed"></div>
							                                <div className="form-group row">
							                                    <div className="col-sm-4 col-sm-offset-2">
							                                        <button onClick={this.handleChangeMahasiswa} className="btn btn-primary btn-sm" type="submit">Simpan</button>
							                                    </div>
							                                </div>
							                           
							                        </div>
				                                </div>
				                            </div>
				                            <div role="tabpanel" id="tab-2" className="tab-pane">
				                            	<div className="panel-body">
				                            		<table className="table table-hover issue-tracker">
													    <tbody>
													    <tr>
													        <td>
													            <a href="#">
													                ADMINISTRATOR
													            </a>
													        </td>
													        <td>
													            Silahkan lengkapi data masing - masing
													        </td>
													        <td>
													            <span className="pie">14-03-2019</span>
													           
													        </td>
													    </tr>

													    <tr>
													        <td>
													            <a href="#">
													                AKADEMIK
													            </a>
													        </td>
													        <td>
													            Info perubahan jadwal mata kuliah Pengantar Manajemen
													        </td>
													        <td>
													            <span className="pie">12-03-2019</span>
													           
													        </td>
													    </tr>
													    
													    </tbody>
													</table>
				                            	</div>
				                            </div>
				                        </div>


				                    </div>
				                </div>
				              </div>
		                }
		            </div>
		        </div>
            </div>
        )
    }

}

export default Dashboard