import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'

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
            addForm: true,
            jurusans: [],
            editkelas : {},
            selectedJurusan: 1,
            jurusans: []
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
			console.log(data)
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
				jurusans: data.results
			})
		});

    }

    handleChangeNama = e => {
        let kelas = []
        kelas = this.state.kelas
        kelas.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	kelas,
        	editkelas: kelas.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeJurusan = e => {
        let kelas = []
        kelas = this.state.kelas
        kelas.filter(data => data.id == this.state.selected)[0].jurusan = e.target.value
        this.setState({
        	kelas,
        	editkelas: kelas.filter(data => data.id == this.state.selected)[0]
        })
    }

    editkelas = () => {
    	const self = this
    	let editkelas = this.state.editkelas
    	delete editkelas.id
    	self.setState({editkelas})

    	fetch(BASE_URL + '/api/kelas/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editkelas),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("kelas berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah kelas", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addkelasNama = (e) => {
    	let kelasBaru = {}
        kelasBaru = this.state.kelasBaru
        kelasBaru.nama = e.target.value
        this.setState({kelasBaru})	
    }
    addkelasJurusan = (e) => {
    	let kelasBaru = {}
        kelasBaru = this.state.kelasBaru
        kelasBaru.jurusan = e.target.value
        this.setState({kelasBaru})	
    }

    addkelas = ()=> {
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
				let kelasBaru = {}
				kelasBaru = self.state.kelasBaru

	        	kelas = self.state.kelas
	        	kelas.push(data)

	    		kelasBaru.kode = null
				kelasBaru.nama = null
				kelasBaru.alamat = null

				self.setState({
					addForm: true,
					kelas,
					kelasBaru
					
				})
				toastr.success("kelas berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan kelas", "Gagal ! ")
			}
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Kelas?",
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
				swal("Sukses! kelas telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					kelas: self.state.kelas.filter(data => data.id !== id)
				})
				swal("Sukses! kelas telah dihapus!", {
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
		                <h2>Daftar kelas</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar kelas</h5>
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
			                                        	this.state.jurusans.map((jurusan) => 
			                                        		<option value={jurusan.id}>{jurusan.nama}</option>
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
					                                <th style={{'width':'15%'}}>KELAS</th>
					                                <th style={{'width':'10%'}}>JURUSAN</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.kelas.filter(jurusan => jurusan.jurusan == this.state.selectedJurusan).map((data, key) =>
					                            		<tr>
							                                <td>{key+1}</td>
							                                <td>{data.nama}</td>
							                                <td>{this.state.jurusans.find((jurusan) => (jurusan.id == data.jurusan)).nama}</td>
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah kelas</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah kelas</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	required
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelasBaru.nama}
						                            onChange={this.addkelasNama}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jurusan</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	required
		                                    	value={this.state.kelasBaru.jurusan}
							                    onChange={this.addkelasJurusan}
		                                    >
		                                    	<option>Pilih Jurusan</option>
		                                    	{
		                                    		this.state.jurusans.map(data =>{
		                                    			return(
		                                    				<option value={data.id}>{data.nama}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addkelas}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	required
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelas.filter(data => data.id === this.state.selected)[0].nama}
						                            onChange={this.handleChangeNama}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jurusan</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	required
		                                    	value={this.state.kelas.filter(data => data.id === this.state.selected)[0].jurusan}
							                    onChange={this.handleChangeJurusan}
		                                    >
		                                    	<option>Pilih Jurusan</option>
		                                    	{
		                                    		this.state.jurusans.map(data =>{
		                                    			return(
		                                    				<option value={data.id}>{data.nama}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                	
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editkelas}>
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