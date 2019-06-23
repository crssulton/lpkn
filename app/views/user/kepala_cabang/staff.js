import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'

const role =[
	{role: 1, nama: "Mahasiswa"},
	{role: 2, nama: "Dosen"},
	{role: 3, nama: "Administrator"},
	{role: 4, nama: "Keuangan"},
	{role: 5, nama: "Akademik"},
	{role: 6, nama: "Kepala Cabang"},
	{role: 7, nama: "HRD"},
	{role: 8, nama: "Owner"}
]

class staff extends Component {

	constructor(props){
        super(props);
        this.state = {
            staffs: [],
            staff: [],
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

		fetch(BASE_URL + '/api/staff/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data.results)
			self.setState({
				staffs: data.results,
				loading: !self.state.loading,
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
				selectedJurusan: data.results[0].id,
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

    getstaff = (id) => {
    	this.setState({
    		staff: this.state.staffs.find(data => data.id == id),
    		profil: true
    	})
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar staff</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item">
                                View Cabang
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>staff</strong>
                            </li>
                        </ol>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar staff</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
                                        <div className="col-lg-6">
                                        	<label className="col-sm-3 col-form-label">Cari :</label>
                                        	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		value={this.state.selectedNama}
		                                    		onChange={(e) => {
		                                    			this.setState({selectedNama: e.target.value})
		                                    		}}
		                                    		disabled="" 
		                                    		placeholder="Nama staff"
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
										            <th>NO </th>
										            <th>NAMA </th>
										            <th>KAMPUS</th>
										            <th>PENDIDIKAN</th>
										            <th>ROLE</th>
										            <th>DETAIL</th>
										        </tr>
										        </thead>
										        <tbody>
										        {
										        	this.state.staffs.filter(staff => staff.kampus_info.id == this.state.selectedJurusan && staff.nama.toLowerCase().includes(this.state.selectedNama))
										        	.map((staff, key) => 

										        		<tr key={key}>
												            <td>{key+1}</td>
												            <td>{staff.nama}</td>
															<td>
															{
																staff.kampus_info.nama
															}
												            </td>
												            <td>{staff.pendidikan_terakhir}</td>
												            <td>{role.find(data => data.role == staff.role).nama}</td>
												            <td>
												            	<button 
					                                				className="btn btn-info btn-sm" 
					                                				type="button"
					                                				onClick={() => this.getstaff(staff.id)}
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
                                    <h5> <i className="fa fa-user"></i> Profil staff</h5>
                                </div>
                                <div className="ibox-content">
                                    {
                                    	this.state.profil ?
                                    	<div className="table-responsive">
	                                    	<div className="">
				                                {
				                                	this.state.staff.foto != null ?
				                                	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src={this.state.staff.foto}/>
				                                	:
				                                	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"/>
				                                }
				                            </div>
				                            <div className="ibox-content profile-content">
				                                <h3 style={{'textAlign': 'center'}}><strong>{this.state.staff.nama}</strong></h3>
				                                <p style={{'textAlign': 'center'}}>{this.state.staff.nim}</p>
				                                
				                             </div>
	                                    	<table className="table">
											<tbody>
											    <tr>
											        <td><b>Alamat</b> </td>
													<td>: {this.state.staff.alamat}</td>
											    </tr>
											    <tr>
											        <td><b>Tempat Lahir</b></td>
													<td>: {this.state.staff.tempat_lahir}</td>
											    </tr>
											    <tr>
											        <td><b>Tgl Lahir</b></td>
													<td>: {this.state.staff.tgl_lahir}</td>
											    </tr>
											    <tr>
											        <td><b>Jenis Kelamin</b></td>
													<td>: {this.state.staff.jenis_kelamin}</td>
											    </tr>
											    <tr>
											        <td><b>Agama</b></td>
													<td>: {this.state.staff.agama}</td>
											    </tr>
											    <tr>
											        <td><b>No Hp</b></td>
													<td>: {this.state.staff.no_hp}</td>
											    </tr>
											    <tr>
											        <td><b>Email</b></td>
													<td>: {this.state.staff.email}</td>
											    </tr>
											    <tr>
											        <td><b>Pendidikan</b></td>
													<td>: {this.state.staff.pendidikan_terakhir}</td>
											    </tr>
											    <tr>
											        <td><b>Status Menikah</b></td>
													<td>: {this.state.staff.status_menikah}</td>
											    </tr>
											    <tr>
											        <td><b>Keterangan</b></td>
													<td>: {this.state.staff.keterangan}</td>
											    </tr>
											</tbody>
											</table>

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

export default staff