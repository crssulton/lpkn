import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import { Link, Location } from 'react-router';

class Pengajuan extends Component {

	constructor(props){
        super(props);
        this.state = {
            pengajuan: [],
            loading: true,
            form: false,
            selected: null,
            pengajuanBaru: {},
            add: true,
            addForm: true,
            editpengajuan : {},
            newPengajuan: {}
        }
    }

    componentWillMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/pengajuan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				pengajuan: data.results,
				loading: !self.state.loading
			})
        });

    }

    addPengajuan = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/pengajuan/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.newPengajuan)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let pengajuan = []

	        	pengajuan = self.state.pengajuan
	        	pengajuan.push(data)

				self.setState({
					addForm: true,
					pengajuan,
					newPengajuan: {}
					
				})
				toastr.success("pengajuan berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan pengajuan", "Gagal ! ")
			}
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus pengajuan ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/pengajuan/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					pengajuan: self.state.pengajuan.filter(data => data.id !== id)
				})
				swal("Sukses! pengajuan telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					pengajuan: self.state.pengajuan.filter(data => data.id !== id)
				})
				swal("Sukses! pengajuan telah dihapus!", {
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
		                <h2>Daftar Pengajuan Gaji Pegawai</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pengajuan Gaji</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Pengajuan Gaji</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    
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
					                                <th style={{'width':'15%'}}>URAIAN</th>
					                                <th style={{'width':'15%'}}>STATUS</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.pengajuan.map((data, key) =>
					                            		<tr key={key}>
							                                <td>{key+1}</td>
							                                <td>{data.nama}</td>
							                                <td>{data.status.toUpperCase()}</td>
							                                <td>
						                                		<center>
						                                			{
						                                				data.status == "pending"?
						                                				<button 
							                                				style={{'margin' : '0 5px'}} 
							                                				onClick={() => this.handleDeleteMatkul( data.id, key )}
							                                				className="btn btn-danger btn-sm" 
							                                				type="button"
							                                				><i className="fa fa-trash"></i></button>
							                                				:
							                                				null
						                                			}
						                                			<Link to={{ pathname: 'pengajuan-gaji', state: { pengajuan: data} }}>
							                                			<button 
							                                				style={{'margin' : '0 0 0 5px'}}
							                                				className="btn btn-primary btn-sm" 
							                                				type="button"
							                                				><i className="fa fa-book"></i></button>
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Pengajuan</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Pengajuan</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Uraian Pengajuan</label>
	                                        <div className="col-lg-9">
                                                <input 
                                                	onChange={(e) => {
                                                		let pengajuan = [...this.state.pengajuan]
                                                		let newPengajuan = {...this.state.pengajuan}
                                                		newPengajuan.nama = e.target.value
                                                		this.setState({newPengajuan, pengajuan})
                                                	}}
                                                	value={this.state.newPengajuan.nama} 
                                                	type="text" 
                                                	className="form-control m-b" />
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addPengajuan}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                null
                                }

                            </div>
                        </div>
                    </div>
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Pengajuan