import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'

class RekapMahasiswa extends Component {

	constructor(props){
        super(props);

        this.state = {
            mahasiswas: [],
            loading: true,
        }
    }

    componentDidMount(){
    	const self = this

		fetch(BASE_URL + '/api/mahasiswa/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			let mhs = [...data.results]
			mhs.map(data => {
				data.check = false
			})
			self.setState({
				mahasiswas: mhs,
				loading: !self.state.loading,
			})
		});

    }

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Rekap Absensi Mahasiswa</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                Absensi
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Rekap Absensi</strong>
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
                                    <h5> <i className="fa fa-list "></i> Rekap Absensi Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
                                        
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

export default RekapMahasiswa