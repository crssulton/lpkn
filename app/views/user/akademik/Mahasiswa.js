import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import { Link, Location } from 'react-router';

class Mahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mahasiswas: [],
      mahasiswa: [],
      loading: true,
      selectedJurusan: 0,
      selectedNama: "",
      key: null,
      magang: [],
      bekerja: [],
      profil: false,
      jurusans: [],
      selectedStatus: "",
      sendMagang: {},
      sendBekerja: {},
      nameSearch: ''
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

    fetch(BASE_URL + "/api/magang/", {
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
          magang: data.results
        });
      });

    fetch(BASE_URL + "/api/bekerja/", {
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
          bekerja: data.results
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

  handleSelectedJurusan = e => {
    this.setState({
      loading: !this.state.loading,
      selectedJurusan: e.target.value
    });
    setTimeout(() => {
      this.setState({ loading: !this.state.loading });
    }, 1000);
  };

  getMahasiswa = id => {
    this.setState({
      mahasiswa: this.state.mahasiswas.find(data => data.id == id),
      profil: true
    });
  };

  fetchMahasiswa = () => {
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
          mahasiswas: data.results
        });
      });
  };

  updateStatusMahasiswa = () => {
    const self = this;
    let mahasiswa = this.state.mahasiswa;
    let aktif = false;
    if (
      this.state.selectedStatus == "aktif" ||
      this.state.selectedStatus == "tidak aktif"
    ) {
      if (this.state.selectedStatus == "aktif") aktif = true;
      else aktif = false;

      let status = {
        aktif: aktif
      };

      fetch(BASE_URL + "/api/mahasiswa/" + this.state.mahasiswa.id + "/", {
        method: "patch",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(status)
      })
        .then(function(response) {
          if (response.status == 200) {
            toastr.success("Data berhasil diubah", "Sukses ! ");
            self.fetchMahasiswa();
          } else toastr.warning("Data gagal diubah", "Gagal ! ");
        })
        .then(function(data) {});
    } else if (this.state.selectedStatus == "magang") {
      let sendMagang = { ...this.state.sendMagang };
      sendMagang.mahasiswa = this.state.mahasiswa.id;

      fetch(BASE_URL + "/api/magang/", {
        method: "post",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendMagang)
      })
        .then(function(response) {
          if (response.status == 201) {
            toastr.success("Data berhasil diubah", "Sukses ! ");
            self.setState({ selectedStatus: null });
            self.fetchMahasiswa();
          } else toastr.warning("Data gagal diubah", "Gagal ! ");
        })
        .then(function(data) {});
    } else if (this.state.selectedStatus == "bekerja") {
      let sendBekerja = { ...this.state.sendBekerja };
      sendBekerja.mahasiswa = this.state.mahasiswa.id;

      fetch(BASE_URL + "/api/bekerja/", {
        method: "post",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendBekerja)
      })
        .then(function(response) {
          if (response.status == 201) {
            toastr.success("Data berhasil diubah", "Sukses ! ");
            self.setState({ selectedStatus: null });
            self.fetchMahasiswa();
          } else toastr.warning("Data gagal diubah", "Gagal ! ");
        })
        .then(function(data) {});
    }
  };

  render() {
    const styletb = {
      borderCollapse: "collapse",
      borderSpacing: 0,
      borderStyle: "solid",
      width: "100%",
      fontSize: "12px"
    };

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Daftar Mahasiswa</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Mahasiswa</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4">
            <div className="title-action">
            	<Link to={{ pathname: 'cetak-mahasiswa-akademik', state: { selectedJurusan: this.state.selectedJurusan} }}>
                <a  className="btn btn-primary"><i className="fa fa-print"></i> Cetak </a>
                </Link>
            </div>
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="col-lg-8">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-list " /> Daftar Mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-lg-5">
                      <label className="col-sm-3 col-form-label">Filter </label>
                      <div className="col-sm-9">
                        <select
                          value={this.state.selectedJurusan}
                          onChange={e =>
                            this.setState({ selectedJurusan: e.target.value })
                          }
                          className="form-control"
                        >
                          <option value="0">Semua Jurusan</option>
                          {this.state.jurusans.map((jurusan, key) => (
                            <option key={key} value={jurusan.id}>
                              {jurusan.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="col-sm-12">
                        <input
                          type="text"
                          disabled=""
                          placeholder="Nama Mahasiswa"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="col-sm-12">
                        
                      </div>
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
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>NIM </th>
                            <th>NAMA </th>
                            <th>JURUSAN</th>
                            <th>STATUS</th>
                            <th>DETAIL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.mahasiswas
                            .filter(
                              mahasiswa =>
                                mahasiswa.calon == false &&
                                this.state.selectedJurusan == 0 ? true : mahasiswa.jurusan == this.state.selectedJurusan
                            )
                            .map((mahasiswa, key) => (
                              <tr key={key}>
                                <td>{mahasiswa.nim}</td>
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
                                  {mahasiswa.aktif ? (
                                    <span className="badge badge-primary">
                                      Aktif
                                    </span>
                                  ) : (
                                    <span className="badge badge-secondary">
                                      Tidak Aktif
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-info btn-sm"
                                    type="button"
                                    onClick={() =>
                                      this.getMahasiswa(mahasiswa.id)
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </button>
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

            <div className="col-lg-4">
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-user" /> Profil Mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  {this.state.profil ? (
                    <div className="table-responsive">
                      <div className="">
                        {this.state.mahasiswa.foto != null ? (
                          <img
                            alt="image"
                            width="50%"
                            style={{
                              borderRadius: "50%",
                              display: "block",
                              margin: "0 auto"
                            }}
                            className="img-fluid"
                            src={this.state.mahasiswa.foto}
                          />
                        ) : (
                          <img
                            alt="image"
                            width="50%"
                            style={{
                              borderRadius: "50%",
                              display: "block",
                              margin: "0 auto"
                            }}
                            className="img-fluid"
                            src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"
                          />
                        )}
                      </div>
                      <div className="ibox-content profile-content">
                        <h3 style={{ textAlign: "center" }}>
                          <strong>{this.state.mahasiswa.nama}</strong>
                        </h3>
                        <p style={{ textAlign: "center" }}>
                          {this.state.mahasiswa.nim}
                        </p>
                        <p style={{ textAlign: "center" }}>
                          <select
                            value={this.state.selectedStatus}
                            onChange={e =>
                              this.setState({ selectedStatus: e.target.value })
                            }
                            style={{ width: "50%", margin: "0 auto" }}
                            className="form-control m-b"
                            name="account"
                          >
                            <option value="">--Status--</option>
                            <option value="aktif">Aktif</option>
                            <option value="tidak aktif">Tidak Aktif</option>
                            <option value="magang">Magang</option>
                            <option value="bekerja">Bekerja</option>
                          </select>
                        </p>
                        {this.state.selectedStatus == "magang" ? (
                          <div>
                            <label>Lokasi Magang</label>
                            <input
                              value={this.state.sendMagang.tempat}
                              onChange={e => {
                                let sendMagang = { ...this.state.sendMagang };
                                sendMagang.tempat = e.target.value;
                                this.setState({ sendMagang });
                              }}
                              type="text"
                              disabled=""
                              placeholder="Lokasi"
                              className="form-control"
                            />
                            <br />
                            <label>Tanggal Mulai</label>
                            <input
                              value={this.state.sendMagang.tanggal_mulai}
                              onChange={e => {
                                let sendMagang = { ...this.state.sendMagang };
                                sendMagang.tanggal_mulai = e.target.value;
                                this.setState({ sendMagang });
                              }}
                              type="date"
                              disabled=""
                              placeholder="Tanggal"
                              className="form-control"
                            />
                            <br />
                            <label>Tanggal Selesai</label>
                            <input
                              value={this.state.sendMagang.tanggal_selesai}
                              onChange={e => {
                                let sendMagang = { ...this.state.sendMagang };
                                sendMagang.tanggal_selesai = e.target.value;
                                this.setState({ sendMagang });
                              }}
                              type="date"
                              disabled=""
                              placeholder="Tanggal"
                              className="form-control"
                            />
                          </div>
                        ) : this.state.selectedStatus == "bekerja" ? (
                          <div>
                            <label>Lokasi Bekerja</label>
                            <input
                              value={this.state.sendBekerja.tempat}
                              onChange={e => {
                                let sendBekerja = { ...this.state.sendBekerja };
                                sendBekerja.tempat = e.target.value;
                                this.setState({ sendBekerja });
                              }}
                              type="text"
                              disabled=""
                              placeholder="Lokasi"
                              className="form-control"
                            />
                            <br />
                            <label>Tanggal</label>
                            <input
                              value={this.state.sendBekerja.tanggal_mulai}
                              onChange={e => {
                                let sendBekerja = { ...this.state.sendBekerja };
                                sendBekerja.tanggal_mulai = e.target.value;
                                this.setState({ sendBekerja });
                              }}
                              type="date"
                              disabled=""
                              placeholder="Tanggal"
                              className="form-control"
                            />
                            <br />
                          </div>
                        ) : null}
                      </div>

                      {this.state.bekerja.find(
                        data => data.mahasiswa == this.state.mahasiswa.id
                      ) != null ? (
                        <table className="table">
                          <tbody>
                            <tr>
                              <td style={{ width: "40%" }}>
                                <b>Lokasi Bekerja</b>{" "}
                              </td>
                              <td>
                                :{" "}
                                {
                                  this.state.bekerja.find(
                                    data =>
                                      data.mahasiswa == this.state.mahasiswa.id
                                  ).tempat
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Tanggal Mulai</b>{" "}
                              </td>
                              <td>
                                :{" "}
                                {
                                  this.state.bekerja.find(
                                    data =>
                                      data.mahasiswa == this.state.mahasiswa.id
                                  ).tanggal_mulai
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null}

                      {this.state.magang.find(
                        data => data.mahasiswa == this.state.mahasiswa.id
                      ) != null ? (
                        <table className="table">
                          <tbody>
                            <tr>
                              <td style={{ width: "40%" }}>
                                <b>Lokasi Magang</b>{" "}
                              </td>
                              <td>
                                :{" "}
                                {
                                  this.state.magang.find(
                                    data =>
                                      data.mahasiswa == this.state.mahasiswa.id
                                  ).tempat
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Tanggal Mulai</b>{" "}
                              </td>
                              <td>
                                :{" "}
                                {
                                  this.state.magang.find(
                                    data =>
                                      data.mahasiswa == this.state.mahasiswa.id
                                  ).tanggal_mulai
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Tanggal Selesai</b>{" "}
                              </td>
                              <td>
                                :{" "}
                                {
                                  this.state.magang.find(
                                    data =>
                                      data.mahasiswa == this.state.mahasiswa.id
                                  ).tanggal_selesai
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null}

                      <table className="table" style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ width: "40%" }}>
                              <b>Alamat</b>{" "}
                            </td>
                            <td>: {this.state.mahasiswa.alamat}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Tempat Lahir</b>
                            </td>
                            <td>: {this.state.mahasiswa.tempat_lahir}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Tgl Lahir</b>
                            </td>
                            <td>: {this.state.mahasiswa.tgl_lahir}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Jenis Kelamin</b>
                            </td>
                            <td>: {this.state.mahasiswa.jenis_kelamin}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Agama</b>
                            </td>
                            <td>: {this.state.mahasiswa.agama}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>No Hp</b>
                            </td>
                            <td>: {this.state.mahasiswa.no_hp}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Email</b>
                            </td>
                            <td>: {this.state.mahasiswa.email}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Whatsapp</b>
                            </td>
                            <td>: {this.state.mahasiswa.wa_or_line}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Sekolah Asal</b>
                            </td>
                            <td>: {this.state.mahasiswa.asal_sekolah}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Tahun Tamat</b>
                            </td>
                            <td>: {this.state.mahasiswa.tahun_tamat}</td>
                          </tr>
                        </tbody>
                      </table>

                      <button
                        className="btn btn-info btn-block"
                        type="button"
                        onClick={this.updateStatusMahasiswa}
                      >
                        Simpan
                      </button>
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

export default Mahasiswa;
