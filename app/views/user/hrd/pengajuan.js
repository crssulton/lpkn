import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import { Link, Location } from 'react-router';
import Select from "react-select";
import moment from "moment";
import "react-select/dist/react-select.css";

let account = []

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
            account: [],
            addForm: true,
            selected: null,
            editpengajuan : {},
            newPengajuan: {}
        }
    }

    componentWillMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/pengajuan/?gaji=1', {
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

        fetch(BASE_URL + "/api/account/", {
	      method: "get",
	      headers: {
	        Authorization: "JWT " + window.sessionStorage.getItem("token"),
	        "Content-Type": "application/json",
	        Accept: "application/json"
	      }
	    })
	      .then(function(response) {
	        return response.json();
	      })
	      .then(function(data) {
	        self.setState({
	          account: data
	        });
	      });

    }

    addPengajuan = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")
    	let newPengajuan = this.state.newPengajuan
    	newPengajuan.gaji =  true

    	fetch(BASE_URL + '/api/pengajuan/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(newPengajuan)
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

    handleChangeStatus = () => {
	    const self = this;

	    let pengajuanBaru = {...this.state.pengajuanBaru}

	    swal({
	      title: "Terima Pengajuan Gaji?",
	      icon: "warning",
	      buttons: true,
	      dangerMode: true
	    }).then(change => {
	      if (change) {
	      	console.log(JSON.stringify(pengajuanBaru))
	        fetch(
	          BASE_URL + "/api/pengajuan/" + self.state.selected.id + "/",
	          {
	            method: "patch",
	            headers: {
	              Authorization: "JWT " + window.sessionStorage.getItem("token"),
	              "Content-Type": "application/json",
	              Accept: "application/json"
	            },
	            body: JSON.stringify(pengajuanBaru)
	          }
	        )
	          .then(function(response) {
	            if (response.status == 200) {
	              toastr.success("Akun tujuan berhasil ditambahkan", "Sukses ! ");
	              let pengajuan = [...self.state.pengajuan];
	              pengajuan.find(
	                data => data.id == self.state.selected.id
	              ).account_tujuan = pengajuanBaru.account_tujuan;
	              self.setState({ pengajuan });
	            } else {
	              toastr.warning("Mohon maaf,terjadi kesalahan", "Gagal ! ");
	            }
	          })
	          .then(function(data) {});

	      }
	    });
	  };

    render() {

    	account = [...this.state.account]
	      this.state.account.map((data, key) => {
	      account[key].value = data.id
	      account[key].label = data.nama
	    })

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
					                                <th style={{'width':'15%'}}>AKUN</th>
					                                <th style={{'width':'10%'}}>STATUS</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.pengajuan.map((data, key) =>
					                            		<tr key={key}>
							                                <td>{key+1}</td>
							                                <td>{data.nama}</td>
							                                <td>{data.account_tujuan != null ? this.state.account.find(x => x.id == data.account_tujuan).nama : "-"}</td>
							                                <td>
							                                {data.verified ? (
							                                  <span className="badge badge-primary">
							                                    Diterima
							                                  </span>
							                                ) : (
							                                  <span className="badge badge-warning">
							                                    Menunggu
							                                  </span>
							                                )}
							                              </td>
							                                <td>
						                                		<center>
						                                			{
						                                				!data.verified?
						                                				<button 
							                                				style={{'margin' : '0 5px'}} 
							                                				onClick={() => this.handleDeleteMatkul( data.id, key )}
							                                				className="btn btn-danger btn-sm" 
							                                				type="button"
							                                				><i className="fa fa-trash"></i></button>
							                                				:
							                                				null
						                                			}
						                                			<span>
							                                			<Link to={{ pathname: 'pengajuan-gaji', state: { pengajuan: data} }}>
								                                			<button 
								                                				style={{'margin' : '0 0 0 5px'}}
								                                				className="btn btn-primary btn-sm" 
								                                				type="button"
								                                				><i className="fa fa-book"></i></button>
							                                			</Link>
							                                			{
							                                				data.verified ?
							                                				<button 
								                                				style={{'margin' : '0 5px'}} 
								                                				onClick={ () => {
								                                					this.setState({selected: data})
								                                					$('#ModalAkunTransaksi').modal('show')
								                                				}}
								                                				className="btn btn-info btn-sm" 
								                                				type="button"
								                                				><i className="fa fa-external-link"></i></button>
								                                			:
								                                			null
							                                			}
						                                			</span>

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
                  	<div
		              className="modal inmodal"
		              id="ModalAkunTransaksi"
		              tabIndex="-1"
		              role="dialog"
		              aria-hidden="true"
		            >
		              <div className="modal-dialog">
		                <div className="modal-content animated bounceInRight">
		                  <div className="modal-header">
		                    <button
		                      type="button"
		                      className="close"
		                      data-dismiss="modal"
		                    >
		                      <span aria-hidden="true">&times;</span>
		                      <span className="sr-only">Close</span>
		                    </button>
		                    <h4 className="modal-title">Pilih Akun Tujuan</h4>
		                  </div>
		                  <div className="modal-body">
		                    <div className="form-group row">
		                      <label className="col-lg-2 col-form-label">
		                        Akun Tujuan
		                      </label>
		                      <div className="col-lg-10">
		                        <Select
		                          name="form-field-name"
		                          value={this.state.pengajuanBaru.account_tujuan}
		                          onChange={selectedOption => {
		                            let pengajuanBaru = {
		                              ...this.state.pengajuanBaru
		                            };
		                            console.log(selectedOption.value)
		                            pengajuanBaru.account_tujuan =
		                              selectedOption.value;
		                            this.setState({ pengajuanBaru });
		                          }}
		                          options={account}
		                        />
		                      </div>
		                    </div>
		                  </div>
		                  <div className="modal-footer">
		                    <button
		                      type="button"
		                      className="btn btn-white"
		                      data-dismiss="modal"
		                    >
		                      Tutup
		                    </button>
		                    <button
		                      onClick={this.handleChangeStatus}
		                      type="button"
		                      className="btn btn-primary"
		                      data-dismiss="modal"
		                    >
		                      Terima
		                    </button>
		                  </div>
		                </div>
		              </div>
		            </div>  
                </div>

		        
            </div>
			

        )
    }

}

export default Pengajuan