import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'

class Akun extends Component {

	constructor(props){
        super(props);
        this.state = {
            account: [],
            loading: true,
            form: false,
            kelompok_account: [],
            selected: null,
            accountBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editaccount : {},
            active_account: null
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/account/', {
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
				account: data,
				loading: !self.state.loading
			})
		});

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
				active_account: data.results[0].id,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let account = []
        account = this.state.account
        account.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	account,
        	editaccount: account.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let account = []
        account = this.state.account
        account.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	account,
        	editaccount: account.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeTipe = e => {
        let account = []
        account = this.state.account
        account.filter(data => data.id == this.state.selected)[0].transaksi_type = e.target.value
        this.setState({
        	account,
        	editaccount: account.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeKelompok = e => {
        let account = []
        account = this.state.account
        account.filter(data => data.id == this.state.selected)[0].kelompok_account = e.target.value
        this.setState({
        	account,
        	editaccount: account.filter(data => data.id == this.state.selected)[0]
        })
    }

    editaccount = () => {
    	const self = this
    	let editaccount = this.state.editaccount
    	delete editaccount.id
    	self.setState({editaccount})
    	console.log(JSON.stringify(this.state.editaccount))
    	fetch(BASE_URL + '/api/account/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editaccount),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("account berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah account", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addaccountKode = (e) => {
    	let accountBaru = {}
        accountBaru = this.state.accountBaru
        accountBaru.kode = e.target.value
        this.setState({accountBaru})	
    }
    addaccountNama = (e) => {
    	let accountBaru = {}
        accountBaru = this.state.accountBaru
        accountBaru.nama = e.target.value
        this.setState({accountBaru})	
    }
    addaccountKelompok = (e) => {
    	let accountBaru = {}
        accountBaru = this.state.accountBaru
        accountBaru.kelompok_account = e.target.value
        this.setState({accountBaru})	
    }
    addaccountTipe = (e) => {
    	let accountBaru = {}
        accountBaru = this.state.accountBaru
        accountBaru.transaksi_type = e.target.value
        accountBaru.kampus = 1
        this.setState({accountBaru})	
    }

    addaccount = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.accountBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/account/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.accountBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let account = []
				let accountBaru = {}
				accountBaru = self.state.accountBaru

	        	account = self.state.account
	        	account.push(data)

	    		accountBaru.kode = null
				accountBaru.nama = null
				accountBaru.alamat = null

				self.setState({
					addForm: true,
					account,
					accountBaru
					
				})
				toastr.success("Akun berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning(data.kode[0], "Gagal ! ")
			}
		});
    }

    handleDeleteAkun = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Akun ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/account/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					account: self.state.account.filter(data => data.id !== id)
				})
				swal("Sukses! account telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					account: self.state.account.filter(data => data.id !== id)
				})
				swal("Sukses! account telah dihapus!", {
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
		                <h2>Daftar Akun Keuangan</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Akun</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Akun</h5>
                                </div>
                                <div className="ibox-content">
                                
	                                <div className="row">
									    <div className="col-lg-12">
									    	<div className="col-lg-8">
	                                        	<label className="col-sm-3 col-form-label">Filter </label>
	                                        	<div className="col-sm-9">
				                                    <select
				                                    	value={this.state.active_account}
				                                    	onChange={(e) => this.setState({active_account: e.target.value}) }
				                                        className="form-control">
				                                        {
				                                        	this.state.kelompok_account.map((data, key) => 
				                                        		<option key={key} value={data.id}>{data.nama}</option>
				                                        	)
				                                        }
				                                    </select>
			                                    </div>
	                                        </div>
	                                        <br/>
	                                        <br/>
	                                        <br/>
									        <table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th style={{'width':'5%'}}>NO. </th>
					                                <th style={{'width':'5%'}}>KODE</th>
					                                <th style={{'width':'15%'}}>NAMA</th>
					                                <th style={{'width':'5%'}}>TIPE</th>
					                                <th style={{'width':'15%'}}>KELOMPOK</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.account.filter(akun => akun.kelompok_account == this.state.active_account).map((data, key) =>
					                            		<tr key={key}>
					                            			<td>{key+1}</td>
							                                <td>{data.kode}</td>
							                                <td>{data.nama}</td>
							                                <td>{data.transaksi_type}</td>
							                                <td>{this.state.kelompok_account.find((kelompok_account) => (kelompok_account.id == data.kelompok_account)).nama}</td>
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
						                                				onClick={() => this.handleDeleteAkun( data.id, key )}
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
									</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ibox ">
                                {
                                	this.state.addForm ?
                                	<div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
	                                    <h5> <i className="fa fa-plus"></i> Tambah Akun</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Akun</h5>
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
	                                            	value={this.state.accountBaru.kode}
						                            onChange={this.addaccountKode}
						                            onKeyPress={(e) => {
						                            	if (e.which == 13) {
													      this.addaccount();
													    }
						                            }}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.accountBaru.nama}
						                            onChange={this.addaccountNama}
						                            onKeyPress={(e) => {
						                            	if (e.which == 13) {
													      this.addaccount();
													    }
						                            }}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tipe</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.accountBaru.transaksi_type}
							                    onChange={this.addaccountTipe}
		                                    >
		                                    	<option>Tipe Transaksi</option>
		                                    	<option value="D">Debet</option>
		                                    	<option value="K">Kredit</option>
		                                    </select>
		                                    </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Kelompok</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.accountBaru.kelompok_account}
							                    onChange={this.addaccountKelompok}
		                                    >
		                                    	<option>Kelompok Akun</option>
		                                    	{
		                                    		this.state.kelompok_account.map((data, key) =>{
		                                    			return(
		                                    				<option key={key} value={data.id}>{data.nama}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addaccount}>
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
	                                            	value={this.state.account.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.account.filter(data => data.id === this.state.selected)[0].nama}
					                                onChange={this.handleChangeNama}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tipe</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.account.filter(data => data.id === this.state.selected)[0].transaksi_type}
							                    onChange={this.handleChangeTipe}
		                                    >
		                                    	<option>Tipe Transaksi</option>
		                                    	<option value="D">Debet</option>
		                                    	<option value="K">Kredit</option>
		                                    </select>
		                                    </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Kelompok</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.account.filter(data => data.id === this.state.selected)[0].kelompok_account}
							                    onChange={this.handleChangeKelompok}
		                                    >
		                                    	<option>Kelompok Akun</option>
		                                    	{
		                                    		this.state.kelompok_account.map((data, key) =>{
		                                    			return(
		                                    				<option key={key} value={data.id}>{data.nama}</option>
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
	                                		onClick={this.editaccount}>
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

export default Akun