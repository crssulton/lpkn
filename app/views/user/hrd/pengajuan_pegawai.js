import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import $ from 'jquery'
import Select from 'react-select';
import CurrencyInput from 'react-currency-input';

let pegawai = []

class Pengajuan extends Component {

	constructor(props){
        super(props);

        const {pengajuan} = this.props.location.state

        this.state = {
            pegawai: [],
            pengajuan,
            loading: true,
            form: false,
            selected: null,
            pegawaiBaru: {},
            add: true,
            addForm: true,
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
				pegawai: data.results
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
				pengajuan_sgv: data.results,
				loading: !self.state.loading
			})
		});
    }

    getPegawaiPengajuan = () => {
    	const self = this

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

    handleDeletePengajuan = (id, key)=> {

    	const self = this
    	swal({
		  title: "Hapus Pengajuan SGV ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/pengajuan-sgv/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					pengajuan_sgv: self.state.pengajuan_sgv.filter(data => data.id !== id)
				})
				swal("Sukses! pengajuan telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					pengajuan_sgv: self.state.pengajuan_sgv.filter(data => data.id !== id)
				})
				swal("Sukses! pengajuan telah dihapus!", {
			      icon: "success",
			    });
			});
		  }
		});
    }

    handleApprovePegawai = (id, key)=> {

    	const self = this
    	swal({
		  title: "Terima Transaksi ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/pengajuan-sgv/' + id + '/verify/', {
				method: 'post',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
			}).then(function(response) {
				if (response.status == 200) {
					let pengajuan_sgv = [...self.state.pengajuan_sgv]
					pengajuan_sgv.find(data => data.id == id).verified = true
					self.setState({
						pengajuan_sgv
					})
					swal("Sukses! Transaksi Gaji berhasil!", {
				      icon: "success",
				    });
				}
			}).then(function(data) {
			});
		  }
		});
    }

    simpanGaji = () => {
    	const self = this
    	let tempPegawai = this.state.tempPegawai
    	tempPegawai.pengajuan =  this.state.pengajuan.id

    	console.log(JSON.stringify(this.state.tempPegawai))
    	fetch(BASE_URL + '/api/pengajuan-sgv/', {
			method: 'post',
			body: JSON.stringify(tempPegawai),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			if(response.status == 201){
				self.getPegawaiPengajuan()
				self.setState({tempPegawai: {}})
				toastr.success("Data berhasil ditambahkan", "Sukses ! ")
			}else{
				toastr.warning("Gagal menambahkan Data", "Gagal ! ")
			}
		}).then(function(data) {

		});
    }

    exportData(){
	    printJS({
	        printable: 'print_data',
	        type: 'html',
	        modalMessage:"Sedang memuat data...",
	        showModal:true,
	        maxWidth:'1300',
	        font_size:'8pt',
	        documentTitle:'DATA PEGAWAI',
	        targetStyles: ['*']
	    })
	 }


	formatNumber = (num) => {
	  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

    render() {

    	const styletb = {
            borderCollapse:'collapse',
            borderSpacing:0,
            borderStyle:'solid',
            width:'100%',
            fontSize:'12px'
        }

    	pegawai = [...this.state.pegawai]
    	const { selectedOption } = this.state;
    	this.state.pegawai.map((data, key) => {
			pegawai[key].value = data.id
			pegawai[key].label = data.nama
		})

        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Pengajuan Gaji Pegawai</h2>
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
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Pegawai Pada Pengajuan</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-5">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Pegawai"
		                                    		className="form-control"/>
		                                    </div>
	                                    </div>
	                                    <div className="col-lg-4">
	                                    	{
	                                    		!this.state.pengajuan.verified ?
	                                    		<div className="col-sm-12">
				                                    <button 
				                                    	className="btn btn-info"
				                                    	onClick={ () => {
		                                					$('#ModalInputPegawai').modal('show')
		                                				}}
				                                    	>
				                                    	<i className="fa fa-external-link"></i> Tambah Pegawai
				                                    </button>
			                                    </div>
			                                    :
			                                    null
	                                    	}
	                                    </div>
	                                    <div className="col-lg-3">
	                                    	<div className="col-sm-12">
			                                   
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
					                                {
					                                	!this.state.pengajuan.verified ?
					                                		<th style={{'width':'10%', 'textAlign':'center'}}>AKSI</th>
					                                	:
					                                		<th style={{'width':'10%', 'textAlign':'center'}}>TRANSAKSI</th>
					                                }
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.pengajuan_sgv.filter(pegawai => pegawai.pengajuan == this.state.pengajuan.id).map((data, key) =>
					                            		<tr key={key}>
					                            			<td>{key+1}</td>
							                                <td>{data.pegawai_info.nama.toUpperCase()}</td>
							                                <td>{data.pegawai_info.pendidikan_terakhir.toUpperCase()}</td>
							                                <td>Rp. {this.formatNumber(data.gaji)}</td>
							                               {
							                               	!this.state.pengajuan.verified ?
							                               	<td style={{'width': '15%'}}>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-danger btn-sm" 
						                                				type="button"
						                                				onClick={() => this.handleDeletePengajuan(data.id)}
						                                				>
						                                				<i className="fa fa-trash"></i></button>

						                                		</center>
							                                </td>
							                                :
							                                !data.verified ?
							                                <td style={{'width': '15%'}}>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-primary btn-sm" 
						                                				type="button"
						                                				onClick={() => this.handleApprovePegawai(data.id)}
						                                				>
						                                				<i className="fa fa-check"></i></button>

						                                		</center>
							                                </td>
							                                :
							                                <td style={{'width': '15%'}}>TRANSAKSI SUKSES</td>
							                               }
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
                        <div id="ModalInputPegawai" className="modal fade">
	                        <div className="modal-dialog">
	                            <div className="modal-content">
	                                <div className="modal-header">
	                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span> <span className="sr-only">close</span></button>
	                                    <h4 id="modalTitle" className="modal-title">Input Gaji Pegawai</h4>
	                                </div>
	                                <div className="modal-body">
	                                	{
	                                    	this.state.tempPegawai != null ?
	                                    	<div>
	                                    		<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
			                                        <div className="col-lg-9">
			                                            <Select
													        name="form-field-name"
													        value={this.state.tempPegawai.pegawai}
													        onChange={(selectedOption) => {
			                                            		let tempPegawai = this.state.tempPegawai
			                                            		tempPegawai.pegawai = selectedOption.value
			                                            		this.setState({tempPegawai})
			                                            	}}
													        options={pegawai}
													      />
			                                        </div>
			                                    </div>

			                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Gaji</label>
			                                        <div className="col-lg-9">
			                                        	<CurrencyInput 
                                                            precision="0" 
                                                            className="form-control m-b" 
                                                            prefix="Rp "
                                                            value={this.state.tempPegawai.gaji}
                                                            onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                                let tempPegawai = this.state.tempPegawai
			                                            		tempPegawai.gaji = floatvalue
			                                            		this.setState({tempPegawai})
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
	                                    <button type="button" className="btn btn-default" data-dismiss="modal">Tutup</button>
	                                    <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.simpanGaji}>Simpan</button>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
                        
                    </div>
                    
                    
                </div>

                <div style={{'backgroundColor': 'white', 'display' : 'none'}}>
					<table border="1" align="left" style={styletb} id="print_data" width="100%" style={{fontSize:'12px'}}>
	                    <thead>
	                    <tr>
	                    	<th align="left" style={{background:'#e5e5e5',padding:'10px'}}>NO.</th>
	                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>NAMA</th>
	                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>ALAMAT</th>
	                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>TMPT LAHIR</th>
	                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>TGL LAHIR</th>
	                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>PENDIDIKAN</th>
	                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>GAJI</th>
	                    </tr>
	                    </thead>
	                    <tbody>
	                    {
	                    	this.state.pengajuan_sgv.filter(data => data.status == 'verified').map((data, key) =>
	                    		<tr >
	                    			<td style={{padding:'7px',textAlign:'left'}}>{key+1}</td>
	                                <td style={{padding:'7px',textAlign:'left'}}>{data.pegawai_info.nama}</td>
	                                <td style={{padding:'7px',textAlign:'left'}}>{data.pegawai_info.alamat}</td>
	                                <td style={{padding:'7px',textAlign:'left'}}>{data.pegawai_info.tempat_lahir}</td>
	                                <td style={{padding:'7px',textAlign:'left'}}>{data.pegawai_info.tgl_lahir}</td>
	                                <td style={{padding:'7px',textAlign:'left'}}>{data.pegawai_info.pendidikan_terakhir.toUpperCase()}</td>
	                                <td style={{padding:'7px',textAlign:'left'}}>{this.formatNumber(data.gaji)}</td>
	                            </tr>
	                    	)
	                    }
	                    </tbody>
	                </table>
				</div>

		        
            </div>
			

        )
    }

}

export default Pengajuan