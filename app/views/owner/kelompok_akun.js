import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';
import {BASE_URL} from '../../config/config.js'

class Kelompok_akun extends Component {

	constructor(props){
        super(props);
        this.state = {
            kelompok_account: [],
            loading: true,
            form: false,
            selected: null,
            kelompok_accountBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editkelompok_account : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/kelompok-account/', {
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
				kelompok_account: data.results,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let kelompok_account = []
        kelompok_account = this.state.kelompok_account
        kelompok_account.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	kelompok_account,
        	editkelompok_account: kelompok_account.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let kelompok_account = []
        kelompok_account = this.state.kelompok_account
        kelompok_account.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	kelompok_account,
        	editkelompok_account: kelompok_account.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeAlamat = e => {
        let kelompok_account = []
        kelompok_account = this.state.kelompok_account
        kelompok_account.filter(data => data.id == this.state.selected)[0].alamat = e.target.value
        this.setState({
        	kelompok_account,
        	editkelompok_account: kelompok_account.filter(data => data.id == this.state.selected)[0]
        })
    }

    editkelompok_account = () => {
    	const self = this
    	let editkelompok_account = this.state.editkelompok_account
    	delete editkelompok_account.id
    	self.setState({editkelompok_account})
    	console.log(JSON.stringify(this.state.editkelompok_account))
    	fetch(BASE_URL + '/api/kelompok-account/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editkelompok_account),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("kelompok_account berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah kelompok_account", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addkelompok_accountKode = (e) => {
    	let kelompok_accountBaru = {}
        kelompok_accountBaru = this.state.kelompok_accountBaru
        kelompok_accountBaru.kode = e.target.value
        this.setState({kelompok_accountBaru})	
    }
    addkelompok_accountNama = (e) => {
    	let kelompok_accountBaru = {}
        kelompok_accountBaru = this.state.kelompok_accountBaru
        kelompok_accountBaru.nama = e.target.value
        this.setState({kelompok_accountBaru})	
    }
    addkelompok_accountRole = (e) => {
    	let kelompok_accountBaru = {}
        kelompok_accountBaru = this.state.kelompok_accountBaru
        kelompok_accountBaru.role = e.target.value
        this.setState({kelompok_accountBaru})	
    }

    addkelompok_account = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.kelompok_accountBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/kelompok-account/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.kelompok_accountBaru)
		}).then(function(response) {
			console.log(response)
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let kelompok_account = []
				let kelompok_accountBaru = {}
				kelompok_accountBaru = self.state.kelompok_accountBaru

	        	kelompok_account = self.state.kelompok_account
	        	kelompok_account.push(data)

	    		kelompok_accountBaru.kode = null
				kelompok_accountBaru.nama = null
				kelompok_accountBaru.alamat = null

				self.setState({
					addForm: true,
					kelompok_account,
					kelompok_accountBaru
					
				})
				toastr.success("Kelompok Akun berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Kelompok Akun", "Gagal ! ")
			}
		});
    }

    handleDeleteKelompokAkun = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Kelompok Akun ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/kelompok-account/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					kelompok_account: self.state.kelompok_account.filter(data => data.id !== id)
				})
				swal("Sukses! kelompok_account telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					kelompok_account: self.state.kelompok_account.filter(data => data.id !== id)
				})
				swal("Sukses! kelompok_account telah dihapus!", {
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
		                <h2>Kelompok Akun</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Kelompok Akun</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Kelompok Akun"
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
					                            	<th style={{'width':'5%'}}>NO. </th>
					                                <th style={{'width':'5%'}}>KODE</th>
					                                <th style={{'width':'15%'}}>NAMA</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.kelompok_account.map((data, key) =>
					                            		<tr>
					                            			<td>{key+1}</td>
							                                <td>{data.kode}</td>
							                                <td>{data.nama}</td>
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
						                                				onClick={() => this.handleDeleteKelompokAkun( data.id, key )}
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Kelompok Akun</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Kelompok Akun</h5>
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
	                                            	value={this.state.kelompok_accountBaru.kode}
						                            onChange={this.addkelompok_accountKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelompok_accountBaru.nama}
						                            onChange={this.addkelompok_accountNama}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Role</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelompok_accountBaru.role}
						                            onChange={this.addkelompok_accountRole}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addkelompok_account}>
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
	                                            	value={this.state.kelompok_account.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.kelompok_account.filter(data => data.id === this.state.selected)[0].nama}
					                                onChange={this.handleChangeNama}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Role</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kelompok_account.filter(data => data.id === this.state.selected)[0].role}
					                                onChange={this.handleChangeRole}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editkelompok_account}>
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

export default Kelompok_akun