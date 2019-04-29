import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';
import {BASE_URL} from '../../config/config.js'

class Kepala_Cabang extends Component {

	constructor(props){
        super(props);
        this.state = {
            kepalaCabangs: [],
            loading: true,
            form: false,
            selected: null,
            kepalaCabangsBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editkepalaCabangs : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/kampus/', {
			method: 'get',
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				kepalaCabangs: data.results,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let kepalaCabangs = []
        kepalaCabangs = this.state.kepalaCabangs
        kepalaCabangs.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	kepalaCabangs,
        	editkepalaCabangs: kepalaCabangs.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let kepalaCabangs = []
        kepalaCabangs = this.state.kepalaCabangs
        kepalaCabangs.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	kepalaCabangs,
        	editkepalaCabangs: kepalaCabangs.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeAlamat = e => {
        let kepalaCabangs = []
        kepalaCabangs = this.state.kepalaCabangs
        kepalaCabangs.filter(data => data.id == this.state.selected)[0].alamat = e.target.value
        this.setState({
        	kepalaCabangs,
        	editkepalaCabangs: kepalaCabangs.filter(data => data.id == this.state.selected)[0]
        })
    }

    editkepalaCabangs = () => {
    	const self = this
    	let editkepalaCabangs = this.state.editkepalaCabangs
    	delete editkepalaCabangs.id
    	self.setState({editkepalaCabangs})
    	console.log(JSON.stringify(this.state.editkepalaCabangs))
    	fetch(BASE_URL + '/api/kepalaCabangs/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editkepalaCabangs),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
			toastr.warning("Gagal mengubah kepalaCabangs", "Gagal ! ")
		}).then(function(data) {
			if (data.id == self.state.editkepalaCabangs.id) {
				toastr.success("kepalaCabangs berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}
			else{
				toastr.warning("Gagal mengubah kepalaCabangs", "Gagal ! ")
			}
			
		});
    }

    addkepalaCabangsKode = (e) => {
    	let kepalaCabangsBaru = {}
        kepalaCabangsBaru = this.state.kepalaCabangsBaru
        kepalaCabangsBaru.kode = e.target.value
        this.setState({kepalaCabangsBaru})	
    }
    addkepalaCabangsNama = (e) => {
    	let kepalaCabangsBaru = {}
        kepalaCabangsBaru = this.state.kepalaCabangsBaru
        kepalaCabangsBaru.nama = e.target.value
        this.setState({kepalaCabangsBaru})	
    }
    addkepalaCabangsAlamat = (e) => {
    	let kepalaCabangsBaru = {}
        kepalaCabangsBaru = this.state.kepalaCabangsBaru
        kepalaCabangsBaru.alamat = e.target.value
        this.setState({kepalaCabangsBaru})	
    }

    addkepalaCabangs = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.kepalaCabangsBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/kepalaCabangs/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.kepalaCabangsBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let kepalaCabangs = []
				let kepalaCabangsBaru = {}
				kepalaCabangsBaru = self.state.kepalaCabangsBaru

	        	kepalaCabangs = self.state.kepalaCabangs
	        	kepalaCabangs.push(data)

	    		kepalaCabangsBaru.kode = null
				kepalaCabangsBaru.nama = null
				kepalaCabangsBaru.alamat = null

				self.setState({
					addForm: true,
					kepalaCabangs,
					kepalaCabangsBaru
					
				})
				toastr.success("kepalaCabangs berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan kepalaCabangs", "Gagal ! ")
			}
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Mata Kuliah ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/kepalaCabangs/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					kepalaCabangs: self.state.kepalaCabangs.filter(data => data.id !== id)
				})
				swal("Sukses! kepalaCabangs telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					kepalaCabangs: self.state.kepalaCabangs.filter(data => data.id !== id)
				})
				swal("Sukses! kepalaCabangs telah dihapus!", {
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
		                <h2>Daftar Kepala Cabang</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Kepala Cabang</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Kepala Cabang"
		                                    		className="form-control"/>
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
					                                <th style={{'width':'5%'}}>KODE</th>
					                                <th style={{'width':'15%'}}>NAMA</th>
					                                <th style={{'width':'5%'}}>ALAMAT</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.kepalaCabangs.map((data, key) =>
					                            		<tr>
							                                <td>{data.kode}</td>
							                                <td>{data.nama}</td>
							                                <td>{data.alamat}</td>
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Kepala Cabang</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Kepala Cabang</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Kode</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kepalaCabangsBaru.kode}
						                            onChange={this.addkepalaCabangsKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kepalaCabangsBaru.nama}
						                            onChange={this.addkepalaCabangsNama}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kepalaCabangsBaru.alamat}
						                            onChange={this.addkepalaCabangsAlamat}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addkepalaCabangs}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Kode</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kepalaCabangs.filter(data => data.id === this.state.selected)[0].kode}
					                                onChange={this.handleChangeKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kepalaCabangs.filter(data => data.id === this.state.selected)[0].nama}
					                                onChange={this.handleChangeNama}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kepalaCabangs.filter(data => data.id === this.state.selected)[0].alamat}
					                                onChange={this.handleChangeAlamat}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editkepalaCabangs}>
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

export default Kepala_Cabang