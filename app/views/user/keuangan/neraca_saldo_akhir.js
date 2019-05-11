import React, { Component } from 'react';   
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

let total = 0
let sumAktiva = 0
let sumPasiva = 0
let totalPasiva = 0

class NeracaSaldoAwal extends Component {

    constructor(props){
        super(props);
        this.state = {
            neraca_saldo: [],
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
        
        fetch(BASE_URL + '/api/neraca-saldo-awal-akhir/', {
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
                neraca_saldo: data,
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
                account: data,
                loading: !self.state.loading
            })
        });

        fetch(BASE_URL + '/api/kelompok-account/', {
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
                kelompok_account: data.results,
                loading: !self.state.loading
            })
        });

    }

    setNull = () =>{
        total = 0
    }

    setNullPasiva = () => {
        totalPasiva = 0
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Report Neraca Saldo Akhir</h2>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Report Neraca Saldo Akhir</h5>
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
                                       
                                        <div className="table-responsive">
                                            <center>
                                                <h3>LPKN</h3>
                                                <h3>NERACA SALDO AKHIR</h3>
                                                <h3>Per 31 Mei 2019</h3>
                                            </center>
                                            <br/>
                                            <br/>
                                            <table style={{'width':'100%'}}>
                                                <thead style={{'borderTop': '2px solid black', 'borderBottom': '2px solid black'}}>
                                                <tr>
                                                    <th style={{'padding' : '10px 0px', 'width' : '15%'}}>No Perkiraan</th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '40%'}}>Nama Perkiraan</th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '40%'}}>Jumlah</th>
                                                </tr>
                                                </thead>
                                            </table>
                                            <br/>
                                            <p><b>AKTIVA</b></p>
                                            
                                            {
                                                this.state.neraca_saldo.filter(x => x.nama != "HUTANG" && x.nama != "MODAL" && x.nama != "UTANG" && x.nama != "UTANG LANCAR").map((data, key) => 
                                                    <table style={{'width':'100%'}}>
                                                        <tr><td style={{'padding' : '10px 0px 0px 10px', 'width' : '100%'}} colSpan="3"><u>{data.nama}</u></td></tr>
                                                        
                                                        {
                                                            data.account.map(account =>
                                                                <tr>
                                                                    <td style={{'padding' : '10px 0px 10px 10px', 'width' : '15%'}}>{account.kode}</td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '40%'}}>{account.nama}</td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '40%'}}>
                                                                    {
                                                                        account.neracaSaldo.filter(data => data.bulan == 5).map(akun => {
                                                                            return(this.formatNumber(akun.debet))
                                                                        })
                                                                    }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        <tr>
                                                            <td style={{'padding' : '10px 0px 10px 10px', 'width' : '15%'}}></td>
                                                            <td style={{'padding' : '10px 0px', 'width' : '40%'}}></td>
                                                            <td style={{'padding' : '10px 0px', 'width' : '40%', 'borderTop': '2px dashed black'}}>
                                                            {
                                                                data.account.map(account =>
                                                                    account.neracaSaldo.filter(data => data.bulan == 5).map(akun => {
                                                                        sumAktiva+=akun.debet
                                                                        total+=akun.debet
                                                                    })
                                                                )
                                                            }
                                                            <b>{this.formatNumber(total)}</b>
                                                            {this.setNull()}

                                                            </td>
                                                        </tr>

                                                    </table>
                                                )
                                            }
                                            <table style={{'width':'100%'}}>
                                                <thead style={{'borderTop': '2px solid black', 'borderBottom': '2px solid black'}}>
                                                <tr>
                                                    <th style={{'padding' : '10px 0px', 'width' : '10%'}}></th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '45%'}}>TOTAL AKTIVA</th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '40%'}}>{this.formatNumber(sumAktiva)}</th>
                                                </tr>
                                                </thead>
                                            </table>

                                            <br/>
                                            <p><b>PASIVA</b></p>
                                            
                                            {
                                                this.state.neraca_saldo.filter(x => x.nama == "HUTANG" || x.nama == "MODAL" || x.nama == "UTANG" || x.nama == "UTANG LANCAR").map((data, key) => 
                                                    <table style={{'width':'100%'}}>
                                                        <tr><td style={{'padding' : '10px 0px 0px 10px', 'width' : '100%'}} colSpan="3"><u>{data.nama}</u></td></tr>
                                                        
                                                        {
                                                            data.account.map(account =>
                                                                <tr>
                                                                    <td style={{'padding' : '10px 0px 10px 10px', 'width' : '15%'}}>{account.kode}</td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '40%'}}>{account.nama}</td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '40%'}}>
                                                                    {
                                                                        account.neracaSaldo.filter(data => data.bulan == 5).map(akun => {
                                                                            return(this.formatNumber(akun.kredit))
                                                                        })
                                                                    }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        <tr>
                                                            <td style={{'padding' : '10px 0px 10px 10px', 'width' : '15%'}}></td>
                                                            <td style={{'padding' : '10px 0px', 'width' : '40%'}}></td>
                                                            <td style={{'padding' : '10px 0px', 'width' : '40%', 'borderTop': '2px dashed black'}}>
                                                            {
                                                                data.account.map(account =>
                                                                    account.neracaSaldo.filter(data => data.bulan == 5).map(akun => {
                                                                        sumPasiva+=akun.kredit
                                                                        totalPasiva+=akun.kredit
                                                                    })
                                                                )
                                                            }
                                                            <b>{this.formatNumber(totalPasiva)}</b>
                                                            {this.setNullPasiva()}

                                                            </td>
                                                        </tr>

                                                    </table>
                                                )
                                            }
                                            <table style={{'width':'100%'}}>
                                                <thead style={{'borderTop': '2px solid black', 'borderBottom': '2px solid black'}}>
                                                <tr>
                                                    <th style={{'padding' : '10px 0px', 'width' : '10%'}}></th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '45%'}}>TOTAL PASIVA</th>
                                                    <th style={{'padding' : '10px 0px', 'width' : '40%'}}>{this.formatNumber(sumPasiva)}</th>
                                                </tr>
                                                </thead>
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

export default NeracaSaldoAwal