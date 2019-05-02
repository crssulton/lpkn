import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';
import {BASE_URL} from '../../config/config.js'

class Ruangan extends Component {

	constructor(props){
        super(props);
        this.state = {
            ruangan: [],
            loading: true,
            form: false,
            selected: null,
            ruanganBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editruangan : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/ruangan/', {
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
				ruangan: data.results,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let ruangan = []
        ruangan = this.state.ruangan
        ruangan.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	ruangan,
        	editruangan: ruangan.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let ruangan = []
        ruangan = this.state.ruangan
        ruangan.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	ruangan,
        	editruangan: ruangan.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeKeterangan = e => {
        let ruangan = []
        ruangan = this.state.ruangan
        ruangan.filter(data => data.id == this.state.selected)[0].keterangan = e.target.value
        this.setState({
        	ruangan,
        	editruangan: ruangan.filter(data => data.id == this.state.selected)[0]
        })
    }

    editruangan = () => {
    	const self = this
    	let editruangan = this.state.editruangan
    	delete editruangan.id
    	self.setState({editruangan})
    	console.log(JSON.stringify(this.state.editruangan))
    	fetch(BASE_URL + '/api/ruangan/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editruangan),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("Ruangan berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah ruangan", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addruanganKode = (e) => {
    	let ruanganBaru = {}
        ruanganBaru = this.state.ruanganBaru
        ruanganBaru.kode = e.target.value
        this.setState({ruanganBaru})	
    }
    addruanganNama = (e) => {
    	let ruanganBaru = {}
        ruanganBaru = this.state.ruanganBaru
        ruanganBaru.nama = e.target.value
        this.setState({ruanganBaru})	
    }
    addruanganKeterangan = (e) => {
    	let ruanganBaru = {}
        ruanganBaru = this.state.ruanganBaru
        ruanganBaru.keterangan = e.target.value
        this.setState({ruanganBaru})	
    }

    addruangan = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.ruanganBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/ruangan/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.ruanganBaru)
		}).then(function(response) {
			console.log(response)
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let ruangan = []
				let ruanganBaru = {}
				ruanganBaru = self.state.ruanganBaru

	        	ruangan = self.state.ruangan
	        	ruangan.push(data)

	    		ruanganBaru.kode = null
				ruanganBaru.nama = null
				ruanganBaru.alamat = null

				self.setState({
					addForm: true,
					ruangan,
					ruanganBaru
					
				})
				toastr.success("Ruangan berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Ruangan", "Gagal ! ")
			}
		});
    }

    handleDeleteKelompokAkun = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Ruangan ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/ruangan/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					ruangan: self.state.ruangan.filter(data => data.id !== id)
				})
				swal("Sukses! ruangan telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					ruangan: self.state.ruangan.filter(data => data.id !== id)
				})
				swal("Sukses! ruangan telah dihapus!", {
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
		                <h2>Ruangan Perkuliahan</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Ruangan</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Ruangan"
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
					                                <th style={{'width':'15%'}}>KETERANGAN</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.ruangan.map((data, key) =>
					                            		<tr>
					                            			<td>{key+1}</td>
							                                <td>{data.kode}</td>
							                                <td>{data.nama}</td>
							                                <td>{data.keterangan}</td>
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
	                                            	value={this.state.ruanganBaru.kode}
						                            onChange={this.addruanganKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.ruanganBaru.nama}
						                            onChange={this.addruanganNama}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Keterangan</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.ruanganBaru.keterangan}
						                            onChange={this.addruanganKeterangan}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addruangan}>
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
	                                            	value={this.state.ruangan.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.ruangan.filter(data => data.id === this.state.selected)[0].nama}
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
	                                            	value={this.state.ruangan.filter(data => data.id === this.state.selected)[0].keterangan}
					                                onChange={this.handleChangeKeterangan}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editruangan}>
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

export default Ruangan