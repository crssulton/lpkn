import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js'
import { QRCode } from "react-qr-svg";

class Dashboard extends Component {

	constructor(props){

		var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
		var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var thisDay = date.getDay(),
		thisDay = myDays[thisDay];
		var yy = date.getYear();
		var year = (yy < 1000) ? yy + 1900 : yy;

        super(props);
        this.state = {
            jadwal: [],
            date: thisDay + ', ' + day + ' ' + months[month] + ' ' + year,
            QRCode: "not found",
            check: false,
            loading: false,
            openQR:false,
            selectedID: null,
            data: null
        }
    }

    componentDidMount(){
    	this.getJadwal()
    }

    getJadwal = () => {
    	const self = this
    	let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;
		let tanggal = [year, month, day].join('-')

		fetch(BASE_URL + '/api/jadwal/?search=' + tanggal, {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				jadwal: data.results
			})
		});
    }

    generateQrCode = (id) => {

    	this.setState({
    		openQR: true,
    		selectedID: id.id,
    		data: id,
			loading: !this.state.loading
		})
		
    	setTimeout(() => {
    		this.setState({
				QRCode: id.id.toString(),
				loading: !this.state.loading
			})
    	}, 1000)
    }

    handleAbsenDosen = () => {
    	const self = this
    	let dosen = {
    		dosen_hadir: true
    	}

    	fetch(BASE_URL + '/api/jadwal/' + this.state.selectedID + '/', {
			method: 'patch',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
                'Accept': 'application/json'
			},
			body: JSON.stringify(dosen)
		}).then(function(response) {
			console.log(response)
			if (response.status == 200) {
				self.getJadwal()
				self.setState({openQR: false})
				toastr.success("Dosen telah hadir", "Sukses ! ")
			}else{
				toastr.warning("Dosen gagal hadir", "Gagal ! ")
			}
		}).then(function(data) {
			
		});
    }

    render() {
    	return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Dashboard Akademik</h2>
		                <ol className="breadcrumb">
		                    <li className="breadcrumb-item active">
		                        <a href="index.html">Dashboard</a>
		                    </li>
		                </ol>
		            </div>
		        </div>
		        <div className="row wrapper wrapper-content animated fadeInRight">
		            <div className="col-lg-8">
		            	<div className="ibox ">
                            <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                <h5> <i className="fa fa-list "></i> Perkuliahan { this.state.date }</h5>
                            </div>
                            <div className="ibox-content">
                            	<div className="table-responsive">
									<table className="table table-hover" align="right">
			                            <thead>
			                            <tr>
			                                <th style={{'width':'5%'}}>MATA KULIAH</th>
			                                <th style={{'width':'10%'}}>WAKTU</th>
			                                <th style={{'width':'10%'}}>RUANGAN</th>
			                                <th style={{'width':'10%'}}>KELAS</th>
			                                 <th style={{'width':'10%'}}>JURUSAN</th>
			                                <th style={{'width':'10%'}}>DOSEN</th>
			                            </tr>
			                            </thead>
			                            <tbody>
			                            {
			                            	this.state.jadwal.map((data, key) =>
			                            		<tr key={key} onClick={() => this.generateQrCode(data)} style={{'cursor': 'pointer'}}>
					                                <td>{data.title}</td>
					                                <td>{data.jam_mulai.substring(0, 5)} - {data.jam_selesai.substring(0, 5)}</td>
					                                <td>{data.ruangan_info.nama}</td>
					                                <td>{data.kelas_info.nama}</td>
					                                <td>{data.jurusan_info.nama}</td>
					                                <td>{data.dosen_info.nama}</td>
					                            </tr>
			                            	)
			                            }
			                            </tbody>
			                        </table>
		                        </div>
                           	</div>
                        </div>
		            </div>

		            <div className="col-lg-4">
		            	<div className="ibox ">
                            <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                <h5> <i className="fa fa-user "></i> ABSENSI DOSEN </h5>
                            </div>
                            <div className="ibox-content">
                            	<div className="table-responsive">
        						{
        							this.state.openQR ?
        							
                            			this.state.loading ?
                            			<div className="spiner-example">
			                                <div className="sk-spinner sk-spinner-double-bounce">
			                                    <div className="sk-double-bounce1"></div>
			                                    <div className="sk-double-bounce2"></div>
			                                </div>
			                            </div>
			                            :
										!this.state.data.dosen_hadir ?
										<center>
											<QRCode
								                bgColor="#FFFFFF"
								                fgColor="#000000"
								                level="Q"
								                style={{ width: 256 }}
								                value={this.state.QRCode}
								            />
								            <br/><br/>
								           	<button 
								           		onClick={this.handleAbsenDosen}
								           		className="btn btn-primary btn-block"
								           	>
								           		Absen Dosen
								           	</button>
										</center>
										:
										<center>
											<img
												width="100"
								                src={'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png'}
								            />
								            <br/>
								            <h3 style={{'textAlign':'center'}}>Dosen Telah Hadir</h3>
										</center>
									:
									null
        						}   		
		                        </div>
                           	</div>
                        </div>
		            </div>

		        </div>

            </div>
        )
    }

}

export default Dashboard