import React, { Component } from 'react';   
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'
import { Link, Location } from 'react-router';

class Jadwal extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            jadwals: [],
            selectedMatkul: 0,
            absensi: [],
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
                jadwals: data.results,
                selectedMatkul: data.results[0].mata_kuliah
            })
        });

        fetch(BASE_URL + '/api/absensi/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                absensi: data.results
            })
        });

    }

    
    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Daftar Pertemuan Kuliah</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Daftar Hadir mahasiswa</strong>
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
                                    <h5> <i className="fa fa-list "></i> Daftar Pertemuan</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <label className="col-sm-3 col-form-label">Mata Kuliah :</label>
                                            <div className="col-sm-9">
                                                <select
                                                    value={this.state.selectedMatkul}
                                                    onChange={(e) => this.setState({selectedMatkul: e.target.value}) }
                                                    className="form-control">
                                                    <option>-- Pilih Mata Kuliah --</option>
                                                    {
                                                        this.state.absensi.map((matkul, key) => 
                                                            <option value={matkul.mata_kuliah}>{matkul.mata_kuliah_info.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="hr-line-dashed"></div>
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
                                                    <th>MATA KULIAH</th>
                                                    <th>PERTEMUAN</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                
                                                {
                                                    this.state.jadwals.filter(x => x.mata_kuliah == this.state.selectedMatkul).map((jadwal, key) =>
                                                    <tr key={key}  
                                                        style={{'cursor' : 'pointer'}}>
                                                        <td>{jadwal.title}</td>
                                                        <td>{this.state.days.find((dy) => (dy.day == moment(jadwal.start).format('dddd'))).hari} , {moment(jadwal.start).format('D MMM YYYY')}</td>
                                                        <td>
                                                            <center>
                                                                <Link to={{ pathname: 'daftar-hadir', state: { jadwal: jadwal } }}>
                                                                    <button 
                                                                        className="btn btn-primary btn-sm" 
                                                                        type="button"
                                                                        ><i className="fa fa-id-card"></i></button>
                                                                </Link>
                                                            </center>
                                                        </td>
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
                    
                    
                </div>

                
            </div>
            

        )
    }

}

export default Jadwal