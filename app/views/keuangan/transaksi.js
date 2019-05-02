import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';
import {BASE_URL} from '../../config/config.js'

class Transaksi extends Component {

	constructor(props){
        super(props);
        this.state = {
            transaksi: [],
            account: [],
            loading: true,
            form: false,
            selected: null,
            transaksiBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            edittransaksi : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/transaksi/', {
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
				transaksi: data.results,
				loading: !self.state.loading
			})
		});

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
				account: data.results,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeUraian = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].uraian = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNominal = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].nominal = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTanggal = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].tanggal = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeAccount = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].account = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    edittransaksi = () => {
    	const self = this
    	let edittransaksi = this.state.edittransaksi
    	delete edittransaksi.id
    	self.setState({edittransaksi})

    	fetch(BASE_URL + '/api/transaksi/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.edittransaksi),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("transaksi berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah transaksi", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addtransaksiUraian = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.uraian = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiTanggal = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.tanggal = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiNominal = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.nominal = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiAkun = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.account = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiKode = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.kode = e.target.value
        transaksiBaru.kampus = 1
        this.setState({transaksiBaru})	
    }

    addtransaksi = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.transaksiBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/transaksi/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.transaksiBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let transaksi = []
				let transaksiBaru = {}
				transaksiBaru = self.state.transaksiBaru

	        	transaksi = self.state.transaksi
	        	transaksi.push(data)

	        	transaksiBaru.kode = null
	    		transaksiBaru.uraian = null
				transaksiBaru.tanggal = null
				transaksiBaru.nominal = null

				self.setState({
					addForm: true,
					transaksi,
					transaksiBaru
					
				})
				toastr.success("Akun berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Akun", "Gagal ! ")
			}
		});
    }

    handleDeleteTransaksi = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Transaksi ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/transaksi/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					transaksi: self.state.transaksi.filter(data => data.id !== id)
				})
				swal("Sukses! transaksi telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					transaksi: self.state.transaksi.filter(data => data.id !== id)
				})
				swal("Sukses! transaksi telah dihapus!", {
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
		                <h2>Transaksi</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Transaksi</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Transaksi"
		                                    		className="form-control"/>
		                                    </div>
	                                    </div>
	                                </div>
	                                <div className="hr-line-dashed"></div>
                                    {

			                            <div>
											<table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th style={{'width':'5%'}}>KODE</th>
					                                <th style={{'width':'15%'}}>URAIAN</th>
					                                <th style={{'width':'10%'}}>TANGGAL</th>
					                                <th style={{'width':'5%'}}>AKUN</th>
					                                <th style={{'width':'10%'}}>NOMINAL</th>
					                                <th style={{'width':'20%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.transaksi.map((data, key) =>
					                            		<tr>
					                            			<td>{data.kode}</td>
							                                <td>{data.uraian}</td>
							                                <td>{data.tanggal}</td>
							                                <td>{this.state.account.find((account) => (account.id == data.account)).nama}</td>
							                                <td>{data.nominal}</td>
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
						                                				onClick={() => this.handleDeleteTransaksi( data.id, key )}
						                                				className="btn btn-danger btn-sm" 
						                                				type="button"
						                                				><i className="fa fa-trash"></i></button>

						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: data.id, addForm: false})} }
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
                                {
                                	this.state.addForm ?
                                	<div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
	                                    <h5> <i className="fa fa-plus"></i> Tambah Transaksi</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Transaksi</h5>
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
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.kode}
						                            onChange={this.addtransaksiKode}
	                                            	/>
	                                        </div>
	                                    </div>
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Uraian</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.uraian}
						                            onChange={this.addtransaksiUraian}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.tanggal}
						                            onChange={this.addtransaksiTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nominal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.nominal}
						                            onChange={this.addtransaksiNominal}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.transaksiBaru.account}
							                    onChange={this.addtransaksiAkun}
		                                    >
		                                    	<option>Jenis Akun</option>
		                                    	{
		                                    		this.state.account.map(data =>{
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
	                                		onClick={this.addtransaksi}>
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
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].kode}
					                                onChange={this.handleChangeKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Uraian</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].uraian}
					                                onChange={this.handleChangeUraian}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].tanggal}
					                                onChange={this.handleChangeTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nominal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].nominal}
					                                onChange={this.handleChangeNominal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].id}
							                    onChange={this.handleChangeAccount}
		                                    >
		                                    	<option>Akun</option>
		                                    	{
		                                    		this.state.account.map(data =>{
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
	                                		onClick={this.edittransaksi}>
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

export default Transaksi