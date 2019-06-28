import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'

class Daftar_hadir extends Component {

	constructor(props){
        super(props);

        const {jadwal} = this.props.location.state

        this.state = {
            daftars: [],
            loading: true,
            jadwal,
            absensi: [],
            loadingSimpan: false,
            daftars: [],
            selectedAbsensi : null,
            sendDaftar: [],
            selectedKehadiran: 0,
            checkAll: false,
            kehadiran: [],
            sendKehadiran: {}
        }
    }

    componentWillMount(){
    	const self = this

		fetch(BASE_URL + '/api/absensi/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {

			self.setState({
				absensi: data.results.find(data => data.mata_kuliah == self.state.jadwal.mata_kuliah_info.id),
				selectedAbsensi: data.results.find(data => data.mata_kuliah == self.state.jadwal.mata_kuliah_info.id).id
			})
		});

    }

    componentDidMount(){
    	const self = this

		fetch(BASE_URL + '/api/daftar/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {	
			self.setState({
				daftars: data.results,
				loading: !self.state.loading,
			})
		});

    }

    getDaftar = () => {
    	const self = this
    	fetch(BASE_URL + '/api/daftar/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				daftars: data.results
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
            documentTitle: "Daftar Hadir Mahasiswa",
            font_size:'17pt',
            targetStyles: ['*']
        })
     }

    render() {
    	const styletb = {
            borderCollapse:'collapse',
            borderSpacing:0,
            borderStyle:'solid',
            width:'100%',
            fontSize:'12px'
        }
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Daftar Hadir Mahasiswa  {this.state.matkul}</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                Kehadiran Mahasiswa
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Kehadiran</strong>
                            </li>
                        </ol>
		            </div>
		            <div className="col-lg-4">
		            </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Daftar Hadir Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
                                        <div className="col-lg-6">
                                        	<table>
                                        		<tr>
                                        			<td style={{'width' : '40%'}}>Mata Kuliah </td>
                                        			<td>: {this.state.jadwal.mata_kuliah_info.nama}</td>
                                        		</tr>
                                        		<tr>
                                        			<td>Tanggal </td>
                                        			<td>: {moment(this.state.jadwal.start).format("DD/MM/YYYY")}</td>
                                        		</tr>
                                        		<tr>
                                        			<td>Dosen </td>
                                        			<td>: {this.state.jadwal.dosen_info.nama}</td>
                                        		</tr>
                                        	</table>
                                        </div>
                                        <div className="col-lg-4">
                                        	
                                        </div>
                                        <div className="col-lg-2">
                                        	<button className="btn btn-primary push-right" onClick={() => this.exportData()}>
			                                    	<i className="fa fa-print"></i> Cetak
			                                    </button>
                                        </div>
                                    </div>

                            		<div className="hr-line-dashed"></div>
                                    {
                                    	this.state.loading ?
                                    	<div className="spiner-example">
			                                <div className="sk-spinner sk-spinner-double-bounce">
			                                    <div className="sk-double-bounce1"></div>
			                                    <div className="sk-double-bounce2"></div>
			                                </div>
			                            </div>
			                            :
                                    	<div className="table-responsive">
										    <table className="table table-striped">
										        <thead>
										        <tr>
										        	<th>NO </th>
										            <th>NIM </th>
										            <th>NAMA </th>
										            <th><center>STATUS</center></th>
										        </tr>
										        </thead>
										        <tbody>
										        {
										        	this.state.daftars.filter(data => data.absensi == this.state.selectedAbsensi && data.kehadiran.find(x => x.jadwal == this.state.jadwal.id)).map((daftar, key) => 

										        		<tr key={key} style={{'width' : '100%'}}>
										        			<td style={{'width' : '10%'}}>{key+1}</td>
												            <td style={{'width' : '20%'}}>{daftar.mahasiswa_info.nim}</td>
												            <td style={{'width' : '50%'}}>{daftar.mahasiswa_info.nama}</td>
												            <td style={{'width' : '20%', 'textAlign': 'center'}}>{daftar.kehadiran.find(x => x.jadwal == this.state.jadwal.id).status.toUpperCase()}</td>
												            
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
                    </div>

                    <div style={{'backgroundColor': 'white', 'display':'none'}}>
                        <div id="print_data">
                        <table>
                            <tr style={{'width' : '100%'}}>
                                <td>Mata Kuliah </td>
                                <td style={{'width' : '70%'}}>: {this.state.jadwal.mata_kuliah_info.nama}</td>
                            </tr>
                            <tr style={{'width' : '100%'}}>
                                <td >Tanggal </td>
                                <td style={{'width' : '70%'}}>: {this.state.jadwal.start}   </td>
                            </tr>
                            <tr style={{'width' : '100%'}}>
                                <td >Dosen </td>
                                <td style={{'width' : '70%'}}>: {this.state.jadwal.dosen_info.nama}</td>
                            </tr>
                        </table>
                        <br/>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th >NO.</th>
                                <th >NIM</th>
                                <th >NAMA</th>
                                <th >STATUS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.daftars.filter(data => data.absensi == this.state.selectedAbsensi && data.kehadiran.find(x => x.jadwal == this.state.jadwal.id)).map((daftar, key) => 
                                    <tr >
                                        <td>{key+1}</td>
                                        <td>{daftar.mahasiswa_info.nim}</td>
                                        <td>{daftar.mahasiswa_info.nama}</td>
                                        <td>{daftar.kehadiran.find(x => x.jadwal == this.state.jadwal.id).status.toUpperCase()}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
			

        )
    }

}

export default Daftar_hadir