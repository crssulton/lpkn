import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js'

class Dashboard extends Component {

	constructor(props){

		var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
		var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var thisDay = date.getDay(),
		thisDay = myDays[thisDay];
		var yy = date.getYear();
		var year = (yy < 1000) ? yy + 1900 : yy;

        super(props);
        this.state = {
            matkuls: [],
            date: thisDay + ', ' + day + ' ' + months[month] + ' ' + year,
            QRCode: "",
            check: false,
            loading: false
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

    generateQrCode = () => {
    	this.setState({
			loading: !this.state.loading
		})
		
    	setTimeout(() => {
    		this.setState({
				QRCode: "https://www.qr-code-generator.com/wp-content/themes/qr/img-v4/guide/design/QR_Code_Plain.svg",
				loading: !this.state.loading
			})
    	}, 1000)
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Dashboard</h2>
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
			                                <th style={{'width':'10%'}}>DURASI</th>
			                                <th style={{'width':'10%'}}>DOSEN</th>
			                            </tr>
			                            </thead>
			                            <tbody>
			                            {
			                            	this.state.matkuls.map((matkul, key) =>
			                            		<tr key={key} onClick={this.generateQrCode} style={{'cursor': 'pointer'}}>
					                                <td>{matkul.nama}</td>
					                                <td>16:00 - 18:00</td>
					                                <td>{matkul.jumlah_jam} Jam</td>
					                                <td>Ramdani, S.T</td>
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
                            			this.state.loading ?
                            			<div className="spiner-example">
			                                <div className="sk-spinner sk-spinner-double-bounce">
			                                    <div className="sk-double-bounce1"></div>
			                                    <div className="sk-double-bounce2"></div>
			                                </div>
			                            </div>
			                            :
										<img src={this.state.QRCode}/>
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