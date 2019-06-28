import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import { Link, Location } from 'react-router';

class Administrator extends Component {

	constructor(props){
        super(props);
        this.state = {
            staffs: [],
            loading: true,
            form: false,
            selected: null,
            staffsBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            kampus: [],
            selectedNama: ""
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/staff/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				staffs: data.results,
				loading: !self.state.loading
			})
		});

		fetch(BASE_URL + '/api/kampus/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				kampus: data.results
			})
		});

    }

    handleDeleteStaff = (id, key)=> {
    	const self = this
    	swal({
		  title: "Hapus Administrator ?",
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
						staffs: self.state.staffs.filter(data => data.id !== id)
					})
					swal("Sukses! staffs telah dihapus!", {
				      icon: "success",
				    });
				}
			}).then(function(data) {

			});
		  }
		});
    }

    Profil_staff = () =>   {
    	let data = this.state.staffs.filter(data => data.id == this.state.selected)[0]
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
                        	<img alt="image" width="50%" style={{'borderRadius':'50%', 'display':'block', 'margin':'0 auto'}} className="img-fluid"  src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"/>
                        }
                        <br/>
			    		<table className="table table-striped">
						<tbody>
				    		<tr>
				    			<td>Nama</td>
				    			<td> : {data.nama}</td>
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
				    			<td> : {this.state.kampus.find((kampus) => (kampus.id == data.kampus)).nama}</td>
				    		</tr>
						</tbody>
				    	</table>
			    	</div>
		    	}
		    </div>
		)
	}

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Staff Administrator</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Administrator</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Administrator</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-7">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		value={this.state.selectedNama}
		                                    		onChange={(e) => {
		                                    			this.setState({selectedNama: e.target.value})
		                                    		}}
		                                    		disabled="" 
		                                    		placeholder="Nama Administrator"
		                                    		className="form-control"/>
		                                    </div>
	                                    </div>
	                                    <div className="col-lg-5">
	                                    	<div className="col-sm-12">
	                                    		<Link to={{ pathname: 'add-staff', state: { title: 'Administrator'} }}>
				                                    <button className="btn btn-info">
				                                    	<i className="fa fa-plus"></i> Tambah Administrator
				                                    	 
				                                    </button>
			                                    </Link>
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
					                                <th>NAMA</th>
					                                <th>JK</th>
					                                <th>PENDIDIKAN</th>
					                                <th>KAMPUS</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.staffs.filter(x => x.nama.toLowerCase().includes(this.state.selectedNama) && x.role == 3).map((data, key) =>
					                            		<tr key={key}>
							                                <td>{data.nama.toUpperCase()}</td>
							                                <td>{data.jenis_kelamin}</td>
							                                <td>{data.pendidikan_terakhir.toUpperCase()}</td>
							                                 <td>{
																 (this.state.kampus.length === 0)? null:
																 this.state.kampus.find((kampus) => (kampus.id == data.kampus)).nama
															 }</td>
							                                <td style={{'width': '30%'}}>
						                                		<center>
						                                			<Link to={{ pathname: 'edit-staff', state: { staf: data, title : "Administrator"} }}>
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
                                    <h5> <i className="fa fa-user"></i> Profil Administrator</h5>
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
	                                            	value={this.state.staffs.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.staffs.filter(data => data.id === this.state.selected)[0].nama}
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
	                                            	value={this.state.staffs.filter(data => data.id === this.state.selected)[0].alamat}
					                                onChange={this.handleChangeAlamat}
						                            />
	                                        </div>
	                                    </div>
	                                    
	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editstaffs}>
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

export default Administrator