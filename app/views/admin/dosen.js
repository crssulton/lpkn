import React, { Component } from 'react';	
import cookie from 'react-cookies';	
import swal from 'sweetalert';

class Administrator extends Component {

	constructor(props){
        super(props);
        this.state = {
            dosens: [],
            loading: true,
            selectedJurusan: 'all',
            form: false,
            selected: null,
            dosenBaru: {},
            add: true,
            matkuls: [],
            addForm: true
        }
    }

    componentDidMount(){
    	const self = this

		fetch('http://lpkn.itec.my.id:9000/api/dosen/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				dosens: data.results,
				loading: !self.state.loading
			})
		});

        fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                matkuls: data.results
            })
        });

    }

    handleChangeNama = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].nama = e.target.value
        this.setState({dosens})
    }
    handleChangeAlamat = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].alamat = e.target.value
        this.setState({dosens})
    }
    handleChangeTmptLahir = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].tempat_lahir = e.target.value
        this.setState({dosens})
    }
    handleChangeTglLahir = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].tgl_lahir = e.target.value
        this.setState({dosens})
    }
    handleChangeJK = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].jenis_kelamin = e.target.value
        this.setState({dosens})
    }
    handleChangeAgama = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].agama = e.target.value
        this.setState({dosens})
    }
    handleChangeNoHp = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].no_hp = e.target.value
        this.setState({dosens})
    }
    handleChangePendidikan = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].pendidikan_terakhir = e.target.value
        this.setState({dosens})
    }
    handleChangeStatus = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].status_menikah = e.target.value
        this.setState({dosens})
    }
    handleChangeKampus = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].kampus = e.target.value
        this.setState({dosens})
    }
    handleChangeMatkul = e => {
        let dosens = []
        dosens = this.state.dosens
        dosens[this.state.selected].mata_kuliah = e.target.value
        this.setState({dosens})
    }



    editDosen = () => {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")
    	console.log(JSON.stringify(this.state.dosens[this.state.selected]))
    	fetch('http://lpkn.itec.my.id:9000/api/dosen/', {
			method: 'put',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.dosens[this.state.selected])
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			addButton[0].removeAttribute("disabled")
			let dosens = []
        	dosens = self.state.dosens
        	dosens.push(data)
			self.setState({
				addForm: true,
				dosens,
				dosenBaru: {}
			})
			toastr.success("Data dosen berhasil diubah", "Sukses ! ")
		});
    }

    adddosenAlamat = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.alamat = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenNama = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.nama = e.target.value
        this.setState({dosenBaru})	
    }
    addDosenAgama = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.agama = e.target.value
        this.setState({dosenBaru})	
    }
    addDosenKampus = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.kampus = e.target.value
        this.setState({dosenBaru})	
    }
    addDosenMatkul = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.mata_kuliah = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenJK = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.jenis_kelamin = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenPendidikan = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.pendidikan_terakhir = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenStatus = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.status_menikah = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenTempatLahir = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.tempat_lahir = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenTglLahir = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.tgl_lahir = e.target.value
        this.setState({dosenBaru})	
    }
    adddosenNoHp = (e) => {
    	let dosenBaru = {}
        dosenBaru = this.state.dosenBaru
        dosenBaru.no_hp = e.target.value
        this.setState({dosenBaru})	
    }

    addDosen = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	addButton[0].setAttribute("disabled", "disabled")
        

    	fetch('http://lpkn.itec.my.id:9000/api/dosen/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + cookie.load('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(this.state.dosenBaru)
		}).then(function(response) {
			toastr.warning("Gagal menambahkan dosen", "Error ! ")
            addButton[0].removeAttribute("disabled")
		}).then(function(data) {
			addButton[0].removeAttribute("disabled")
            let dosens = []
            dosens = self.state.dosens
            dosens.push(data)
            self.setState({
                addForm: true,
                dosens,
                dosenBaru: {}
            })
            toastr.success("Dosen berhasil ditambahkan", "Sukses ! ")
		})
    }

    handleDeletedosen = (id, key)=> {
    	const self = this
    	swal({
		  title: "Hapus Dosen ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch('http://lpkn.itec.my.id:9000/api/dosen/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + cookie.load('token')
				}
			}).then(function(response) {
				let dosens = []
	        	dosens = self.state.dosens
	        	delete dosens[key]
				self.setState({
					dosens
				})
				swal("Sukses! Dosen telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				let dosens = []
	        	dosens = self.state.dosens
	        	delete dosens[key]
				self.setState({
					dosens
				})
				swal("Sukses! Dosen telah dihapus!", {
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
		                <h2>Daftar Dosen</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Dosen</h5>
                                </div>
                                <div className="ibox-content">
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
					                                <th style={{'width':'20%'}}>NAMA</th>
					                                <th style={{'width':'5%'}}>JENIS KELAMIN</th>
					                                <th style={{'width':'10%'}}>PENDIDIKAN</th>
					                                <th style={{'width':'10%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.dosens.map((dosen, key) =>
					                            		<tr>
							                                <td>{key+1}</td>
							                                <td>{dosen.nama}</td>
							                                <td>{dosen.jenis_kelamin}</td>
							                                <td>{dosen.pendidikan_terakhir}</td>
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
						                                				onClick={() => this.handleDeletedosen( dosen.id, key )}
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
                                    <h5> <i className="fa fa-plus"></i> Data Dosen</h5>
                                </div>
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.nama}
						                            onChange={this.adddosenNama}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Alamat</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.alamat}
						                            onChange={this.adddosenAlamat}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tmpt Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.tempat_lahir}
						                            onChange={this.adddosenTempatLahir}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tgl Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.tgl_lahir}
						                            onChange={this.adddosenTglLahir}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Kategori</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.dosenBaru.jenis_kelamin} onChange={this.adddosenJK}>
	                                                <option >Pilih</option>
	                                                <option value="L">Laki - Laki</option>
	                                                <option value="P">Perempuan</option>
	                                            </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Agama</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosenBaru.agama}
                                                    onChange={this.addDosenAgama}
                                                    id="agama" 
                                                    name="agama" 
                                                    className="form-control required">
                                                    <option value="">Pilih Agama</option>
                                                    <option value="islam">Islam</option>
                                                    <option value="hindu">Hindu</option>
                                                    <option value="budha">Budha</option>
                                                    <option value="protestan">Protestan</option>
                                                    <option value="katolik">Katolik</option>
                                                    <option value="konghucu">Konghucu</option>
                                                </select>
                                            </div>
                                        </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">No HP</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.no_hp}
						                            onChange={this.adddosenNoHp}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pendidikan Terakhir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosenBaru.pendidikan_terakhir}
						                            onChange={this.adddosenPendidikan}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Status Menikah</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.dosenBaru.status_menikah} onChange={this.adddosenStatus}>
	                                                <option >Pilih</option>
	                                                <option value="Sudah">Sudah Menikah</option>
	                                                <option value="Belum">Belum Menikah</option>
	                                            </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Kampus</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosenBaru.kampus}
                                                    onChange={this.addDosenKampus}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control required">
                                                    <option value="">Pilih Kampus</option>
                                                    <option value="1">Kampus 1</option>
                                                    <option value="2">Kampus 2</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Mata Kuliah</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosenBaru.matkul}
                                                    onChange={this.addDosenMatkul}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control required">
                                                    <option value="">Pilih Mata Kuliah</option>
                                                    {
                                                        this.state.matkuls.map((matkul, key) => 
                                                            <option value={matkul.id}>{matkul.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addDosen}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].nama}
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
	                                            	value={this.state.dosens[this.state.selected].alamat}
						                            onChange={this.handleChangeAlamat}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tmpt Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].tempat_lahir}
						                            onChange={this.handleChangeTmptLahir}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tgl Lahir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].tgl_lahir}
						                            onChange={this.handleChangeTglLahir}
						                            />
	                                        </div>
	                                    </div>

	                               		<div className="form-group row"><label className="col-lg-3 col-form-label">Jenis Kelamin</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.dosens[this.state.selected].jenis_kelamin} onChange={this.handleChangeJK}>
	                                                <option >Pilih</option>
	                                                <option value="L">Laki - Laki</option>
	                                                <option value="P">Perempuan</option>
	                                            </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Agama</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosens[this.state.selected].agama}
                                                    onChange={this.handleChangeAgama}
                                                    id="agama" 
                                                    name="agama" 
                                                    className="form-control required">
                                                    <option value="">Pilih Agama</option>
                                                    <option value="islam">Islam</option>
                                                    <option value="hindu">Hindu</option>
                                                    <option value="budha">Budha</option>
                                                    <option value="protestan">Protestan</option>
                                                    <option value="katolik">Katolik</option>
                                                    <option value="konghucu">Konghucu</option>
                                                </select>
                                            </div>
                                        </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">No HP</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].no_hp}
						                            onChange={this.handleChangeNoHp}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Pendidikan Terakhir</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="account"
	                                            	value={this.state.dosens[this.state.selected].pendidikan_terakhir}
						                            onChange={this.handleChangePendidikan}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Status Menikah</label>
	                                        <div className="col-lg-9">
	                                            <select className="form-control m-b" name="account" value={this.state.dosens[this.state.selected].status_menikah} onChange={this.handleChangeStatus}>
	                                                <option >Pilih</option>
	                                                <option value="Sudah">Sudah Menikah</option>
	                                                <option value="Belum">Belum Menikah</option>
	                                            </select>
	                                        </div>
	                                    </div>

	                                    <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Kampus</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosens[this.state.selected].kampus}
                                                    onChange={this.handleChangeKampus}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control required">
                                                    <option value="">Pilih Kampus</option>
                                                    <option value="1">Kampus 1</option>
                                                    <option value="2">Kampus 2</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group  row">
                                            <label className="col-sm-3 col-form-label">Mata Kuliah</label>
                                            <div className="col-sm-9">
                                                <select 
                                                    value={this.state.dosens[this.state.selected].mata_kuliah}
                                                    onChange={this.handleChangeMatkul}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control required">
                                                    <option value="">Pilih Mata Kuliah</option>
                                                    <option value="4">Mata Kuliah 1</option>
                                                    <option value="2">Mata Kuliah 2</option>
                                                </select>
                                            </div>
                                        </div>

	                                    <button
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editDosen}>
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