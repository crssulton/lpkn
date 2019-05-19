import React, { Component } from 'react';   
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

let total_pemasukan = 0
let total_pengeluaran = 0
let total_debet = 0
let total_kredit = 0

class NeracaSaldoAwal extends Component {

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

        this.state.buku_besar.map((data, key) => {
            data.account.map((account, key) => {
                if (data.role == 4) {
                    total_pemasukan += account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum + account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                }
                if (data.role == 5) {
                    total_pengeluaran += account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum + account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                }

                if (data.role == 1 || data.role == 2) {
                    total_debet += account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum + account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                }else if(data.role == 3){
                    total_kredit += account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum + account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                }
            }) 
        })

        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Report Neraca Saldo</h2>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Report Neraca Saldo</h5>
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
                                                <h3>LAPORAN KEUANGAN LPKN PER 20 MEI 2019</h3>
                                                <h3>NERACA SALDO</h3>
                                                <h3>Per Tanggal 31 Mei 2019</h3>
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
                                            <table style={{'width':'100%'}}>
                                                {
                                                    this.state.buku_besar.filter(role => role.role == 4 || role.role == 5).map((data, key) => 
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan="3"><b>{data.nama}</b></td>
                                                        </tr>
                                                        {
                                                            data.account.map((account, key) => 
                                                                <tr>
                                                                    <td style={{'padding' : '10px 35px', 'width' : '60%'}}>
                                                                        {account.nama}
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                                        {data.role == 1 || data.role == 5 ? 
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                            : 
                                                                            null
                                                                        }
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                                        {data.role == 2 || data.role == 3 || data.role == 4 ?  
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                            : 
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }  
                                                        </tbody> 
                                                    )
                                                }
                                                    <tr style={{'borderTop' : '1px solid black', 'borderBottom' : '1px solid black'}}>
                                                        <td style={{'padding' : '10px 0px', 'width' : '60%'}}>
                                                            <b>Laba (Rugi) Bersih</b>
                                                        </td>
                                                        <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                            <b>{total_pemasukan - total_pengeluaran < 0 ? `(${total_pemasukan  - total_pengeluaran})` : total_pemasukan - total_pengeluaran}</b>
                                                        </td>
                                                        <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                            0.00
                                                        </td>
                                                    </tr>
                                            </table>
                                            <br/>
                                            <table style={{'width':'100%'}}>
                                                {
                                                    this.state.buku_besar.filter(role => role.role == 1 || role.role == 2 || role.role == 3).map((data, key) => 
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan="3"><b>{data.nama}</b></td>
                                                            </tr>
                                                        {
                                                            data.account.map((account, key) => 
                                                                <tr>
                                                                    <td style={{'padding' : '10px 35px', 'width' : '60%'}}>
                                                                        {account.nama}
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                                        {data.role == 1 || data.role == 5 ? 
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                            : 
                                                                            null
                                                                        }
                                                                    </td>
                                                                    <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                                        {data.role == 2 || data.role == 3 || data.role == 4 ?  
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                            : 
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ) 
                                                        } 
                                                        </tbody> 
                                                    )
                                                }
                                                    <tr style={{'borderTop' : '1px solid black', 'borderBottom' : '1px solid black'}}>
                                                        <td style={{'padding' : '10px 0px', 'width' : '60%'}}>
                                                            <b></b>
                                                        </td>
                                                        <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                            <b>{total_debet}</b>
                                                        </td>
                                                        <td style={{'padding' : '10px 0px', 'width' : '20%'}}>
                                                            <b>{total_kredit}</b>
                                                        </td>
                                                    </tr>
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