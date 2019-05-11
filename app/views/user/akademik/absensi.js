import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import { Link, Location } from 'react-router';

class Absensi extends Component {

	constructor(props){
        super(props);
        this.state = {
            absensi: [],
            loading: true,
            form: false,
            selected: null,
            absensiBaru: {},
            add: true,
            matkul: [],
            dosen: [],
            addForm: true,
            jurusans: [],
            editAbsensi : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/absensi/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				absensi: data.results,
				loading: !self.state.loading
			})
        });
        
        fetch(BASE_URL + '/api/mata-kuliah/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				matkul: data.results,
				loading: !self.state.loading
			})
        });
        
        fetch(BASE_URL + '/api/dosen/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				dosen: data.results,
				loading: !self.state.loading
			})
		});

    }

    getAbsensi = () => {
    	const self = this
    	fetch(BASE_URL + '/api/absensi/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				absensi: data.results
			})
        });
    }

    handleChangeMatkul = e => {
        let absensi = []
        absensi = this.state.absensi
        absensi.filter(data => data.id == this.state.selected)[0].mata_kuliah = e.target.value
        this.setState({
        	absensi,
        	editAbsensi: absensi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeDosen = e => {
        let absensi = []
        absensi = this.state.absensi
        absensi.filter(data => data.id == this.state.selected)[0].dosen = e.target.value
        this.setState({
        	absensi,
        	editAbsensi: absensi.filter(data => data.id == this.state.selected)[0]
        })
    }

    editAbsensi = () => {
    	const self = this
        
    	fetch(BASE_URL + '/api/absensi/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editAbsensi),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				self.getAbsensi()
				toastr.success("Absensi berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah Absensi", "Gagal ! ")
			}
		}).then(function(data) {

		});
    }

    addAbsensi = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/absensi/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.absensiBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let absensi = []

	        	absensi = self.state.absensi
	        	absensi.push(data)

				self.setState({
					addForm: true,
					absensi
					
				})
				toastr.success("Absensi berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Absensi", "Gagal ! ")
			}
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Absensi ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/absensi/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					absensi: self.state.absensi.filter(data => data.id !== id)
				})
				swal("Sukses! Absensi telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					absensi: self.state.absensi.filter(data => data.id !== id)
				})
				swal("Sukses! Absensi telah dihapus!", {
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
		                <h2>Daftar Absensi</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Absensi</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Absensi</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Absensi"
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
					                                <th style={{'width':'5%'}}>NO</th>
					                                <th style={{'width':'15%'}}>MATA KULIAH</th>
					                                <th style={{'width':'15%'}}>JURUSAN</th>
                                                    <th style={{'width':'15%'}}>DOSEN</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.absensi.map((data, key) =>
					                            		<tr key={key}>
							                                <td>{key+1}</td>
							                                <td>{data.mata_kuliah_info.nama}</td>
                                                            <td>{data.jurusan_info.nama}</td>
                                                            <td>{data.dosen_info.nama}</td>
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

						                                			<Link to={{ pathname: 'daftar', state: { absensiData: data, matkul: data.mata_kuliah_info.nama} }}>
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Absensi</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Absensi</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Mata Kuliah</label>
	                                        <div className="col-lg-9">
                                                <select 
                                                    value={this.state.absensiBaru.mata_kuliah}
                                                    onChange={(e) => {
                                                        let absensiBaru = {...this.state.absensiBaru}
                                                        absensiBaru.mata_kuliah = e.target.value
                                                        this.setState({absensiBaru})
                                                    }}
                                                    className="form-control m-b">
                                                    <option value="">Pilih Mata Kuliah</option>
                                                    {
                                                        this.state.matkul.map((data, i) => 
                                                            <option key={i} value={data.id}>{data.kode} - {data.nama}</option>
                                                        )
                                                    }
                                                </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Dosen</label>
	                                        <div className="col-lg-9">
                                                <select 
                                                    value={this.state.absensiBaru.dosen}
                                                    onChange={(e) => {
                                                        let absensiBaru = {...this.state.absensiBaru}
                                                        absensiBaru.dosen = e.target.value
                                                        this.setState({absensiBaru})
                                                    }}
                                                    className="form-control m-b">
                                                    <option value="">Pilih Dosen</option>
                                                    {
                                                        this.state.dosen.map((data, i) => 
                                                            <option key={i} value={data.id}>{data.nama}</option>
                                                        )
                                                    }
                                                </select>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addAbsensi}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">
                                        <div className="form-group row"><label className="col-lg-3 col-form-label">Mata Kuliah</label>
	                                        <div className="col-lg-9">
                                                <select 
                                                    value={this.state.absensi.filter(data => data.id === this.state.selected)[0].mata_kuliah}
                                                    onChange={this.handleChangeMatkul}
                                                    className="form-control m-b">
                                                    <option value="">Pilih Mata Kuliah</option>
                                                    {
                                                        this.state.matkul.map((data, i) => 
                                                            <option key={i} value={data.id}>{data.kode} - {data.nama}</option>
                                                        )
                                                    }
                                                </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Dosen</label>
	                                        <div className="col-lg-9">
                                                <select 
                                                    value={this.state.absensi.filter(data => data.id === this.state.selected)[0].dosen}
                                                    onChange={this.handleChangeDosen}
                                                    className="form-control m-b">
                                                    <option value="">Pilih Dosen</option>
                                                    {
                                                        this.state.dosen.map((data, i) => 
                                                            <option key={i} value={data.id}>{data.nama}</option>
                                                        )
                                                    }
                                                </select>
	                                        </div>
	                                    </div>
                                        
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editAbsensi}>
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

export default Absensi