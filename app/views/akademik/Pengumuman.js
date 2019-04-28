import React, { Component } from 'react';
import cookie from 'react-cookies'; 

class Pengumuman extends Component {
	
	constructor() {
		super()
		this.state = {
			tags: [],
			khusus: false,
			selectedMahasiswa: false,
			selectedRecever: '',
			jurusans: []
		}
	}

	componentDidMount(){
		const self = this
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

	handleChange(tags) {
		this.setState({tags})
	}

	handleKhusus = () => {
		this.setState({
			khusus: true
		})
	}

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Pengumuman Akademik</h2>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="tabs-container">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="active"><a className="nav-link" data-toggle="tab" href="#tab-1"> Buat Pengumuman</a></li>
                        <li><a className="nav-link" data-toggle="tab" href="#tab-2"> Daftar Pengumuman</a></li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" id="tab-1" className="tab-pane active">
                            <div className="panel-body">
                            	<div className="ibox-content">
		                            <div className="form-group row">
					                    <div className="col-md-12"><input type="text" className="form-control" placeholder="Judul Pengumuman" />
					                    </div>
					                </div>

					                <div className="form-group row">
					                    <div className="col-md-12">
					                    	<textarea className="form-control" rows="10"></textarea>
					                    </div>
					                </div>

									<div className="form-group row">
										<div className="col-lg-2">
											<h5>Penerima : </h5>
										</div>
										<div>
				                    		<div className="pretty p-switch p-fill">
											    <input type="checkbox" value="Mahasiswa" onChange={(e) => this.setState({selectedMahasiswa: !this.state.selectedMahasiswa}) } />
											    <div className="state">
											      <label>Mahasiswa</label>
											    </div>
											</div>
											<div className="pretty p-switch p-fill">
											    <input type="checkbox" value="Dosen" onChange={(e) => this.setState({selectedRecever: e.target.value}) }  />
											    <div className="state">
											      <label>Dosen</label>
											    </div>
											</div>

				                    	</div>

				                    	<br/>
					                   	{
					                   		this.state.selectedMahasiswa ?
					                   		<div className="row">
			                                    <div className="col-lg-6">
			                                    	<label className="col-sm-2 col-form-label">Jurusan </label>
			                                    	<div className="col-sm-8">
					                                    <select
					                                        className="form-control">
					                                        <option>Semua Jurusan</option>
					                                        {
					                                        	this.state.jurusans.map((jurusan) => 
					                                        		<option value={jurusan.id}>{jurusan.nama}</option>
					                                        	)
					                                        }
					                                    </select>
				                                    </div>
			                                    </div>
			                                    <div className="col-lg-6">
			                                    	<label className="col-sm-2 col-form-label">Jurusan </label>
			                                    	<div className="col-sm-8">
					                                    <select
					                                        className="form-control">
					                                        <option>Semua Kelas</option>
					                                        <option>Kelas A</option>
					                                        <option>Kelas B</option>
					                                    </select>
				                                    </div>
			                                    </div>
			                                </div>
			                                : null
					                   	}

					                    	
					                </div>
					                <div className="hr-line-dashed"></div>
					                <div className="form-group row">
					                    <button className="btn btn-primary btn-sm" type="submit">Kirim</button>
					                </div>
		                        </div>
                            </div>
                        </div>
                        <div role="tabpanel" id="tab-2" className="tab-pane">
                        	<div className="panel-body">
                        		<table className="table">
		                            <thead>
			                            <tr>
			                            	<th style={{'width': '4%'}}>No</th>
			                                <th style={{'width': '50%'}}>Pengumuman</th>
			                                <th style={{'width': '10%'}}>Tanggal</th>
			                                <th style={{'width': '30%'}}>Penerima</th>
			                            </tr>
		                            </thead>
		                            <tbody>
		                            <tr>
		                            	<td>1</td>
		                                <td>Perubahan Jadwal Pengantar Manajemen</td>
		                                <td>13-03-2019</td>
		                                <td>Semua Mahasiswa</td>
		                            </tr>
		                            <tr>
		                            	<td>2</td>
		                                <td>Pergantian Dosen</td>
		                                <td>14-03-2019</td>
		                                <td>Perhotelan & Kapal Pesiar <b>Kelas A</b></td>
		                            </tr>
		                            </tbody>
		                        </table>
                        	</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Pengumuman