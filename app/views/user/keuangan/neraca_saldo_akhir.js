import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import MonthPickerInput from "react-month-picker-input";
import 'react-day-picker/lib/style.css';
import 'pickerjs/dist/picker.css';
import 'year-picker/css/yearpicker.css'
import 'year-picker/js/yearpicker.js'

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
            byBulan: false,
            byTahun: false,
            sum_debet: 0,
            sum_kredit: 0
        }



    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };

    componentDidMount = () => {
        $(".yearpicker").yearpicker({
            year: 2021,
            startYear: 2019,
            endYear: 2050
        });
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

    onFilterBulan = () => {
        const self = this;
        this.setState({loading: true, byTahun: false, byBulan: true});
        document.getElementById('year_selected').value = "";
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

    };

    onFilterTahun = () => {
        const self = this;
        let tahun = document.getElementById('year_selected').value;

        this.setState({loading: true, byTahun: true, byBulan: false, selectedYear: tahun});
        fetch(BASE_URL + `/api/buku-besar/?tahun=${this.state.selectedYear}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            document.getElementById('year_selected').value = tahun;
            self.setState({
                buku_besar: data,
                loading: !self.state.loading
            })
        });

    };

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };


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

        let total_pemasukan = 0;
        let total_pengeluaran = 0;
        let total_debet = 0;
        let total_kredit = 0;

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
        });

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Report Neraca Saldo</h2>
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
                                    <h5><i className="fa fa-list "></i> Report Neraca Saldo</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label className="col-sm-3 col-form-label">Filter Bulan </label>
                                            <div className="col-sm-5">
                                                <MonthPickerInput
                                                  closeOnSelect={true}
                                                  onChange={(
                                                    maskedValue,
                                                    selectedYear,
                                                    selectedMonth
                                                  ) => {
                                                      this.setState({selectedYear, selectedMonth});
                                                  }}
                                                />
                                            </div>
                                            <div className="col-sm-2">
                                                <button onClick={this.onFilterBulan} className="btn btn-info btn-sm pull-left"><i className="fa fa-filter"></i> Filter</button>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="col-sm-3 col-form-label">Filter Tahun </label>
                                            <div className="col-sm-5">
                                                <input
                                                  type="text"
                                                  className="yearpicker"
                                                  value=""
                                                  id="year_selected"/>
                                            </div>
                                            <div className="col-sm-2">
                                                <button onClick={this.onFilterTahun} className="btn btn-info btn-sm pull-left"><i className="fa fa-filter"></i> Filter</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br/><br/><br/>
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
                                                  <h3>
                                                      LAPORAN KEUANGAN LPKN
                                                      {
                                                          this.state.byBulan ?
                                                            " BULAN " + " " +this.getBulan(this.state.selectedMonth+1).toUpperCase() + " " +this.state.selectedYear
                                                            :
                                                            null
                                                      }
                                                      {
                                                          this.state.byTahun ?
                                                            " TAHUN " + " " + this.state.selectedYear
                                                            :
                                                            null
                                                      }
                                                  </h3>
                                                  <h3>NERACA SALDO</h3>
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
                                              <table style={{'width': '100%'}}>
                                                  {
                                                      this.state.buku_besar.filter(role => role.role == 4 || role.role == 5).map((data, key) =>
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan="3"><b>{data.nama}</b></td>
                                                        </tr>
                                                        {
                                                            data.account.map((account, key) =>
                                                              <tr>
                                                                  <td style={{'padding': '10px 35px', 'width': '60%'}}>
                                                                      {account.nama}
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                                      {data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                          account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                          account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        null
                                                                      }
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                                      {data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                          account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                          account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
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
                                                  <tr style={{
                                                      'borderTop': '1px solid black',
                                                      'borderBottom': '1px solid black'
                                                  }}>
                                                      <td style={{'padding': '10px 0px', 'width': '60%'}}>
                                                          <b>Laba (Rugi) Bersih</b>
                                                      </td>
                                                      <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                          <b>{total_pemasukan - total_pengeluaran < 0 ? "( " + this.formatNumber(total_pemasukan - total_pengeluaran) + " ) " : this.formatNumber(total_pemasukan - total_pengeluaran)}</b>
                                                      </td>
                                                      <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                          0.00
                                                      </td>
                                                  </tr>
                                              </table>
                                              <br/>
                                              <table style={{'width': '100%'}}>
                                                  {
                                                      this.state.buku_besar.filter(role => role.role == 1 || role.role == 2 || role.role == 3).map((data, key) =>
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan="3"><b>{data.nama}</b></td>
                                                        </tr>
                                                        {
                                                            data.account.map((account, key) =>
                                                              <tr>
                                                                  <td style={{'padding': '10px 35px', 'width': '60%'}}>
                                                                      {account.nama}
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                                      {data.role == 1 || data.role == 5 ?
                                                                        this.formatNumber(
                                                                          account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                          account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
                                                                        :
                                                                        null
                                                                      }
                                                                  </td>
                                                                  <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                                      {data.role == 2 || data.role == 3 || data.role == 4 ?
                                                                        this.formatNumber(
                                                                          account.total_nominal_account_sumber.account_sumber_transaksi__nominal__sum +
                                                                          account.total_nominal_account_tujuan.account_tujuan_transaksi__nominal__sum
                                                                        )
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
                                                  <tr style={{
                                                      'borderTop': '1px solid black',
                                                      'borderBottom': '1px solid black'
                                                  }}>
                                                      <td style={{'padding': '10px 0px', 'width': '60%'}}>
                                                          <b></b>
                                                      </td>
                                                      <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                          <b>{this.formatNumber(total_debet)}</b>
                                                      </td>
                                                      <td style={{'padding': '10px 0px', 'width': '20%'}}>
                                                          <b>{this.formatNumber(total_kredit)}</b>
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