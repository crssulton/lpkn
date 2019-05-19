import React, { Component } from 'react';   
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import print from 'print-js'

class TransaksiBukuBesar extends Component {

    constructor(props){
        super(props);
        this.state = {
            buku_besar: [],
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
        
        fetch(BASE_URL + '/api/buku-besar/', {
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
                buku_besar: data,
                loading: !self.state.loading
            })
        });

        fetch(BASE_URL + '/api/account/', {
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
                account: data
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
            font_size:'12pt',
            targetStyles: ['*']
        })
     }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Transaksi Buku Besar</h2>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Transaksi Buku Besar</h5>
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
                                            <center>
                                                <h3>LAPORAN KEUANGAN LPKN PER 20 MEI 2019</h3>
                                                <h3>TRANSAKSI BUKU BESAR</h3>
                                            </center>
                                            <br/>
                                            <br/>
                                            <table style={{'width':'100%'}}>
                                                <thead style={{'borderTop': '2px solid black', 'borderBottom': '2px solid black'}}>
                                                <tr>
                                                    <th style={{'padding' : '10px 0px', 'width' : '60%'}}></th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '20%'}}>DEBET</th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '20%'}}>KREDIT</th>
                                                </tr>
                                                </thead>
                                            </table>
                                            <br/>
                                            
                                            <table style={{'width':'100%'}}>
                                                {
                                                    this.state.buku_besar.map((data, key) => 
                                                        data.account.map((account, key) => 
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '60%'}}>
                                                                        <b>{data.role_display} | {account.nama}</b>
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}></td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}></td>
                                                                </tr>
                                                                {
                                                                    account.account_tujuan_transaksi.map((item, key) => 
                                                                        <tr>
                                                                            <td style={{'padding' : '10px 0px 10px 20px', 'width' : '60%'}}>
                                                                                {item.tanggal} | Entri Jurnal | {item.kode} | {item.uraian      }
                                                                            </td>
                                                                            <td style={{'padding' : '10px 0px', 'width' : '20%'}}>{data.role == 1 || data.role == 5 ? item.nominal : null}</td>
                                                                            <td style={{'padding' : '10px 0px', 'width' : '20%'}}>{data.role == 2 || data.role == 3 || data.role == 4 ? item.nominal : null}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                {
                                                                    account.account_sumber_transaksi.map((item, key) => 
                                                                        <tr>
                                                                            <td style={{'padding' : '10px 0px 10px 20px', 'width' : '60%'}}>
                                                                                {item.tanggal} | Entri Jurnal | {item.kode} | {item.uraian      }
                                                                            </td>
                                                                            <td style={{'padding' : '10px 0px', 'width' : '20%'}}>{data.role == 1 || data.role == 5 ? item.nominal : null}</td>
                                                                            <td style={{'padding' : '10px 0px', 'width' : '20%'}}>{data.role == 2 || data.role == 3 || data.role == 4 ? item.nominal : null}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                <tr style={{'borderTop' : '1px solid black', 'borderBottom' : '1px solid black'}}>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '60%'}}>
                                                                        <b>Total - {account.nama} </b>
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                                        <b>{data.role == 1 || data.role == 5 ? 
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                            : 
                                                                            "0.00"
                                                                        }</b>
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                                        <b>{data.role == 2 || data.role == 3 || data.role == 4 ?  
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                            : 
                                                                            "0.00"
                                                                        }</b>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    )
                                                }
                                            </table>

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

export default TransaksiBukuBesar