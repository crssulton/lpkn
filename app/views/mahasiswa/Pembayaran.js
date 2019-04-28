import React, { Component } from 'react';

class Pembayaran extends Component {


    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Pembayaran Mahasiswa</h2>
		            </div>
		            <div className="col-lg-4">
		                
		            </div>
		        </div>
		        <div className="row">
		            <div className="col-lg-12">
		                <div className="tabs-container">

		                        <ul className="nav nav-tabs" role="tablist">
		                            <li className="active"><a className="nav-link active" data-toggle="tab" href="#tab-1"> Konfirmasi Pembayaran</a></li>
		                            <li><a className="nav-link" data-toggle="tab" href="#tab-2">Riwayat Pembayaran</a></li>
		                        </ul>
		                        <div className="tab-content">
		                        	<div role="tabpanel" id="tab-1" className="tab-pane active">

		                                <div className="panel-body">

		                                	<div className="alert alert-warning">
				                                Silahkan lakukan pembayaran tagihan bulan Maret 2019 pada NO INVOICE : <a className="alert-link">440051</a>.
				                            </div>

		                                	<div className="ibox-content">
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">NO INVOICE</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="text" 
				                                    		disabled="" 
				                                    		name="nama_ayah"
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">TANGGAL TRANSFER</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="date" 
				                                    		disabled="" 
				                                    		name="pekerjaan_ayah"
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">NO REKENING PENYETOR</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="number" 
				                                    		disabled="" 
				                                    		name="nama_ibu"
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">BUKTI TRANSFER</label>
				                                    <div className="col-lg-4">
				                                    	<input 
				                                    		type="file" 
				                                    		disabled="" 
				                                    		name="pekerjaan_ibu"
				                                    		className="form-control"/>
				                                    </div>
				                                </div>
				                                
				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row"><label className="col-lg-2 col-form-label">REKENING</label>
				                                    <div className="col-lg-4">
			                                            <div className="form-check">
														  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
														  <label className="form-check-label" for="exampleRadios1" style={{'margin':'0 20px'}}>
														    BCA - 72301281912
														  </label>
														</div>
														<div className="form-check">
														  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
														  <label className="form-check-label" for="exampleRadios2" style={{'margin':'0 20px'}}>
														    MANDIRI - 82361812987
														  </label>
														</div>
			                                        </div>
				                                </div>

				                                <div className="hr-line-dashed"></div>
				                                <div className="form-group row">
				                                    <div className="col-sm-4 col-sm-offset-2">
				                                        <button className="btn btn-primary btn-sm" type="submit">KIRIM</button>
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
												        <th>NO INVOICE</th>
												        <th>TANGGAL</th>
												        <th>MASA</th>
												        <th>NILAI (Rp.)</th>
												        <th>STATUS</th>
												    </tr>
												    </thead>
												    <tbody>
												    <tr>
												        <td>1</td>
												        <td>1281788</td>
												        <td>02-03-2019</td>
												        <td>03 - 2019</td>
												        <td>600.000</td>
												        <td><span className="badge badge-primary">Sukses</span></td>
												    </tr>
												    <tr>
												        <td>2</td>
												        <td>3431788</td>
												        <td>04-04-2019</td>
												        <td>03 - 2019</td>
												        <td>1.000.000</td>
												        <td><span className="badge badge-warning">Menunggu</span></td>
												    </tr>
												    
												    </tbody>
												    <thead>
												    	<tr>
											    	    	<th colSpan="4">Total</th>
													    	<th colSpan="2">1.600.000</th>
												    	</tr>
												    </thead>
												    <thead>
												    	<tr>
											    	    	<th colSpan="4">Sisa</th>
													    	<th colSpan="2">8.400.000</th>
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