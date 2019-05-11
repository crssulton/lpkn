import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js';
import logo from '../../../../public/assets/assets 1/img/laptop4.png';
import ReactToPrint from "react-to-print";

const styles = {
	"fontFamily": "Times New Roman",
	"textAlign": "center"
}

const text = {
	"fontFamily": "Times New Roman",
	"paddingLeft": "40px"
}

const tableNilai = {
	"fontFamily": "Times New Roman",
	"paddingLeft": "40px",
	"textAlign" : "center"
}

class Nilai extends Component {

	constructor(props){
        super(props);
        this.state = {
			matkuls: [],
			mahasiswa: []
        }
	}


    componentDidMount(){
		const self = this

		fetch(BASE_URL + '/api/mahasiswa/' +  window.sessionStorage.getItem('user_id') +'/', {
			method: 'GET',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				mahasiswa: data
			})
		});

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
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Nilai</strong>
                            </li>
                        </ol>
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
								<img src={logo} alt="laptop"/>
		                            <div className="row">
										<h2 style={styles}>LPKN TRAINING CENTER</h2>
										<h3 style={styles}>LEMBAGA PENDIDIKAN KOMPETENSI NASIONAL</h3>
										<h3 style={styles}>{this.state.mahasiswa != 0 ? this.state.mahasiswa.kampus_info.nama : null}</h3>
										<p  style={styles}><b>Jl. Pejanggik, No. 60, Pajang Timur, Mataram, Tlp. (0370) 632 437</b></p>
										<hr style={{'border': '5px solid green'}}></hr>
										<h3 style={styles}>TRANSKRIP NILAI SEMENTARA</h3>
										<h3 style={styles}>{this.state.mahasiswa != 0 ? this.state.mahasiswa.jurusan_info.nama.toUpperCase() : null}</h3>
										<h3 style={styles}>TAHUN AKADEMIK : {this.state.mahasiswa != 0 ? this.state.mahasiswa.tahun_angkatan : null}</h3>
		                            </div>
									
									<br/>
									<br/>
		                            <div className="table-responsive m-t">
										<table>
											<tr>
												<td><h4 style={text}>NAMA MAHASISWA</h4></td>
												<td><h4 style={text}> : {this.state.mahasiswa != 0 ? this.state.mahasiswa.nama.toUpperCase() : null}</h4></td>
											</tr>
											<tr>
												<td><h4 style={text}>NOMOR INDUK MAHASISWA / NIM</h4></td>
												<td><h4 style={text}> : {this.state.mahasiswa != 0 ? this.state.mahasiswa.nim.toUpperCase() : null}</h4></td>
											</tr>
										</table>
										<br/>
										<br/>
		                                <table className="table table-bordered">
										    <thead >
										    <tr>
										        <th rowSpan="2">NO</th>
										        <th style={tableNilai} rowSpan="2">MATERI</th>
										        <th style={tableNilai} colSpan="3">Nilai</th>
										    </tr>
											<tr>
										        <th style={tableNilai}>Jumlah Jam</th>
												<th style={tableNilai}>Nilai Angka</th>
												<th style={tableNilai}>Nilai Huruf</th>
										    </tr>
										    </thead>
										    <tbody>
										    {
										    	this.state.matkuls.map((matkul, key) =>
										    		<tr style={{'fontFamily':'Times New Roman'}} key={key}>
												        <td>{key+1}</td>
												        <td>{matkul.nama}</td>
												        <td style={tableNilai}>12</td>
														<td style={tableNilai}>80</td>
														<td style={tableNilai}>A</td>
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

class Example extends React.Component {
	render() {
		return (
		<div>
			<ReactToPrint
			trigger={() => <a href="#">Print this out!</a>}
			content={() => this.componentRef}
			/>
			<Nilai ref={el => (this.componentRef = el)} />
		</div>
		);
	}
}

export default Example