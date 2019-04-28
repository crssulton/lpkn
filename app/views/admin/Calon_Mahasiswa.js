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
		                <h2>Calon Mahasiswa</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-7">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Calon mahasiswa</h5>
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
										        	this.state.mahasiswas.filter(mahasiswa => mahasiswa.calon == true).map((mahasiswa, key) => 

										        		<tr>
										        			<td>{key+1}</td>
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

                        <div className="col-lg-5">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-user"></i> Profil Calon Mahasiswa</h5>
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
				                                <p style={{'textAlign': 'center'}}><span className="badge badge-warning">CALON MAHASISWA</span></p>
				                             </div>
				                             <div className="tabs-container">
											    <ul className="nav nav-tabs" role="tablist">
											        <li className="active"><a className="nav-link active" data-toggle="tab" href="#tab-1">Data Diri</a></li>
											        <li><a className="nav-link" data-toggle="tab" href="#tab-2">Orang Tua</a></li>
											        <li><a className="nav-link" data-toggle="tab" href="#tab-3">Tambahan</a></li>
											        <li><a className="nav-link" data-toggle="tab" href="#tab-4">Pembayaran</a></li>
											    </ul>
											    <div className="tab-content">
											        <div role="tabpanel" id="tab-1" className="tab-pane active">
											            <div className="panel-body">
											            	<div className="form-group row"><label className="col-lg-2 col-form-label">Alamat</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.alamat}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Tmpt Lahir</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.tempat_lahir}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Tgl Lahir</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.tgl_lahir}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Jenis Kelamin</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.jenis_kelamin}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Agama</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.agama}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Hp</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.no_hp}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Email</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.email} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">FB</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.id_facebook} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">WA/Line</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.wa_or_line} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Asal Sekolah</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.asal_sekolah} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Tahun Tamat</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.tahun_tamat} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Tinggi Badan</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.tinggi_badan} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Berat Badan</label>
						                                        <div className="col-lg-10">
						                                            <input value={this.state.mahasiswa.berat_badan} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-2" className="tab-pane">
											            <div className="panel-body">
											            	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama Ayah</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.nama_ayah}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pekerjaan Ayah</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.pekerjaan_ayah}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama Ibu</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.nama_ibu}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pekerjaan Ibu</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.pekerjaan_ibu}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat Wali</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.alamat_wali}  type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-3" className="tab-pane">
											            <div className="panel-body">
											            	<div className="form-group row"><label className="col-lg-3 col-form-label">Rencana Kerja</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.rencana_kerja} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Rencana Kerja Lain</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.rencana_kerja_lainnya} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Info LPKN</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.informasi_ttg_lpkn} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jurusan</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.jurusan} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Kampus</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.kampus} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pesan</label>
						                                        <div className="col-lg-9">
						                                            <input value={this.state.mahasiswa.pesan} type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
						                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pembayaran</label>
						                                        <div className="col-lg-9">
						                                            <input value="" type="text" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
											            </div>
											        </div>
											        <div role="tabpanel" id="tab-4" className="tab-pane">
											            <div className="panel-body">
											            	<div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah (Rp.)</label>
						                                        <div className="col-lg-9">
						                                            <input type="number" className="form-control m-b" name="account"/>
						                                        </div>
						                                    </div>
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
			                                		Terima
			                                	</button>
			                                	<button 
		                            				onClick={() => this.handleDeletemahasiswa()}
		                            				className="btn btn-danger" 
		                            				type="button"
		                            				>Hapus
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

export default Calon_Mahasiswa