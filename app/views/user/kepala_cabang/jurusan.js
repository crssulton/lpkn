import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'

class Jurusan extends Component {

	constructor(props){
        super(props);
        this.state = {
            jurusan: [],
            loading: true,
            form: false,
            selected: null,
            jurusanBaru: {},
            selectedNama:"",
            add: true,
            addForm: true,
            jurusans: [],
            editjurusan : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/jurusan/', {
			method: 'get',
			headers: {
		        Authorization: "JWT " + window.sessionStorage.getItem("token")
		     }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				jurusan: data.results,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let jurusan = []
        jurusan = this.state.jurusan
        jurusan.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	jurusan,
        	editjurusan: jurusan.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let jurusan = []
        jurusan = this.state.jurusan
        jurusan.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	jurusan,
        	editjurusan: jurusan.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeAlamat = e => {
        let jurusan = []
        jurusan = this.state.jurusan
        jurusan.filter(data => data.id == this.state.selected)[0].alamat = e.target.value
        this.setState({
        	jurusan,
        	editjurusan: jurusan.filter(data => data.id == this.state.selected)[0]
        })
    }

    editjurusan = () => {
    	const self = this
    	let editjurusan = this.state.editjurusan
    	delete editjurusan.id
    	self.setState({editjurusan})
    	console.log("ini lho")
    	console.log(JSON.stringify(this.state.editjurusan))
    	fetch(BASE_URL + '/api/jurusan/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editjurusan),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("Jurusan berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah jurusan", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addjurusanKode = (e) => {
    	let jurusanBaru = {}
        jurusanBaru = this.state.jurusanBaru
        jurusanBaru.kode = e.target.value
        this.setState({jurusanBaru})	
    }
    addjurusanNama = (e) => {
    	let jurusanBaru = {}
        jurusanBaru = this.state.jurusanBaru
        jurusanBaru.nama = e.target.value
        this.setState({jurusanBaru})	
    }
    addjurusanAlamat = (e) => {
    	let jurusanBaru = {}
        jurusanBaru = this.state.jurusanBaru
        jurusanBaru.alamat = e.target.value
        this.setState({jurusanBaru})	
    }

    addjurusan = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.jurusanBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/jurusan/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.jurusanBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let jurusan = []
				let jurusanBaru = {}
				jurusanBaru = self.state.jurusanBaru

	        	jurusan = self.state.jurusan
	        	jurusan.push(data)

	    		jurusanBaru.kode = null
				jurusanBaru.nama = null
				jurusanBaru.alamat = null

				self.setState({
					addForm: true,
					jurusan,
					jurusanBaru
					
				})
				toastr.success("Jurusan berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan jurusan", "Gagal ! ")
			}
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Jurusan ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/jurusan/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					jurusan: self.state.jurusan.filter(data => data.id !== id)
				})
				swal("Sukses! jurusan telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					jurusan: self.state.jurusan.filter(data => data.id !== id)
				})
				swal("Sukses! jurusan telah dihapus!", {
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
		                <h2>Daftar Jurusan</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Jurusan</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Jurusan</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		value={this.state.selectedNama}
		                                    		onChange={(e) => {
		                                    			this.setState({selectedNama: e.target.value})
		                                    		}}
		                                    		placeholder="Nama jurusan"
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
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.jurusan.filter(x => x.nama.toLowerCase().includes(this.state.selectedNama)).map((data, key) =>
					                            		<tr key={key}>
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Jurusan</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Jurusan</h5>
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
	                                            	value={this.state.jurusanBaru.kode}
						                            onChange={this.addjurusanKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.jurusanBaru.nama}
						                            onChange={this.addjurusanNama}
						                            />
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addjurusan}>
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
	                                            	value={this.state.jurusan.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.jurusan.filter(data => data.id === this.state.selected)[0].nama}
					                                onChange={this.handleChangeNama}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editjurusan}>
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

export default Jurusan