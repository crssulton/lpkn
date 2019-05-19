import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'

class dosen extends Component {

	constructor(props){
        super(props);
        this.state = {
            dosens: [],
            dosen: [],
            dosensTmp: [],
            loading: true,
            selectedJurusan: 0,
      		selectedKampus:0,
      		jurusans: [],
      		kampus: [],
            selectedNama: '',
            key: null,
            profil: false,
            selectedStatus: ''
        }
    }

    componentDidMount(){
    	const self = this

		fetch(BASE_URL + '/api/dosen/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				dosens: data.results,
				dosensTmp: data.results,
				loading: !self.state.loading,
			})
		});

		fetch(BASE_URL + "/api/kampus/", {
	      method: "get",
	      headers: {
	        Authorization: "JWT " + window.sessionStorage.getItem("token")
	      }
	    })
	      .then(function(response) {
	        return response.json();
	      })
	      .then(function(data) {
	        self.setState({
	          kampus: data.results
	        });
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

    getdosen = (id) => {
    	this.setState({
    		dosen: this.state.dosens.find(data => data.id == id),
    		profil: true
    	})
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Dosen</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item">
                                View Cabang
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Dosen</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Dosen</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
					                    <div className="col-lg-4">
					                      <label className="form-label">Filter Kampus : </label>
					                    </div>
					                    <div className="col-lg-4">
					             
					                    </div>
					                    <div className="col-lg-4">
					                      <label className="form-label">Pencarian : </label>
					                    </div>
					                  </div>

					                  <div className="row">
					                    <div className="col-lg-4">
					                      <select
					                          value={this.state.selectedKampus}
					                          onChange={e => {
					                            if (e.target.value !=  "0") {
					                              this.setState({ 
					                                dosensTmp: this.state.dosens.filter(data => data.kampus_info.id == e.target.value),
					                                selectedKampus: e.target.value
					                              })
					                            }else{
					                              let dosens = this.state.dosens
					                              this.setState({ 
					                                dosensTmp: dosens,
					                                selectedKampus: e.target.value
					                              })
					                            }

					                          }}
					                          className="form-control"
					                        >
					                          <option value="0">Semua Kampus</option>
					                          {this.state.kampus.map((kampus, key) => (
					                            <option key={key} value={kampus.id}>
					                              {kampus.nama}
					                            </option>
					                          ))}
					                        </select>
					                    </div>
					                    <div className="col-lg-4">
					                     
					                    </div>
					                    <div className="col-lg-4">
					                      <input
					                          type="text"
					                          disabled=""
					                          placeholder="Nama Dosen"
					                          className="form-control"
					                        />
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
										            <th>JENIS KELAMIN</th>
										            <th>PENDIDIKAN</th>
										            <th>DETAIL</th>
										        </tr>
										        </thead>
										        <tbody>
										        {
										        	this.state.dosensTmp
										        	.map((dosen, key) => 

										        		<tr key={key}>
												            <td>{key+1}</td>
												            <td>{dosen.nama}</td>
															<td>
															{
																dosen.kampus_info.nama
															}
												            </td>
												            <td>{dosen.jenis_kelamin}</td>
												            <td>{dosen.pendidikan_terakhir}</td>
												            <td>
												            	<button 
					                                				className="btn btn-info btn-sm" 
					                                				type="button"
					                                				onClick={() => this.getdosen(dosen.id)}
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
                                    <h5> <i className="fa fa-user"></i> Profil dosen</h5>
                                </div>
                                <div className="ibox-content">
                                    {
                                    	this.state.profil ?
                                    	<div className="table-responsive">
	                                    	<div className="">
				                                {
				                                	this.state.dosen.foto != null ?
				                                	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src={this.state.dosen.foto}/>
				                                	:
				                                	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"/>
				                                }
				                            </div>
				                            <div className="ibox-content profile-content">
				                                <h3 style={{'textAlign': 'center'}}><strong>{this.state.dosen.nama}</strong></h3>
				                                <p style={{'textAlign': 'center'}}>{this.state.dosen.nim}</p>
				                                
				                             </div>
	                                    	<table className="table">
											<tbody>
											    <tr>
											        <td><b>Alamat</b> </td>
													<td>: {this.state.dosen.alamat}</td>
											    </tr>
											    <tr>
											        <td><b>Tempat Lahir</b></td>
													<td>: {this.state.dosen.tempat_lahir}</td>
											    </tr>
											    <tr>
											        <td><b>Tgl Lahir</b></td>
													<td>: {this.state.dosen.tgl_lahir}</td>
											    </tr>
											    <tr>
											        <td><b>Jenis Kelamin</b></td>
													<td>: {this.state.dosen.jenis_kelamin}</td>
											    </tr>
											    <tr>
											        <td><b>Agama</b></td>
													<td>: {this.state.dosen.agama}</td>
											    </tr>
											    <tr>
											        <td><b>No Hp</b></td>
													<td>: {this.state.dosen.no_hp}</td>
											    </tr>
											    <tr>
											        <td><b>Email</b></td>
													<td>: {this.state.dosen.email}</td>
											    </tr>
											    <tr>
											        <td><b>Pendidikan</b></td>
													<td>: {this.state.dosen.pendidikan_terakhir}</td>
											    </tr>
											    <tr>
											        <td><b>Status Menikah</b></td>
													<td>: {this.state.dosen.status_menikah}</td>
											    </tr>
											    <tr>
											        <td><b>Keterangan</b></td>
													<td>: {this.state.dosen.keterangan}</td>
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

export default dosen