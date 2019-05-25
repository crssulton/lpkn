import React, { Component } from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import CurrencyInput from 'react-currency-input';

let account = []
let account_tujuan = []
let kelompok_account = []

class Transaksi extends Component {

	constructor(props){
        super(props);

        const {pengajuan}  = this.props.location.state

        this.state = {
            transaksi: [],
            account: [],
            pengajuan,
            kelompok_account: [],
            loading: true,
            form: false,
            selected: null,
            jurusans: [],
            transaksiBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            edittransaksi : {}
        }
    }

    handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

    componentDidMount(){
    	const self = this
		
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
				account: data
			})
		});

		fetch(BASE_URL + '/api/kelompok-account/', {
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
				kelompok_account: data.results
			})
		});

    }

    handleChangeKode = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeUraian = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].uraian = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNominal = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].nominal = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTanggal = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].tanggal = e.target.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeAccount = (selectedOption) => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].account = selectedOption.value
        this.setState({
        	transaksi,
        	edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    edittransaksi = () => {
    	const self = this
    	let edittransaksi = this.state.edittransaksi
    	delete edittransaksi.id
    	self.setState({edittransaksi})

    	fetch(BASE_URL + '/api/transaksi/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.edittransaksi),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("transaksi berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah transaksi", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addtransaksiUraian = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.uraian = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiTanggal = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.tanggal = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiNominal = (e, maskedvalue, floatvalue) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.nominal = floatvalue
        this.setState({transaksiBaru})	
    }
    addtransaksiAkun = (selectedOption) => {
    	if (selectedOption) {
    		let transaksiBaru = {}
	        transaksiBaru = this.state.transaksiBaru
	        transaksiBaru.account_tujuan = selectedOption.value
	        this.setState({transaksiBaru})	
    	}
    }
    addtransaksiKelompokAkun = (selectedOption) => {
    	if (selectedOption) {
    		let transaksiBaru = {}
	        transaksiBaru = this.state.transaksiBaru
	        transaksiBaru.kelompok_account = selectedOption.value
	        this.setState({transaksiBaru})	
    	}
    }
    addtransaksiKode = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.kode = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiAkunAkunTujuan = (selectedOption) => {
    	if (selectedOption) {
    		let transaksiBaru = {}
	        transaksiBaru = this.state.transaksiBaru
	        transaksiBaru.account_tujuan = selectedOption.value
	        this.setState({transaksiBaru})	
    	}
    }
    addtransaksiSaldoAwal = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.saldo_awal = e.target.value
        this.setState({transaksiBaru})	
    }
    addtransaksiJurusan = (e) => {
    	let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.jurusan = e.target.value
        this.setState({transaksiBaru})	
    }

    addtransaksi = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.transaksiBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	let transaksiBaru = {...this.state.transaksiBaru}
    	transaksiBaru.transaksi_anggaran = true
    	transaksiBaru.account = this.state.pengajuan.account
    	transaksiBaru.anggaran = this.state.pengajuan.id

    	console.log(JSON.stringify(transaksiBaru))
    	fetch(BASE_URL + '/api/transaksi/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transaksiBaru)
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let transaksi = []
				let transaksiBaru = {}
				transaksiBaru = self.state.transaksiBaru

	        	transaksi = self.state.transaksi
	        	transaksi.push(data)

	        	transaksiBaru.kode = null
	    		transaksiBaru.uraian = null
				transaksiBaru.tanggal = null
				transaksiBaru.nominal = null

				self.setState({
					addForm: true,
					transaksi,
					transaksiBaru : {}
					
				})
				toastr.success("Akun berhasil ditambahkan", "Sukses ! ")
			}else{
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Akun", "Gagal ! ")
			}
		});
    }

    handleDeleteTransaksi = (id, key)=> {
    	console.log(id)
    	const self = this
    	swal({
		  title: "Hapus Transaksi ?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	fetch(BASE_URL + '/api/transaksi/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				if (response.status == 204) {
					self.setState({
						transaksi: self.state.transaksi.filter(data => data.id !== id)
					})
					swal("Sukses! transaksi telah dihapus!", {
				      icon: "success",
				    });
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

    	kelompok_account = [...this.state.kelompok_account]
    	this.state.kelompok_account.map((data, key) => {
			kelompok_account[key].value = data.id
			kelompok_account[key].label = data.nama
		})

    	account = [...this.state.account]
    	const { selectedOption } = this.state;
    	this.state.account.filter(x => x.kelompok_account ==  this.state.transaksiBaru.kelompok_account).map((data, key) => {
			account[key].value = data.id
			account[key].label = data.nama
		})

		account_tujuan = [...this.state.account]
    	this.state.account.map((data, key) => {
			account_tujuan[key].value = data.id
			account_tujuan[key].label = data.nama
		})

        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Transaksi Anggaran</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Transaksi</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Transaksi Anggaran</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	
	                                    </div>
	                                </div>
	                                <div className="hr-line-dashed"></div>
                                    {
                                    	this.state.loading ?
                                		<div className="spiner-example">
					                    <div className="sk-spinner sk-spinner-double-bounce">
					                      <div className="sk-double-bounce1" />
					                      <div className="sk-double-bounce2" />
					                    </div>
					                  </div>
					                  :
			                            <div>
											<table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th style={{'width':'5%'}}>KODE</th>
					                                <th style={{'width':'15%'}}>URAIAN</th>
					                                <th style={{'width':'10%'}}>TANGGAL</th>
					                                <th style={{'width':'10%'}}>NOMINAL</th>
					                                <th style={{'width':'20%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.transaksi.filter(data => data.anggaran == this.state.pengajuan.id).map((data, key) =>
					                            		<tr key={key}>
					                            			<td>{data.kode}</td>
							                                <td>{data.uraian}</td>
							                                <td>{data.tanggal}</td>
							                                <td>Rp. {this.formatNumber(data.nominal)}</td>
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
						                                				onClick={() => this.handleDeleteTransaksi( data.id, key )}
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Transaksi</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Transaksi</h5>
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
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.kode}
						                            onChange={this.addtransaksiKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun Tujuan</label>
		                                    <div className="col-lg-9">
		                                    <Select
										        name="form-field-name"
										        value={this.state.transaksiBaru.account_tujuan}
										        onChange={this.addtransaksiAkun}
										        options={account}
										      />
		                                    </div>
	                                    </div>

	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Uraian</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.uraian}
						                            onChange={this.addtransaksiUraian}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksiBaru.tanggal}
						                            onChange={this.addtransaksiTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nominal</label>
	                                        <div className="col-lg-9">
	                                        	<CurrencyInput 
	                                        		precision="0" 
	                                        		className="form-control m-b" 
	                                        		prefix="Rp "
	                                        		value={this.state.transaksiBaru.nominal}
	                                        		onChangeEvent={this.addtransaksiNominal}
	                                        	/>
	                                        </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addtransaksi}>
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
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].kode}
					                                onChange={this.handleChangeKode}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <Select
										        name="form-field-name"
										        value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].account}
							                    onChange={this.handleChangeAccount}
										        options={account}
										      />
		                                    </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Uraian</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="text" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].uraian}
					                                onChange={this.handleChangeUraian}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].tanggal}
					                                onChange={this.handleChangeTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Nominal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="transaksi"
	                                            	value={this.state.transaksi.filter(data => data.id === this.state.selected)[0].nominal}
					                                onChange={this.handleChangeNominal}
						                            />
	                                        </div>
	                                    </div>

	                                    
	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.edittransaksi}>
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

export default Transaksi