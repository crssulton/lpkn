import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'
import swal from 'sweetalert';

class Administrator extends Component {

	constructor(props){
        super(props);
        this.state = {
            dosens: [],
            loading: true,
            selectedJurusan: 'all',
            form: false,
            selected: null,
            dosenBaru: {},
            add: true,
			addForm: true,
			kampus: [],
			jurusans: [],
        }
    }

    componentDidMount(){
    	const self = this

		fetch(BASE_URL + '/api/dosen/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				dosens: data.results,
				loading: !self.state.loading
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

    handleChangeNama = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].nama = e.target.value
        this.setState({dosens})
	}
	handleChangeEmail = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].email = e.target.value
        this.setState({dosens})
    }
    handleChangeAlamat = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].alamat = e.target.value
        this.setState({dosens})
    }
    handleChangeTmptLahir = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].tempat_lahir = e.target.value
        this.setState({dosens})
    }
    handleChangeTglLahir = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].tgl_lahir = e.target.value
        this.setState({dosens})
    }
    handleChangeJK = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].jenis_kelamin = e.target.value
        this.setState({dosens})
    }
    handleChangeAgama = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].agama = e.target.value
        this.setState({dosens})
    }
    handleChangeNoHp = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].no_hp = e.target.value
        this.setState({dosens})
    }
    handleChangePendidikan = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].pendidikan_terakhir = e.target.value
        this.setState({dosens})
    }
    handleChangeStatus = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].status_menikah = e.target.value
        this.setState({dosens})
	}
	handleChangeJurusan = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].jurusan = e.target.value
        this.setState({dosens})
    }
    handleChangeKampus = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].kampus = e.target.value
        this.setState({dosens})
    }

    editDosen = () => {
		const self = this
		swal({
			title: "Lanjut mengubah data dosen ?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willTerima) => {
			if (willTerima) {
				let addButton = document.getElementsByClassName("btn-add")
				addButton[0].setAttribute("disabled", "disabled")
				fetch(BASE_URL + '/api/dosen/' + this.state.dosens[this.state.selected].id + '/', {
					method: 'put',
					headers: {
						'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(this.state.dosens[this.state.selected])
				}).then(function(response) {
					return response.json();
				}).then(function(data) {
					addButton[0].removeAttribute("disabled")
					fetch(BASE_URL + '/api/dosen/', {
						method: 'get',
						headers: {
							'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						}
					}).then(function(response) {
						return response.json();
					}).then(function(data) {
						self.setState({
							addForm: true,
							dosens: data.results,
							dosenBaru: {}
						})
					});
					toastr.success("Data dosen berhasil diubah", "Sukses ! ")
				});
			}	
		});
	}
	
	adddosenEmail = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.email = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenAlamat = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.alamat = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenNama = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.nama = e.target.value
        this.setState({dosenBaru})	
    }
    addDosenAgama = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.agama = e.target.value
        this.setState({dosenBaru})	
	}
	addDosenJurusan = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.jurusan = e.target.value
        this.setState({dosenBaru})	
    }
    addDosenKampus = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.kampus = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenJK = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.jenis_kelamin = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenPendidikan = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.pendidikan_terakhir = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenStatus = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.status_menikah = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenTempatLahir = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.tempat_lahir = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenTglLahir = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.tgl_lahir = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenNoHp = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.no_hp = e.target.value
        this.setState({dosenBaru})	
    }

    addDosen = ()=> {
		const self = this
		let addButton = document.getElementsByClassName("btn-add")
		addButton[0].setAttribute("disabled", "disabled")
		
		console.log(JSON.stringify(self.state.dosenBaru))
		fetch(BASE_URL + '/api/dosen/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(self.state.dosenBaru)
		}).then(function(response) {
			addButton[0].removeAttribute("disabled")
			if (response.status == 201) {
				let dosens = [...self.state.dosens]
				dosens.push(self.state.dosenBaru)
				let dosenBaru = {...self.state.dosenBaru}
				dosenBaru.nama = null
				dosenBaru.email = null
				dosenBaru.alamat = null
				dosenBaru.tempat_lahir = null
				dosenBaru.tgl_lahir = null
				dosenBaru.no_hp = null

				self.setState({
					dosens,
					dosenBaru
				})
				toastr.success("Dosen berhasil ditambahkan", "Sukses ! ")
			}else{
				toastr.warning("Dosen gagal ditambahkan", "Gagal ! ")
			}
		}).then(function(data) {
			
			
		})
    }

    handleDeletedosen = (id, key)=> {
    	const self = this
    	swal({
		  title: "Hapus Dosen ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/dosen/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				if (response.status == 204) {
					self.setState({
						dosens: self.state.dosens.filter(data => data.id != id)
					})
					toastr.success("Dosen berhasil dihapus", "Sukses ! ")
				}else{
					toastr.warning("Dosen gagal dihapus", "Gagal ! ")
				}
			}).then(function(data) {

			});
		  }
		});
    }

    exportData(){
        printJS({
            printable: 'print_data',
            type: 'html',
            modalMessage:"Sedang memuat data...",
            showModal:true,
            maxWidth:'1300',
            font_size:'8pt',
            documentTitle:'DATA DOSEN',
            targetStyles: ['*']
        })
     }

    render() {
    	const styletb = {
            borderCollapse:'collapse',
            borderSpacing:0,
            borderStyle:'solid',
            width:'100%',
            fontSize:'12px'
        }
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Dosen</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                               Dashboard
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
	                                    <div className="col-lg-10">
	                                    </div>
	                                    
	                                    <div className="col-lg-2">
	                                    	<div className="col-sm-12">
			                                    <button className="btn btn-primary" onClick={() => this.exportData()}>
			                                    	<i className="fa fa-print"></i> Cetak
			                                    </button>
		                                    </div>
	                                    </div>
	                                </div>
	                                <br/>
                                    {
			                    		this.state.loading?
			                    		<div className="spiner-example">
			                                <div className="sk-spinner sk-spinner-double-bounce">
			                                    <div className="sk-double-bounce1"></div>
			                                    <div className="sk-double-bounce2"></div>
			                                </div>
			                            </div> :
										
			                            <div>
											<table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th style={{'width':'5%'}}>NO</th>
					                                <th style={{'width':'20%'}}>NAMA</th>
					                                <th style={{'width':'5%'}}>JENIS KELAMIN</th>
					                                <th style={{'width':'10%'}}>PENDIDIKAN</th>
					                                <th style={{'width':'10%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.dosens.map((dosen, key) =>
					                            		<tr key={key}>
							                                <td>{key+1}</td>
							                                <td>{dosen.nama}</td>
							                                <td>{
																(dosen.jenis_kelamin === 'L')? "Laki-Laki": "Perempuan"
															}</td>
							                                <td>{
																(dosen.pendidikan_terakhir === 's1')? "S1":
																(dosen.pendidikan_terakhir === 's2')? "S2": "S3"
															}</td>
							                                <td>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: key, addForm: false})} }
						                                				>
						                                				<i className="fa fa-edit"></i></button>

						                                			<button 
						                                				onClick={() => this.handleDeletedosen( dosen.id, key )}
						                                				className="btn btn-danger btn-sm" 
						                                				type="button"
						                                				><i className="fa fa-trash"></i></button>
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
                                    <h5> <i className="fa fa-plus"></i> Data Dosen</h5>
                                </div>
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.nama}
						                            onChange={this.adddosenNama}
	                                            	/>
	                                        </div>
	                                    </div>

										<div className="form-group row"><label className="col-lg-3 col-form-label">Email</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.email}
						                            onChange={this.adddosenEmail}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.alamat}
						                            onChange={this.adddosenAlamat}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tmpt Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.tempat_lahir}
						                            onChange={this.adddosenTempatLahir}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tgl Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.tgl_lahir}
						                            onChange={this.adddosenTglLahir}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Jenis Kelamin</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control required" name="account" value={this.state.dosenBaru.jenis_kelamin} onChange={this.adddosenJK}>
	                                                <option >Pilih</option>
	                                                <option value="L">Laki - Laki</option>
	                                                <option value="P">Perempuan</option>
	                                            </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Agama</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosenBaru.agama}
                                                    onChange={this.addDosenAgama}
                                                    id="agama" 
                                                    name="agama" 
                                                    className="form-control required">
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
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">No HP</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.no_hp}
						                            onChange={this.adddosenNoHp}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pendidikan Terakhir</label>
	                                        <div className="col-lg-9">
												<select 
                                                   value={this.state.dosenBaru.pendidikan_terakhir}
												   onChange={this.adddosenPendidikan}
                                                    id="pendidikan" 
                                                    name="pendidikan" 
                                                    className="form-control required">
                                                    <option >Pilih</option>
	                                                <option value="s1">S1</option>
	                                                <option value="s2">S2</option>
													<option value="s3">S3</option>
                                                </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Status Menikah</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control required" name="account" value={this.state.dosenBaru.status_menikah} onChange={this.adddosenStatus}>
	                                                <option >Pilih</option>
	                                                <option value="sudah_menikah">Sudah Menikah</option>
	                                                <option value="belum_menikah">Belum Menikah</option>
	                                            </select>
	                                        </div>
	                                    </div>

										<button
											style={{'margin':'0 3%'}}
											className="btn btn-primary btn-sm btn-add" 
											type="button"
											onClick={this.addDosen}>
											Tambah
										</button>
	                                </div>
	                                :
	                                <div className="ibox-content">

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].nama}
						                            onChange={this.handleChangeNama}
	                                            	/>
	                                        </div>
	                                    </div>

										<div className="form-group row"><label className="col-lg-3 col-form-label">Email</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].email}
						                            onChange={this.handleChangeEmail}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].alamat}
						                            onChange={this.handleChangeAlamat}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tmpt Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].tempat_lahir}
						                            onChange={this.handleChangeTmptLahir}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tgl Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].tgl_lahir}
						                            onChange={this.handleChangeTglLahir}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Jenis Kelamin</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control required" name="account" value={this.state.dosens[this.state.selected].jenis_kelamin} onChange={this.handleChangeJK}>
	                                                <option >Pilih</option>
	                                                <option value="L">Laki - Laki</option>
	                                                <option value="P">Perempuan</option>
	                                            </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Agama</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosens[this.state.selected].agama}
                                                    onChange={this.handleChangeAgama}
                                                    id="agama" 
                                                    name="agama" 
                                                    className="form-control required">
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
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">No HP</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control required" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].no_hp}
						                            onChange={this.handleChangeNoHp}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pendidikan Terakhir</label>
	                                        <div className="col-lg-9">
												<select 
                                                   value={this.state.dosens[this.state.selected].pendidikan_terakhir}
												   onChange={this.handleChangePendidikan}
                                                    id="pendidikan" 
                                                    name="pendidikan" 
                                                    className="form-control required">
                                                    <option >Pilih</option>
	                                                <option value="s1">S1</option>
	                                                <option value="s2">S2</option>
													<option value="s3">S3</option>
                                                </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Status Menikah</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control required" name="account" value={this.state.dosens[this.state.selected].status_menikah} onChange={this.handleChangeStatus}>
	                                                <option >Pilih</option>
	                                                <option value="sudah_menikah">Sudah Menikah</option>
	                                                <option value="belum_menikah">Belum Menikah</option>
	                                            </select>
	                                        </div>
	                                    </div>

										<div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Jurusan</label>
                                            <div className="col-sm-9">
												<select 
                                                    value={this.state.dosens[this.state.selected].jurusan}
                                                    onChange={this.handleChangeKampus}
                                                    id="jurusan" 
                                                    name="jurusan" 
                                                    className="form-control required">
                                                    <option value="">Pilih Jurusan</option>
                                                    {
                                                        this.state.jurusans.map((jurusan, i) => 
                                                            <option key={i} value={jurusan.id}>{jurusan.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>


										<button
											style={{'margin':'0 3%'}}
											className="btn btn-info btn-add" 
											type="button"
											onClick={this.editDosen}>
											Edit
										</button>
										<button 
											style={{'margin':'0 3%'}}
											className="btn btn-danger " 
											type="button"
											onClick={ () => {this.setState({ addForm: !this.state.addForm})} }>
											Batal
										</button>
	                                </div>
                                }

                            </div>
                        </div>
                    </div>

                    <div style={{'backgroundColor': 'white', 'display' : 'none'}}>
						<table border="1" align="left" style={styletb} id="print_data" width="100%" style={{fontSize:'12px'}}>
		                    <thead>
		                    <tr>
		                    	<th align="left" style={{background:'#e5e5e5',padding:'10px'}}>NO.</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>NAMA</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>ALAMAT</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>TMPT LAHIR</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>TGL LAHIR</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>JK</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>AGAMA</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>HP</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>PENDIDIKAN</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    {
		                    	this.state.dosens.map((data, key) =>
		                    		<tr >
		                    			<td style={{padding:'7px',textAlign:'left'}}>{key+1}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.nama}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.alamat}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.tempat_lahir}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.tgl_lahir}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.jenis_kelamin}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.agama}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.no_hp}</td>
		                                <td style={{padding:'7px',textAlign:'center'}}>{data.pendidikan_terakhir.toUpperCase()}</td>
		                            </tr>
		                    	)
		                    }
		                    </tbody>
		                </table>
					</div>
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Administrator