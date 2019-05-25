import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import { Link, Location } from 'react-router';

class Kelas extends Component {

	constructor(props){
        super(props);
        this.state = {
            kelas: [],
            loading: true,
            form: false,
            selected: null,
            kelasBaru: {},
            add: true,
            matkul: [],
            dosen: [],
            addForm: true,
            jurusans: [],
            jurusans: [],
            editKelas : {},
            selectedJurusan: null
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/kelas/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				kelas: data.results,
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
				jurusans: data.results,
				selectedJurusan: data.results[0].id
			})
		});
        
    }

    getKelas = () => {
    	const self = this
    	fetch(BASE_URL + '/api/kelas/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				kelas: data.results
			})
        });
    }

    handleChangeNama = e => {
        let kelas = []
        kelas = this.state.kelas
        kelas.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	kelas,
        	editKelas: kelas.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeJurusan = e => {
        let kelas = []
        kelas = this.state.kelas
        kelas.filter(data => data.id == this.state.selected)[0].jurusan = e.target.value
        this.setState({
        	kelas,
        	editKelas: kelas.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeAngkatan = e => {
        let kelas = []
        kelas = this.state.kelas
        kelas.filter(data => data.id == this.state.selected)[0].angkatan = e.target.value
        this.setState({
        	kelas,
        	editKelas: kelas.filter(data => data.id == this.state.selected)[0]
        })
    }

    editKelas = () => {
    	const self = this
        console.log(JSON.stringify(this.state.editKelas))
    	fetch(BASE_URL + '/api/kelas/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editKelas),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				self.getKelas()
				toastr.success("Kelas berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah Kelas", "Gagal ! ")
			}
		}).then(function(data) {

		});
    }

    addKelas = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/kelas/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.kelasBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let kelas = []

	        	kelas = self.state.kelas
	        	kelas.push(data)

				self.setState({
					addForm: true,
					kelas
					
				})
				toastr.success("Kelas berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Kelas", "Gagal ! ")
			}
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Kelas ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/kelas/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					kelas: self.state.kelas.filter(data => data.id !== id)
				})
				swal("Sukses! Kelas telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					kelas: self.state.kelas.filter(data => data.id !== id)
				})
				swal("Sukses! Kelas telah dihapus!", {
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
		                <h2>Daftar Kelas</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Kelas</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Kelas</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-8">
                                        	<label className="col-sm-3 col-form-label">Filter </label>
                                        	<div className="col-sm-9">
			                                    <select
			                                    	value={this.state.selectedJurusan}
			                                    	onChange={(e) => this.setState({selectedJurusan: e.target.value}) }
			                                        className="form-control">
			                                        {
			                                        	this.state.jurusans.map((data, key) => 
			                                        		<option key={key} value={data.id}>{data.nama}</option>
			                                        	)
			                                        }
			                                    </select>
		                                    </div>
                                        </div>
	                                </div>
	                                <div className="hr-line-dashed"></div>
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
					                                <th style={{'width':'15%'}}>NAMA KELAS</th>
					                                <th style={{'width':'15%'}}>JURUSAN</th>
                                                    <th style={{'width':'15%'}}>ANGKATAN</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.kelas.filter(item => item.jurusan_info.id == this.state.selectedJurusan).map((data, key) =>
					                            		<tr key={key}>
							                                <td>{key+1}</td>
							                                <td>{data.nama}</td>
                                                            <td>{data.jurusan_info.nama}</td>
                                                            <td>{data.angkatan}</td>
							                                <td>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: data.id, addForm: false})} }
						                                				>
						                                				<i className="fa fa-edit"></i></button>

						                                			<button 
						                                				onClick={() => this.handleDeleteMatkul( data.id, key )}
						                                				className="btn btn-danger btn-sm" 
						                                				type="button"
						                                				><i className="fa fa-trash"></i></button>

						                                			<Link to={{ pathname: 'daftar-kelas', state: { kelas: data} }}>
							                                			<button 
							                                				style={{'margin' : '0 0 0 5px'}}
							                                				className="btn btn-primary btn-sm" 
							                                				type="button"
							                                				><i className="fa fa-address-card"></i></button>
						                                			</Link>

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
                                {
                                	this.state.addForm ?
                                	<div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
	                                    <h5> <i className="fa fa-plus"></i> Tambah Kelas</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Kelas</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama Kelas</label>
	                                        <div className="col-lg-9">
                                                <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelasBaru.nama}
						                            onChange={(e) => {
                                                        let kelasBaru = {...this.state.kelasBaru}
                                                        kelasBaru.nama = e.target.value
                                                        this.setState({kelasBaru})
                                                    }}
	                                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Angkatan</label>
	                                        <div className="col-lg-9">
                                                <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelasBaru.angkatan}
						                            onChange={(e) => {
                                                        let kelasBaru = {...this.state.kelasBaru}
                                                        kelasBaru.angkatan = e.target.value
                                                        this.setState({kelasBaru})
                                                    }}
	                                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jurusan</label>
	                                        <div className="col-lg-9">
                                                <select
			                                    	value={this.state.kelasBaru.jurusan}
						                            onChange={(e) => {
                                                        let kelasBaru = {...this.state.kelasBaru}
                                                        kelasBaru.jurusan = e.target.value
                                                        this.setState({kelasBaru})
                                                    }}
			                                        className="form-control">
			                                        <option value="0">Semua Jurusan</option>
			                                        {
			                                        	this.state.jurusans.map((jurusan, key) => 
			                                        		<option key={key} value={jurusan.id}>{jurusan.nama}</option>
			                                        	)
			                                        }
			                                    </select>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addKelas}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama Kelas</label>
	                                        <div className="col-lg-9">
                                                <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelas.filter(data => data.id === this.state.selected)[0].nama}
						                            onChange={this.handleChangeNama}
	                                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Angkatan</label>
	                                        <div className="col-lg-9">
                                                <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelas.filter(data => data.id === this.state.selected)[0].angkatan}
						                            onChange={this.handleChangeAngkatan}
	                                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jurusan</label>
	                                        <div className="col-lg-9">
	                                        	<select
			                                    	value={this.state.kelas.filter(data => data.id === this.state.selected)[0].jurusan}
						                            onChange={this.handleChangeJurusan}
			                                        className="form-control">
			                                        <option value="0">Semua Jurusan</option>
			                                        {
			                                        	this.state.jurusans.map((jurusan, key) => 
			                                        		<option key={key} value={jurusan.id}>{jurusan.nama}</option>
			                                        	)
			                                        }
			                                    </select>
	                                        </div>
	                                    </div>
                                        
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editKelas}>
	                                		Edit
	                                	</button>
	                                	<button 
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
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Kelas