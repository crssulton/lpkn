import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'

class Kampus extends Component {

	constructor(props){
        super(props);
        this.state = {
            kampus: [],
            loading: true,
            form: false,
            selected: null,
            kampusBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editKampus : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/kampus/', {
			method: 'get',
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				kampus: data.results,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let kampus = []
        kampus = this.state.kampus
        kampus.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	kampus,
        	editKampus: kampus.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let kampus = []
        kampus = this.state.kampus
        kampus.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	kampus,
        	editKampus: kampus.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeAlamat = e => {
        let kampus = []
        kampus = this.state.kampus
        kampus.filter(data => data.id == this.state.selected)[0].alamat = e.target.value
        this.setState({
        	kampus,
        	editKampus: kampus.filter(data => data.id == this.state.selected)[0]
        })
    }

    editKampus = () => {
    	const self = this
    	let editKampus = this.state.editKampus
    	delete editKampus.id
    	self.setState({editKampus})
    	fetch(BASE_URL + '/api/kampus/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editKampus),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
			toastr.warning("Gagal mengubah kampus", "Gagal ! ")
		}).then(function(data) {
			if (data.id == self.state.editKampus.id) {
				toastr.success("Kampus berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}
			else{
				toastr.warning("Gagal mengubah kampus", "Gagal ! ")
			}
			
		});
    }

    addKampusKode = (e) => {
    	let kampusBaru = {}
        kampusBaru = this.state.kampusBaru
        kampusBaru.kode = e.target.value
        this.setState({kampusBaru})	
    }
    addKampusNama = (e) => {
    	let kampusBaru = {}
        kampusBaru = this.state.kampusBaru
        kampusBaru.nama = e.target.value
        this.setState({kampusBaru})	
    }
    addKampusAlamat = (e) => {
    	let kampusBaru = {}
        kampusBaru = this.state.kampusBaru
        kampusBaru.alamat = e.target.value
        this.setState({kampusBaru})	
    }

    addKampus = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.kampusBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/kampus/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.kampusBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let kampus = []
				let kampusBaru = {}
				kampusBaru = self.state.kampusBaru

	        	kampus = self.state.kampus
	        	kampus.push(data)

	    		kampusBaru.kode = null
				kampusBaru.nama = null
				kampusBaru.alamat = null

				self.setState({
					addForm: true,
					kampus,
					kampusBaru
					
				})
				toastr.success("Kampus berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Kampus", "Gagal ! ")
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
		  	fetch(BASE_URL + '/api/kampus/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + cookie.load('token')
				}
			}).then(function(response) {

				self.setState({
					kampus: self.state.kampus.filter(data => data.id !== id)
				})
				swal("Sukses! Kampus telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					kampus: self.state.kampus.filter(data => data.id !== id)
				})
				swal("Sukses! Kampus telah dihapus!", {
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
		                <h2>Daftar Kampus</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Kampus</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Kampus"
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
					                            	this.state.kampus.map((data, key) =>
					                            		<tr key={key}>
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Kampus</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Kampus</h5>
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
	                                            	value={this.state.kampusBaru.kode}
						                            onChange={this.addKampusKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kampusBaru.nama}
						                            onChange={this.addKampusNama}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.kampusBaru.alamat}
						                            onChange={this.addKampusAlamat}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addKampus}>
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
	                                            	value={this.state.kampus.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.kampus.filter(data => data.id === this.state.selected)[0].nama}
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
	                                            	value={this.state.kampus.filter(data => data.id === this.state.selected)[0].alamat}
					                                onChange={this.handleChangeAlamat}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editKampus}>
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

export default Kampus