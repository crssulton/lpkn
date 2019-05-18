import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import CurrencyInput from "react-currency-input";
import Select from "react-select";
import moment from "moment";
import "react-select/dist/react-select.css";

let mahasiswa = []
let account = []
let accountTujuan = []

class Tagihan extends Component {
  constructor(props) {
    super(props);

    let pembayaran = {}
    pembayaran.bayar_kuliah = "false"

    this.state = {
      pembayaran,
      biaya_pendidikan: false,
      mahasiswa: [],
      riwayat: [],
      account: [],
      tagihan: []
    };
  }

  componentWillMount() {
    const self = this;
    fetch(BASE_URL + "/api/mahasiswa/", {
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
          mahasiswa: data.results.filter(data => data.calon == false)
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

    fetch(BASE_URL + '/api/tagihan/', {
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
        tagihan: data
      })
    });

  }

  addPembayaran = () => {
    const self = this;
    let pembayaran = { ...this.state.pembayaran };
    pembayaran.judul = "Pembayaran SPP Mahasiswa";
    console.log(JSON.stringify(pembayaran));
    fetch(BASE_URL + "/api/pembayaran-mahasiswa/", {
      method: "post",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(pembayaran)
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

  render() {

    console.log(this.state.pembayaran.mahasiswa)

    account = [...this.state.account]
      this.state.account.map((data, key) => {
      account[key].value = data.id
      account[key].label = data.nama
    })

    accountTujuan = [...this.state.account]
      this.state.account.map((data, key) => {
      account[key].value = data.id
      account[key].label = data.nama
    })

    mahasiswa = [...this.state.mahasiswa];
    const { selectedOption } = this.state;
    this.state.mahasiswa.map((data, key) => {
      mahasiswa[key].value = data.id;
      mahasiswa[key].label = data.id + " | " + data.nama;
    })

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <h2>Pembayaran Mahasiswa</h2>
            <ol className="breadcrumb">
              Dashboard
              <li className="breadcrumb-item active">
                <strong>Pembayaran</strong>
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
                  <i className="fa fa-list " /> Input Pembayaran Mahasiswa
                </h5>
              </div>
              <div className="ibox-content">
                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">
                    NIM Mahasiswa
                  </label>
                  <div className="col-lg-4">
                    <Select
                      name="form-field-name"
                      value={this.state.pembayaran.mahasiswa}
                      onChange={selectedOption => {
                        let pembayaran = { ...this.state.pembayaran };
                        pembayaran.mahasiswa = selectedOption != null ? selectedOption.id : null
                        this.setState({ pembayaran });
                      }}
                      options={mahasiswa}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Tanggal</label>
                  <div className="col-lg-4">
                    <input
                      type="date"
                      disabled=""
                      value={this.state.pembayaran.tanggal_pembayaran}
                      onChange={e => {
                        let pembayaran = { ...this.state.pembayaran };
                        pembayaran.tanggal_pembayaran = e.target.value;
                        this.setState({ pembayaran });
                      }}
                      name="pekerjaan_ayah"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Nominal</label>
                  <div className="col-lg-4">
                    <CurrencyInput
                      precision="0"
                      className="form-control m-b"
                      prefix="Rp "
                      value={this.state.pembayaran.nominal}
                      onChangeEvent={(e, maskedvalue, floatvalue) => {
                        let pembayaran = { ...this.state.pembayaran };
                        pembayaran.nominal = floatvalue;
                        this.setState({ pembayaran });
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Akun Sumber</label>
                  <div className="col-lg-4">
                    <Select
                      name="form-field-name"
                      value={this.state.pembayaran.account}
                      onChange={(selectedOption) => {
                        let pembayaran = [];
                        pembayaran = this.state.pembayaran;
                        pembayaran.account = selectedOption.value;
                        this.setState({ pembayaran });
                      }}
                      options={account}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Akun Tujuan</label>
                  <div className="col-lg-4">
                    <Select
                      name="form-field-name"
                      value={this.state.pembayaran.account_tujuan}
                      onChange={(selectedOption) => {
                        let pembayaran = [];
                        pembayaran = this.state.pembayaran;
                        pembayaran.account_tujuan = selectedOption.value;
                        this.setState({ pembayaran });
                      }}
                      options={accountTujuan}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Biaya Pendidikan</label>
                  <div className="col-lg-4">
                    <select
                        value={this.state.pembayaran.bayar_kuliah}
                        onChange={e => {
                          let pembayaran = []
                          pembayaran = this.state.pembayaran;
                          pembayaran.bayar_kuliah = e.target.value;
                          this.setState({ pembayaran });
                        }}
                        defaultValue={false}
                        className="form-control m-b"
                      >
                        <option value={false}>Tidak</option>
                        <option value={true}>Ya</option>
                    </select>
                  </div>
                </div>
                {
                  this.state.pembayaran.bayar_kuliah == "true" ?
                  <div className="form-group row">
                    <label className="col-lg-2 col-form-label">Masa Tagihan</label>
                    <div className="col-lg-4">
                      <select
                          disabled={this.state.pembayaran.mahasiswa == null ? "disabled" : null}
                          value={this.state.pembayaran.tagihan}
                          onChange={e => {
                            let pembayaran = []
                            pembayaran = this.state.pembayaran;
                            pembayaran.tagihan = e.target.value;
                            this.setState({ pembayaran });
                          }}
                          defaultValue={true}
                          className="form-control m-b"
                        >
                        <option value="">Pilih Masa Tagihan</option>
                        {
                          this.state.tagihan
                          .filter(data => data.mahasiswa == this.state.pembayaran.mahasiswa && data.status == false)
                          .map((tagihan, key) =>
                            <option value={tagihan.id}>Bulan {moment(tagihan.tanggal).format("MM-YYYY")}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                  :
                  null
                }

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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tagihan;
