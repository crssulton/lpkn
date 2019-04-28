import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';

class Calon_Mahasiswa extends Component {

	constructor(props){
        super(props);
        this.state = {
            mahasiswas: [],
            mahasiswa: [],
            loading: true,
            selectedJurusan: 'all',
            key: null,
            profil: false,
            key: null
        }
    }

    componentDidMount(){
    	const self = this
		fetch('http://lpkn.itec.my.id:9000/api/mahasiswa/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				mahasiswas: data.results,
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

    getmahasiswa = (id) => {
	    let index
    	this.state.mahasiswas.forEach(function (o, key) {
            if (o.id  == id) {
            	index = key
            }
        });


    	this.setState({
    		mahasiswa: this.state.mahasiswas[index],
    		profil: true,
    		key: index
    	})
    }

    handleTerimaCalon = (key) => {
    	const self = this
    	fetch('http://lpkn.itec.my.id:9000/api/mahasiswa/' + this.state.mahasiswa.id +'/approve/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			let mahasiswas = []
        	mahasiswas = self.state.mahasiswas
        	delete mahasiswas[self.state.key]
			self.setState({
	    		profil: false,
	    		mahasiswas

	    	})
			toastr.success("Mahasiswa berhasil ditambahkan", "Sukses ! ")
		});
    }

    handleDeletemahasiswa = (key) => {
    	const self = this
    	swal({
		  title: "Hapus " + this.state.mahasiswa.nama + " ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch('http://lpkn.itec.my.id:9000/api/mahasiswa/' + this.state.mahasiswa.id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + cookie.load('token')
				}
			}).then(function(response) {
				let mahasiswas = []
	        	mahasiswas = self.state.mahasiswas
	        	delete mahasiswas[self.state.key]
				self.setState({
		    		profil: false,
		    		mahasiswas

		    	})
		    	swal("Sukses! mahasiswa telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				let mahasiswas = []
	        	mahasiswas = self.state.mahasiswas
	        	delete mahasiswas[self.state.key]
				self.setState({
		    		profil: false,
		    		mahasiswas

		    	})
		    	swal("Sukses! mahasiswa telah dihapus!", {
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
                                    <h5> <i className="fa fa-list "></i> Daftar mahasiswa</h5>
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
										        	<th>NIM</th>
										            <th>NAMA</th>
										            <th>JURUSAN</th>										            
										            <th style={{'textAlign': 'center'}}>AKSI</th>
										        </tr>
										        </thead>
										        <tbody>
										        {
										        	this.state.mahasiswas.filter(mahasiswa => mahasiswa.calon == false).map((mahasiswa, key) => 

										        		<tr>
										        			<td>{key+1}</td>
										        			<td>{mahasiswa.nim}</td>
												            <td>{mahasiswa.nama}</td>
												            <td>Industri Maskapai</td>
												            <td>
												            	<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={() => this.getmahasiswa(mahasiswa.id)}
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
				                                <h5 style={{'textAlign': 'center'}}><strong>{this.state.mahasiswa.nim}</strong></h5>
				                                <p style={{'textAlign': 'center'}}><span className="badge badge-primary">{this.state.mahasiswa.status.toUpperCase()}</span></p>
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
															        <td><b>Alamat</b> </td> <td>: {this.state.mahasiswa.alamat}</td>
															    </tr>
															    <tr>
															        <td><b>Tempat Lahir</b></td> <td>: {this.state.mahasiswa.tempat_lahir}</td>
															    </tr>
															    <tr>
															        <td><b>Tgl Lahir</b></td> <td>: {this.state.mahasiswa.tgl_lahir}</td>
															    </tr>
															    <tr>
															        <td><b>Jenis Kelamin</b></td> <td>: {this.state.mahasiswa.jenis_kelamin}</td>
															    </tr>
															    <tr>
															        <td><b>Agama</b></td> <td>: {this.state.mahasiswa.agama}</td>
															    </tr>
															    <tr>
															        <td><b>No Hp</b></td> <td>: {this.state.mahasiswa.no_hp}</td>
															    </tr>
															    <tr>
															        <td><b>Email</b></td> <td>: {this.state.mahasiswa.email}</td>
															    </tr>
															    <tr>
															        <td><b>Whatsapp</b></td> <td>: {this.state.mahasiswa.wa_or_line}</td>
															    </tr>
															    <tr>
															        <td><b>Sekolah Asal</b></td> <td>: {this.state.mahasiswa.asal_sekolah}</td>
															    </tr>
															    <tr>
															        <td><b>Tahun Tamat</b></td> <td>: {this.state.mahasiswa.tahun_tamat}</td>
															    </tr>
															</table>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-2" className="tab-pane">
											            <div className="panel-body">
											                <table className="table">
															    <tr>
															        <td><b>Nama Ayah</b> </td> <td>: {this.state.mahasiswa.nama_ayah}</td>
															    </tr>
															    <tr>
															        <td><b>Pekerjaan Ayah</b></td> <td>: {this.state.mahasiswa.pekerjaan_ayah}</td>
															    </tr>
															    <tr>
															        <td><b>Nama Ibu</b></td> <td>: {this.state.mahasiswa.nama_ibu}</td>
															    </tr>
															    <tr>
															        <td><b>Pekerjaan Ibu</b></td> <td>: {this.state.mahasiswa.pekerjaan_ibu}</td>
															    </tr>
															    <tr>
															        <td><b>Alamat Wali</b></td> <td>: {this.state.mahasiswa.alamat_wali}</td>
															    </tr>
															</table>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-3" className="tab-pane">
											            <div className="panel-body">
											                <table className="table">
															    <tr>
															        <td><b>Rencana Kerja</b> </td> <td>: {this.state.mahasiswa.rencana_kerja}</td>
															    </tr>
															    <tr>
															        <td><b>Rencana Kerja Lain</b></td> <td>: {this.state.mahasiswa.rencana_kerja_lainnya}</td>
															    </tr>
															    <tr>
															        <td><b>Informasi LPKN dari</b></td> <td>: {this.state.mahasiswa.informasi_ttg_lpkn}</td>
															    </tr>
															    <tr>
															        <td><b>Jurusan</b></td> <td>: {this.state.mahasiswa.jurusan}</td>
															    </tr>
															    <tr>
															        <td><b>Kampus</b></td> <td>: {this.state.mahasiswa.kampus}</td>
															    </tr>
															    <tr>
															        <td><b>Pesan</b></td> <td>: {this.state.mahasiswa.pesan}</td>
															    </tr>
															</table>
											            </div>
											        </div>
											    </div>

											</div>

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

export default Calon_Mahasiswa