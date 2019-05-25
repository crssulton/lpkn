import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js';
import print from 'print-js'
import logo from '../../../../public/assets/assets 1/img/laptop4.png';

const styles = {
	"fontFamily": "Times New Roman",
	"textAlign": "center"
}

const text = {
	"fontFamily": "Times New Roman",
	"paddingLeft": "40px"
}

const tableNilai = {
	"textAlign" : "center"
}

class Nilai extends Component {

	constructor(props){
        super(props);
        this.state = {
			nilai: []
        }
	}


    componentWillMount(){
		const self = this
        fetch(BASE_URL + '/api/nilai/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                nilai: data.results
            })
        });
    }

    exportData(){
        printJS({
            printable: 'print_data',
            type: 'html',
            modalMessage:"Sedang memuat data...",
            showModal:true,
            maxWidth:'1300',
            font_size:'8pt',
            documentTitle:'JADWAL MAHASISWA',
            targetStyles: ['*']
        })
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
		                    <a onClick={() => this.exportData() } className="btn btn-primary"><i className="fa fa-print"></i> Cetak </a>
		                </div>
		            </div>
		        </div>
		        <div className="row">
		            <div className="col-lg-12">
		                <div className="wrapper wrapper-content" id="print_data">
		                    <div className="ibox-content p-xl">
								<img src={logo} alt="laptop"/>
		                            <div className="row" id="print_data">
										<h2 style={styles}>LPKN TRAINING CENTER</h2>
										<h3 style={styles}>LEMBAGA PENDIDIKAN KOMPETENSI NASIONAL</h3>
										<h3 style={styles}>{this.state.nilai != 0 ? this.state.nilai[0].kampus_info.nama.toUpperCase() : null}</h3>
										<p  style={styles}><b>Jl. Pejanggik, No. 60, Pajang Timur, Mataram, Tlp. (0370) 632 437</b></p>
										<hr style={{'border': '5px solid green'}}></hr>
										<h3 style={styles}>TRANSKRIP NILAI SEMENTARA</h3>
										<h3 style={styles}>{this.state.nilai != 0 ? this.state.nilai[0].mahasiswa_info.jurusan_info.nama.toUpperCase() : null}</h3>
										<h3 style={styles}>TAHUN AKADEMIK : 2019</h3>
		                            </div>
									
									<br/>
									<br/>
		                            <div>
										<table>
											<tr>
												<td><h4 style={text}>NAMA MAHASISWA</h4></td>
												<td><h4 style={text}> : {this.state.nilai != 0 ? this.state.nilai[0].mahasiswa_info.nama.toUpperCase() : null}</h4></td>
											</tr>
											<tr>
												<td><h4 style={text}>NOMOR INDUK MAHASISWA / NIM</h4></td>
												<td><h4 style={text}> : {this.state.nilai != 0 ? this.state.nilai[0].mahasiswa_info.nim.toUpperCase() : null}</h4></td>
											</tr>
										</table>
										<br/>
		                                <table className="table table-bordered" style={{'width': '100%'}}>
										    <thead >
										    <tr>
										        <th style={tableNilai} rowSpan="2">NO</th>
										        <th style={tableNilai} rowSpan="2">MATERI</th>
										        <th style={tableNilai} colSpan="3">Nilai</th>
										    </tr>
											<tr > 
										        <th style={tableNilai}>Jumlah Jam</th>
												<th style={tableNilai}>Nilai Angka</th>
												<th style={tableNilai}>Nilai Huruf</th>
										    </tr>
										    </thead>
										    
										    <tbody>
										    {
										    	this.state.nilai.map((nilai, key) =>
										    		<tr style={{'fontFamily':'Times New Roman', 'padding': '10px 0'}} key={key}>
												        <td>{key+1}</td>
												        <td>{nilai.mata_kuliah_info.nama}</td>
												        <td style={tableNilai}>12</td>
														<td style={tableNilai}>{nilai.nilai_angka.toFixed(2)}</td>
														<td style={tableNilai}>{nilai.nilai_grade}</td>
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