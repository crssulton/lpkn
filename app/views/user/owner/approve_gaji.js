import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import $ from 'jquery'
import Select from 'react-select';
import CurrencyInput from "react-currency-input";

class Approve_Gaji extends Component {

	constructor(props){
        super(props);
        this.state = {
            pegawai: [],
            loading: true,
            form: false,
            selected: null,
            gajiPegawai: null,
            pegawaiBaru: {},
            add: true,
            addForm: true,
            selectedStatus: "pending",
            jurusans: [],
            kampus: [],
            tempPegawai: {},
            pengajuan_sgv : []
        }
    }

    componentWillMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/pegawai/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				pegawai: data.results,
				loading: !self.state.loading
			})
		});

		fetch(BASE_URL + '/api/pengajuan-sgv/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				pengajuan_sgv: data.results
			})
		});

    }

    handleChangeStatus = (e, id)=> {
    	let status = e.target.value
    	const self = this
    	swal({
		  title: "Terima Pengajuan ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((change) => {
		  if (change) {
		  	fetch(BASE_URL + '/api/pengajuan-sgv/' + id + '/verify/', {
				method: 'post',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				if(response.status == 200){
				toastr.success("Pengajuan berhasil di" + status	, "Sukses ! ")
				let pengajuan_sgv = [...self.state.pengajuan_sgv]
				pengajuan_sgv.find(data => data.id == id).status = 'verified'
				self.setState({pengajuan_sgv})
			}else{
				toastr.warning("Mohon maaf,terjadi kesalahan", "Gagal ! ")
			}
			}).then(function(data) {

			});
		  }
		});
    }

    simpanGaji = () => {
    	let gajiBaru = {
    		pegawai: this.state.selected.pegawai_info.id,
    		gaji: this.state.gajiPegawai
    	}

    	const self = this
    	fetch(BASE_URL + '/api/pengajuan-sgv/', {
			method: 'patch',
			body: JSON.stringify(gajiBaru),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			if(response.status == 200){
				self.getPegawaiPengajuan()
				self.setState({
					pengajuan_sgv: self.state.pengajuan_sgv.find(data => data.pegawai_info.id == this.state.selected.pegawai_info.id).gaji = this.state.gajiPegawai,
					gajiPegawai: null,
					selected: null
				})
				toastr.success("Gaji Pegawai berhasil diubah", "Sukses ! ")
			}else{
				toastr.warning("Gagal mengubah Data", "Gagal ! ")
			}
		}).then(function(data) {

		});
    }

	formatNumber = (num) => {
	  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Approve Pengajuan Gaji Pegawai</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                               Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Approve</strong>
                            </li>
                        </ol>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Pegawai Pada Pengajuan</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-2 col-form-label">Cari </label>
	                                    	<div className="col-sm-10">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Pegawai"
		                                    		className="form-control"/>
		                                    </div>
	                                    </div>
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-2 col-form-label">Status </label>
	                                    	<div className="col-sm-10">
			                                    <select
			                                    	className="form-control"
			                                    	value={this.state.selectedStatus}
			                                    	onChange={(e) => this.setState({selectedStatus: e.target.value})}
			                                    >
			                                    	<option>Pilih</option>
			                                    	<option value="verified">Verified</option>
			                                    	<option value="pending">Pending</option>
			                                    	<option value="rejected">Rejected</option>
			                                    </select>
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
			                            </div> 
			                           :
			                            <div>
											<table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th>NO.</th>
					                                <th>NAMA</th>
					                                <th>PENDIDIKAN</th>
					                                <th>GAJI</th>
					                                <th>STATUS</th>
					                                <th style={{'width':'5%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.pengajuan_sgv.filter(gaji=> gaji.status == this.state.selectedStatus).map((data, key) =>
					                            		<tr>
					                            			<td>{key+1}</td>
							                                <td>{data.pegawai_info.nama.toUpperCase()}</td>
							                                <td>{data.pegawai_info.pendidikan_terakhir.toUpperCase()}</td>
							                                <td>{this.formatNumber(data.gaji)}</td>
							                                <td>{data.status.toUpperCase()}</td>
							                                <td style={{'width': '10%'}}>
						                                		<center>
						                                			<form className="form-inline">
									                                    {
									                                    	data.status == "pending" ?
									                                    	<button 
										                                    	onClick={(e) => this.handleChangeStatus(e, data.id)}
								                                				style={{'margin' : '0 0 0 5px'}}
								                                				className="btn btn-primary btn-sm" 
								                                				type="button"
								                                				><i className="fa fa-check"></i></button>
								                                				:
								                                				null
									                                    }
							                                			<button 
							                                				style={{'margin' : '0 0 0 5px'}}
							                                				onClick={ () => {
							                                					this.setState({selected: data})
							                                					$('#ModalEditGajiPegawai').modal('show')
							                                				}}
							                                				className="btn btn-info btn-sm" 
							                                				type="button"
							                                				><i className="fa fa-pencil"></i></button>
						                                			</form>
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

                        <div id="ModalEditGajiPegawai" className="modal fade">
	                        <div className="modal-dialog">
	                            <div className="modal-content">
	                                <div className="modal-header">
	                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span> <span className="sr-only">close</span></button>
	                                    <h4 id="modalTitle" className="modal-title">Ubah Gaji Pegawai</h4>
	                                </div>
	                                <div className="modal-body">
	                                	{
	                                    	this.state.tempPegawai != null ?
	                                    	<div>
	                                    		<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
			                                        <div className="col-lg-9">
			                                            <input 
			                                            	type="text"
			                                            	className="form-control m-b" 
			                                            	disabled="disabled"
			                                            	value={this.state.selected != null ? this.state.selected.pegawai_info.nama : null}
			                                            />
			                                        </div>
			                                    </div>

			                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Gaji</label>
			                                        <div className="col-lg-9">
			                                        	<CurrencyInput 
                                                            precision="0" 
                                                            className="form-control m-b" 
                                                            prefix="Rp "
                                                            value={this.state.gajiPegawai}
                                                            onChangeEvent={(e, maskedvalue, floatvalue) => {
			                                            		this.setState({gajiPegawai: floatvalue})
                                                            }}
                                                        />
			                                        </div>
			                                    </div>
	                                    	</div>
	                                    	:
	                                    	null
	                                    }
	                                    
	                                    
	                                </div>
	                                <div className="modal-footer">
	                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.setState({gajiPegawai: null})}>Tutup</button>
	                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.simpanGaji}>Ubah</button>
	                                </div> 
	                            </div>
	                        </div>
	                    </div>
                        
                    </div>
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Approve_Gaji