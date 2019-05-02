import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'

class Mahasiswa extends Component {

	constructor(props){
        super(props);
        this.state = {
            mahasiswas: [],
            mahasiswa: [],
            loading: true,
            selectedJurusan: 1,
            selectedNama: '',
            key: null,
            profil: false,
            jurusans: [],
            selectedStatus: ''
        }
    }

    componentDidMount(){
    	const self = this

		fetch(BASE_URL + '/api/mahasiswa/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				mahasiswas: data.results,
				loading: !self.state.loading,
			})
		});

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

    }

    handleSelectedJurusan = (e) => {
    	this.setState({
    		loading: !this.state.loading,
    		selectedJurusan: e.target.value
    	})
    	setTimeout(() => {
		  this.setState({ loading: !this.state.loading });
		}, 1000);
    }

    getMahasiswa = (id) => {
    	this.setState({
    		mahasiswa: this.state.mahasiswas.find(data => data.id == id),
    		profil: true
    	})
    }

  //   updateStatusMahasiswa = () => {
  //   	let url = ""
  //   	let mahasiswa = this.state.mahasiswa
  //   	if (this.state.selectedStatus  == "aktif" || this.state.selectedStatus == "tidak aktif") {
  //   		mahasiswa.
  //   		url = BASE_URL + '/api/mahasiswa/'
  //   	}
  //   	fetch(, {
		// 	method: 'get',
		// 	headers: {
		// 		'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
		// 	}
		// }).then(function(response) {
		// 	return response.json();
		// }).then(function(data) {
		// 	self.setState({
		// 		mahasiswas: data.results,
		// 		loading: !self.state.loading,
		// 	})
		// });
  //   }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Mahasiswa</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
                                        <div className="col-lg-6">
                                        	<label className="col-sm-3 col-form-label">Filter </label>
                                        	<div className="col-sm-9">
			                                    <select
			                                    	value={this.state.selectedJurusan}
			                                    	onChange={(e) => this.setState({selectedJurusan: e.target.value}) }
			                                        className="form-control">
			                                        {
			                                        	this.state.jurusans.map((jurusan, key) => 
			                                        		<option key={key} value={jurusan.id}>{jurusan.nama}</option>
			                                        	)
			                                        }
			                                    </select>
		                                    </div>
                                        </div>
                                        <div className="col-lg-6">
                                        	<label className="col-sm-3 col-form-label">Cari :</label>
                                        	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Mahasiswa"
		                                    		className="form-control"/>
		                                    </div>
                                        </div>
                                    </div>

                            		<div className="hr-line-dashed"></div>
                                    {
                                    	this.state.loading ?
                                    	<div className="spiner-example">
			                                <div className="sk-spinner sk-spinner-double-bounce">
			                                    <div className="sk-double-bounce1"></div>
			                                    <div className="sk-double-bounce2"></div>
			                                </div>
			                            </div>
			                            :
                                    	<div className="table-responsive">
										    <table className="table table-striped">
										        <thead>
										        <tr>
										            <th>NIM </th>
										            <th>NAMA </th>
										            <th>JURUSAN</th>
										            <th>STATUS</th>
										            <th>DETAIL</th>
										        </tr>
										        </thead>
										        <tbody>
										        {
										        	this.state.mahasiswas.filter(mahasiswa => mahasiswa.calon == false && 
										        		mahasiswa.jurusan == this.state.selectedJurusan)
										        	.map((mahasiswa, key) => 

										        		<tr key={key}>
												            <td>{mahasiswa.nim}</td>
												            <td>{mahasiswa.nama}</td>
															<td>
															{
																(this.state.jurusans.length === 0)? null:
																this.state.jurusans.find((jurusan) => (jurusan.id == mahasiswa.jurusan)).nama
															}
												            </td>
												            <td><span className="badge badge-primary">Aktif</span></td>
												            <td>
												            	<button 
					                                				className="btn btn-info btn-sm" 
					                                				type="button"
					                                				onClick={() => this.getMahasiswa(mahasiswa.id)}
					                                				>
					                                				<i className="fa fa-eye"></i></button>
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

                        <div className="col-lg-4">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-user"></i> Profil Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                    {
                                    	this.state.profil ?
                                    	<div className="table-responsive">
	                                    	<div className="">
				                                <img
				                                	alt="image" 
				                                	width="50%" 
				                                	style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}}
				                                	className="img-fluid" 
				                                	src="http://help.wojilu.com/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg"/>
				                            </div>
				                            <div className="ibox-content profile-content">
				                                <h3 style={{'textAlign': 'center'}}><strong>{this.state.mahasiswa.nama}</strong></h3>
				                                <p style={{'textAlign': 'center'}}>{this.state.mahasiswa.nim}</p>
				                                <p style={{'textAlign': 'center'}}>
				                                	<select 
				                                		value={this.state.selectedStatus}
				                                		onChange={(e) => this.setState({selectedStatus: e.target.value})}
				                                		style={{'width' : '50%', 'margin' : '0 auto'}} 
				                                		className="form-control m-b" 
				                                		name="account">
				                                        <option value="aktif">Aktif</option>
				                                        <option value="tida aktif">Tidak Aktif</option>
				                                        <option value="magang">Magang</option>
				                                        <option value="bekerja">Bekerja</option>
			                                    	</select>
				                                </p>
				                                {
				                                	this.state.selectedStatus == 'magang' ?
				                                	<div>
				                                		<label>Lokasi Magang</label>
						                                <input 
				                                    		type="text" 
				                                    		disabled="" 
				                                    		placeholder="Lokasi"
				                                    		className="form-control"/>
				                                    	<br/>
				                                    	<label>Tanggal Mulai</label>
				                                    	<input 
				                                    		type="date" 
				                                    		disabled="" 
				                                    		placeholder="Tanggal"
				                                    		className="form-control"/>
				                                    	<br/>
				                                    	<label>Tanggal Selesai</label>
				                                    	<input 
				                                    		type="date" 
				                                    		disabled="" 
				                                    		placeholder="Tanggal"
				                                    		className="form-control"/>
				                                	</div>
			                                    	: 
			                                    	this.state.selectedStatus == 'bekerja' ?
			                                    	<div>
				                                		<label>Lokasi Bekerja</label>
						                                <input 
				                                    		type="text" 
				                                    		disabled="" 
				                                    		placeholder="Lokasi"
				                                    		className="form-control"/>
				                                    	<br/>
				                                    	<label>Tanggal</label>
				                                    	<input 
				                                    		type="date" 
				                                    		disabled="" 
				                                    		placeholder="Tanggal"
				                                    		className="form-control"/>
				                                    	<br/>
				                                	</div>
				                                	: null
				                                }
				                             </div>
	                                    	<table className="table">
											<tbody>
											    <tr>
											        <td><b>Alamat</b> </td>
													<td>: {this.state.mahasiswa.alamat}</td>
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
											        <td><b>No Hp</b></td>
													<td>: {this.state.mahasiswa.no_hp}</td>
											    </tr>
											    <tr>
											        <td><b>Email</b></td>
													<td>: {this.state.mahasiswa.email}</td>
											    </tr>
											    <tr>
											        <td><b>Whatsapp</b></td>
													<td>: {this.state.mahasiswa.wa_or_line}</td>
											    </tr>
											    <tr>
											        <td><b>Sekolah Asal</b></td>
													<td>: {this.state.mahasiswa.asal_sekolah}</td>
											    </tr>
											    <tr>
											        <td><b>Tahun Tamat</b></td>
													<td>: {this.state.mahasiswa.tahun_tamat}</td>
											    </tr>
											</tbody>
											</table>

											<button
		                                		className="btn btn-info btn-block" 
		                                		type="button"
		                                		onClick={this.updateStatusMahasiswa}
		                                		>
		                                		Simpan
		                                	</button>

	                                    </div>
	                                    :
	                                    null
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

export default Mahasiswa