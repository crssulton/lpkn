import React, { Component } from "react";
import { Link } from "react-router";
import swal from "sweetalert";
import Select from "react-select";
import moment from "moment";
import "react-select/dist/react-select.css";
import { BASE_URL } from "../../../config/config.js";

let account = []
let account_tujuan = []

class Approve extends Component {
  constructor(props) {
    super(props);

    let pembayaranBaru = {}
    pembayaranBaru.account = null
    pembayaranBaru.account_tujuan = null

    this.state = {
      approveStatus: "",
      pembayaran: [],
      account: [],
      fotoBukti: "",
      selectedData: null,
      num_pages: null,
      next: null,
      previous: null,
      count: null,
      jurusan: [],
      selectedJurusan: null,
      selectedMahasiswa: null,
      pembayaranBaru
    };
  }

  componentDidMount() {
    const self = this;
    fetch(BASE_URL + "/api/pembayaran-mahasiswa/", {
      method: "GET",
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
        self.setState({
          pembayaran: data.results,
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count
        });
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

        fetch(BASE_URL + '/api/jurusan/', {
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
            jurusan: data.results
          })
        });

  }

  getNextData = () => {
    const self = this;
    this.setState({ loading: true });
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
          pembayaran: data.results,
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          loading: false
        });
      });
  };

  getPreviousData = () => {
    const self = this;
    this.setState({ loading: true });
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
          pembayaran: data.results,
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          loading: false
        });
      });
  };

  handleApprove = () => {
    const self = this;

    swal({
      title: "Terima Pembayaran ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willApprove => {
      if (willApprove) {
        fetch(
          BASE_URL + "/api/pembayaran-mahasiswa/" + this.state.selectedData.id + "/",
          {
            method: "patch",
            headers: {
              Authorization: "JWT " + window.sessionStorage.getItem("token"),
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(this.state.pembayaranBaru)
          }
        )
          .then(function(response) {
            console.log(response);
            if (response.status == 200) {
              toastr.success(
                "Pembayaran telah di terima",
                "Sukses ! "
              );
              self.setState({
                pembayaranBaru:{},
                pembayaran: self.state.pembayaran.filter(data => data.id != self.state.selectedData.id)
              });
            } else {
              toastr.warning(
                "Pembayaran gagal di terima",
                "Gagal ! "
              );
            }
          })
          .then(function(data) {});
      }
    });
  };

  handleReject = (id) => {
    toastr.success(
    "Pembayaran telah di Tolak",
    "Sukses ! "
  );
  this.setState({
    pembayaran: this.state.pembayaran.filter(data => data.id != id)
  });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {

    account = [...this.state.account]
      this.state.account.map((data, key) => {
      account[key].value = data.id
      account[key].label = data.nama
    })

    account_tujuan = [...this.state.account]
      this.state.account.map((data, key) => {
      account[key].value = data.id
      account[key].label = data.nama
    })

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <h2>Approve Pembayaran</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/main">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                <strong>Approve</strong>
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
                  <i className="fa fa-list " /> List Pembayaran
                </h5>
              </div>
              <div className="ibox-content">
                <div className="row">
                    <div className="col-lg-4">
                      <label className="form-label">Filter Jurusan : </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label">NIM Mahasiswa : </label>
                    </div>
                    <div className="col-lg-3">
                      
                    </div>
                    <div className="col-lg-2">

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <select
                        value={this.state.selectedJurusan}
                        onChange={e => {
                          this.setState({selectedJurusan: e.target.value})
                        }}
                        className="form-control"
                      >
                        <option value="0">Semua Jurusan</option>
                        {this.state.jurusan
                          .map((jurusan, key) => (
                            <option key={key} value={jurusan.id}>
                              {jurusan.nama}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-3">
                      <input
                        type="text"
                        disabled=""
                        placeholder="NIM Mahasiswa"
                        className="form-control"
                        value={this.state.selectedMahasiswa}
                        onChange={e => {
                          this.setState({selectedMahasiswa: e.target.value})
                        }}
                        
                      />
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
                    <div className="col-lg-2">

                    </div>
                  </div>
                <div className="hr-line-dashed" />
                <div className="table-responsive">
                  <table className="table table-striped" align="right">
                    <thead>
                      <tr>
                        <th>NO.</th>
                        <th>NIM</th>
                        <th>NAMA</th>
                        <th>TANGGAL</th>
                        <th>NOMINAL</th>
                        <th>STATUS</th>
                        <th>
                          <center>FOTO</center>
                        </th>
                        <th>
                          <center>AKSI</center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.pembayaran
                        .filter(x => x.status == "pending")
                        .map((data, key) => (
                          <tr>
                            <td>{key + 1}</td>
                            <td>{data.mahasiswa_info.nim}</td>
                            <td>{data.mahasiswa_info.nama.toUpperCase()}</td>
                            <td>
                              {moment(data.tanggal_pembayaran).format(
                                "DD-MM-YYYY"
                              )}
                            </td>
                            <td>Rp. {this.formatNumber(data.nominal)}</td>
                            <td>{data.status.toUpperCase()}</td>
                            <td>
                              <center>
                                <button
                                  onClick={() =>
                                    this.setState({ fotoBukti: data.bukti })
                                  }
                                  data-toggle="modal"
                                  data-target="#myModal"
                                  className="btn btn-info btn-sm"
                                  type="button"
                                >
                                  <i className="fa fa-image" />
                                </button>
                              </center>
                            </td>
                            <td>
                              <center>
                                <button
                                  onClick={() =>
                                    this.setState({ selectedData: data })
                                  }
                                  data-toggle="modal"
                                  data-target="#ModalAkunTransaksi"
                                  className="btn btn-primary btn-sm"
                                  type="button"
                                >
                                  <i className="fa fa-check" />
                                </button>
                                <button
                                  style={{ marginLeft: "5px" }}
                                  onClick={() =>
                                    this.handleReject(data.id)
                                  }
                                  className="btn btn-danger btn-sm"
                                  type="button"
                                >
                                  <i className="fa fa-close" />
                                </button>
                              </center>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="text-center">
                    <div className="btn-group">
                      <button
                        disabled={
                          this.state.previous == null ? "disabled" : null
                        }
                        onClick={this.getPreviousData}
                        className="btn btn-white"
                        type="button"
                      >
                        <i className="fa fa-chevron-left" /> Sebelumnya{" "}
                      </button>
                      <button
                        disabled={this.state.next == null ? "disabled" : null}
                        onClick={this.getNextData}
                        className="btn btn-white"
                        type="button"
                      >
                        {" "}
                        Selanjutnya <i className="fa fa-chevron-right" />{" "}
                      </button>
                    </div>
                  </div>
                  <div
                    className="modal inmodal"
                    id="myModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content animated bounceInRight">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                          </button>
                          <h4 className="modal-title">Bukti Pembayaran</h4>
                        </div>
                        <div className="modal-body">
                          <center>
                            <img
                              src={this.state.fotoBukti}
                              style={{ width: "100%" }}
                            />
                          </center>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-white"
                            data-dismiss="modal"
                          >
                            Tutup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal inmodal"
                    id="ModalAkunTransaksi"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content animated bounceInRight">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                          </button>
                          <h4 className="modal-title">Pilih Akun Transaksi</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                              <label className="col-lg-2 col-form-label">Akun Tujuan</label>
                              <div className="col-lg-10">
                                <Select
                                  name="form-field-name"
                                  value={this.state.pembayaranBaru.account_tujuan}
                                  onChange={(selectedOption) => {
                                    let pembayaranBaru = {...this.state.pembayaranBaru}
                                    pembayaranBaru.account_tujuan = selectedOption.value;
                                    pembayaranBaru.account = 16
                                    this.setState({ pembayaranBaru });
                                  }}
                                  options={account_tujuan}
                                />
                              </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-white"
                            data-dismiss="modal"
                          >
                            Tutup
                          </button>
                          <button
                            onClick={this.handleApprove}
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Terima
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Approve;
