import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';

class List_pendaftar extends Component {

	constructor(props){
        super(props);
        this.state = {
            pendaftars: [],
            pendaftar: [],
            loading: true,
            selectedJurusan: 'all',
            key: null,
            profil: false,
            key: null
        }
    }

    componentDidMount(){
    	const self = this
		fetch('http://lpkn.itec.my.id:9000/api/pendaftaran/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				pendaftars: data,
				loading: !self.state.loading,
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

    getpendaftar = (id) => {
    	let index
    	this.state.pendaftars.forEach(function (o, key) {
            if (o.id  == id) {
            	index = key
            }
        });


    	this.setState({
    		pendaftar: this.state.pendaftars[index],
    		profil: true,
    		key: index
    	})
    }

    handleTerimaCalon = (key) => {
    	const self = this
    	fetch('http://lpkn.itec.my.id:9000/api/pendaftaran/' + this.state.pendaftar.id +'/approve/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			let pendaftars = []
        	pendaftars = self.state.pendaftars
        	delete pendaftars[self.state.key]
			self.setState({
	    		profil: false,
	    		pendaftars

	    	})
			toastr.success("Calon mahasiswa berhasil ditambahkan", "Sukses ! ")
		});
    }

    handleDeletePendaftar = (key) => {
    	const self = this
    	swal({
		  title: "Hapus " + this.state.pendaftar.nama + " ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch('http://lpkn.itec.my.id:9000/api/pendaftaran/' + this.state.pendaftar.id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				let pendaftars = []
	        	pendaftars = self.state.pendaftars
	        	delete pendaftars[self.state.key]
				self.setState({
		    		profil: false,
		    		pendaftars

		    	})
		    	swal("Sukses! Pendaftar telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				let pendaftars = []
	        	pendaftars = self.state.pendaftars
	        	delete pendaftars[self.state.key]
				self.setState({
		    		profil: false,
		    		pendaftars

		    	})
		    	swal("Sukses! Pendaftar telah dihapus!", {
			      icon: "success",
			    });
			});
		  }
		});
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Pendaftaran</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar pendaftar</h5>
                                </div>
                                <div className="ibox-content">
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
										        	<th>NO.</th>
										            <th>NAMA</th>
										            <th>JURUSAN</th>										            
										            <th style={{'textAlign': 'center'}}>AKSI</th>
										        </tr>
										        </thead>
										        <tbody>
										        {
										        	this.state.pendaftars.filter(pendaftar => pendaftar.approved == false).map((pendaftar, key) => 

										        		<tr>
										        			<td>{key+1}</td>
												            <td>{pendaftar.nama}</td>
												            <td>Hotel/Kapal Pesiar</td>
												            <td>
												            	<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={() => this.getpendaftar(pendaftar.id)}
						                                				>
						                                				<i className="fa fa-eye"></i></button>
						                                		</center>
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
                                    <h5> <i className="fa fa-user"></i> Profil pendaftar</h5>
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
				                                <h3 style={{'textAlign': 'center'}}><strong>{this.state.pendaftar.nama}</strong></h3>
				                                <p style={{'textAlign': 'center'}}><span className="badge badge-danger">BELUM DI APPROVE</span></p>
				                             </div>
				                             <div className="tabs-container">
											    <ul className="nav nav-tabs" role="tablist">
											        <li className="active"><a className="nav-link active" data-toggle="tab" href="#tab-1">Data Diri</a></li>
											        <li><a className="nav-link" data-toggle="tab" href="#tab-2">Orang Tua/Wali</a></li>
											        <li><a className="nav-link" data-toggle="tab" href="#tab-3">Tambahan</a></li>
											    </ul>
											    <div className="tab-content">
											        <div role="tabpanel" id="tab-1" className="tab-pane active">
											            <div className="panel-body" style={{'padding':'0px'}}>
											            	<table className="table">
															    <tr>
															        <td><b>Alamat</b> </td> <td>: {this.state.pendaftar.alamat}</td>
															    </tr>
															    <tr>
															        <td><b>Tempat Lahir</b></td> <td>: {this.state.pendaftar.tempat_lahir}</td>
															    </tr>
															    <tr>
															        <td><b>Tgl Lahir</b></td> <td>: {this.state.pendaftar.tgl_lahir}</td>
															    </tr>
															    <tr>
															        <td><b>Jenis Kelamin</b></td> <td>: {this.state.pendaftar.jenis_kelamin}</td>
															    </tr>
															    <tr>
															        <td><b>Agama</b></td> <td>: {this.state.pendaftar.agama}</td>
															    </tr>
															    <tr>
															        <td><b>No Hp</b></td> <td>: {this.state.pendaftar.no_hp}</td>
															    </tr>
															    <tr>
															        <td><b>Email</b></td> <td>: {this.state.pendaftar.email}</td>
															    </tr>
															    <tr>
															        <td><b>Whatsapp</b></td> <td>: {this.state.pendaftar.wa_or_line}</td>
															    </tr>
															    <tr>
															        <td><b>Sekolah Asal</b></td> <td>: {this.state.pendaftar.asal_sekolah}</td>
															    </tr>
															    <tr>
															        <td><b>Tahun Tamat</b></td> <td>: {this.state.pendaftar.tahun_tamat}</td>
															    </tr>
															</table>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-2" className="tab-pane">
											            <div className="panel-body">
											                <table className="table">
															    <tr>
															        <td><b>Nama Ayah</b> </td> <td>: {this.state.pendaftar.nama_ayah}</td>
															    </tr>
															    <tr>
															        <td><b>Pekerjaan Ayah</b></td> <td>: {this.state.pendaftar.pekerjaan_ayah}</td>
															    </tr>
															    <tr>
															        <td><b>Nama Ibu</b></td> <td>: {this.state.pendaftar.nama_ibu}</td>
															    </tr>
															    <tr>
															        <td><b>Pekerjaan Ibu</b></td> <td>: {this.state.pendaftar.pekerjaan_ibu}</td>
															    </tr>
															    <tr>
															        <td><b>Alamat Wali</b></td> <td>: {this.state.pendaftar.alamat_wali}</td>
															    </tr>
															</table>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-3" className="tab-pane">
											            <div className="panel-body">
											                <table className="table">
															    <tr>
															        <td><b>Rencana Kerja</b> </td> <td>: {this.state.pendaftar.rencana_kerja}</td>
															    </tr>
															    <tr>
															        <td><b>Rencana Kerja Lain</b></td> <td>: {this.state.pendaftar.rencana_kerja_lainnya}</td>
															    </tr>
															    <tr>
															        <td><b>Informasi LPKN dari</b></td> <td>: {this.state.pendaftar.informasi_ttg_lpkn}</td>
															    </tr>
															    <tr>
															        <td><b>Jurusan</b></td> <td>: {this.state.pendaftar.jurusan}</td>
															    </tr>
															    <tr>
															        <td><b>Kampus</b></td> <td>: {this.state.pendaftar.kampus}</td>
															    </tr>
															    <tr>
															        <td><b>Pesan</b></td> <td>: {this.state.pendaftar.pesan}</td>
															    </tr>
															</table>
											            </div>
											        </div>
											    </div>


											</div>
	                                     	

											<center style={{'margin':'3% 0'}}>
												<button
													style={{'margin':'0 3%'}}
													onClick={this.handleTerimaCalon}
			                                		className="btn btn-info" 
			                                		type="button">
			                                		Terima Pendaftar
			                                	</button>
			                                	<button 
		                            				onClick={() => this.handleDeletePendaftar()}
		                            				className="btn btn-danger" 
		                            				type="button"
		                            				>Hapus Pendaftar
		                            			</button>
											</center>

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

export default List_pendaftar