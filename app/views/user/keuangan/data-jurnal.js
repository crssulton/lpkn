import React, { Component } from 'react';	
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import CurrencyInput from 'react-currency-input';

class DataJurnal extends Component {

	constructor(props){
        super(props);
        this.state = {
            jurnal: [],
            account: [],
            loading: true,
            transaksi: [],
            form: false,
            selected: null,
            jurnalBaru: {},
            add: true,
            addForm: true,
            jurusans: [],
            editjurnal : {}
        }
    }

    componentDidMount(){
    	const self = this
		
		fetch(BASE_URL + '/api/data-jurnal/', {
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
				jurnal: data.results,
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
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeJumlahDebet = e => {
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].jumlah_debet = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeJumlahKredit = e => {
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].jumlah_kredit = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTanggal = e => {
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].tanggal = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeAccount = e => {
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].account = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTipe = e => {
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].tipe = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeJenis = e => {
        let jurnal = []
        jurnal = this.state.jurnal
        jurnal.filter(data => data.id == this.state.selected)[0].jenis = e.target.value
        this.setState({
        	jurnal,
        	editjurnal: jurnal.filter(data => data.id == this.state.selected)[0]
        })
    }

    editjurnal = () => {
    	const self = this
    	let editjurnal = this.state.editjurnal
    	delete editjurnal.id
    	self.setState({editjurnal})

    	fetch(BASE_URL + '/api/data-jurnal/'+ this.state.selected+'/', {
			method: 'put',
			body: JSON.stringify(this.state.editjurnal),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			}
		}).then(function(response) {
			if (response.status == 200) {
				toastr.success("jurnal berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			}else{
				toastr.warning("Gagal mengubah jurnal", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    addjurnalTipe = (e) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.transaksi_type = e.target.value
        this.setState({jurnalBaru})	
    }
    addjurnalTanggal = (e) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.tanggal = e.target.value
        this.setState({jurnalBaru})	
    }
    addjurnalJumlahDebet = (e, maskedvalue, floatvalue) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.jumlah_debet = floatvalue
        this.setState({jurnalBaru})	
    }
    addjurnalJumlahKredit = (e, maskedvalue, floatvalue) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.jumlah_kredit = floatvalue
        this.setState({jurnalBaru})	
    }
    addjurnalJenis = (e) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.jenis = e.target.value
        this.setState({jurnalBaru})	
    }
    addjurnalAkun = (e) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.account = e.target.value
        this.setState({jurnalBaru})	
    }
    addjurnalKode = (e) => {
    	let jurnalBaru = {}
        jurnalBaru = this.state.jurnalBaru
        jurnalBaru.kode = e.target.value
        this.setState({jurnalBaru})	
    }

    addjurnal = ()=> {
    	const self = this
    	let addButton = document.getElementsByClassName("btn-add")
    	console.log(JSON.stringify(this.state.jurnalBaru))
    	addButton[0].setAttribute("disabled", "disabled")

    	fetch(BASE_URL + '/api/data-jurnal/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.jurnalBaru)
		}).then(function(response) {
			if (response.status == 400 || response.status) {}
			return response.json();
		}).then(function(data) {
			if(data.id != null || data.id != undefined){
				addButton[0].removeAttribute("disabled")
				let jurnal = []
				let jurnalBaru = {}
				jurnalBaru = self.state.jurnalBaru

	        	jurnal = self.state.jurnal
	        	jurnal.push(data)

	    		jurnalBaru.jumlah_kredit = null
	    		jurnalBaru.jumlah_debet = null
				jurnalBaru.tanggal = null

				self.setState({
					addForm: true,
					jurnal,
					jurnalBaru
					
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

    handleDeletejurnal = (id, key)=> {
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
		  	fetch(BASE_URL + '/api/data-jurnal/' + id, {
				method: 'delete',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {

				self.setState({
					jurnal: self.state.jurnal.filter(data => data.id !== id)
				})
				swal("Sukses! jurnal telah dihapus!", {
			      icon: "success",
			    });
			}).then(function(data) {
				self.setState({
					jurnal: self.state.jurnal.filter(data => data.id !== id)
				})
				swal("Sukses! jurnal telah dihapus!", {
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
		                <h2>Daftar Data Jurnal</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Data Jurnal</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Jurnal</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
	                                    <div className="col-lg-6">
	                                    	<label className="col-sm-4 col-form-label">Filter : </label>
	                                    	<div className="col-sm-8">
			                                    <DayPickerInput 
			                                    	className="form-control m-b" 
			                                    	onDayChange={day => console.log(day)} 
			                                    />
		                                    </div>
	                                    </div>
	                                </div>
	                                <div className="hr-line-dashed"></div>
                                    {

			                            <div>
											<table className="table table-striped" align="right">
					                            <thead>
					                            <tr>
					                            	<th style={{'width':'5%'}}>KODE</th>
					                            	<th style={{'width':'5%'}}>JENIS</th>
					                                <th style={{'width':'10%'}}>TANGGAL</th>
					                                <th style={{'width':'10%'}}>DEBET</th>
					                                <th style={{'width':'10%'}}>KREDIT</th>
					                                <th style={{'width':'5%'}}>TIPE</th>
					                                <th style={{'width':'10%'}}>AKUN</th>
					                                <th style={{'width':'15%', 'textAlign':'center'}}>AKSI</th>
					                            </tr>
					                            </thead>
					                            <tbody>
					                            {
					                            	this.state.jurnal.map((data, key) =>
					                            		<tr key={key}>
					                            			<td>{data.kode}</td>
							                                <td>{data.jenis}</td>
							                                <td>{data.tanggal}</td>
							                                <td>{data.jumlah_debet}</td>
							                                <td>{data.jumlah_kredit}</td>
							                                <td>{data.transaksi_type}</td>
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
						                                				onClick={() => this.handleDeletejurnal( data.id, key )}
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
	                                    <h5> <i className="fa fa-plus"></i> Tambah Data Jurnal</h5>
	                                </div>
	                                :
	                                <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
	                                    <h5> <i className="fa fa-pencil"></i> Ubah Data Jurnal</h5>
	                                </div>
                                }
                                
                                {
                                	this.state.addForm?
                                	<div className="ibox-content">
                                		<div className="form-group row"><label className="col-lg-3 col-form-label">Kode Transaksi</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnalBaru.kode}
							                    onChange={this.addjurnalKode}
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

	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Debet</label>
	                                        <div className="col-lg-9">
	                                        	<CurrencyInput 
	                                        		precision="0" 
	                                        		className="form-control m-b" 
	                                        		prefix="Rp "
	                                        		value={this.state.jurnalBaru.jumlah_debet} 
	                                        		onChangeEvent={this.addjurnalJumlahDebet}
	                                        		/>
	                                            
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Kredit</label>
	                                        <div className="col-lg-9">
	                                        	<CurrencyInput 
	                                        		precision="0" 
	                                        		className="form-control m-b" 
	                                        		prefix="Rp "
	                                        		value={this.state.jurnalBaru.jumlah_kredit}
	                                        		onChangeEvent={this.addjurnalJumlahKredit}
	                                        		/>
	                                            
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="jurnal"
	                                            	value={this.state.jurnalBaru.tanggal}
						                            onChange={this.addjurnalTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tipe</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnalBaru.transaksi_type}
							                    onChange={this.addjurnalTipe}
		                                    >
		                                    	<option>Tipe Transaksi</option>
		                                    	<option value="D">Debet</option>
		                                    	<option value="K">Kredit</option>
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jenis</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnalBaru.jenis}
							                    onChange={this.addjurnalJenis}
		                                    >
		                                    	<option>Jenis Jurnal</option>
		                                    	<option value="AJP">Ayat Jurnal Penyesuaian</option>
		                                    	<option value="JU">Jurnal Umum</option>
		                                    </select>
		                                    </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnalBaru.account}
							                    onChange={this.addjurnalAkun}
		                                    >
		                                    	<option>Jenis Akun</option>
		                                    	{
		                                    		this.state.account.map(data =>{
		                                    			return(
		                                    				<option value={data.id}>{data.nama}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <button
	                                		className="btn btn-primary btn-sm btn-add" 
	                                		type="button"
	                                		onClick={this.addjurnal}>
	                                		Tambah
	                                	</button>
	                                </div>
	                                :
	                                <div className="ibox-content">
	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Kode Transaksi</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].kode}
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

	                                	<div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Debet</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="jurnal"
	                                            	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].jumlah_debet}
						                            onChange={this.handleChangeJumlahDebet}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah Kredit</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="number" 
	                                            	className="form-control m-b" 
	                                            	name="jurnal"
	                                            	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].jumlah_kredit}
						                            onChange={this.handleChangeJumlahKredit}
	                                            	/>
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tanggal</label>
	                                        <div className="col-lg-9">
	                                            <input 
	                                            	type="date" 
	                                            	className="form-control m-b" 
	                                            	name="jurnal"
	                                            	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].tanggal}
						                            onChange={this.handleChangeTanggal}
						                            />
	                                        </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Tipe</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].transaksi_type}
							                    onChange={this.addjurnalTipe}
		                                    >
		                                    	<option>Tipe Transaksi</option>
		                                    	<option value="D">Debet</option>
		                                    	<option value="K">Kredit</option>
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Jenis</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].jenis}
							                    onChange={this.handleChangeJenis}
		                                    >
		                                    	<option>Jenis Jurnal</option>
		                                    	<option value="AJP">Ayat Jurnal Penyesuaian</option>
		                                    	<option value="JU">Jurnal Umum</option>
		                                    </select>
		                                    </div>
	                                    </div>
	                                    
	                                    <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
		                                    <div className="col-lg-9">
		                                    <select
		                                    	className="form-control m-b" 
		                                    	value={this.state.jurnal.filter(data => data.id === this.state.selected)[0].account}
							                    onChange={this.handleChangeAccount}
		                                    >
		                                    	<option>Jenis Akun</option>
		                                    	{
		                                    		this.state.account.map(data =>{
		                                    			return(
		                                    				<option value={data.id}>{data.nama}</option>
		                                    			)
		                                    		})
		                                    	}
		                                    </select>
		                                    </div>
	                                    </div>

	                                    <button
	                                    	style={{'marginRight': '10px'}}
	                                		className="btn btn-info btn-add" 
	                                		type="button"
	                                		onClick={this.editjurnal}>
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