import React, { Component } from 'react';   
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'
import { Link, Location } from 'react-router';

class Absen extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            jadwals: [],
            mahasiswa: [],
            months:[
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 
                    'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            days:[
                {day:'Sunday',hari:'Minggu'}, 
                {day:'Monday',hari:'Senin'}, 
                {day:'Tuesday',hari:'Selasa'}, 
                {day:'Wednesday',hari:'Rabu'}, 
                {day:'Thursday',hari:'Kamis'}, 
                {day:'Friday',hari:'Jum'+"'"+'at'}, 
                {day:'Saturday',hari:'Sabtu'}],
        }
    }

    componentWillMount(){
        const self = this
        fetch(BASE_URL + '/api/jadwal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                jadwals: data.results
            })
        });
    }

    
    render() {
        let thisDay = moment(new Date()).format('YYYY-MM-DD')
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Jadwal Perkuliahan</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Kehadiran Mahasiswa</strong>
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
                                    <h5> <i className="fa fa-list "></i> Jadwal Perkuliahan</h5>
                                </div>
                                <div className="ibox-content">
                                    {
                                        this.state.loading?
                                        <div className="spiner-example">
                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                <div className="sk-double-bounce1"></div>
                                                <div className="sk-double-bounce2"></div>
                                            </div>
                                        </div> :
                                        
                                        <div>
                                            <table className="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th>HARI</th>
                                                    <th>TANGGAL</th>
                                                    <th>MATA KULIAH</th>
                                                    <th>RUANGAN</th>
                                                    <th>WAKTU</th>
                                                    <th><center>ABSEN</center></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                
                                                {
                                                    this.state.jadwals.filter(data => data.start == thisDay && data.dosen == window.sessionStorage.getItem('user_id')) != 0 ?
                                                    this.state.jadwals.filter(data => data.start == thisDay && data.dosen == window.sessionStorage.getItem('user_id')).map((jadwal, key) =>
                                                    <tr key={key}  
                                                        style={{'cursor' : 'pointer'}}>
                                                        <th>{this.state.days.find((dy) => (dy.day == moment(jadwal.start).format('dddd'))).hari}</th>
                                                        <td>{moment(jadwal.start).format('D MMM YYYY')}</td>
                                                        <td>{jadwal.title}</td>
                                                        <td>{jadwal.ruangan_info.nama}</td>
                                                        <td>{jadwal.jam_mulai +" - "+jadwal.jam_selesai}</td>
                                                        <td>
                                                            <center>
                                                                <Link to={{ pathname: 'kehadiran', state: { jadwal: jadwal } }}>
                                                                    <button 
                                                                        className="btn btn-primary btn-sm" 
                                                                        type="button"
                                                                        ><i className="fa fa-id-card"></i></button>
                                                                </Link>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    )
                                                    :
                                                    <tr>
                                                        <td colSpan="6">
                                                            <h3 style={{'textAlign': 'center', 'fontWeight': 'normal'}}>Tidak Ada Jadwal Perkuliahan Hari ini</h3>
                                                        </td>
                                                    </tr>
                                                }
                                            
                                                </tbody>
                                            </table>
                                        </div>

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

export default Absen