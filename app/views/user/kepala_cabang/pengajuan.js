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
			console.log(data.results)
			self.setState({
				pengajuan: data.results,
				loading: !self.state.loading
			})
        });

    }

    handleChangeStatus = (e, id)=> {
    	let status = e.target.value
    	const self = this
    	swal({
		  title: e.target.value + " Pengajuan ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((change) => {
		  if (change) {
		  	fetch(BASE_URL + '/api/pengajuan/' + id + '/' + status +'/', {
				method: 'post',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				if(response.status == 200){
				toastr.success("Pengajuan berhasil di" + status	, "Sukses ! ")
				let pengajuan = [...self.state.pengajuan]
				if (status == 'verify') {
					pengajuan.find(data => data.id == id).status = 'verified'
				}else{
					pengajuan.find(data => data.id == id).status = 'rejected'
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

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Pengajuan Anggaran</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pengajuan</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Pengajuan Anggaran</h5>
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
					                                <th style={{'width':'15%'}}>KETERANGAN</th>
					                                <th style={{'width':'15%'}}>KAMPUS</th>
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
							                                <td>{data.kampus_info.nama}</td>
							                                <td>{data.status}</td>
							                                <td>
						                                		<center>
						                                			<form className="form-inline">
						                                				<select
						                                					value={data.status}
							                                				onChange={(e) => this.handleChangeStatus(e, data.id)}
									                                    	className="form-control"
									                                    >
									                                    	<option value="">--Pilih--</option>
									                                    	<option value="verify">Verify</option>
									                                    	<option value="reject">Reject</option>
									                                    </select>

							                                			<Link to={{ pathname: 'anggaran', state: { pengajuan: data} }}>
								                                			<button 
								                                				style={{'margin' : '0 0 0 5px'}}
								                                				className="btn btn-info btn-sm" 
								                                				type="button"
								                                				><i className="fa fa-eye"></i></button>
							                                			</Link>
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
                        
                    </div>
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Pengajuan