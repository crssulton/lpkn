import React, { Component } from "react";
import swal from "sweetalert";
import { BASE_URL } from "../../../config/config.js";
import { Link, Location } from "react-router";
import Select from "react-select";
import moment from "moment";
import "react-select/dist/react-select.css";

let account = []

class Pengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pengajuan: [],
      loading: true,
      form: false,
      account: [],
      selectedData: {},
      selected: null,
      pengajuanBaru: {},
      add: true,
      addForm: true,
      editpengajuan: {},
      newPengajuan: {},
      account: []
    };
  }

  componentWillMount() {
    const self = this;

    fetch(BASE_URL + "/api/pengajuan/?gaji=1", {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data.results);
        self.setState({
          pengajuan: data.results,
          loading: !self.state.loading
        });
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

  }

  handleChangeStatus = () => {
    const self = this;

    let pengajuanBaru = {...this.state.pengajuanBaru}
    pengajuanBaru.verified = true

    swal({
      title: "Terima Pengajuan Gaji?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(change => {
      if (change) {
      	console.log(JSON.stringify(pengajuanBaru))
        fetch(
          BASE_URL + "/api/pengajuan/" + self.state.selectedData.id + "/",
          {
            method: "patch",
            headers: {
              Authorization: "JWT " + window.sessionStorage.getItem("token"),
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(pengajuanBaru)
          }
        )
          .then(function(response) {
            if (response.status == 200) {
              toastr.success("Pengajuan berhasil di terima", "Sukses ! ");
              let pengajuan = [...self.state.pengajuan];
              pengajuan.find(
                data => data.id == self.state.selectedData.id
              ).verified = true;
              self.setState({ pengajuan });
            } else {
              toastr.warning("Mohon maaf,terjadi kesalahan", "Gagal ! ");
            }
          })
          .then(function(data) {});

      }
    });
  };

  render() {

  	account = [...this.state.account]
      this.state.account.map((data, key) => {
      account[key].value = data.id
      account[key].label = data.nama
    })

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Daftar Pengajuan Gaji Pegawai</h2>
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
                    <i className="fa fa-list " /> Daftar Pengajuan Gaji
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
                            <th style={{ width: "15%" }}>KETERANGAN</th>
                            <th style={{ width: "15%" }}>KAMPUS</th>
                            <th style={{ width: "15%" }}>STATUS</th>
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
                              <td>{data.kampus_info.nama}</td>
                              <td>
                                {data.verified ? (
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
                                    {!data.verified ? (
                                      <button
                                        onClick={() =>
		                                    this.setState({ selectedData: data })
		                                  }
		                                  data-toggle="modal"
		                                  data-target="#ModalAkunTransaksi"
                                        style={{ margin: "0 0 0 5px" }}
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                      >
                                        <i className="fa fa-check" />
                                      </button>
                                    ) : null}
                                    <Link
                                      to={{
                                        pathname: "approve-gaji",
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
                    <h4 className="modal-title">Approve Pengajuan Gaji</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group row">
                      <label className="col-lg-2 col-form-label">
                        Akun Sumber
                      </label>
                      <div className="col-lg-10">
                        <Select
                          name="form-field-name"
                          value={this.state.pengajuanBaru.account}
                          onChange={selectedOption => {
                            let pengajuanBaru = {
                              ...this.state.pengajuanBaru
                            };
                            console.log(selectedOption.value)
                            pengajuanBaru.account =
                              selectedOption.value;
                            this.setState({ pengajuanBaru });
                          }}
                          options={account}
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
