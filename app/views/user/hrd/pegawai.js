import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import { Link, Location } from 'react-router';
import print from 'print-js'

class Pegawai extends Component {

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
            jurusans: [],
            kampus: []
        }
    }

    componentDidMount(){
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

    handleDeleteStaff = (id, key)=> {
    	const self = this
    	swal({
		  title: "Hapus Pegawai ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/staff/' + id + '/', {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				if (response.status == 204) {
					self.setState({
						pegawai: self.state.pegawai.filter(data => data.id !== id)
					})
					swal("Sukses! pegawai telah dihapus!", {
				      icon: "success",
				    });
				}
			}).then(function(data) {

			});
		  }
		});
    }

    Profil_staff = () =>   {
    	let data = this.state.pegawai.filter(data => data.id == this.state.selected)[0]
    	return	(
			<div className="ibox-content">
		    	{
		    		this.state.selected == null ?
		    		null
		    		:
		    		<div className="table-responsive">
		    			{
                        	data.foto != null ?
                        	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src={data.foto}/>
                        	:
                        	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"/>
                        }
                        <br/>
			    		<table className="table table-striped">
				    		<tr>
				    			<td>Nama</td>
				    			<td> : {data.nama}</td>
				    		</tr>
				    		<tr>
				    			<td>NIK</td>
				    			<td> : NIK</td>
				    		</tr>
				    		<tr>
				    			<td>Jabatan</td>
				    			<td> : Jabatan</td>
				    		</tr>
				    		<tr>
				    			<td>Alamat</td>
				    			<td> : {data.alamat}</td>
				    		</tr>
				    		<tr>
				    			<td>Tmpt Lahir</td>
				    			<td> : {data.tempat_lahir}</td>
				    		</tr>
				    		<tr>
				    			<td>Tgl Lahir</td>
				    			<td> : {data.tgl_lahir}</td>
				    		</tr>
				    		<tr>
				    			<td>Jenis Kelamin</td>
				    			<td> : {data.jenis_kelamin}</td>
				    		</tr>
				    		<tr>
				    			<td>Agama</td>
				    			<td> : {data.agama}</td>
				    		</tr>
				    		<tr>
				    			<td>Hp</td>
				    			<td> : {data.no_hp}</td>
				    		</tr>
				    		<tr>
				    			<td>E-mail</td>
				    			<td> : {data.email}</td>
				    		</tr>
				    		<tr>
				    			<td>Pendidikan</td>
				    			<td> : {data.pendidikan_terakhir}</td>
				    		</tr>
				    		<tr>
				    			<td>Keterangan</td>
				    			<td> : {data.keteangan}</td>
				    		</tr>
				    		<tr>
				    			<td>Status</td>
				    			<td> : {data.status_menikah}</td>
				    		</tr>
				    		<tr>
				    			<td>Kampus</td>
				    			<td> : {data.kampus_info.nama}</td>
				    		</tr>
				    	</table>
			    	</div>
		    	}
		    </div>
		)
	}

    render() {
    	const styletb = {
            borderCollapse:'collapse',
            borderSpacing:0,
            borderStyle:'solid',
            width:'100%',
            fontSize:'12px'
        }
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Pegawai</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pegawai</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Pegawai</h5>
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
	                                    	<div className="col-sm-12">
	                                    		<Link to={{ pathname: 'add-pegawai', state: { title: 'Pegawai'} }}>
				                                    <button className="btn btn-info">
				                                    	<i className="fa fa-plus"></i> Tambah Pegawai
				                                    	 
				                                    </button>
			                                    </Link>
		                                    </div>
	                                    </div>
	                                    <div className="col-lg-3">
	                                    	<div className="col-sm-12">
			                                    <button className="btn btn-primary" onClick={() => this.exportData()}>
			                                    	<i className="fa fa-print"></i> Cetak
			                                    </button>
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
					                                <th>JK</th>
					                                <th>PENDIDIKAN</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.pegawai.map((data, key) =>
					                            		<tr>
					                            			<td>{key+1}</td>
							                                <td>{data.nama.toUpperCase()}</td>
							                                <td>{data.jenis_kelamin}</td>
							                                <td>{data.pendidikan_terakhir.toUpperCase()}</td>
							                                <td style={{'width': '30%'}}>
						                                		<center>
						                                			<Link to={{ pathname: 'edit-pegawai', state: { staf: data, title : "Administrator"} }}>
							                                			<button 
							                                				style={{'margin' : '0 5px'}} 
							                                				className="btn btn-info btn-sm" 
							                                				type="button"
							                                				>
							                                				<i className="fa fa-pencil"></i></button>
						                                			</Link>

						                                			<button 
						                                				onClick={() => this.handleDeleteStaff( data.id, key )}
						                                				className="btn btn-danger btn-sm" 
						                                				type="button"
						                                				><i className="fa fa-trash"></i></button>

						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: data.id})} }
						                                				>
						                                				<i className="fa fa-eye"></i></button>

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
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-user"></i> Profil Pegawai</h5>
                                </div>
                                
                                {
                                	this.state.addForm?
                                	this.Profil_staff()
	                                :
	                                <div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Kode</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.pegawai.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.pegawai.filter(data => data.id === this.state.selected)[0].nama}
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
	                                            	value={this.state.pegawai.filter(data => data.id === this.state.selected)[0].alamat}
					                                onChange={this.handleChangeAlamat}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editpegawai}>
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

                    <div style={{'backgroundColor': 'white', 'display' : 'none'}}>
						<table border="1" align="left" style={styletb} id="print_data" width="100%" style={{fontSize:'12px'}}>
		                    <thead>
		                    <tr>
		                    	<th align="left" style={{background:'#e5e5e5',padding:'10px'}}>NO.</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>NAMA</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>ALAMAT</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>TMPT LAHIR</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>TGL LAHIR</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>JK</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>AGAMA</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>HP</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>STATUS</th>
		                        <th align="left" style={{background:'#e5e5e5',padding:'10px'}}>PENDIDIKAN</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    {
		                    	this.state.pegawai.map((data, key) =>
		                    		<tr >
		                    			<td style={{padding:'7px',textAlign:'left'}}>{key+1}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.nama}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.alamat}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.tempat_lahir}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.tgl_lahir}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.jenis_kelamin}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.agama}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.no_hp}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.status_menikah}</td>
		                                <td style={{padding:'7px',textAlign:'left'}}>{data.pendidikan_terakhir.toUpperCase()}</td>
		                            </tr>
		                    	)
		                    }
		                    </tbody>
		                </table>
					</div>
                    
                    
                </div>

		        
            </div>
			

        )
    }

}

export default Pegawai