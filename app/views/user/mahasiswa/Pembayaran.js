import React, { Component } from "react";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import { BASE_URL } from "../../../config/config.js";
import CurrencyInput from "react-currency-input";
import moment from "moment";
import print from "print-js";
import { terbilang } from "../../../config/terbilang.js";

class Pembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pembayaran: {},
      mahasiswa: [],
      riwayat: [],
      tagihan: [],
      loading: true,
      selesai: false,
      check: false,
      kwitansi: [],
      tagihan: []
    };
  }

  componentDidMount() {
    const self = this;
    fetch(
      BASE_URL +
        "/api/mahasiswa/" +
        window.sessionStorage.getItem("user_id") +
        "/",
      {
        method: "GET",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState(
          {
            mahasiswa: data
          },
          () => {
            self.getTagihan();
          }
        );
      });

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
          riwayat: data.results
        });
      });
  }

  getTagihan = () => {
    const self = this;
    fetch(BASE_URL + "/api/tagihan/?mahasiswa=" + this.state.mahasiswa.nim, {
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
        let selesai = self.state.status;
        data.map(x => {
          selesai = x.status;
        });

        self.setState({
          tagihan: data,
          selesai,
          loading: false
        });
      });
  };

  getData = () => {
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
          riwayat: data.results
        });
      });
  };

  addPembayaran = () => {
    const self = this;

    let formData = new FormData();
    let pembayaran = { ...this.state.pembayaran };

    console.log(pembayaran.tagihan);

    formData.append("judul", "Pembayaran Mahasiswa");
    formData.append("tanggal_pembayaran", pembayaran.tanggal_pembayaran);
    formData.append("nominal", pembayaran.nominal);
    formData.append("bukti", pembayaran.bukti);
    formData.append("tagihan", pembayaran.tagihan);
    formData.append("bayar_kuliah", true);

    fetch(BASE_URL + "/api/pembayaran-mahasiswa/", {
      method: "post",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      },
      body: formData
    })
      .then(function(response) {
        if (response.status == 201) {
          toastr.success("Pembayaran telah dikirim", "Sukses ! ");
          self.setState({ pembayaran: {} });
        } else {
          toastr.warning("Pembayaran gagal dikirim", "Gagal ! ");
        }
        return response.json();
      })
      .then(function(data) {});
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  getKwitansi = data => {
    const self = this;
    console.log(data);
    self.setState(
      {
        kwitansi: data
      },
      () => {
        self.setState({ check: true });
        setTimeout(() => {
          self.exportData();
        }, 100);
      }
    );
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
    let total = 0;
    console.log(this.state.selesai);
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Pembayaran Mahasiswa</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Pembayaran</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4" />
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="tabs-container">
              <ul className="nav nav-tabs" role="tablist">
                <li className="active">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tab-1"
                  >
                    {" "}
                    Konfirmasi Pembayaran
                  </a>
                </li>
                <li onClick={this.getData}>
                  <a className="nav-link" data-toggle="tab" href="#tab-2">
                    Riwayat Pembayaran
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" id="tab-1" className="tab-pane active">
                  <div className="panel-body">
                    <div className="ibox-content">
                      {!this.state.selesai ? (
                        this.state.loading ? (
                          <div className="spiner-example">
                            <div className="sk-spinner sk-spinner-double-bounce">
                              <div className="sk-double-bounce1" />
                              <div className="sk-double-bounce2" />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="form-group row">
                              <label className="col-lg-2 col-form-label">
                                TANGGAL TRANSFER
                              </label>
                              <div className="col-lg-4">
                                <input
                                  type="date"
                                  disabled=""
                                  value={
                                    this.state.pembayaran.tanggal_pembayaran
                                  }
                                  onChange={e => {
                                    let pembayaran = {
                                      ...this.state.pembayaran
                                    };
                                    pembayaran.tanggal_pembayaran =
                                      e.target.value;
                                    this.setState({ pembayaran });
                                  }}
                                  name="pekerjaan_ayah"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="hr-line-dashed" />
                            <div className="form-group row">
                              <label className="col-lg-2 col-form-label">
                                TAGIHAN
                              </label>
                              <div className="col-lg-4">
                                <CurrencyInput
                                  precision="0"
                                  className="form-control m-b"
                                  prefix="Rp "
                                  disabled="disabled"
                                  value={
                                    this.state.tagihan.length != 0
                                      ? this.state.tagihan.find(
                                          data =>
                                            data.mahasiswa ==
                                              this.state.mahasiswa.id &&
                                            data.status == false
                                        ).nominal
                                      : null
                                  }
                                />
                              </div>
                            </div>

                            <div className="hr-line-dashed" />
                            <div className="form-group row">
                              <label className="col-lg-2 col-form-label">
                                NOMINAL
                              </label>
                              <div className="col-lg-4">
                                <CurrencyInput
                                  precision="0"
                                  className="form-control m-b"
                                  prefix="Rp "
                                  value={this.state.pembayaran.nominal}
                                  onChangeEvent={(
                                    e,
                                    maskedvalue,
                                    floatvalue
                                  ) => {
                                    let pembayaran = {
                                      ...this.state.pembayaran
                                    };
                                    pembayaran.nominal = floatvalue;
                                    this.setState({ pembayaran });
                                  }}
                                />
                              </div>
                            </div>

                            <div className="hr-line-dashed" />
                            <div className="form-group row">
                              <label className="col-lg-2 col-form-label">
                                BUKTI TRANSFER
                              </label>
                              <div className="col-lg-4">
                                <input
                                  type="file"
                                  disabled=""
                                  onChange={e => {
                                    let pembayaran = {
                                      ...this.state.pembayaran
                                    };
                                    pembayaran.bukti = e.target.files[0];
                                    this.setState({ pembayaran });
                                  }}
                                  name="pekerjaan_ibu"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="hr-line-dashed" />
                            <div className="form-group row">
                              <label className="col-lg-2 col-form-label">
                                Masa Tagihan
                              </label>
                              <div className="col-lg-4">
                                <select
                                  onChange={e => {
                                    let pembayaran = {
                                      ...this.state.pembayaran
                                    };
                                    pembayaran.tagihan = e.target.value;
                                    this.setState({ pembayaran });
                                  }}
                                  className="form-control m-b"
                                >
                                  <option value="">Pilih Masa Tagihan</option>
                                  {this.state.tagihan
                                    .filter(
                                      data =>
                                        data.mahasiswa ==
                                          this.state.mahasiswa.id &&
                                        data.status == false
                                    )
                                    .map((tagihan, key) => (
                                      <option value={tagihan.id}>
                                        Bulan{" "}
                                        {moment(tagihan.tanggal).format(
                                          "MM-YYYY"
                                        )}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>

                            <div className="hr-line-dashed" />
                            <div className="form-group row">
                              <div className="col-sm-4 col-sm-offset-2">
                                <button
                                  onClick={this.addPembayaran}
                                  className="btn btn-primary btn-sm"
                                  type="submit"
                                >
                                  KIRIM
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        "Pembayaran Selesai"
                      )}
                    </div>
                  </div>
                </div>

                <div role="tabpanel" id="tab-2" className="tab-pane">
                  <div className="panel-body">
                    <div className="table-responsive m-t">
                      <h4>
                        Total Bayar Mahasiswa : Rp.{" "}
                        {this.state.mahasiswa.length != 0
                          ? this.formatNumber(this.state.mahasiswa.total_bayar)
                          : null}
                      </h4>
                      <br/>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>NAMA</th>
                            <th>TANGGAL</th>
                            <th>NOMINAL (Rp.)</th>
                            <th>STATUS</th>
                            <th><center>CETAK</center></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.riwayat != 0 ? (
                            this.state.riwayat.map((data, key) => {
                              data.status == "verified"
                                ? (total += data.nominal)
                                : null;
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data.mahasiswa_info.nama}</td>
                                  <td>
                                    {moment(data.tanggal_pembayaran).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>{this.formatNumber(data.nominal)}</td>
                                  <td style={{ align: "center" }}>
                                    {data.status == "verified" ? (
                                      <span className="badge badge-primary">
                                        Sukses
                                      </span>
                                    ) : null}
                                    {data.status == "rejected" ? (
                                      <span className="badge badge-danger">
                                        Ditolak
                                      </span>
                                    ) : null}
                                    {data.status == "pending" ? (
                                      <span className="badge badge-warning">
                                        Menunggu
                                      </span>
                                    ) : null}
                                  </td>
                                  <td style={{ align: "center" }}>
                                    {data.status == "verified" ? (
                                      <center>
                                        <button
                                          onClick={() => {
                                            this.getKwitansi(data);
                                          }}
                                          className="btn btn-info btn-sm"
                                          type="button"
                                        >
                                          <i className="fa fa-print" />
                                        </button>
                                      </center>
                                    ) : null}{" "}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="6">BELUM ADA PEMBAYARAN</td>
                            </tr>
                          )}
                        </tbody>
                        <thead>
                          <tr>
                            <th colSpan="3">Total Telah Dibayar</th>
                            <th colSpan="3">{this.formatNumber(total)}</th>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th colSpan="3">Sisa Pembayaran</th>
                            <th colSpan="3">
                              {this.formatNumber(
                                parseFloat(this.state.mahasiswa.sisa_bayar)
                              )}
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "none" }}>
              <div className="row" id="print_data">
                <img
                  style={{
                    position: "absolute",
                    left: "270px",
                    top: "100px",
                    width: "50%",
                    height: "auto",
                    opacity: "0.3"
                  }}
                  src={logo}
                  alt="logo lpkn"
                />
                <table style={{ width: "100%" }}>
                  <tr style={{ height: "100px", border: "1px solid black" }}>
                    <td style={{ width: "20%", border: "1px solid black" }}>
                      <div className="text-center">
                        <img
                          style={{
                            marginLeft: "10px",
                            padding: "0px",
                            width: "100px"
                          }}
                          src={logo}
                          alt="logo lpkn"
                        />
                      </div>
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      <h2 className="text-center">KWITANSI BUKTI</h2>
                      <h2 className="text-center">
                        {this.state.check
                          ? this.state.kwitansi.transaksi[0].kwitansi[0].judul.toUpperCase()
                          : null}
                      </h2>
                    </td>
                    <td
                      style={{ width: "20%", border: "1px solid black" }}
                      className="text-center"
                    >
                      <h2>
                        No.{" "}
                        {this.state.check
                          ? this.state.kwitansi.transaksi[0].kwitansi[0].kode
                          : null}
                      </h2>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "8px 8px" }}>Telah Terima Dari</td>
                    <td colSpan="2" style={{ padding: "30px 0px 8px 8px" }} />
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 8px" }}>Nama</td>
                    <td
                      colSpan="2"
                      style={{
                        borderBottom: "1px dashed black",
                        padding: "8px 0px"
                      }}
                    >
                      :{" "}
                      {this.state.check
                        ? this.state.kwitansi.mahasiswa_info.nama
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 8px" }}>Nominal</td>
                    <td
                      colSpan="2"
                      style={{
                        borderBottom: "1px dashed black",
                        padding: "8px 0px"
                      }}
                    >
                      :{" "}
                      {this.state.check
                        ? this.formatNumber(
                            this.state.kwitansi.transaksi[0].kwitansi[0].nominal
                          )
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 8px" }}>Terbilang</td>
                    <td
                      colSpan="2"
                      style={{
                        borderBottom: "1px dashed black",
                        padding: "8px 0px"
                      }}
                    >
                      :{" "}
                      {this.state.check
                        ? terbilang(
                            this.state.kwitansi.transaksi[0].kwitansi[0].nominal
                          )
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 8px" }}>Program</td>
                    <td
                      colSpan="2"
                      style={{
                        borderBottom: "1px dashed black",
                        padding: "8px 0px"
                      }}
                    >
                      :{" "}
                      {this.state.check
                        ? this.state.kwitansi.transaksi[0].jurusan_info.nama
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 8px" }}>Keterangan</td>
                    <td
                      colSpan="2"
                      style={{
                        borderBottom: "1px dashed black",
                        padding: "8px 0px"
                      }}
                    >
                      :{" "}
                      {this.state.check
                        ? this.state.kwitansi.transaksi[0].kwitansi[0]
                            .keterangan
                        : null}
                    </td>
                  </tr>
                </table>
                <br />
                <div className="row">
                  <div className="col-md-4" />
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <p style={{ textAlign: "center" }}>
                      <b>Mataram, {moment(new Date()).format("DD-MM-YYYY")}</b>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="row">
                  <div className="col-md-3">
                    <p
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center"
                      }}
                    >
                      <b>Siswa yang bersangkutan</b>
                    </p>
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-3">
                    <p
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center"
                      }}
                    >
                      <b>Bagian Administrasi</b>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <p
                      style={{
                        borderBottom: "1px solid black",
                        textAlign: "center"
                      }}
                    >
                      <i>
                        Note: Lembar untuk siswa, lembar merah untuk lembaga,
                        hijau untuk arsip
                      </i>
                      <br />
                      <i>
                        Biaya yang dibayarkan tidak bisa ditarik kembali kecuali
                        ada perjanjian
                      </i>
                    </p>
                  </div>
                  <p style={{ textAlign: "center" }}>
                    Kampus : Jl. Pejanggik 60 Pajang Timur, Mataram, Tlp.
                    0370-632437 <br />
                    e-mail : lpknmataram@yahoo.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pembayaran;
