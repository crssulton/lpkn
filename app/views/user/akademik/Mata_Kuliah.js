import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'

class Mata_Kuliah extends Component {

	constructor(props){
        super(props);
        this.state = {
            matkuls: [],
            loading: true,
            selectedJurusan: 1,
            form: false,
            selected: null,
            matkulBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editMatkul : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/mata-kuliah/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				matkuls: data.results,
				loading: !self.state.loading
			})
		});

		fetch(BASE_URL + '/api/jurusan/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
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
        matkuls.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	matkuls,
        	editMatkul: matkuls.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNama = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls.filter(data => data.id == this.state.selected)[0].nama = e.target.value
        this.setState({
        	matkuls,
        	editMatkul: matkuls.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeKategori = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls.filter(data => data.id == this.state.selected)[0].kategori = e.target.value
        this.setState({
        	matkuls,
        	editMatkul: matkuls.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeJam = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls.filter(data => data.id == this.state.selected)[0].jumlah_jam = e.target.value
        this.setState({
        	matkuls,
        	editMatkul: matkuls.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangePertemuan = e => {
        let matkuls = []
        matkuls = this.state.matkuls
        matkuls.filter(data => data.id == this.state.selected)[0].jumlah_pertemuan = e.target.value
        this.setState({
        	matkuls,
        	editMatkul: matkuls.filter(data => data.id == this.state.selected)[0]
        })
    }



    editMataKuliah = () => {
    	const self = this
    	fetch(BASE_URL + '/api/mata-kuliah/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editMatkul),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
			toastr.warning("Gagal mengubah mata kuliah", "Gagal ! ")
		}).then(function(data) {
			if (data.id == self.state.editMatkul.id) {
				toastr.success("Mata kuliah berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}
			else{
				toastr.warning("Gagal mengubah mata kuliah", "Gagal ! ")
			}
			
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
    addMatkulJurusan = (e) => {
    	let matkulBaru = {}
        matkulBaru = this.state.matkulBaru
        matkulBaru.jurusan = e.target.value
        this.setState({matkulBaru})	
    }

    addMataKuliah = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/mata-kuliah/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.matkulBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let matkuls = []
				let matkulBaru = {}
				matkulBaru = self.state.matkulBaru

	        	matkuls = self.state.matkuls
	        	matkuls.push(data)

	    		matkulBaru.kode = null
				matkulBaru.nama = null
				matkulBaru.jumlah_jam = null
				matkulBaru.jumlah_pertemuan = null

				self.setState({
					addForm: true,
					matkuls,
					matkulBaru
					
				})
				toastr.success("Mata kuliah berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan mata kuliah", "Gagal ! ")
			}
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
		  	fetch(BASE_URL + '/api/mata-kuliah/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					matkuls: self.state.matkuls.filter(data => data.id !== id)
				})
				swal("Sukses! Mata Kuliah telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					matkuls: self.state.matkuls.filter(data => data.id !== id)
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
			                                    	value={this.state.selectedJurusan}
			                                    	onChange={(e) => this.setState({selectedJurusan: e.target.value}) }
			                                        className="form-control">
			                                        {
			                                        	this.state.jurusans.map((jurusan, i) => 
			                                        		<option key={i} value={jurusan.id}>{jurusan.nama}</option>
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
					                            	this.state.matkuls.filter(matkul => matkul.jurusan == this.state.selectedJurusan).map((matkul, key) =>
					                            		<tr key={key}>
							                                <td>{matkul.kode}</td>
							                                <td>{matkul.nama}</td>
							                                <td>{matkul.kategori}</td>
															<td>
															{ 
																(this.state.jurusans.length === 0)? null: this.state.jurusans.find((jurusan) => (jurusan.id == matkul.jurusan)).nama 
															}</td>
							                                <td>{matkul.jumlah_jam}</td>
							                                <td>{matkul.jumlah_pertemuan}</td>
							                                <td>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: matkul.id, addForm: false})} }
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
                                {
                                	this.state.addForm ?
                                	<div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
	                                    <h5> <i className="fa fa-plus"></i> Tambah Mata Kuliah</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Mata Kuliah</h5>
	                                </div>
                                }
                                
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
	                                            	value={this.state.matkulBaru.jurusan}
	                                            	onChange={this.addMatkulJurusan}
			                                        className="form-control">
			                                        <option value="">Pilih Jurusan</option>
			                                        {
			                                        	this.state.jurusans.map((jurusan, i) => 
			                                        		<option key={i} value={jurusan.id}>{jurusan.nama}</option>
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
	                                            	value={this.state.matkuls.filter(data => data.id === this.state.selected)[0].kode}
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
	                                            	value={this.state.matkuls.filter(data => data.id === this.state.selected)[0].nama}
					                                onChange={this.handleChangeNama}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Kategori</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.matkuls.filter(data => data.id === this.state.selected)[0].kategori}  onChange={this.handleChangeKategori}>
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
	                                            	value={this.state.matkuls.filter(data => data.id === this.state.selected)[0].jumlah_jam}
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
	                                            	value={this.state.matkuls.filter(data => data.id === this.state.selected)[0].jumlah_pertemuan}
					                                onChange={this.handleChangePertemuan}

						                            />
	                                        </div>
	                                    </div>

	                                    <button
	                                    	style={{'marginRight': '10px'}}
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