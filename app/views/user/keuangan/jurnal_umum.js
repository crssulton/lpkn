import React, { Component } from 'react';   
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import print from 'print-js'

class JurnalUmum extends Component {

    constructor(props){
        super(props);
        this.state = {
            jurnal_umum: [],
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
        
        fetch(BASE_URL + '/api/jurnal-umum/', {
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
                jurnal_umum: data,
                loading: !self.state.loading
            })
        });

    }

    exportData(){
        printJS({
            printable: 'print_data',
            type: 'html',
            modalMessage:"Sedang memuat data...",
            showModal:true,
            targetStyles: ['*']
        })
     }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Report Jurnal Umum</h2>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Jurnal Umum</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label className="col-sm-4 col-form-label">Filter : </label>
                                            <div className="col-sm-8">
                                                <DayPickerInput 
                                                    className="form-control m-b" 
                                                    onDayChange={day => console.log( moment(day).format("YYYY-MM-DD") )} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="col-sm-12">
                                                <button className="btn btn-primary" onClick={() => this.exportData()}>
                                                    <i className="fa fa-print"></i> Cetak
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div id="print_data">
                                    <table>
                                        <tr>
                                            <td>Jenis Laporan </td>
                                            <td> : LAPORAN JURNAL UMUM </td>
                                        </tr>
                                        <tr>
                                            <td>Periode Laporan </td>
                                            <td> : Periode 2019-05-01 s/d 2019-05-31</td>
                                        </tr>
                                    </table>
                                    <br/>
                                    <table style={{'width':'100%'}}>
                                        <thead style={{'borderTop': '1px solid black', 'borderBottom': '1px solid black'}}>
                                            <th style={{'padding' : '10px 0px', 'width' : '10%'}}>No Perkiraan</th>
                                            <th style={{'padding' : '10px 0px', 'width' : '10%'}}>Nama Perkiraan</th>
                                            <th style={{'padding' : '10px 0px', 'width' : '10%'}}>Jumlah Debet</th>
                                            <th style={{'padding' : '10px 0px', 'width' : '10%'}}>Jumlah Kredit</th>
                                        </thead>
                                    </table>
                                        {
                                            this.state.jurnal_umum.map((data, key) => 
                                                <table style={{'width':'100%', 'marginBottom' : '30px'}}>
                                                <tr>
                                                    <td style={{'paddingTop' : '10px', 'width' : '10%'}}>No Transaksi</td>
                                                    <td style={{'paddingTop' : '10px', 'width' : '10%'}}>{data.kode}</td>
                                                    <td style={{'paddingTop' : '10px', 'width' : '10%'}}>Tanggal Transaksi</td>
                                                    <td style={{'paddingTop' : '10px', 'width' : '10%'}}>{data.tanggal}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{'paddingTop' : '10px'}}>Keterangan</td>
                                                    <td style={{'paddingTop' : '10px'}}>{data.uraian}</td>
                                                    <td style={{'paddingTop' : '10px'}}>No. Referensi : </td>
                                                    <td style={{'paddingTop' : '10px'}}>-</td>
                                                </tr> 
                                                {
                                                    data.dataJurnal.map(jurnal =>
                                                        <tr>
                                                            <td style={{'paddingTop' : '10px'}}>{jurnal.account_info.kode}</td>
                                                            <td style={{'paddingTop' : '10px'}}>{jurnal.account_info.nama}</td>
                                                            <td style={{'paddingTop' : '10px'}}>{this.formatNumber(jurnal.jumlah_debet)}</td>
                                                            <td style={{'paddingTop' : '10px'}}>{this.formatNumber(jurnal.jumlah_kredit)}</td>
                                                        </tr>
                                                    )
                                                }
                                            
                                                <tr style={{'paddingBottom' : '10x'}}>
                                                    <td style={{'paddingTop' : '10px', 'borderTop': '1px solid black', 'borderTopStyle':'dashed'}}></td>
                                                    <td style={{'paddingTop' : '10px', 'borderTop': '1px solid black', 'borderTopStyle':'dashed'}}><b>Total :</b></td>
                                                    <td style={{'paddingTop' : '10px', 'borderTop': '1px solid black', 'borderTopStyle':'dashed'}}><b>
                                                        {
                                                            data.dataJurnal.reduce((total, item) => total + item.jumlah_debet, 0)
                                                        }
                                                    </b></td>
                                                    <td style={{'paddingTop' : '10px', 'borderTop': '1px solid black', 'borderTopStyle':'dashed'}} ><b>
                                                        {
                                                            data.dataJurnal.reduce((total, item) => total + item.jumlah_kredit, 0)
                                                        }
                                                    </b></td>
                                                </tr>
                                                </table>
                                            )
                                        }

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

export default JurnalUmum