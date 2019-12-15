import React, { Component } from "react";
import swal from "sweetalert";
import { BASE_URL } from "../../../config/config.js";
import CurrencyInput from "react-currency-input";
import { terbilang } from "../../../config/terbilang.js";
import Select from "react-select";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import moment from "moment";
import "react-select/dist/react-select.css";
import print from "print-js";
import {Link} from "react-router";

let account = [];
let account_tujuan = [];
let kelompok_account = [];

class Transaksi extends Component {
  constructor(props) {
    super(props);

    const { pengajuan } = this.props.location.state;

    this.state = {
      transaksi: [],
      account: [],
      kampus: [],
      pengajuan,
      kelompok_account: [],
      loading: true,
      accountKwitansi: null,
      form: false,
      check: false,
      kwitansi: [],
      selected: null,
      jurusans: [],
      transaksiBaru: {},
      add: true,
      addForm: true,
      jurusans: [],
      edittransaksi: {},
      sisa: 0,
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  componentDidMount() {
    const self = this;

    fetch(BASE_URL + "/api/transaksi/?anggaran="+this.state.pengajuan.id, {
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
          transaksi: data,
          loading: !self.state.loading
        });
      });

    fetch(
      BASE_URL +
        "/api/kampus/" +
        window.sessionStorage.getItem("kampus_id") +
        "/",
      {
        method: "get",
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
        self.setState({
          kampus: data
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

    fetch(BASE_URL + "/api/kelompok-account/", {
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
          kelompok_account: data.results
        });
      });
  }

  handleChangeKode = e => {
    let transaksi = [];
    transaksi = this.state.transaksi;
    transaksi.filter(data => data.id == this.state.selected)[0].kode =
      e.target.value;
    this.setState({
      transaksi,
      edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
    });
  };
  handleChangeUraian = e => {
    let transaksi = [];
    transaksi = this.state.transaksi;
    transaksi.filter(data => data.id == this.state.selected)[0].uraian =
      e.target.value;
    this.setState({
      transaksi,
      edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
    });
  };
  handleChangeNominal = e => {
    let transaksi = [];
    transaksi = this.state.transaksi;
    transaksi.filter(data => data.id == this.state.selected)[0].nominal =
      e.target.value;
    this.setState({
      transaksi,
      edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
    });
  };

  handleChangeTanggal = e => {
    let transaksi = [];
    transaksi = this.state.transaksi;
    transaksi.filter(data => data.id == this.state.selected)[0].tanggal =
      e.target.value;
    this.setState({
      transaksi,
      edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
    });
  };

  handleChangeAccount = selectedOption => {
    let transaksi = [];
    transaksi = this.state.transaksi;
    transaksi.filter(data => data.id == this.state.selected)[0].account =
      selectedOption.value;
    this.setState({
      transaksi,
      edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
    });
  };

  edittransaksi = () => {
    const self = this;
    let edittransaksi = this.state.edittransaksi;
    delete edittransaksi.id;
    self.setState({ edittransaksi });

    fetch(BASE_URL + "/api/transaksi/" + this.state.selected + "/", {
      method: "put",
      body: JSON.stringify(this.state.edittransaksi),
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(response) {
        if (response.status == 200) {
          toastr.success("transaksi berhasil diubah", "Sukses ! ");
          self.setState({
            addForm: !self.state.addForm
          });
        } else {
          toastr.warning("Gagal mengubah transaksi", "Gagal ! ");
        }
      })
      .then(function(data) {});
  };

  addtransaksiUraian = e => {
    let transaksiBaru = {};
    transaksiBaru = this.state.transaksiBaru;
    transaksiBaru.uraian = e.target.value;
    this.setState({ transaksiBaru });
  };
  addtransaksiTanggal = e => {
    let transaksiBaru = {};
    transaksiBaru = this.state.transaksiBaru;
    transaksiBaru.tanggal = e.target.value;
    this.setState({ transaksiBaru });
  };
  addtransaksiNominal = (e, maskedvalue, floatvalue) => {
    let transaksiBaru = {};
    transaksiBaru = this.state.transaksiBaru;
    transaksiBaru.nominal = floatvalue;
    this.setState({ transaksiBaru });
  };
  addtransaksiAkun = selectedOption => {
    if (selectedOption) {
      let transaksiBaru = {};
      transaksiBaru = this.state.transaksiBaru;
      transaksiBaru.account = selectedOption.value;
      this.setState({ transaksiBaru });
    }
  };
  addtransaksiKelompokAkun = selectedOption => {
    if (selectedOption) {
      let transaksiBaru = {};
      transaksiBaru = this.state.transaksiBaru;
      transaksiBaru.kelompok_account = selectedOption.value;
      this.setState({ transaksiBaru });
    }
  };
  addtransaksiKode = e => {
    let transaksiBaru = {};
    transaksiBaru = this.state.transaksiBaru;
    transaksiBaru.kode = e.target.value;
    this.setState({ transaksiBaru });
  };
  addtransaksiAkunAkunTujuan = selectedOption => {
    if (selectedOption) {
      let transaksiBaru = {};
      transaksiBaru = this.state.transaksiBaru;
      transaksiBaru.account = selectedOption.value;
      this.setState({ transaksiBaru });
    }
  };
  addtransaksiSaldoAwal = e => {
    let transaksiBaru = {};
    transaksiBaru = this.state.transaksiBaru;
    transaksiBaru.saldo_awal = e.target.value;
    this.setState({ transaksiBaru });
  };
  addtransaksiJurusan = e => {
    let transaksiBaru = {};
    transaksiBaru = this.state.transaksiBaru;
    transaksiBaru.jurusan = e.target.value;
    this.setState({ transaksiBaru });
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

  getPengajuanAnggaran = () => {
    const self = this

    fetch(BASE_URL + `/api/pengajuan-anggaran/${this.state.pengajuan.id}/`, {
        method: 'get',
        headers: {
            'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        self.setState({
            pengajuan: data
        })
    });
  }

  addtransaksi = () => {
    const self = this;
    let addButton = document.getElementsByClassName("btn-add");

    addButton[0].setAttribute("disabled", "disabled");

    let transaksiBaru = { ...this.state.transaksiBaru };

    if (transaksiBaru.nominal > this.getSisaAnggaran(this.state.pengajuan.harga, this.state.transaksi)) {
      swal({
        icon: 'warning',
        title: 'Nominal transaksi melebihi sisa anggaran'
      });
      addButton[0].removeAttribute("disabled");
      return;
    }

    transaksiBaru.transaksi_anggaran = true;
    transaksiBaru.account_tujuan = this.state.pengajuan.account_tujuan;
    transaksiBaru.anggaran = this.state.pengajuan.id;
    console.log(JSON.stringify(transaksiBaru))
    fetch(BASE_URL + "/api/transaksi/", {
      method: "post",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaksiBaru)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.id != null || data.id != undefined) {
          addButton[0].removeAttribute("disabled");
          let transaksi = [];
          let transaksiBaru = {};
          transaksiBaru = self.state.transaksiBaru;

          self.getPengajuanAnggaran()

          transaksi = self.state.transaksi;
          transaksi.push(data);

          self.setState({accountKwitansi: transaksiBaru.account_tujuan})

          transaksiBaru.kode = null;
          transaksiBaru.uraian = null;
          transaksiBaru.tanggal = null;
          transaksiBaru.nominal = null;

          console.log(JSON.stringify(data))

          self.setState(
            {
              addForm: true,
              transaksi,
              transaksiBaru: {},
              kwitansi: data.kwitansi[0]
            },
            () => {
              self.setState({ check: true });
              setTimeout(() => {
                self.exportData();
              }, 100);
            }
          );

          toastr.success("Akun berhasil ditambahkan", "Sukses ! ");
        } else {
          addButton[0].removeAttribute("disabled");
          self.setState({
            addForm: true
          });
          toastr.warning("Gagal menambahkan Akun", "Gagal ! ");
        }
      });
  };

  handleDeleteTransaksi = (id, key) => {
    console.log(id);
    const self = this;
    swal({
      title: "Hapus Transaksi ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        fetch(BASE_URL + "/api/transaksi/" + id, {
          method: "delete",
          headers: {
            Authorization: "JWT " + window.sessionStorage.getItem("token")
          }
        })
          .then(function(response) {
            if (response.status == 204) {
              self.setState({
                transaksi: self.state.transaksi.filter(data => data.id !== id)
              });
              swal("Sukses! transaksi telah dihapus!", {
                icon: "success"
              });
            }
          })
          .then(function(data) {});
      }
    });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  getSisaAnggaran = (harga, transaksi) => {
    transaksi.filter(data => data.anggaran == this.state.pengajuan.id).map((anggaran) => {
      harga -= anggaran.nominal
    });

    return harga;
  }

  render() {
    kelompok_account = [...this.state.kelompok_account];
    this.state.kelompok_account.map((data, key) => {
      kelompok_account[key].value = data.id;
      kelompok_account[key].label = data.nama;
    });

    account = [...this.state.account];
    const { selectedOption } = this.state;
    this.state.account
      .filter(
        x => x.kelompok_account == this.state.transaksiBaru.kelompok_account
      )
      .map((data, key) => {
        account[key].value = data.id;
        account[key].label = data.nama;
      });

    account_tujuan = [...this.state.account];
    this.state.account.map((data, key) => {
      account_tujuan[key].value = data.id;
      account_tujuan[key].label = data.nama;
    });

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Daftar Transaksi Anggaran</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Transaksi</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4" />
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className={!this.state.pengajuan.verified ? "col-lg-8" : "col-lg-12"}>
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-list " /> Daftar Transaksi Anggaran
                  </h5>
                </div>

                <div className="ibox-content">
                  <Link to="/anggaran"><button className="btn btn-info btn-sm"><i className="fa fa-arrow-left"></i> Kembali</button></Link>
                  <div className="row">
                    <div className="col-lg-6" />
                  </div>
                  <div className="row">
                    <br/>
                    <div className="col-md-12">
                      <table style={{ width: "100%" }}>
                        <tr>
                          <td style={{ width: "20%" }}>Nama Pengajuan</td>
                          <td>: {this.state.pengajuan.nama}</td>
                        </tr>
                        <tr>
                          <td>Nominal</td>
                          <td>
                            : Rp.{" "}
                            {this.formatNumber(this.state.pengajuan.harga)}
                          </td>
                        </tr>
                        <tr>
                          <td>Sisa</td>
                          <td>
                            : Rp.{" "}
                            {this.formatNumber(this.getSisaAnggaran(this.state.pengajuan.harga, this.state.transaksi))}
                          </td>
                        </tr>
                      </table>
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
                    <div>
                      <table className="table table-striped" align="right">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>KODE</th>
                            <th style={{ width: "15%" }}>URAIAN</th>
                            <th style={{ width: "10%" }}>TANGGAL</th>
                            <th style={{ width: "10%" }}>NOMINAL</th>
                          {/*  {*/}
                          {/*  !this.state.pengajuan.verified ?*/}
                          {/*  <th style={{ width: "20%", textAlign: "center" }}>*/}
                          {/*    AKSI*/}
                          {/*  </th>*/}
                          {/*  : null*/}
                        	{/*}*/}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.transaksi
                            .filter(
                              data => data.anggaran == this.state.pengajuan.id
                            )
                            .map((data, key) => (
                              <tr key={key}>
                                <td>{data.kode}</td>
                                <td>{data.uraian}</td>
                                <td>{moment(data.tanggal).format("DD/MM/YYYY")}</td>
                                <td>Rp. {this.formatNumber(data.nominal)}</td>
                              {/*  {*/}
                              {/*  !this.state.pengajuan.verified ?*/}
                              {/*  <td>*/}
                              {/*    <center>*/}
                              {/*      <button*/}
                              {/*        style={{ margin: "0 5px" }}*/}
                              {/*        className="btn btn-info btn-sm"*/}
                              {/*        type="button"*/}
                              {/*        onClick={() => {*/}
                              {/*          this.setState({*/}
                              {/*            selected: data.id,*/}
                              {/*            addForm: false*/}
                              {/*          });*/}
                              {/*        }}*/}
                              {/*      >*/}
                              {/*        <i className="fa fa-edit" />*/}
                              {/*      </button>*/}

                              {/*      <button*/}
                              {/*        onClick={() =>*/}
                              {/*          this.handleDeleteTransaksi(data.id, key)*/}
                              {/*        }*/}
                              {/*        className="btn btn-danger btn-sm"*/}
                              {/*        type="button"*/}
                              {/*      >*/}
                              {/*        <i className="fa fa-trash" />*/}
                              {/*      </button>*/}
                              {/*    </center>*/}
                              {/*  </td>*/}
                              {/*  :*/}
                              {/*  null*/}
                            	{/*}*/}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {
            !this.state.pengajuan.verified ?
            <div className="col-lg-4">
              <div className="ibox ">
                {this.state.addForm ? (
                  <div
                    className="ibox-title"
                    style={{ backgroundColor: "#1ab394", color: "white" }}
                  >
                    <h5>
                      {" "}
                      <i className="fa fa-plus" /> Tambah Transaksi
                    </h5>
                  </div>
                ) : (
                  <div
                    className="ibox-title"
                    style={{ backgroundColor: "#fad284", color: "white" }}
                  >
                    <h5>
                      {" "}
                      <i className="fa fa-pencil" /> Ubah Transaksi
                    </h5>
                  </div>
                )}

                {this.state.addForm ? (
                  <div className="ibox-content">
                    {/*<div className="form-group row">*/}
                    {/*  <label className="col-lg-3 col-form-label">Kode</label>*/}
                    {/*  <div className="col-lg-9">*/}
                    {/*    <input*/}
                    {/*      type="text"*/}
                    {/*      className="form-control m-b"*/}
                    {/*      name="transaksi"*/}
                    {/*      value={this.state.transaksiBaru.kode}*/}
                    {/*      onChange={this.addtransaksiKode}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                      </label>
                      <div className="col-lg-9">
                        <small className="mb-0 text-success"><code>Akun untuk jenis pengeluaran.</code></small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                        Akun Tujuan
                      </label>
                      <div className="col-lg-9">
                        <Select
                          name="form-field-name"
                          value={this.state.transaksiBaru.account}
                          onChange={this.addtransaksiAkun}
                          options={account}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Uraian</label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control m-b"
                          name="transaksi"
                          value={this.state.transaksiBaru.uraian}
                          onChange={this.addtransaksiUraian}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Tanggal</label>
                      <div className="col-lg-9">
                        <input
                          type="date"
                          className="form-control m-b"
                          name="transaksi"
                          value={this.state.transaksiBaru.tanggal}
                          onChange={this.addtransaksiTanggal}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Nominal</label>
                      <div className="col-lg-9">
                        <CurrencyInput
                          precision="0"
                          className="form-control m-b"
                          prefix="Rp "
                          value={this.state.transaksiBaru.nominal}
                          onChangeEvent={this.addtransaksiNominal}
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-sm btn-add"
                      type="button"
                      onClick={this.addtransaksi}
                    >
                      Tambah
                    </button>
                  </div>
                ) : (
                  <div className="ibox-content">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Kode</label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control m-b"
                          name="transaksi"
                          value={
                            this.state.transaksi.filter(
                              data => data.id === this.state.selected
                            )[0].kode
                          }
                          onChange={this.handleChangeKode}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Akun</label>
                      <div className="col-lg-9">
                        <Select
                          name="form-field-name"
                          value={
                            this.state.transaksi.filter(
                              data => data.id === this.state.selected
                            )[0].account
                          }
                          onChange={this.handleChangeAccount}
                          options={account}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Uraian</label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className="form-control m-b"
                          name="transaksi"
                          value={
                            this.state.transaksi.filter(
                              data => data.id === this.state.selected
                            )[0].uraian
                          }
                          onChange={this.handleChangeUraian}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Tanggal</label>
                      <div className="col-lg-9">
                        <input
                          type="date"
                          className="form-control m-b"
                          name="transaksi"
                          value={
                            this.state.transaksi.filter(
                              data => data.id === this.state.selected
                            )[0].tanggal
                          }
                          onChange={this.handleChangeTanggal}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Nominal</label>
                      <div className="col-lg-9">
                        <input
                          type="number"
                          className="form-control m-b"
                          name="transaksi"
                          value={
                            this.state.transaksi.filter(
                              data => data.id === this.state.selected
                            )[0].nominal
                          }
                          onChange={this.handleChangeNominal}
                        />
                      </div>
                    </div>

                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-info btn-add"
                      type="button"
                      onClick={this.edittransaksi}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger "
                      type="button"
                      onClick={() => {
                        this.setState({ addForm: !this.state.addForm });
                      }}
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
            :
            null
        	}
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
                        ? this.state.kwitansi.judul.toUpperCase()
                        : "null"}
                    </h2>
                  </td>
                  <td
                    style={{ width: "20%", border: "1px solid black" }}
                    className="text-center"
                  >
                    <h2>
                      No. {this.state.check ? this.state.kwitansi.kode : null}
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
                    : Administrator {this.state.kampus.nama}
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
                    : Rp.{" "}
                    {this.state.check
                      ? this.formatNumber(this.state.kwitansi.nominal)
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
                    :
                    {this.state.check
                      ? terbilang(this.state.kwitansi.nominal)
                      : null}{" "}
                    rupiah
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
                    : {this.state.check
                        ? this.state.account.find(x => x.id == this.state.kwitansi.account).nama
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
                    : {this.state.check ? this.state.kwitansi.keterangan : null}
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
                      Mataram, {moment(new Date()).format("DD / MM / YYYY")}
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
                    <b>Yang bersangkutan</b>
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
                  Kampus : {this.state.kampus.alamat} <br />
                  e-mail : {this.state.kampus.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaksi;
