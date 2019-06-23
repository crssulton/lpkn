import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import moment from "moment";
import "react-select/dist/react-select.css";
import { BASE_URL } from "../../../config/config.js";
import { Link, Location } from "react-router";
import CurrencyInput from "react-currency-input";

let account = [];

class Pengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pengajuan: [],
      loading: true,
      form: false,
      selected: null,
      pengajuanBaru: {},
      add: true,
      addForm: true,
      kampus: [],
      account: [],
      kampus: window.sessionStorage.getItem("kampus_id"),
      editpengajuan: {},
      checkbox: false,
      danaSebelumnya: {},
      newPengajuan: {},
      selectedPengajuan: null
    };
  }

  componentWillMount() {
    const self = this;

    fetch(BASE_URL + "/api/pengajuan-anggaran", {
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
          pengajuan: data.results,
          loading: !self.state.loading
        })
      });

    fetch(BASE_URL + "/api/account/", {
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
        self.setState({
          account: data
        });
      });

    fetch(BASE_URL + "/api/kampus", {
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
  }

  getPengajuanAnggaran = () => {
    const self = this;

    fetch(BASE_URL + "/api/pengajuan-anggaran", {
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
          pengajuan: data.results
        })
      });
  }

  verifiedAnggaranSebelumnya = () => {
    const self = this
    fetch(
        BASE_URL + "/api/pengajuan-anggaran/" + this.state.danaSebelumnya.id + "/verify/",
        {
          method: "post",
          headers: {
            Authorization: "JWT " + window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      )
        .then(function(response) {
          if (response.status == 200) {
            console.log("berhasil")
          }
        })
        .then(function(data) {});
  }

  handleChangeStatus = () => {
    const self = this;
    let selectedPengajuan = { ...this.state.selectedPengajuan };
    selectedPengajuan.approved = true;
    if (this.state.checkbox) {
      selectedPengajuan.transfer = selectedPengajuan.harga - this.state.danaSebelumnya.sisa
    }else{
      selectedPengajuan.transfer = selectedPengajuan.harga
    }

    swal({
      title: "Terima Pengajuan ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(change => {
      if (change) {
        fetch(
          BASE_URL + "/api/pengajuan-anggaran/" + selectedPengajuan.id + "/",
          {
            method: "patch",
            headers: {
              Authorization: "JWT " + window.sessionStorage.getItem("token"),
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(selectedPengajuan)
          }
        )
          .then(function(response) {
            if (response.status == 200) {
              toastr.success("Pengajuan berhasil di terima", "Sukses ! ");
              
              if (typeof self.state.danaSebelumnya != 'undefined') {
                self.verifiedAnggaranSebelumnya()
              }
              
              self.getPengajuanAnggaran()
              let pengajuan = [...self.state.pengajuan];
              pengajuan.find(
                data => data.id == selectedPengajuan.id
              ).approved = true;
              self.setState({ pengajuan });
            } else {
              toastr.warning("Mohon maaf,terjadi kesalahan", "Gagal ! ");
            }
          })
          .then(function(data) {});
      }
    });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {

    account = [...this.state.account];
    this.state.account.map((data, key) => {
      account[key].value = data.id;
      account[key].label = data.nama;
    });

    console.log(this.state.checkbox)

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Daftar Pengajuan Anggaran</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Pengajuan</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4" />
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="col-lg-12">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-list " /> Daftar Pengajuan Anggaran
                  </h5>
                </div>
                <div className="ibox-content">
                  <div className="row" />
                  <div className="hr-line-dashed" />
                  {this.state.loading ? (
                    <div className="spiner-example">
                      <div className="sk-spinner sk-spinner-double-bounce">
                        <div className="sk-double-bounce1" />
                        <div className="sk-double-bounce2" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <table className="table table-striped" align="right">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>NO</th>
                            <th style={{ width: "15%" }}>NAMA</th>
                            <th style={{ width: "10%" }}>NOMINAL</th>
                            <th style={{ width: "10%" }}>SISA</th>
                            <th style={{ width: "10%" }}>DIKIRIMKAN</th>
                            <th style={{ width: "15%" }}>URAIRAN</th>
                            <th style={{ width: "15%" }}>KAMPUS</th>
                            <th style={{ width: "10%" }}>STATUS</th>
                            <th style={{ width: "13%", textAlign: "center" }}>
                              AKSI
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.pengajuan.map((data, key) => (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>{data.nama}</td>
                              <td>{this.formatNumber(data.harga)}</td>
                              <td>{this.formatNumber(data.sisa)}</td>
                              <td>{this.formatNumber(data.transfer)}</td>
                              <td>{data.uraian}</td>
                              <td>{data.kampus_info.nama}</td>
                              <td>
                                {data.approved ? (
                                  data.verified ?
                                  <span className="badge badge-secondary">
                                    Expired
                                  </span>
                                  :
                                  <span className="badge badge-primary">
                                    Diterima
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    Menunggu
                                  </span>
                                )}
                              </td>
                              <td>
                                <center>
                                  <form className="form-inline">
                                    {data.approved == false ? (
                                      <button
                                        onClick={e => {
                                          this.setState({
                                            selectedPengajuan: data,
                                            danaSebelumnya: this.state.pengajuan.find(x => x.approved == true && x.kampus == data.kampus_info.id && x.verified == false)
                                          });
                                        }}
                                        data-toggle="modal"
                                        data-target="#ModalApproveAnggaran"
                                        style={{ margin: "0 0 0 5px" }}
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                      >
                                        <i className="fa fa-check" />
                                      </button>
                                    ) : (
                                      <Link
                                        to={{
                                          pathname: "anggaran",
                                          state: { pengajuan: data }
                                        }}
                                      >
                                        <button
                                          style={{ margin: "0 0 0 5px" }}
                                          className="btn btn-info btn-sm"
                                          type="button"
                                        >
                                          <i className="fa fa-eye" />
                                        </button>
                                      </Link>
                                    )}
                                  </form>
                                </center>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="modal inmodal"
              id="ModalApproveAnggaran"
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
                    <h4 className="modal-title">Approve Pengajuan</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Nama Pengajuan
                      </label>
                      <div className="col-lg-9">
                        <input
                          value={
                            this.state.selectedPengajuan != null
                              ? this.state.selectedPengajuan.nama
                              : null
                          }
                          disabled="disabled"
                          type="text"
                          className="form-control m-b"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Harga</label>
                      <div className="col-lg-9">
                        <CurrencyInput
                          precision="0"
                          className="form-control m-b"
                          prefix="Rp "
                          value={
                            this.state.selectedPengajuan != null
                              ? this.state.selectedPengajuan.harga
                              : null
                          }
                          onChangeEvent={(e, maskedvalue, floatvalue) => {
                            let selectedPengajuan = {
                              ...this.state.selectedPengajuan
                            };
                            selectedPengajuan.harga = floatvalue;
                            this.setState({ selectedPengajuan });
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Uraian</label>
                      <div className="col-lg-9">
                        <input
                          value={
                            this.state.selectedPengajuan != null
                              ? this.state.selectedPengajuan.uraian
                              : null
                          }
                          disabled="disabled"
                          type="text"
                          className="form-control m-b"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Sisa Anggaran Sebelumnya</label>
                      <div className="col-lg-9">
                        <CurrencyInput
                          precision="0"
                          className="form-control m-b"
                          prefix="Rp "
                          value={typeof this.state.danaSebelumnya != 'undefined' ? this.state.danaSebelumnya.sisa : "Kosong"}
                          disabled="disabled"
                        />
                      </div>
                    </div>
                    {
                    typeof this.state.danaSebelumnya != "undefined" ?
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label"></label>
                      <div className="col-lg-9">
                        <input
                          value={this.state.checkbox}
                          type="checkbox" 
                          onClick={(e) => {
                            this.setState({
                              checkbox: !this.state.checkbox
                            })
                          }}
                        /> 
                        {" "}
                        Gunakan sisa anggaran sebelumnya
                      </div>
                    </div>
                    :
                    null
                    }

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Dana Dikirimkan</label>
                      <div className="col-lg-9">
                        <CurrencyInput
                          precision="0"
                          className="form-control m-b"
                          prefix="Rp "
                          value={
                            this.state.selectedPengajuan != null
                              ? this.state.checkbox && typeof this.state.danaSebelumnya != "undefined" ?
                                this.state.selectedPengajuan.harga - this.state.danaSebelumnya.sisa : this.state.selectedPengajuan.harga
                              : null
                          }
                          onChangeEvent={(e, maskedvalue, floatvalue) => {
                            let selectedPengajuan = {
                              ...this.state.selectedPengajuan
                            };
                            selectedPengajuan.harga = floatvalue;
                            this.setState({ selectedPengajuan });
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Akun Sumber
                      </label>
                      <div className="col-lg-9">
                        <Select
                          name="form-field-name"
                          value={
                            this.state.selectedPengajuan != null
                              ? this.state.selectedPengajuan.account
                              : null
                          }
                          onChange={selectedOption => {
                            let selectedPengajuan = {
                              ...this.state.selectedPengajuan
                            };
                            selectedPengajuan.account = selectedOption.value;
                            this.setState({ selectedPengajuan });
                          }}
                          options={account}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={() => this.setState({checkbox: false})}
                      type="button"
                      className="btn btn-white"
                      data-dismiss="modal"
                    >
                      Tutup
                    </button>
                    <button
                      onClick={this.handleChangeStatus}
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
    );
  }
}

export default Pengajuan;
