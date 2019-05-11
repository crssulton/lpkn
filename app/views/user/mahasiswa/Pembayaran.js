import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js'
import CurrencyInput from 'react-currency-input';

class Pembayaran extends Component {

	constructor(props){
        super(props);
        this.state = {
            pembayaran: {},
            mahasiswa: [],
            riwayat: []
        }
    }

    componentDidMount(){
    	const self = this
		fetch(BASE_URL + '/api/mahasiswa/' +  window.sessionStorage.getItem('user_id') +'/', {
			method: 'GET',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
    			'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				mahasiswa: data
			})
		});

		fetch(BASE_URL + '/api/pembayaran-mahasiswa/', {
			method: 'GET',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
    			'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				riwayat: data.results
			})
		});

    }

    getData = () => {
    	const self = this
    	fetch(BASE_URL + '/api/pembayaran-mahasiswa/', {
			method: 'GET',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
    			'Accept': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				riwayat: data.results
			})
		});
    }

    addPembayaran = () => {
    	const self = this

    	let formData = new FormData()
		let pembayaran = {...this.state.pembayaran}

		formData.append('judul', pembayaran.judul)
		formData.append('tanggal_pembayaran', pembayaran.tanggal_pembayaran)
		formData.append('nominal', pembayaran.nominal)
		formData.append('bukti', pembayaran.bukti)

    	fetch(BASE_URL + '/api/pembayaran-mahasiswa/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			},
			body: formData
		}).then(function(response) {
			if (response.status == 201) {
				toastr.success("Pembayaran telah dikirim", "Sukses ! ")
				self.setState({pembayaran : {} })
			}else{
				toastr.warning("Pembayaran gagal dikirim", "Gagal ! ")
			}
			return response.json();
		}).then(function(data) {
			
		});
    }

    formatNumber = (num) => {
	  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
    
    render() {
    	let total = 0
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Pembayaran Mahasiswa</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pembayaran</strong>
                            </li>
                        </ol>
		            </div>
		            <div className="col-lg-4">
		                
		            </div>
		        </div>
                <br/>
		        <div className="row">
		            <div className="col-lg-12">
		                <div className="tabs-container">

		                        <ul className="nav nav-tabs" role="tablist">
		                            <li className="active"><a className="nav-link active" data-toggle="tab" href="#tab-1"> Konfirmasi Pembayaran</a></li>
		                            <li onClick={this.getData}><a className="nav-link" data-toggle="tab" href="#tab-2">Riwayat Pembayaran</a></li>
		                        </ul>
		                        <div className="tab-content">
		                        	<div role="tabpanel" id="tab-1" className="tab-pane active">

		                                <div className="panel-body">
		                                	<div className="ibox-content">
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">NO AKUN</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="text" 
				                                    		disabled="" 
				                                    		name="nama_ayah"
				                                    		value={this.state.pembayaran.judul}
				                                    		onChange={(e) => {
				                                    			let pembayaran = {...this.state.pembayaran}
				                                    			pembayaran.judul = e.target.value
				                                    			this.setState({pembayaran})
				                                    		}}
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">TANGGAL TRANSFER</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="date" 
				                                    		disabled="" 
				                                    		value={this.state.pembayaran.tanggal_pembayaran}
				                                    		onChange={(e) => {
				                                    			let pembayaran = {...this.state.pembayaran}
				                                    			pembayaran.tanggal_pembayaran = e.target.value
				                                    			this.setState({pembayaran})
				                                    		}}
				                                    		name="pekerjaan_ayah"
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">NOMINAL</label>
				                                    <div className="col-lg-4">
				                                    	<CurrencyInput 
                                                            precision="0" 
                                                            className="form-control m-b" 
                                                            prefix="Rp "
                                                            value={this.state.pembayaran.nominal}
                                                            onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                                let pembayaran = {...this.state.pembayaran}
				                                    			pembayaran.nominal = floatvalue
				                                    			this.setState({pembayaran})
                                                            }}
                                                        />
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">BUKTI TRANSFER</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="file" 
				                                    		disabled="" 
				                                    		onChange={(e) => {
				                                    			let pembayaran = {...this.state.pembayaran}
				                                    			pembayaran.bukti = e.target.files[0]
				                                    			this.setState({pembayaran})
				                                    		}}
				                                    		name="pekerjaan_ibu"
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">REKENING</label>
				                                    <div className="col-lg-4">
			                                            <div className="form-check">
														  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
														  <label className="form-check-label" htmlFor="exampleRadios1" style={{'margin':'0 20px'}}>
														    BCA - 72301281912
														  </label>
														</div>
														<div className="form-check">
														  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
														  <label className="form-check-label" htmlFor="exampleRadios2" style={{'margin':'0 20px'}}>
														    MANDIRI - 82361812987
														  </label>
														</div>
			                                        </div>
				                                </div>

				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row">
				                                    <div className="col-sm-4 col-sm-offset-2">
				                                        <button onClick={this.addPembayaran} className="btn btn-primary btn-sm" type="submit">KIRIM</button>
				                                    </div>
				                                </div>
					                           
					                        </div>
		                                </div>
		                            </div>
		                            
		                            <div role="tabpanel" id="tab-2" className="tab-pane">
		                                <div className="panel-body">
		                                    <div className="table-responsive m-t">
				                                <table className="table table-bordered">
												    <thead>
												    <tr>
												        <th>#</th>
												        <th>NO AKUN</th>
												        <th>TANGGAL</th>
												        <th>NILAI (Rp.)</th>
												        <th>STATUS</th>
												    </tr>
												    </thead>
												    <tbody>
												    {
												    	this.state.riwayat != 0 ?
												    	this.state.riwayat.map((data, key) => {
												    		data.status == 'verified' ? total += data.nominal : null
												    		return(
												    			<tr key={key}>
															        <td>{key+1}</td>
															        <td>14001</td>
															        <td>{data.tanggal_pembayaran}</td>
															        <td>{this.formatNumber(data.nominal)}</td>
															        <td style={{'align': "center"}}>
															        {
															        	data.status == 'verified' ?
															        	<span className="badge badge-primary">Sukses</span> : null
															        }
															        {
															        	data.status == 'rejected' ?
															        	<span className="badge badge-danger">Ditolak</span> : null
															        }
															        {
															        	data.status == 'pending' ?
															        	<span className="badge badge-warning">Menunggu</span> : null
															        }
															        </td>
															    </tr>
												    		)
												    	})
												    	:
												    	<tr><td colSpan="5">BELUM ADA PEMBAYARAN</td></tr>
												    }

												    </tbody>
												    <thead>
												    	<tr>
											    	    	<th colSpan="3">Total</th>
													    	<th colSpan="2">{ this.formatNumber(total) }
													    	</th>
												    	</tr>
												    </thead>
												    <thead>
												    	<tr>
											    	    	<th colSpan="3">Sisa</th>
											    	    	<th colSpan="2">{this.formatNumber(parseFloat(this.state.mahasiswa.total_bayar))}</th>

												    	</tr>
												    </thead>
												</table>
				                            </div>
		                                </div>
		                            </div>
		                        </div>

		                    </div>
		            </div>
		        </div>
            </div>
        )
    }

}

export default Pembayaran