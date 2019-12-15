import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import 'react-day-picker/lib/style.css';
import MonthPickerInput from "react-month-picker-input";

class TransaksiBukuBesar extends Component {

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
    }

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

        fetch(BASE_URL + '/api/account/', {
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
                account: data
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
        console.log(this.state.buku_besar)
        return (
          <div>
              <div className="row wrapper border-bottom white-bg page-heading">
                  <div className="col-lg-8">
                      <h2>Transaksi Buku Besar</h2>
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
                                  <h5><i className="fa fa-list "></i> Transaksi Buku Besar</h5>
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
                                      </div>
                                      <div className="col-lg-4">

                                      </div>
                                      <div className="col-lg-2">
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
                                                <h3>TRANSAKSI BUKU BESAR</h3>
                                            </center>
                                            <br/>
                                            <br/>
                                            <table style={{'width': '100%'}}>
                                                <thead style={{
                                                    'borderTop': '2px solid black',
                                                    'borderBottom': '2px solid black'
                                                }}>
                                                <tr>
                                                    <th style={{'padding': '10px 0px', 'width': '60%'}}></th>
                                                    <th style={{'padding': '10px 0px', 'width': '20%'}}>DEBET</th>
                                                    <th style={{'padding': '10px 0px', 'width': '20%'}}>KREDIT</th>
                                                </tr>
                                                </thead>
                                            </table>
                                            <br/>

                                            <table style={{'width': '100%'}}>
                                                {
                                                    this.state.buku_besar.map((data, key) =>
                                                      data.account.map((account, key) =>
                                                        <tbody>
                                                        {
                                                            account.account_sumber_transaksi.length != 0 || account.account_tujuan_transaksi.length != 0 ?
                                                              <tr>
                                                                  <td style={{'padding': '10px 0px', 'width': '60%'}}>
                                                                      <b>{data.role_display} | {account.nama}</b>
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}></td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}></td>
                                                              </tr>
                                                              :
                                                              null
                                                        }
                                                        {
                                                            account.account_tujuan_transaksi.map((item, key) =>
                                                              <tr>
                                                                  <td style={{
                                                                      'padding': '10px 0px 10px 20px',
                                                                      'width': '60%'
                                                                  }}>
                                                                      {item.tanggal} | Entri Jurnal
                                                                      | {item.kode} | {item.uraian}
                                                                  </td>
                                                                  <td style={{
                                                                      'padding': '10px 0px',
                                                                      'width': '20%'
                                                                  }}>{data.role == 1 || data.role == 5 ? this.formatNumber(item.nominal) : null}</td>
                                                                  <td style={{
                                                                      'padding': '10px 0px',
                                                                      'width': '20%'
                                                                  }}>{data.role == 2 || data.role == 3 || data.role == 4 ? this.formatNumber(item.nominal) : null}</td>
                                                              </tr>
                                                            )
                                                        }
                                                        {
                                                            account.account_sumber_transaksi.map((item, key) =>
                                                              <tr>
                                                                  <td style={{
                                                                      'padding': '10px 0px 10px 20px',
                                                                      'width': '60%'
                                                                  }}>
                                                                      {item.tanggal} | Entri Jurnal
                                                                      | {item.kode} | {item.uraian}
                                                                  </td>
                                                                  <td style={{
                                                                      'padding': '10px 0px',
                                                                      'width': '20%'
                                                                  }}>{data.role == 1 || data.role == 5 ? this.formatNumber(item.nominal) : null}</td>
                                                                  <td style={{
                                                                      'padding': '10px 0px',
                                                                      'width': '20%'
                                                                  }}>{data.role == 2 || data.role == 3 || data.role == 4 ? this.formatNumber(item.nominal) : null}</td>
                                                              </tr>
                                                            )
                                                        }
                                                        {
                                                            account.account_sumber_transaksi.length != 0 || account.account_tujuan_transaksi.length != 0 ?
                                                              <tr style={{
                                                                  'borderTop': '1px solid black',
                                                                  'borderBottom': '1px solid black'
                                                              }}>
                                                                  <td style={{'padding': '10px 0px', 'width': '60%'}}>
                                                                      <b>Total - {account.nama} </b>
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                                      <b>{data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                          account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                          account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        "0.00"
                                                                      }</b>
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                                      <b>{data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                          account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                          account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        "0.00"
                                                                      }</b>
                                                                  </td>
                                                              </tr>
                                                              :
                                                              null
                                                        }
                                                        </tbody>
                                                      )
                                                    )
                                                }
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

export default TransaksiBukuBesar