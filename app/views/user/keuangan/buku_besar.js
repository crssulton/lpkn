import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import 'react-day-picker/lib/style.css';
import MonthPickerInput from "react-month-picker-input";

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
            loading: false,
            selectedYear: "",
            selectedMonth: "",
        }
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };

    getBulan = (bulan ) => {
        if (bulan == 1) return "Januari";
        if (bulan == 2) return "Februari";
        if (bulan == 3) return "Maret";
        if (bulan == 4) return "April";
        if (bulan == 5) return "Mei";
        if (bulan == 6) return "Juni";
        if (bulan == 7) return "Juli";
        if (bulan == 8) return "Agustus";
        if (bulan == 9) return "September";
        if (bulan == 10) return "Oktober";
        if (bulan == 11) return "November";
        if (bulan == 12) return "Desember";
    };


    onFilter = () => {
        const self = this;
        this.setState({loading: true});
        fetch(BASE_URL + `/api/buku-besar/?tahun=${this.state.selectedYear}&bulan=${this.state.selectedMonth+1}`, {
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
                                <div className="alert alert-danger" role="alert">
                                    <p className="mb-0">** Perhatian! Silahkan filter data berdasarkan Bulan & Tahun
                                        terlebih dahulu ! .</p>
                                </div>
                                <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                    <h5><i className="fa fa-list "></i> Report Ringkasan Buku Besar</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label className="col-sm-4 col-form-label">Filter : </label>
                                            <div className="col-sm-8">
                                                <MonthPickerInput
                                                  closeOnSelect={true}
                                                  onChange={(
                                                    maskedValue,
                                                    selectedYear,
                                                    selectedMonth
                                                  ) => {
                                                      this.setState({selectedYear, selectedMonth}, () => {
                                                          this.onFilter()
                                                      });
                                                  }}
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
                                    {
                                        this.state.loading ?
                                          <div className="spiner-example">
                                              <div className="sk-spinner sk-spinner-double-bounce">
                                                  <div className="sk-double-bounce1"></div>
                                                  <div className="sk-double-bounce2"></div>
                                              </div>
                                          </div>
                                          :
                                          <div id="print_data">
                                              <center>
                                                  <h3>LAPORAN KEUANGAN LPKN BULAN {this.getBulan(this.state.selectedMonth+1).toUpperCase()} {this.state.selectedYear}</h3>
                                                  <h3>RINGKASAN BUKU BESAR</h3>
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

export default NeracaSaldoAwal