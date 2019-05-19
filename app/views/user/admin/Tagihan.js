import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import MonthPickerInput from "react-month-picker-input";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import "react-month-picker-input/dist/react-month-picker-input.css";
import { Link, Location } from "react-router";
import moment from "moment";
import print from "print-js";

class Tagihan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagihans: [],
      selectedStatus: 1,
      kampus: [],
      loading: true,
      jurusans: [],
      selectedKampus: "",
      selectedJurusan: "",
      selectedDate: "",
      selectedStatus: "",
      selectedTagihan: null,
      jurusans: [],
      num_pages: null,
      next: null,
      previous: null,
      count: null
    };
  }

  componentDidMount() {
    const self = this;
    fetch(BASE_URL + "/api/tagihan/", {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data)
        self.setState({
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          tagihans: data.results,
          loading: false
        });
      });

      fetch(BASE_URL + "/api/kampus/", {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          kampus: data.results
        });
      });

    fetch(BASE_URL + "/api/jurusan/", {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          jurusans: data.results
        });
      });
  }

  filterData = () => {
    const self = this;
    let date = this.state.selectedDate
    let status = this.state.selectedStatus
    let kampus = this.state.selectedKampus
    let jurusan = this.state.selectedJurusan

    this.setState({loading: true})

    fetch(BASE_URL + `/api/tagihan/?search=${date}&kampus=${kampus}&jurusan=${jurusan}&status=${status}`, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data)
        if (typeof data.results == "undefined") {
          self.setState({
            tagihans: data,
            loading: false
          });
        }else{
          self.setState({
            num_pages: data.num_pages,
            next: data.next,
            previous: data.previous,
            count: data.count,
            tagihans: data.results,
            loading: false
          });
        }
      });
  }

  getNextData = () => {
    const self = this;
    this.setState({loading: true})
    fetch(this.state.next, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          tagihans: data.results,
          loading: false
        });
      });
  }

  getPreviousData = () => {
    const self = this;
    this.setState({loading: true})
    fetch(this.state.previous, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          tagihans: data.results,
          loading: false
        });
      });
  }

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  exportData() {
    printJS({
      printable: "print_data",
      type: "html",
      modalMessage: "Sedang memuat data...",
      showModal: true,
      maxWidth: "1300",
      font: "TimesNewRoman",
      targetStyles: ["*"]
    });
  }

  render() {
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <h2>Tagihan Pembayaran</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Tagihan</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-2" />
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="ibox ">
              <div
                className="ibox-title"
                style={{ backgroundColor: "#1ab394", color: "white" }}
              >
                <h5>
                  {" "}
                  <i className="fa fa-list " /> List Tagihan Pembayaran
                </h5>
              </div>
              <div className="ibox-content">
                <div className="row">
                    <div className="col-lg-2">
                      <label className="form-label">Filter Kampus : </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label">Filter Jurusan : </label>
                    </div>
                    <div className="col-lg-2">
                      <label className="form-label">Tanggal : </label>
                    </div>
                    <div className="col-lg-2">
                      <label className="form-label">Status : </label>
                    </div>
                    <div className="col-lg-3">
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <select
                        value={this.state.selectedKampus}
                        onChange={e => {
                          this.setState({selectedKampus: e.target.value})
                        }}
                        className="form-control"
                      >
                        <option value="0">Semua Kampus</option>
                        {this.state.kampus.map((kampus, key) => (
                          <option key={key} value={kampus.id}>
                            {kampus.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-3">
                      <select
                        disabled={
                          this.state.selectedKampus == "" ? "disabled" : null
                        }
                        value={this.state.selectedJurusan}
                        onChange={e => {
                          this.setState({selectedJurusan: e.target.value})
                        }}
                        className="form-control"
                      >
                        <option value="0">Semua Jurusan</option>
                        {this.state.jurusans
                          .filter(
                            data =>
                              data.kampus_info.id == this.state.selectedKampus
                          )
                          .map((jurusan, key) => (
                            <option key={key} value={jurusan.id}>
                              {jurusan.nama}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-2">
                      <input
                        type="date"
                        disabled=""
                        placeholder="Nama Mahasiswa"
                        className="form-control"
                        value={this.state.selectedDate}
                        onChange={e => {
                          this.setState({selectedDate: e.target.value})
                        }}
                        
                      />
                    </div>
                    <div className="col-lg-2">
                      <select 
                        className="form-control" 
                        value={this.state.selectedStatus}
                        onChange={e => {
                          this.setState({selectedStatus: e.target.value})
                        }}
                        >
                        <option value="">--Pilih--</option>
                        <option value="1">Sudah Bayar</option>
                        <option value="0">Belum Bayar</option>
                    </select>
                    </div>
                    <div className="col-lg-3">
                      <button
                          onClick={this.filterData}
                          className="btn btn-info"
                          type="button"
                        >
                          <i className="fa fa-filter" /> Filter
                        </button>

                      <button
                          style={{marginLeft: '5px'}}
                          className="btn btn-warning"
                          type="button"
                        >
                          <i className="fa fa-close" /> Reset
                        </button>
                    </div>
                  </div>
                <div className="hr-line-dashed" />

                {this.state.loading ? (
                  <div className="spiner-example">
                    <div className="sk-spinner sk-spinner-double-bounce">
                      <div className="sk-double-bounce1" />
                      <div className="sk-double-bounce2" />
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped" align="right">
                      <thead>
                        <tr>
                          <th>NIM</th>
                          <th>NAMA</th>
                          <th>MASA</th>
                          <th>NOMINAL</th>
                          <th>STATUS</th>
                          {window.sessionStorage.getItem("user_id") == "5" ||
                          window.sessionStorage.getItem("user_id") == "3" ? (
                            <th>AKSI</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.tagihans.map((tagihan, key) => (
                          <tr key={key}>
                            <td>{tagihan.mahasiswa_info.nim}</td>
                            <td>{tagihan.mahasiswa_info.nama}</td>
                            <td>
                              {moment(tagihan.tanggal).format("DD-MM-YYYY")}
                            </td>
                            <td>
                              Rp.{" "}
                              {this.formatNumber(Math.round(tagihan.nominal))}
                            </td>
                            <td>
                              {tagihan.status ? (
                                <span className="badge badge-primary">
                                  Sudah Bayar
                                </span>
                              ) : (
                                <span className="badge badge-warning">
                                  Belum Bayar
                                </span>
                              )}
                            </td>
                            <td>
                            {window.sessionStorage.getItem("user_id") == "5" && !tagihan.status ||
                            window.sessionStorage.getItem("user_id") == "3" && !tagihan.status ? (
                              
                              <button
                                onClick={() => {
                                    this.setState({
                                        selectedTagihan: tagihan
                                    })
                                    setTimeout(() => {
                                        this.exportData()
                                    }, 100)
                                }}
                                className="btn btn-info btn-sm"
                                type="button"
                              >
                                <i className="fa fa-print" />
                              </button>
                              
                            ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="text-center">
                  <div className="btn-group">
                      <button disabled={ this.state.previous == null ? "disabled" : null} onClick={this.getPreviousData} className="btn btn-white" type="button"><i className="fa fa-chevron-left"></i> Sebelumnya </button>
                      <button disabled={ this.state.next == null ? "disabled" : null} onClick={this.getNextData} className="btn btn-white" type="button"> Selanjutnya <i className="fa fa-chevron-right"></i> </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display: 'none'}}>
        <div className="" id="print_data">
            <div className="row">
              <div className="col-sm-6">
                <h5>From:</h5>
                <address>
                  <strong>LPKN Training Center.</strong>
                  <br />
                  Kampus Mataram <br />
                  Jl. Pejanggik 60 Pajang Timur, Mataram
                  <br />
                  <abbr title="Phone">Tlp:</abbr> 0370-632437
                </address>
              </div>

              <div className="col-sm-6 text-right">
                <span>To:</span>
                <address>
                  <strong>{this.state.selectedTagihan != null ? this.state.selectedTagihan.mahasiswa_info.nama : null}</strong>
                  <br />
                  {this.state.selectedTagihan != null ? this.state.selectedTagihan.mahasiswa_info.nim : null}
                  <br />
                  {this.state.selectedTagihan != null ? this.state.jurusans.find(data => data.id == this.state.selectedTagihan.mahasiswa_info.jurusan).nama : null}
                  <br />
                </address>
                <p>
                  <span>
                    <strong>Invoice Date:</strong> {moment().format("DD-MM-YYYY")}
                  </span>
                  <br />
                  <span>
                    <strong>Due Date:</strong> 
                    {this.state.selectedTagihan != null ? moment(this.state.selectedTagihan.tanggal).format("DD-MM-YYYY") : null}
                  </span>
                </p>
              </div>
            </div>

            <img
                style={{
                  position: "absolute",
                  left: "270px",
                  top: "30px",
                  width: "50%",
                  height: "auto",
                  opacity: "0.3"
                }}
                src={logo}
                alt="logo lpkn"
              />

            <div className="">
              <table className="table invoice-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <strong>Pembayaran SPP Mahasiswa</strong>
                      </div>
                      <small>
                        Pembayaran SPP Bulan {this.state.selectedTagihan != null ? moment(this.state.selectedTagihan.tanggal).format("MMMM-YYYY") : null}
                      </small>
                    </td>
                    <td>Rp. {this.state.selectedTagihan != null ? this.formatNumber(this.state.selectedTagihan.nominal.toFixed(2)) : null}</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>

            <table className="table invoice-total">
              <tbody>
                <tr>
                  <td>
                    <strong>Sub Total :</strong>
                  </td>
                  <td>Rp. {this.state.selectedTagihan != null ? this.formatNumber(this.state.selectedTagihan.nominal.toFixed(2)) : null}</td>
                </tr>
                <tr>
                  <td>
                    <strong>TOTAL :</strong>
                  </td>
                  <td>Rp. {this.state.selectedTagihan != null ? this.formatNumber(this.state.selectedTagihan.nominal.toFixed(2)) : null}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
    );
  }
}

export default Tagihan;
