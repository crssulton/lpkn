import React, { Component } from 'react';
import cookie from 'react-cookies';

class Nilai extends Component {

	constructor(props){
        super(props);
        this.state = {
            matkuls: []
        }
    }

    componentDidMount(){
    	const self = this
		fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJha2FkZW1pazEiLCJleHAiOjE1NTQwNzg0MjAsImVtYWlsIjoiIn0.lSNi_8XtzTP_jeldmMUic27TuHlYMCCNN47tyZgOLy0'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data)
			self.setState({
				matkuls: data.results
			})
		});
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Transkrip Nilai</h2>
		            </div>
		            <div className="col-lg-4">
		                <div className="title-action">
		                    <a href="invoice_print.html" target="_blank" className="btn btn-primary"><i className="fa fa-print"></i> Cetak </a>
		                </div>
		            </div>
		        </div>
		        <div className="row">
		            <div className="col-lg-12">
		                <div className="wrapper wrapper-content animated fadeInRight">
		                    <div className="ibox-content p-xl">
		                            <div className="row">
		                                <ul className="list-group clear-list">
                                            <li className="list-group-item fist-item">
                                            	<table>
	                                                <tr>
	                                            		<td width="150"><strong>NAMA</strong></td>
	                                            		<td>Chaerus Sulton</td>
	                                            	</tr>
                                            	</table>
                                            </li>
                                            <li className="list-group-item">
                                            	<table>
	                                                <tr>
	                                            		<td width="150"><strong>NIM</strong></td>
	                                            		<td>F1D 01281</td>
	                                            	</tr>
                                            	</table>
                                            </li>
                                            <li className="list-group-item">
                                            	<table>
	                                                <tr>
	                                            		<td width="150"><strong>JURUSAN</strong></td>
	                                            		<td>Perhotelan</td>
	                                            	</tr>
	                                            </table>
                                            </li>
                                            <li className="list-group-item">
                                            	<table>
	                                                <tr>
	                                            		<td width="150"><strong>TAHUN</strong></td>
	                                            		<td>2018</td>
	                                            	</tr>
	                                            </table>
                                            </li>
                                            <li className="list-group-item"></li>
                                        </ul>
		                            </div>

		                            <div className="table-responsive m-t">
		                                <table className="table table-bordered">
										    <thead>
										    <tr>
										        <th>#</th>
										        <th>Kode</th>
										        <th>Nama</th>
										        <th>Nilai</th>
										    </tr>
										    </thead>
										    <tbody>
										    {
										    	this.state.matkuls.map((matkul, key) =>
										    		<tr>
												        <td>{key+1}</td>
												        <td>{matkul.kode}</td>
												        <td>{matkul.nama}</td>
												        <td>A</td>
												    </tr>
										    	)
										    }
										    </tbody>
										</table>
		                            </div>

		                            
		                        </div>
		                </div>
		            </div>
		        </div>
            </div>
        )
    }

}

export default Nilai