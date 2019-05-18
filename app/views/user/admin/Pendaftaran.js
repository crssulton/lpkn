import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import CurrencyInput from "react-currency-input";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import print from "print-js";
import moment from "moment";
import Select from "react-select";
import "react-select/dist/react-select.css";

let account = [];
let accountTujuan = [];

class Pendaftaran extends Component {
  constructor(props) {
    super(props);

    let pendaftar = {};
    pendaftar.biaya_pendaftaran = "true";

    this.state = {
      jurusans: [],
      kampus: [],
      namaKwintansi: "",
      pendaftar,
      check: false,
      kwitansi: [],
      loading: false,
      account: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const self = this;
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

  componentDidMount = () => {
    const self = this;

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

  handleSubmit = e => {
    const self = this;
    self.setState({
      loading: !this.state.loading
    });
    let pendaftar = { ...this.state.pendaftar };
    if (pendaftar.biaya_pendaftaran == true) {
      pendaftar.biaya_pendaftaran_nominal = 250000;
    }

    console.log(JSON.stringify(pendaftar));
    fetch(BASE_URL + "/api/pendaftaran/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      },
      body: JSON.stringify(pendaftar)
    })
      .then(function(response) {
        if (response.status === 201 || response.status === 200) {
          pendaftar.nama = null;
          pendaftar.alamat = null;
          pendaftar.tempat_lahir = null;
          pendaftar.no_hp = null;
          pendaftar.email = null;
          pendaftar.asal_sekolah = null;
          pendaftar.total_bayar = null;
          pendaftar.dp = false;
          pendaftar.dp_nominal = null;
          pendaftar.biaya_pendaftaran = "true";
          pendaftar.keterangan = null;

          toastr.success("Data mahasiswa berhasil ditambahkan", "Sukses ! ");
          self.setState({
            check: false,
            loading: !self.state.loading,
            alert: !self.state.alert,
            pendaftar
          });
        } else {
          toastr.error("Data mahasiswa gagal ditambahkan", "Error ! ");
          self.setState({
            loading: !self.state.loading
          });
        }
        return response.json();
      })
      .then(function(data) {
        console.log(JSON.stringify(data))
        if (data.id != null) {
          self.setState(
            {
              kwitansi: data
            },
            () => {
              if (typeof(data.transaksi[0]) !== 'undefined'){
                self.setState({check: true})
                setTimeout(() => {
                  self.exportData()
                }, 100)
              }
            }
          );
        }
      });
  };

  render() {
    account = [...this.state.account];
    this.state.account.map((data, key) => {
      account[key].value = data.id;
      account[key].label = data.nama;
    });

    accountTujuan = [...this.state.account];
    this.state.account.map((data, key) => {
      account[key].value = data.id;
      account[key].label = data.nama;
    });

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Pendaftaran Manual Mahasiswa</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Pendaftaran</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4" />
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5> Data Pendaftar</h5>
                </div>
                <div className="ibox-content">
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
                        <tr
                          style={{ height: "100px", border: "1px solid black" }}
                        >
                          <td
                            style={{ width: "20%", border: "1px solid black" }}
                          >
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
                          <td style={{ padding: "8px 8px" }}>
                            Telah Terima Dari
                          </td>
                          <td
                            colSpan="2"
                            style={{ padding: "30px 0px 8px 8px" }}
                          />
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
                              ? this.state.kwitansi.nama
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
                            : Rp. 250.000
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
                            : Dua ratus lima puluh ribu rupiah
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
                              ? this.state.kwitansi.jurusan_info.nama
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
                              ? this.state.kwitansi.transaksi[0].kwitansi[0].keterangan
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
                            <b>
                              Mataram, {moment(new Date()).format("DD-MM-YYYY")}
                            </b>
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
                              Note: Lembar untuk siswa, lembar merah untuk
                              lembaga, hijau untuk arsip
                            </i>
                            <br />
                            <i>
                              Biaya yang dibayarkan tidak bisa ditarik kembali
                              kecuali ada perjanjian
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

                  <div className="form-group row">
                    <div className="col-lg-6">
                      <label className="col-lg-4 col-form-label">Nama</label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.nama}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.nama = e.target.value;
                            pendaftar.namaKwintansi = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          type="text"
                          className="form-control m-b"
                          name="nama"
                        />
                      </div>
                      <label className="col-lg-4 col-form-label">Alamat</label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.alamat}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.alamat = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          style={{ width: "100%", height: "50px" }}
                          className="form-control m-b"
                          name="alamat"
                        />
                      </div>
                      <label className="col-lg-4 col-form-label">
                        Tempat Lahir
                      </label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.tempat_lahir}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.tempat_lahir = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          type="text"
                          className="form-control m-b"
                          name="tempat_lahir"
                        />
                      </div>
                      <label className="col-lg-4 col-form-label">
                        Tanggal Lahir
                      </label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.tgl_lahir}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.tgl_lahir = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          type="date"
                          className="form-control m-b"
                          name="tgl_lahir"
                        />
                      </div>
                      <label className="col-lg-4 col-form-label">
                        Jenis Kelamin
                      </label>
                      <div className="text-right col-lg-8">
                        <select
                          className="form-control m-b"
                          value={this.state.pendaftar.jenis_kelamin}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.jenis_kelamin = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          name="jenis_kelamin"
                        >
                          <option>Pilih</option>
                          <option value="L">Laki - Laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <label className="col-lg-4 col-form-label">Agama</label>
                      <div className="text-right col-lg-8">
                        <select
                          id="agama"
                          name="agama"
                          className="form-control m-b"
                          value={this.state.pendaftar.agama}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.agama = e.target.value;
                            this.setState({ pendaftar });
                          }}
                        >
                          <option value="">Pilih Agama</option>
                          <option value="islam">Islam</option>
                          <option value="hindu">Hindu</option>
                          <option value="budha">Budha</option>
                          <option value="protestan">Protestan</option>
                          <option value="katolik">Katolik</option>
                          <option value="konghucu">Konghucu</option>
                        </select>
                      </div>

                      <label className="col-lg-4 col-form-label">
                        Email
                      </label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.email}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.email = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          type="email"
                          className="form-control m-b"
                          name="tgl_lahir"
                        />
                      </div>

                      <label className="col-lg-4 col-form-label">No. Hp</label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.no_hp}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.no_hp = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          type="text"
                          className="form-control m-b"
                          name="no_hp"
                        />
                      </div>

                      <label className="col-lg-4 col-form-label">
                        Asal Sekolah
                      </label>
                      <div className="text-right col-lg-8">
                        <input
                          value={this.state.pendaftar.asal_sekolah}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.asal_sekolah = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          type="text"
                          className="form-control m-b"
                          name="asal_sekolah"
                        />
                      </div>
                      <label className="col-lg-4 col-form-label">Jurusan</label>
                      <div className="text-right col-lg-8">
                        <select
                          value={this.state.pendaftar.jurusan}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.jurusan = e.target.value;
                            pendaftar.nama_jurusan = this.state.jurusans.find(
                              data => data.id == e.target.value
                            ).nama;
                            this.setState({ pendaftar });
                          }}
                          id="jurusan"
                          name="jurusan"
                          className="form-control m-b"
                        >
                          <option value="">Pilih Jurusan</option>
                          {this.state.jurusans.map((jurusan, i) => (
                            <option key={i} value={jurusan.id}>
                              {jurusan.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5> Biaya Pendaftaran</h5>
                </div>
                <div className="ibox-content">
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <label className="col-lg-4 col-form-label">
                        Biaya Pendaftaran
                      </label>
                      <div className="text-right col-lg-8">
                        <select
                          value={this.state.pendaftar.biaya_pendaftaran}
                          onChange={e => {
                            let pendaftar = [];
                            pendaftar = this.state.pendaftar;
                            pendaftar.biaya_pendaftaran = e.target.value;
                            this.setState({ pendaftar });
                          }}
                          id="jurusan"
                          name="jurusan"
                          defaultValue={true}
                          className="form-control m-b"
                        >
                          <option value={true}>Ya</option>
                          <option value={false}>Tidak</option>
                        </select>
                      </div>
                      {this.state.pendaftar.biaya_pendaftaran != "true" ? (
                        <div>
                          <label className="col-lg-4 col-form-label">
                            Keterangan
                          </label>
                          <div className="text-right col-lg-8">
                            <input
                              type="text"
                              className="form-control m-b"
                              value={this.state.pendaftar.keterangan}
                              onChange={e => {
                                let pendaftar = [];
                                pendaftar = this.state.pendaftar;
                                pendaftar.keterangan = e.target.value;
                                this.setState({ pendaftar });
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="col-lg-4 col-form-label">
                            Akun Sumber
                          </label>
                          <div className="text-right col-lg-8">
                            <Select
                              name="form-field-name"
                              value={this.state.pendaftar.account}
                              onChange={selectedOption => {
                                let pendaftar = [];
                                pendaftar = this.state.pendaftar;
                                pendaftar.account = selectedOption.value;
                                this.setState({ pendaftar });
                              }}
                              options={account}
                            />
                          </div>

                          <label className="col-lg-4 col-form-label" />
                          <div className="text-right col-lg-8">
                            <input
                              style={{ visibility: "hidden" }}
                              type="text"
                            />
                          </div>

                          <label className="col-lg-4 col-form-label">
                            Akun Tujuan
                          </label>
                          <div className="text-right col-lg-8">
                            <Select
                              name="form-field-name"
                              value={this.state.pendaftar.account_tujuan}
                              onChange={selectedOption => {
                                let pendaftar = [];
                                pendaftar = this.state.pendaftar;
                                pendaftar.account_tujuan = selectedOption.value;
                                this.setState({ pendaftar });
                              }}
                              options={accountTujuan}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-9" />
                    <div className="text-right col-lg-3">
                      <button
                        className="btn btn-primary block full-width m-b"
                        onClick={this.handleSubmit}
                      >
                        {this.state.loading ? (
                          "Loading..."
                        ) : (
                          <i className="fa fa-plus"> Tambah </i>
                        )}
                      </button>
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

export default Pendaftaran;
