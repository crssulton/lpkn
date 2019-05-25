import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import swal from "sweetalert";

class Calon_Mahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mahasiswas: [],
      mahasiswa: [],
      jurusans: [{ nama: "" }],
      kampus: [],
      loading: true,
      selectedJurusan: "all",
      key: null,
      profil: false,
      key: null,
      num_pages: null,
      next: null,
      previous: null,
      count: null
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
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          loading: false
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
    let index;
    this.state.mahasiswas.forEach(function(o, key) {
      if (o.id == id) {
        index = key;
      }
    });

    this.setState({
      mahasiswa: this.state.mahasiswas[index],
      profil: true,
      key: index
    });
  };

  handleTerimaCalon = key => {
    const self = this;
    fetch(
      BASE_URL + "/api/mahasiswa/" + this.state.mahasiswa.id + "/approve/",
      {
        method: "post",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token")
        }
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let mahasiswas = [];
        mahasiswas = self.state.mahasiswas;
        delete mahasiswas[self.state.key];
        self.setState({
          profil: false,
          mahasiswas
        });
        toastr.success("Mahasiswa berhasil ditambahkan", "Sukses ! ");
      });
  };

  handleDeletemahasiswa = key => {
    const self = this;
    swal({
      title: "Hapus " + this.state.mahasiswa.nama + " ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        fetch(BASE_URL + "/api/mahasiswa/" + this.state.mahasiswa.id, {
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
          mahasiswas: data.results,
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
          mahasiswas: data.results,
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          loading: false
        });
      });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
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
          <div className="col-lg-4" />
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
                    <i className="fa fa-list " /> Daftar mahasiswa
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
                            <th>NIM</th>
                            <th>NAMA</th>
                            <th>JURUSAN</th>
                            <th style={{ textAlign: "center" }}>AKSI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.mahasiswas
                            .filter(mahasiswa => mahasiswa.calon == false)
                            .map((mahasiswa, key) => (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{mahasiswa.nim}</td>
                                <td>{mahasiswa.nama}</td>
                                <td>
                                  {this.state.jurusans.find(
                                    jurusan => jurusan.id == mahasiswa.jurusan
                                  ) === undefined
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
                        <h5 style={{ textAlign: "center" }}>
                          <strong>{this.state.mahasiswa.nim}</strong>
                        </h5>

                        {this.state.mahasiswa.aktif !== true ? (
                          <p style={{ textAlign: "center" }}>
                            <span className="badge badge-secondary">
                              TIDAK AKTIF
                            </span>
                          </p>
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            <span className="badge badge-primary">AKTIF</span>
                          </p>
                        )}
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
                              Orang Tua/Wali
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
                            <div
                              className="panel-body"
                              style={{ padding: "0px" }}
                            >
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>
                                      <b>Alamat</b>{" "}
                                    </td>
                                    <td>: {this.state.mahasiswa.alamat}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Tempat Lahir</b>
                                    </td>
                                    <td>
                                      : {this.state.mahasiswa.tempat_lahir}
                                    </td>
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
                                    <td>
                                      : {this.state.mahasiswa.jenis_kelamin}
                                    </td>
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
                                    <td>
                                      : {this.state.mahasiswa.asal_sekolah}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Tahun Tamat</b>
                                    </td>
                                    <td>
                                      : {this.state.mahasiswa.tahun_tamat}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div role="tabpanel" id="tab-2" className="tab-pane">
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>
                                      <b>Nama Ayah</b>{" "}
                                    </td>
                                    <td>: {this.state.mahasiswa.nama_ayah}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Pekerjaan Ayah</b>
                                    </td>
                                    <td>
                                      : {this.state.mahasiswa.pekerjaan_ayah}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Nama Ibu</b>
                                    </td>
                                    <td>: {this.state.mahasiswa.nama_ibu}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Pekerjaan Ibu</b>
                                    </td>
                                    <td>
                                      : {this.state.mahasiswa.pekerjaan_ibu}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Alamat Wali</b>
                                    </td>
                                    <td>
                                      : {this.state.mahasiswa.alamat_wali}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div role="tabpanel" id="tab-3" className="tab-pane">
                            <div className="panel-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td>
                                      <b>Jurusan</b>
                                    </td>
                                    <td>
                                      :{" "}
                                      {this.state.jurusans.length === 0
                                        ? null
                                        : this.state.jurusans.find(
                                            jurusan =>
                                              jurusan.id ==
                                              this.state.mahasiswa.jurusan
                                          ).nama}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Kampus</b>
                                    </td>
                                    <td>
                                      :{" "}
                                      {this.state.kampus.length === 0
                                        ? null
                                        : this.state.kampus.find(
                                            kamp =>
                                              kamp.id ==
                                              this.state.mahasiswa.kampus
                                          ).nama}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Total Bayar</b>
                                    </td>
                                    <td>
                                      : Rp.{" "}
                                      {this.formatNumber(
                                        this.state.mahasiswa.total_bayar
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Sisa Bayar</b>
                                    </td>
                                    <td>
                                      : Rp.{" "}
                                      {this.formatNumber(
                                        this.state.mahasiswa.sisa_bayar
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Telah Dibayar</b>
                                    </td>
                                    <td>
                                      : Rp.{" "}
                                      {this.formatNumber(
                                        this.state.mahasiswa.total_bayar - this.state.mahasiswa.sisa_bayar
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
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
