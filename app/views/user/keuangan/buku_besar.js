import React, { Component } from 'react';   
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

let saldoAwal = 0

class BukuBesar extends Component {

    constructor(props){
        super(props);
        this.state = {
            data_jurnal: [],
            account:[],
            kelompok_account: [],
            loading: true
        }
    }

    formatNumber = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    componentDidMount(){
        const self = this
        
        fetch(BASE_URL + '/api/data-jurnal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                data_jurnal: data.results,
                loading: !self.state.loading
            })
        });

    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Report Buku Besar</h2>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Report Buku Besar</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label className="col-sm-4 col-form-label">Filter : </label>
                                            <div className="col-sm-8">
                                                <DayPickerInput 
                                                    className="form-control m-b" 
                                                    onDayChange={day => console.log(day)} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <table>
                                        <tr>
                                            <td>Jenis Laporan </td>
                                            <td> : LAPORAN HISTORI PERKIRAAN </td>
                                        </tr>
                                        <tr>
                                            <td>Periode Laporan </td>
                                            <td> : 2019-05</td>
                                        </tr>
                                    </table>
                                    <br/>
                                    <table style={{'width':'100%'}}>
                                        <tr style={{'borderTop': '1px solid black', 'borderBottom': '1px solid black', 'widtd':'100%'}}>
                                            <td style={{'padding' : '10px 0px', 'width':'5%'}}>No</td>
                                            <td style={{'padding' : '10px 0px', 'width':'10%'}}>Tanggal</td>
                                            <td style={{'padding' : '10px 0px', 'width':'10%'}}>Kode</td>
                                            <td style={{'padding' : '10px 0px', 'width':'15%'}}>Keterangan</td>
                                            <td style={{'padding' : '10px 0px', 'width':'10%'}}>Jumlah Debet</td>
                                            <td style={{'padding' : '10px 0px', 'width':'10%'}}>Jumlah Kredit</td>
                                            <td style={{'padding' : '10px 0px', 'width':'10%'}}>Saldo</td>
                                        </tr>
                                    </table>
                                    {
                                        this.state.data_jurnal.map((jurnal, key) =>
                                            <tr>
                                                <td style={{'padding' : '10px 0px', 'width':'5%'}}>{key+1}</td>
                                                <td style={{'padding' : '10px 0px', 'width':'10%'}}>{jurnal.tanggal}</td>
                                                <td style={{'padding' : '10px 0px', 'width':'10%'}}>{jurnal.account_info.kode}</td>
                                                <td style={{'padding' : '10px 0px', 'width':'15%'}}>{jurnal.kode_info.uraian}</td>
                                                <td style={{'padding' : '10px 0px', 'width':'10%'}}>{this.formatNumber(jurnal.jumlah_debet)}</td>
                                                <td style={{'padding' : '10px 0px', 'width':'10%'}}>{this.formatNumber(jurnal.jumlah_kredit)}</td>
                                                <td style={{'padding' : '10px 0px', 'width':'10%'}}>
                                                {
                                                    this.formatNumber(saldoAwal += parseInt(jurnal.jumlah_debet) - parseInt(jurnal.jumlah_kredit))
                                                }
                                                </td>
                                            </tr>
                                        )
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

export default BukuBesar