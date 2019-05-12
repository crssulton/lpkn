import React, { Component } from "react";
import swal from "sweetalert";
import { BASE_URL } from "../../../config/config.js";
import CurrencyInput from 'react-currency-input';
import moment from "moment";

class Calon_Mahasiswa extends Component {
  constructor(props) {
    super(props);

    let mahasiswa = {}
    mahasiswa.dp = "false"

    this.state = {
      mahasiswas: [],
      mahasiswa,
      jurusans: [],
      kampus: [],
      calon: {},
      loading: true,
      selectedJurusan: "all",
      key: null,
      profil: false,
      key: null,
      loadingApprove: false
    };
  }

  componentDidMount() {
    const self = this;
    fetch(BASE_URL + "/api/mahasiswa/", {
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
          mahasiswas: data.results,
          loading: !self.state.loading
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
  }

  handleSelectedJurusan = e => {
    this.setState({
      loading: !this.state.loading,
      selectedJurusan: e.target.value
    });
    setTimeout(() => {
      this.setState({ loading: !this.state.loading });
    }, 1000);
  };

  getmahasiswa = id => {
    this.setState({
      mahasiswa: this.state.mahasiswas.find(data => data.id == id),
      profil: true
    });
  };

  handleUpdatemahasiswa = key => {
    const self = this;
    if (key.angkatan == null || key.tahun_angkatan == null) {
      toastr.error("Angkatan & Tahun Angkatan tidak boleh kosong", "Gagal ! ");
    } else {
      console.log(JSON.stringify(key));
      fetch(BASE_URL + "/api/mahasiswa/" + key.id + "/", {
        method: "put",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token"),
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(key)
      })
        .then(function(response) {
          if (response.status == 200) {
            self.handleTerimaCalon(key);
          }
        })
        .then(function(data) {});
    }
  };

  getmahasiswaResults = () => {
    const self = this;
    fetch(BASE_URL + "/api/mahasiswa/", {
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
          mahasiswas: data.results,
          loadingApprove: false
        });
      });
  };

  handleTerimaCalon = key => {
    const self = this;
    self.setState({ loadingApprove: true });
    fetch(BASE_URL + "/api/mahasiswa/" + key.id + "/approve/", {
      method: "post",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        if (response.status == 200) {
          self.getmahasiswaResults();
          self.setState({ profil: false });
          toastr.success("Mahasiswa telah diterima", "Sukses ! ");
        } else {
          toastr.warning("Mahasiswa gagal diterima", "Gagal ! ");
        }
      })
      .then(function(data) {});
  };

  handleDeletemahasiswa = key => {
    const self = this;
    swal({
      title: "Hapus " + key.nama + " ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        fetch(BASE_URL + "/api/mahasiswa/" + key.id, {
          method: "delete",
          headers: {
            Authorization: "JWT " + window.sessionStorage.getItem("token")
          }
        })
          .then(function(response) {
            let mahasiswas = [];
            mahasiswas = self.state.mahasiswas;
            delete mahasiswas[self.state.key];
            self.setState({
              profil: false,
              mahasiswas
            });
            swal("Sukses! mahasiswa telah dihapus!", {
              icon: "success"
            });
          })
          .then(function(data) {
            let mahasiswas = [];
            mahasiswas = self.state.mahasiswas;
            delete mahasiswas[self.state.key];
            self.setState({
              profil: false,
              mahasiswas
            });
            swal("Sukses! mahasiswa telah dihapus!", {
              icon: "success"
            });
          });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Calon Mahasiswa</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Calon Mahasiswa</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4" />
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="col-lg-7">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-list " /> Daftar Calon mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  {this.state.loading ? (
                    <div className="spiner-example">
                      <div className="sk-spinner sk-spinner-double-bounce">
                        <div className="sk-double-bounce1" />
                        <div className="sk-double-bounce2" />
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>NO.</th>
                            <th>NAMA</th>
                            <th>JURUSAN</th>
                            <th style={{ textAlign: "center" }}>AKSI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.mahasiswas
                            .filter(mahasiswa => mahasiswa.calon == true)
                            .map((mahasiswa, key) => (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{mahasiswa.nama}</td>
                                <td>
                                  {this.state.jurusans.length === 0
                                    ? null
                                    : this.state.jurusans.find(
                                        jurusan =>
                                          jurusan.id == mahasiswa.jurusan
                                      ).nama}
                                </td>
                                <td>
                                  <center>
                                    <button
                                      style={{ margin: "0 5px" }}
                                      className="btn btn-info btn-sm"
                                      type="button"
                                      onClick={() =>
                                        this.getmahasiswa(mahasiswa.id)
                                      }
                                    >
                                      <i className="fa fa-eye" />
                                    </button>
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

            <div className="col-lg-5">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-user" /> Profil Calon Mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  {this.state.profil ? (
                    <div className="table-responsive">
                      <div className="ibox-content profile-content">
                        <h3 style={{ textAlign: "center" }}>
                          <strong>{this.state.mahasiswa.nama}</strong>
                        </h3>
                        <p style={{ textAlign: "center" }}>
                          <span className="badge badge-warning">
                            CALON MAHASISWA
                          </span>
                        </p>
                      </div>
                      <div className="tabs-container">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="active">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#tab-1"
                            >
                              Data Diri
                            </a>
                          </li>
                          <li>
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tab-2"
                            >
                              Orang Tua / Wali
                            </a>
                          </li>
                          <li>
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#tab-3"
                            >
                              Tambahan
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            role="tabpanel"
                            id="tab-1"
                            className="tab-pane active"
                          >
                            <div className="panel-body">
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Alamat
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.alamat = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.alamat}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Tmpt Lahir
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.tempat_lahir = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.tempat_lahir}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Tgl Lahir
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.tgl_lahir = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.tgl_lahir}
                                    type="date"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Jenis Kelamin
                                </label>
                                <div className="col-lg-9">
                                  <select
                                    className="form-control m-b"
                                    value={this.state.mahasiswa.jenis_kelamin}
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.jenis_kelamin = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    name="jenis_kelamin"
                                  >
                                    <option>Pilih</option>
                                    <option value="L">Laki - Laki</option>
                                    <option value="P">Perempuan</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Agama
                                </label>
                                <div className="col-lg-9">
                                  <select
                                    id="agama"
                                    name="agama"
                                    className="form-control required"
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.agama = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.agama}
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
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  HP
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.no_hp = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.no_hp}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Email
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.email = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.email}
                                    type="email"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Tahun Angkatan
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.tahun_angkatan = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.tahun_angkatan}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Angkatan Ke-
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.angkatan = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.angkatan}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Facebook
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.id_facebook = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.id_facebook}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  WA/Line
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.wa_or_line = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.wa_or_line}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Asal Sekolah
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.asal_sekolah = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.asal_sekolah}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Tahun Tamat
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.tahun_tamat = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.tahun_tamat}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Tinggi Badan
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.tinggi_badan = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.tinggi_badan}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Berat Badan
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.berat_badan = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.berat_badan}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div role="tabpanel" id="tab-2" className="tab-pane">
                            <div className="panel-body">
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Nama Ayah
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.nama_ayah = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.nama_ayah}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Pekerjaan Ayah
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.pekerjaan_ayah = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.pekerjaan_ayah}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Nama Ibu
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.nama_ibu = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.nama_ibu}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Pekerjaan Ibu
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.pekerjaan_ibu = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.pekerjaan_ibu}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Alamat Wali
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.alamat_wali = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.alamat_wali}
                                    type="text"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div role="tabpanel" id="tab-3" className="tab-pane">
                            <div className="panel-body">
                              
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Jurusan
                                </label>
                                <div className="col-lg-9">
                                  <select
                                    value={this.state.mahasiswa.jurusan}
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.jurusan = e.target.value;
                                      this.setState({ mahasiswa });
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


                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label">
                                  Total Bayar
                                </label>
                                <div className="col-lg-9">
                                  <input
                                    onChange={e => {
                                      let mahasiswa = [];
                                      mahasiswa = this.state.mahasiswa;
                                      mahasiswa.total_bayar = e.target.value;
                                      this.setState({ mahasiswa });
                                    }}
                                    value={this.state.mahasiswa.total_bayar}
                                    type="number"
                                    className="form-control m-b"
                                    name="account"
                                  />
                                </div>
                              </div>

                              <div className="form-group row">
							      <label className="col-lg-3 col-form-label">
							        Bayar Diawal
							      </label>
							      <div className="text-right col-lg-9">
							        <select
							          value={this.state.mahasiswa.dp}
							          onChange={e => {
							            let mahasiswa = [];
							            mahasiswa = this.state.pendaftar;
							            pendaftar.dp = e.target.value;
							            this.setState({ mahasiswa });
							          }}
							          defaultValue={false}
							          className="form-control m-b"
							        >
							            <option value={false}>Tidak</option>
							          <option value={true}>Ya</option>
							        </select>
                              </div>
                            </div>
                            {this.state.mahasiswa.dp != "true" ? (
					        <div className="form-group row">
					            <label className="col-lg-3 col-form-label">
					              Bayar diawal
					            </label>
					            <div className="col-lg-9">
					              <input
					                onChange={e => {
					                  let mahasiswa = [];
					                  mahasiswa = this.state.mahasiswa;
					                  mahasiswa.dp_nominal = e.target.value;
					                  this.setState({ mahasiswa });
					                }}
					                value={this.state.mahasiswa.dp_nominal}
					                type="number"
					                className="form-control m-b"
					                name="account"
					              />
					            </div>
					         </div>
					              ) : null}
                          </div>
                          </div>
                        </div>
                      </div>

                      <center style={{ margin: "3% 0" }}>
                        {this.state.loadingApprove ? (
                          <button
                            style={{ margin: "0 3%" }}
                            disabled
                            className="btn btn-primary"
                            type="button"
                          >
                            Menyimpan...
                          </button>
                        ) : (
                          <button
                            style={{ margin: "0 3%" }}
                            onClick={() =>
                              this.handleUpdatemahasiswa(this.state.mahasiswa)
                            }
                            className="btn btn-primary"
                            type="button"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() =>
                            this.handleDeletemahasiswa(this.state.mahasiswa)
                          }
                          className="btn btn-danger"
                          type="button"
                        >
                          Tolak
                        </button>
                      </center>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calon_Mahasiswa;
