import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'

class Daftar extends Component {

	constructor(props){
        super(props);

        const {kelas} = this.props.location.state

        this.state = {
            mahasiswas: [],
            loading: true,
            jurusans:[],
            kelas,
            loadingSimpan: false,
            daftars: [],
            sendDaftar: [],
            selectedJurusan: 0,
            checkAll: false
        }
        console.log(kelas)
    }

    componentDidMount(){
    	const self = this

		fetch(BASE_URL + "/api/mahasiswa/?kampus=" + window.sessionStorage.getItem("kampus_id"), {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			let mhs = [...data]
			mhs.map(data => {
				data.check = false
			})
			self.setState({
				mahasiswas: mhs,
				loading: !self.state.loading,
			})
		});

		fetch(BASE_URL + '/api/daftar/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			let mhs = [...data.results]
			mhs.map(data => {
				data.check = false
			})
			self.setState({
				daftars: data.results
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
				selectedJurusan: data.results[0].id,
				jurusans: data.results
			})
		});

    }

    handleDeleteCheck = (id) => {
    	const self = this
    	let kelas = {
    		kelas: null
    	}

    	fetch(BASE_URL + '/api/mahasiswa/' + id + '/', {
			method: 'patch',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			},
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(kelas)
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("Mahasiswa telah dihilangkan dari kelas", "Sukses!")
			}else{
				toastr.warning("Mahasiswa gagal dihilangkan dari kelas", "Gagal!")
			}
		}).then(function(data) {

		});
    }

    handleCheck = (id) => {
    	let mahasiswas = [...this.state.mahasiswas]
    	let mahasiswasID = this.state.mahasiswas.find(data => data.kelas == this.state.kelas.id && data.id == id)
    	if (mahasiswasID != null) {
    		console.log("sini")
    		mahasiswas.find(data => data.id == id).kelas = null
    		this.setState({ 
	    		mahasiswas
	    	})
    		this.handleDeleteCheck(id)
    	}else{
    		let daftars = [...this.state.daftars]
    		mahasiswas.find(data => data.id == id).kelas = this.state.kelas.id
    		let tmpDaftar = {}
	    	tmpDaftar.mahasiswa 	= id

	    	let sendDaftar = [...this.state.sendDaftar]
	    	sendDaftar.push(tmpDaftar)
	    	daftars.push(tmpDaftar)
	    	this.setState({sendDaftar, daftars, mahasiswas})
    	}
    }

    handleCheckAll = (id) => {
    	const self = this
    	this.setState({
    		checkAll: !this.state.checkAll
    	}, () => {
    		let daftars = [...this.state.daftars]
    		let sendDaftar = [...this.state.sendDaftar]
    		let mahasiswas = [...this.state.mahasiswas]

	    	if (this.state.checkAll) {
	    		this.state.mahasiswas.filter(mahasiswa => mahasiswa.calon == false && mahasiswa.jurusan == this.state.selectedJurusan)
				.map(mahasiswa => {
					mahasiswas.find(data => data.id == mahasiswa.id).kelas = self.state.kelas.id
					let tmpDaftar = {}
			    	tmpDaftar.mahasiswa 	= mahasiswa.id
			    	daftars.push(tmpDaftar)
			    	sendDaftar.push(tmpDaftar)
				})
				this.setState({daftars, sendDaftar, mahasiswas})
	    	}else{
	    		this.setState({daftars: [], sendDaftar: []})
	    	}

    	})

    }

    sendDaftar = () => {
    	const self = this
    	let status = false

    	let kelas = {
    		kelas: self.state.kelas.id
    	}

    	this.setState({loadingSimpan: true})

    	let i = 0

    	if (this.state.sendDaftar.length != 0) {
	    	this.state.sendDaftar.map(data => {
	    		fetch(BASE_URL + '/api/mahasiswa/' + data.mahasiswa + '/', {
					method: 'patch',
					headers: {
						'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
						'Content-Type': 'application/json',
		                'Accept': 'application/json'
					},
					body: JSON.stringify(kelas)
				}).then(function(response) {
					if (response.status == 200) {
						i+=1
						if (i == self.state.sendDaftar.length) {
							self.setState({loadingSimpan: false})
							toastr.success("Berhasil menambahkan mahasiswa", "Sukses ! ")
						}
					}else{
						toastr.warning("Gagal menambahkan mahasiswa", "Gagal ! ")
					}
				}).then(function(data) {
					
				});

	    	})

    	}else{
    		toastr.warning("Daftar tidak boleh kosong", "Gagal ! ")
    	}
    }

    render() {
    	console.log(this.state.sendDaftar)
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Mahasiswa Kelas {this.state.kelas.nama}</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                Absensi
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Daftar Mahasiswa</strong>
                            </li>
                        </ol>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
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
                                        <div className="col-lg-4">
                                        </div>
                                        <div className="col-lg-2">
                                        	{
                                        		this.state.loadingSimpan ?
                                        		<button disabled className="btn btn-primary push-right" onClick={this.sendDaftar}>
			                                    	<i className="fa fa-save"></i> Menyimpan...
			                                    </button>
			                                    :
			                                    <button className="btn btn-primary push-right" onClick={this.sendDaftar}>
			                                    	<i className="fa fa-save"></i> Simpan
			                                    </button>
                                        	}
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
										            <th><center>PILIH</center></th>
										        </tr>
										        <tr>
										        	<td colSpan="3"></td>
										        	<td>
										            	<center>
										            		<input 
											            		type="checkbox"
											            		checked={this.state.checkAll}
											            		onChange={this.handleCheckAll}
											            	/>
										            	</center>
										            </td>
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
												            <td>
												            	<center>
												            		<input 
													            		type="checkbox"
													            		checked={this.state.mahasiswas.find(data => data.kelas == this.state.kelas.id && data.id == mahasiswa.id) != null ? true : false}
													            		value={mahasiswa.id}
													            		onChange={(e) => this.handleCheck(mahasiswa.id)}
													            	/>
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
                    </div>
                    
                    
                </div>
            </div>
			

        )
    }

}

export default Daftar