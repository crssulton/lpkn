import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import MonthPickerInput from "react-month-picker-input";
import "react-month-picker-input/dist/react-month-picker-input.css";
import { Link, Location } from "react-router";
import moment from "moment";

class Tagihan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagihans: [],
      selectedStatus: 1,
      kampus: [],
      jurusans: [],
      monthSelected: "05/19"
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
          tagihans: data,
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

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

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
                    <div className="col-lg-3">
                      <label className="form-label">Filter Kampus : </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label">Filter Jurusan : </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label">Tanggal : </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label">Status : </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3">
                      <select
                        value={this.state.selectedKampus}
                        onChange={e => {
                          if (e.target.value != "0") {
                            this.setState({
                              mahasiswasTmp: this.state.mahasiswas.filter(
                                data => data.kampus_info.id == e.target.value
                              ),
                              selectedKampus: e.target.value
                            });
                          } else {
                            let mahasiswas = this.state.mahasiswas;
                            this.setState({
                              mahasiswasTmp: mahasiswas,
                              selectedKampus: e.target.value
                            });
                          }
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
                          this.state.selectedKampus == "0" ? "disabled" : null
                        }
                        value={this.state.selectedJurusan}
                        onChange={e => {
                          if (e.target.value != "0") {
                            this.setState({
                              mahasiswasTmp: this.state.mahasiswas.filter(
                                data =>
                                  data.jurusan_info.id == e.target.value &&
                                  data.kampus_info.id ==
                                    this.state.selectedKampus
                              ),
                              selectedJurusan: e.target.value
                            });
                          } else {
                            let mahasiswas = this.state.mahasiswas.filter(
                              data =>
                                data.kampus_info.id == this.state.selectedKampus
                            );
                            this.setState({
                              mahasiswasTmp: mahasiswas,
                              selectedJurusan: e.target.value
                            });
                          }
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
                    <div className="col-lg-3">
                      <input
                        type="date"
                        disabled=""
                        placeholder="Nama Mahasiswa"
                        className="form-control"
                      />
                    </div>
                    <div className="col-lg-3">
                      <select 
                        className="form-control" 
                        value={this.state.selectedStatus} 
                        onChange={(e) => {
                            this.setState({selectedStatus: e.target.value}) 
                        }}
                        >
                        <option value="1">Sudah Bayar</option>
                        <option value="0">Belum Bayar</option>
                    </select>
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
                                <span className="badge badge-success">
                                  Sudah Bayar
                                </span>
                              ) : (
                                <span className="badge badge-warning">
                                  Belum Bayar
                                </span>
                              )}
                            </td>
                            {window.sessionStorage.getItem("user_id") == "5" ||
                            window.sessionStorage.getItem("user_id") == "3" ? (
                              <td>
                                <Link to={{ pathname: "invoice-print" }}>
                                  <button
                                    className="btn btn-info btn-sm"
                                    type="button"
                                  >
                                    <i className="fa fa-print" />
                                  </button>
                                </Link>
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tagihan;
