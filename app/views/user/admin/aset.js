import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import CurrencyInput from 'react-currency-input';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let account = []

class DataJurnal extends Component {

	constructor(props){
        super(props);
        this.state = {
            aset: [],
            account: [],
            loading: true,
            transaksi: [],
            form: false,
            selected: null,
            asetBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editaset : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/aset/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				aset: data.results,
				loading: !self.state.loading
			})
		});

		fetch(BASE_URL + '/api/transaksi/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				transaksi: data.results,
				loading: !self.state.loading
			})
		});

		fetch(BASE_URL + '/api/account/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				account: data,
				loading: !self.state.loading
			})
		});

    }

    handleChangeKode = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].transaksi = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeJumlahPenyusutan = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].jumlah_penyusutan = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeHarga = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].jumlah_kredit = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTanggal = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].tanggal = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeAccount = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].account = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTipe = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].tipe = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeJenis = e => {
        let aset = []
        aset = this.state.aset
        aset.filter(data => data.id == this.state.selected)[0].jenis = e.target.value
        this.setState({
        	aset,
        	editaset: aset.filter(data => data.id == this.state.selected)[0]
        })
    }

    editaset = () => {
    	const self = this
    	let editaset = this.state.editaset
    	delete editaset.id
    	self.setState({editaset})

    	fetch(BASE_URL + '/api/data-aset/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editaset),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("aset berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah aset", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addasetTanggal = (e) => {
    	let asetBaru = {}
        asetBaru = this.state.asetBaru
        asetBaru.tanggal = e.target.value
        this.setState({asetBaru})	
    }
    addasetHarga = (e, maskedvalue, floatvalue) => {
    	let asetBaru = {}
        asetBaru = this.state.asetBaru
        asetBaru.harga = floatvalue
        this.setState({asetBaru})	
    }
    addasetJumlahPenyusutan = (e, maskedvalue, floatvalue) => {
    	let asetBaru = {}
        asetBaru = this.state.asetBaru
        asetBaru.jumlah_penyusutan = floatvalue
        this.setState({asetBaru})	
    }
    addasetNama = (e) => {
    	let asetBaru = {}
        asetBaru = this.state.asetBaru
        asetBaru.nama = e.target.value
        this.setState({asetBaru})	
    }
    addasetAccount = (selectedOption) => {
    	let asetBaru = {}
        asetBaru = this.state.asetBaru
        asetBaru.account = selectedOption.value
        this.setState({asetBaru})	
    }
    addasetTransaksi = (e) => {
    	let asetBaru = {}
        asetBaru = this.state.asetBaru
        asetBaru.transaksi = e.target.value
        this.setState({asetBaru})	
    }

    addaset = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.asetBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/aset/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.asetBaru)
		}).then(function(response) {
			if (response.status == 400 || response.status) {}
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let aset = []
				let asetBaru = {}
				asetBaru = self.state.asetBaru

	        	aset = self.state.aset
	        	aset.push(data)

	    		asetBaru.jumlah_kredit = null
	    		asetBaru.jumlah_debet = null
				asetBaru.tanggal = null

				self.setState({
					addForm: true,
					aset,
					asetBaru
					
				})
				toastr.success("Aset berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Aset", "Gagal ! ")
			}
		});
    }

    handleDeleteaset = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Data Jurnal ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/aset/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					aset: self.state.aset.filter(data => data.id !== id)
				})
				swal("Sukses! aset telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					aset: self.state.aset.filter(data => data.id !== id)
				})
				swal("Sukses! aset telah dihapus!", {
			      icon: "success",
			    });
			});
		  }
		});
    }

    formatNumber = (num) => {
	  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

    render() {
    	account = [...this.state.account]
    	const { selectedOption } = this.state;
    	this.state.account.map((data, key) => {
			account[key].value = data.id
			account[key].label = data.nama
		})

        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Aset</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Aset</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Aset</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	
	                                    </div>
	                                </div>
	                                <div className="hr-line-dashed"></div>
                                    {

			                            <div>
											<table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th style={{'width':'5%'}}>NO.</th>
					                            	<th style={{'width':'5%'}}>NAMA</th>
					                                <th style={{'width':'5%'}}>TANGGAL</th>
					                                <th style={{'width':'10%'}}>HARGA</th>
					                                <th style={{'width':'10%'}}>PENYUSUTAN</th>
					                                <th style={{'width':'10%'}}>TRANSAKSI</th>
					                                <th style={{'width':'10%'}}>AKUN</th>
					                                <th style={{'width':'15%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.aset.map((data, key) =>
					                            		<tr key={key}>
					                            			<td>{key+1}}</td>
							                                <td>{data.nama}</td>
							                                <td>{data.tanggal}</td>
							                                <td>{data.harga}</td>
							                                <td>{data.jumlah_penyusutan}</td>
							                                <td>{data.transaksi}</td>
							                                <td>{this.state.account.find((account) => (account.id == data.account)).nama}</td>
							                                <td>
						                                		<center>
						                                			<button 
						                                				style={{'margin' : '0 5px'}} 
						                                				className="btn btn-info btn-sm" 
						                                				type="button"
						                                				onClick={ () => {this.setState({ selected: data.id, addForm: false})} }
						                                				>
						                                				<i className="fa fa-edit"></i></button>

						                                			<button 
						                                				onClick={() => this.handleDeleteaset( data.id, key )}
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Aset</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Aset</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
                                		<div className="form-group row"><label className="col-lg-3 col-form-label">Transaksi</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.asetBaru.transaksi}
							                    onChange={this.addasetTransaksi}
		                                    >
		                                    	<option>Pilih Transaksi</option>
		                                    	{
		                                    		this.state.transaksi.map(data =>{
		                                    			return(
		                                    				<option value={data.id}>{data.kode} - {data.uraian}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="aset"
	                                            	value={this.state.asetBaru.nama}
						                            onChange={this.addasetNama}
						                            />
	                                        </div>
	                                    </div>

	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Harga</label>
	                                        <div className="col-lg-9">
	                                        	<CurrencyInput 
	                                        		precision="0" 
	                                        		className="form-control m-b" 
	                                        		prefix="Rp "
	                                        		value={this.state.asetBaru.harga} 
	                                        		onChangeEvent={this.addasetHarga}
	                                        		/>
	                                            
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Penyusutan</label>
	                                        <div className="col-lg-9">
	                                        	<CurrencyInput 
	                                        		precision="0" 
	                                        		className="form-control m-b" 
	                                        		prefix="Rp "
	                                        		value={this.state.asetBaru.jumlah_penyusutan}
	                                        		onChangeEvent={this.addasetJumlahPenyusutan}
	                                        		/>
	                                            
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="aset"
	                                            	value={this.state.asetBaru.tanggal}
						                            onChange={this.addasetTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <Select
										        name="form-field-name"
										        value={this.state.asetBaru.account}
										        onChange={this.addasetAccount}
										        options={account}
										      />
		                                    </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addaset}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Kode Transaksi</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.aset.filter(data => data.id === this.state.selected)[0].kode}
							                    onChange={this.handleChangeKode}
		                                    >
		                                    	<option>Kode Transaksi</option>
		                                    	{
		                                    		this.state.transaksi.map(data =>{
		                                    			return(
		                                    				<option value={data.id}>{data.kode} - {data.uraian}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Nama</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="aset"
	                                            	value={this.state.aset.filter(data => data.id === this.state.selected)[0].nama}
						                            onChange={this.handleChangeNama}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Harga</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="aset"
	                                            	value={this.state.aset.filter(data => data.id === this.state.selected)[0].harga}
						                            onChange={this.handleChangeHarga}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Penyusutan</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="aset"
	                                            	value={this.state.aset.filter(data => data.id === this.state.selected)[0].jumlah_penyusutan}
						                            onChange={this.handleChangeJumlahPenyusutan}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="aset"
	                                            	value={this.state.aset.filter(data => data.id === this.state.selected)[0].tanggal}
						                            onChange={this.handleChangeTanggal}
						                            />
	                                        </div>
	                                    </div>
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <Select
										        name="form-field-name"
										        value={this.state.aset.filter(data => data.id === this.state.selected)[0].account}
										        onChange={this.handleChangeAccount}
										        options={account}
										      />
		                                    </div>
	                                    </div>

	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editaset}>
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

export default DataJurnal