import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';

class Mata_Kuliah extends Component {

	constructor(props){
        super(props);
        this.state = {
            matkuls: [],
            loading: true,
            selectedJurusan: 'all',
            form: false,
            selected: null,
            matkulBaru: {},
            add: true,
            addForm: true,
            jurusans: []
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				matkuls: data.results,
				loading: !self.state.loading
			})
		});

		fetch('http://lpkn.itec.my.id:9000/api/jurusan/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				jurusans: data.results
			})
		});

    }

    handleChangeKode = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls[this.state.selected].kode = e.target.value
        this.setState({matkuls})
    }
    handleChangeNama = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls[this.state.selected].nama = e.target.value
        this.setState({matkuls})
    }
    handleChangeKategori = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls[this.state.selected].kategori = e.target.value
        this.setState({matkuls})
    }
    handleChangeJam = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls[this.state.selected].jumlah_jam = e.target.value
        this.setState({matkuls})
    }
    handleChangePertemuan = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls[this.state.selected].jumlah_pertemuan = e.target.value
        this.setState({matkuls})
    }



    editMataKuliah = () => {
    	fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				matkuls: data.results,
				loading: !self.state.loading
			})
		});
    }

    addMatkulKode = (e) => {
    	let matkulBaru = {}
        matkulBaru = this.state.matkulBaru
        matkulBaru.kode = e.target.value
        this.setState({matkulBaru})	
    }
    addMatkulNama = (e) => {
    	let matkulBaru = {}
        matkulBaru = this.state.matkulBaru
        matkulBaru.nama = e.target.value
        this.setState({matkulBaru})	
    }
    addMatkulKategori = (e) => {
    	let matkulBaru = {}
        matkulBaru = this.state.matkulBaru
        matkulBaru.kategori = e.target.value
        this.setState({matkulBaru})	
    }
    addMatkulJam = (e) => {
    	let matkulBaru = {}
        matkulBaru = this.state.matkulBaru
        matkulBaru.jumlah_jam = e.target.value
        this.setState({matkulBaru})	
    }
    addMatkulPertemuan = (e) => {
    	let matkulBaru = {}
        matkulBaru = this.state.matkulBaru
        matkulBaru.jumlah_pertemuan = e.target.value
        this.setState({matkulBaru})	
    }

    addMataKuliah = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")
    	fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.matkulBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			addButton[0].removeAttribute("disabled")
			let matkuls = []
        	matkuls = self.state.matkuls
        	matkuls.push(data)
			self.setState({
				addForm: true,
				matkuls,
				matkulBaru: {}
			})
			toastr.success("Mata kuliah berhasil ditambahkan", "Sukses ! ")
		});
    }

    handleDeleteMatkul = (id, key)=> {
    	const self = this
    	swal({
		  title: "Hapus Mata Kuliah ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + cookie.load('token')
				}
			}).then(function(response) {
				let matkuls = []
	        	matkuls = self.state.matkuls
	        	delete matkuls[key]
				self.setState({
					matkuls
				})
				swal("Sukses! Mata Kuliah telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				let matkuls = []
	        	matkuls = self.state.matkuls
	        	delete matkuls[key]
				self.setState({
					matkuls
				})
				swal("Sukses! Mata Kuliah telah dihapus!", {
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
		                <h2>Daftar Mata Kuliah</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Mata Kuliah</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Filter :</label>
	                                    	<div className="col-sm-9">
			                                    <select
			                                        className="form-control">
			                                        {
			                                        	this.state.jurusans.map((jurusan) => 
			                                        		<option value={jurusan.id}>{jurusan.nama}</option>
			                                        	)
			                                        }
			                                    </select>
		                                    </div>
	                                    </div>
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-3 col-form-label">Cari :</label>
	                                    	<div className="col-sm-9">
			                                    <input 
		                                    		type="text" 
		                                    		disabled="" 
		                                    		placeholder="Nama Mata Kuliah"
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
					                                <th style={{'width':'5%'}}>KATEGORI</th>
					                                <th style={{'width':'10%'}}>JURUSAN</th>
					                                <th style={{'width':'10%'}}>JAM</th>
					                                <th style={{'width':'10%'}}>PERTEMUAN</th>
					                                <th style={{'width':'13%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.matkuls.map((matkul, key) =>
					                            		<tr>
							                                <td>{matkul.kode}</td>
							                                <td>{matkul.nama}</td>
							                                <td>{matkul.kategori}</td>
							                                <td>Jurusan 1</td>
							                                <td>{matkul.jumlah_jam}</td>
							                                <td>{matkul.jumlah_pertemuan}</td>
							                                <td>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: key, addForm: false})} }
						                                				>
						                                				<i className="fa fa-edit"></i></button>

						                                			<button 
						                                				onClick={() => this.handleDeleteMatkul( matkul.id, key )}
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
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-plus"></i> Tambah Mata Kuliah</h5>
                                </div>
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Kode</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.matkulBaru.kode}
						                            onChange={this.addMatkulKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.matkulBaru.nama}
						                            onChange={this.addMatkulNama}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Kategori</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.matkulBaru.kategori} onChange={this.addMatkulKategori}>
	                                                <option >Pilih</option>
	                                                <option value="wajib">Wajib</option>
	                                                <option value="pilihan">Pilihan</option>
	                                            </select>
	                                        </div>
	                                    </div>
	                                    
			                            <div className="form-group row"><label className="col-lg-3 col-form-label">Jurusan</label>
	                                        <div className="col-lg-9">
	                                            <select
			                                        className="form-control">
			                                        <option value="">Pilih Jurusan</option>
			                                        {
			                                        	this.state.jurusans.map((jurusan) => 
			                                        		<option value={jurusan.id}>{jurusan.nama}</option>
			                                        	)
			                                        }
			                                    </select>
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Jam</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.matkulBaru.jumlah_jam}
						                            onChange={this.addMatkulJam}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Pertemuan</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.matkulBaru.jumlah_pertemuan}
						                            onChange={this.addMatkulPertemuan}
						                            />
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addMataKuliah}>
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
	                                            	value={this.state.matkuls[this.state.selected].kode}
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
	                                            	value={this.state.matkuls[this.state.selected].nama}
					                                onChange={this.handleChangeNama}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Kategori</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.matkuls[this.state.selected].kategori}  onChange={this.handleChangeKategori}>
	                                                <option >Pilih</option>
	                                                <option value="wajib">Wajib</option>
	                                                <option value="pilihan">Pilihan</option>
	                                            </select>
	                                        </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Jam</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.matkuls[this.state.selected].jumlah_jam}
					                                onChange={this.handleChangeJam}

	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Pertemuan</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.matkuls[this.state.selected].jumlah_pertemuan}
					                                onChange={this.handleChangePertemuan}

						                            />
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editMataKuliah}>
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

export default Mata_Kuliah