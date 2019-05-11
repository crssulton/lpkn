import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import $ from 'jquery'
import Select from 'react-select';


class Approve_Gaji extends Component {

	constructor(props){
        super(props);
        this.state = {
            pegawai: [],
            loading: true,
            form: false,
            selected: null,
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
		  title: e.target.value + " pengajuan SGV ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((change) => {
		  if (change) {
		  	fetch(BASE_URL + '/api/pengajuan-sgv/' + id + '/' + status +'/', {
				method: 'post',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				if(response.status == 200){
				toastr.success("Pengajuan berhasil di" + status	, "Sukses ! ")
				let pengajuan_sgv = [...self.state.pengajuan_sgv]
				if (status == 'verify') {
					pengajuan_sgv.find(data => data.id == id).status = 'verified'
				}else{
					pengajuan_sgv.find(data => data.id == id).status = 'rejected'
				}
				self.setState({pengajuan_sgv})
			}else{
				toastr.warning("Mohon maaf,terjadi kesalahan", "Gagal ! ")
			}
			}).then(function(data) {

			});
		  }
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
		                <h2>Approve Pengajuan Gaji SPV</h2>
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
						                                			<select
						                                				onChange={(e) => this.handleChangeStatus(e, data.id)}
								                                    	className="form-control"
								                                    >
								                                    	<option value="">Aksi</option>
								                                    	<option value="verify">Verify</option>
								                                    	<option value="reject">Reject</option>
								                                    </select>
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
                        
                    </div>
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Approve_Gaji