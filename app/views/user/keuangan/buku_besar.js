import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

let total_pemasukan = 0
let total_pengeluaran = 0
let total_debet = 0
let total_kredit = 0

class NeracaSaldoAwal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buku_besar: [],
            account: [],
            kelompok_account: [],
            loading: true
        }
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    componentDidMount() {
        const self = this

        fetch(BASE_URL + '/api/buku-besar/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                buku_besar: data,
                loading: !self.state.loading
            })
        });

    }


    exportData() {
        printJS({
            printable: 'print_data',
            type: 'html',
            modalMessage: "Sedang memuat data...",
            showModal: true,
            maxWidth: '1300',
            font_size: '12pt',
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
                } else if (data.role == 3) {
                    total_kredit += account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum + account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                }
            })
        })

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Report Ringkasan Buku Besar</h2>
                    </div>
                    <div className="col-lg-4">
                        <div className="title-action">
                            <a onClick={() => this.exportData()} className="btn btn-primary"><i
                                className="fa fa-print"></i> Cetak </a>
                        </div>
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                    <h5><i className="fa fa-list "></i> Report Ringkasan Buku Besar</h5>
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
                                            <div className="col-lg-4">

                                            </div>
                                            <div className="col-lg-2">
                                                <div className="col-sm-12">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>

                                    <div id="print_data">
                                        <center>
                                            <h3>LAPORAN KEUANGAN LPKN PER 20 MEI 2019</h3>
                                            <h3>RINGKASAN BUKU BESAR</h3>
                                            <h3>BULAN JUNI 2019</h3>
                                        </center>
                                        <br/>
                                        <br/>
                                        <table style={{'width': '100%'}}>
                                            <thead style={{
                                                'borderTop': '2px solid black',
                                                'borderBottom': '2px solid black'
                                            }}>
                                            <tr>
                                                <th style={{'padding': '10px 0px', 'width': '30%'}}></th>
                                                <th style={{
                                                    'padding': '10px 0px',
                                                    'width': '15%',
                                                    textAlign: 'right'
                                                }}>Saldo Awal
                                                </th>
                                                <th style={{
                                                    'padding': '10px 0px',
                                                    'width': '15%',
                                                    textAlign: 'right'
                                                }}>Total Debet
                                                </th>
                                                <th style={{
                                                    'padding': '10px 0px',
                                                    'width': '15%',
                                                    textAlign: 'right'
                                                }}>Total Kredit
                                                </th>
                                                <th style={{
                                                    'padding': '10px 0px',
                                                    'width': '15%',
                                                    textAlign: 'right'
                                                }}>Mutasi Bersih
                                                </th>
                                                <th style={{
                                                    'padding': '10px 0px',
                                                    'width': '10%',
                                                    textAlign: 'right'
                                                }}>Saldo Akhir
                                                </th>
                                            </tr>
                                            </thead>
                                        </table>
                                        <table style={{'width': '100%'}}>
                                            {
                                                this.state.buku_besar.filter(role => role.role == 4 || role.role == 5).map((data, key) =>
                                                    <tbody>
                                                    <tr>
                                                        <td colSpan="6"><b>{data.nama}</b></td>
                                                    </tr>
                                                    {
                                                        data.account.map((account, key) =>
                                                            <tr>
                                                                <td style={{
                                                                    'padding': '10px 35px',
                                                                    'width': '30%',
                                                                    fontSize: '8pt'
                                                                }}>
                                                                    {account.nama}
                                                                </td>
                                                                <td>
                                                                </td>
                                                                <td style={{textAlign: 'right'}}>
                                                                    {data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        "-"
                                                                    }
                                                                </td>
                                                                <td style={{textAlign: 'right'}}>
                                                                    {data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        "-"
                                                                    }
                                                                </td>
                                                                <td style={{textAlign: 'right'}}>
                                                                    {data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        ) + " Db"
                                                                        :
                                                                        null
                                                                    }
                                                                    {data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        ) + " Kr"
                                                                        :
                                                                        null
                                                                    }
                                                                </td>
                                                                <td>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    </tbody>
                                                )
                                            }
                                            <tr style={{
                                                'borderTop': '1px solid black',
                                                'borderBottom': '1px solid black'
                                            }}>
                                                <td style={{'padding': '10px 0px', 'width': '30%'}}>
                                                    <b>Laba Bersih</b>
                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%', textAlign: 'right'}}>
                                                    <b>{total_pemasukan - total_pengeluaran < 0 ? "( " + this.formatNumber(total_pemasukan - total_pengeluaran) + " )" : this.formatNumber(total_pemasukan - total_pengeluaran)}</b>
                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

                                                </td>
                                            </tr>
                                        </table>
                                        <br/>
                                        <table style={{'width': '100%'}}>
                                            {
                                                this.state.buku_besar.filter(role => role.role == 1 || role.role == 2 || role.role == 3).map((data, key) =>
                                                    <tbody>
                                                    <tr>
                                                        <td colSpan="6"><b>{data.nama}</b></td>
                                                    </tr>
                                                    {
                                                        data.account.map((account, key) =>
                                                            <tr>
                                                                <td style={{'padding': '10px 35px', 'width': '30%'}}>
                                                                    {account.nama}
                                                                </td>
                                                                <td style={{
                                                                    'padding': '10px 35px',
                                                                    'width': '15%',
                                                                    textAlign: 'right'
                                                                }}>

                                                                </td>
                                                                <td style={{
                                                                    'padding': '10px 0px',
                                                                    'width': '15%',
                                                                    textAlign: 'right'
                                                                }}>
                                                                    {data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        "-"
                                                                    }
                                                                </td>
                                                                <td style={{
                                                                    'padding': '10px 0px',
                                                                    'width': '15%',
                                                                    textAlign: 'right'
                                                                }}>
                                                                    {data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        "-"
                                                                    }
                                                                </td>
                                                                <td style={{
                                                                    'padding': '10px 35px',
                                                                    'width': '15%',
                                                                    textAlign: 'right'
                                                                }}>
                                                                    {data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        ) + " Db"
                                                                        :
                                                                        null
                                                                    }
                                                                    {data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                            account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                            account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        ) + " Kr"
                                                                        :
                                                                        null
                                                                    }
                                                                </td>
                                                                <td style={{'padding': '10px 35px', 'width': '15%'}}>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    </tbody>
                                                )
                                            }
                                            <tr style={{
                                                'borderTop': '1px solid black',
                                                'borderBottom': '1px solid black'
                                            }}>
                                                <td style={{'padding': '10px 0px', 'width': '30%'}}>

                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%', textAlign: 'right'}}>
                                                    <b>{this.formatNumber(total_debet)}</b>
                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%', textAlign: 'right'}}>
                                                    <b>{this.formatNumber(total_kredit)}</b>
                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

                                                </td>
                                                <td style={{'padding': '10px 0px', 'width': '15%'}}>

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