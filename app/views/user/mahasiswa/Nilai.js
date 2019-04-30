import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js';

class Nilai extends Component {

	constructor(props){
        super(props);
        this.state = {
            matkuls: []
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
		                    <a href="#" target="_blank" className="btn btn-primary"><i className="fa fa-print"></i> Cetak </a>
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
                                                <tbody>
	                                                <tr>
	                                            		<td width="150"><strong>NAMA</strong></td>
	                                            		<td>Chaerus Sulton</td>
	                                            	</tr>
                                                </tbody>
                                            	</table>
                                            </li>
                                            <li className="list-group-item">
                                            	<table>
                                                <tbody>
	                                                <tr>
	                                            		<td width="150"><strong>NIM</strong></td>
	                                            		<td>F1D 01281</td>
	                                            	</tr>
                                                </tbody>
                                            	</table>
                                            </li>
                                            <li className="list-group-item">
                                            	<table>
                                                <tbody>
	                                                <tr>
	                                            		<td width="150"><strong>JURUSAN</strong></td>
	                                            		<td>Perhotelan</td>
	                                            	</tr>
                                                </tbody>
	                                            </table>
                                            </li>
                                            <li className="list-group-item">
                                            	<table>
                                                <tbody>
	                                                <tr>
	                                            		<td width="150"><strong>TAHUN</strong></td>
	                                            		<td>2018</td>
	                                            	</tr>
                                                </tbody>
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
										    		<tr key={key}>
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