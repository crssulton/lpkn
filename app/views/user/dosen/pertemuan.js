import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import moment from "moment";
import { Link, Location } from "react-router";

class Jadwal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jadwals: [],
      kelas: [],
      jurusan: [],
      matkul: [],
      dataCount: 0,
      next: null,
      previous: null,
      numPage: 0,
      selectedJurusan: "",
      selectedKelas: "",
      selectedMatkul: "",
      selectedDate: "",
      mahasiswa: [],
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ],
      days: [
        { day: "Sunday", hari: "Minggu" },
        { day: "Monday", hari: "Senin" },
        { day: "Tuesday", hari: "Selasa" },
        { day: "Wednesday", hari: "Rabu" },
        { day: "Thursday", hari: "Kamis" },
        { day: "Friday", hari: "Jum" + "'" + "at" },
        { day: "Saturday", hari: "Sabtu" }
      ]
    };
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
          jurusan: data.results
        });
      });

      fetch(
          BASE_URL +
            `/api/jadwal/?dosen=${window.sessionStorage.getItem("user_id")}`,
          {
            method: "get",
            headers: {
              Authorization: "JWT " + window.sessionStorage.getItem("token")
            }
          }
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            self.setState({
              jadwals: data.results
            });
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
          jadwals: data.results,
          numPage: data.num_pages,
          dataCount: data.count,
          next: data.next,
          previous: data.previous,
          loading: !self.state.loading
        });
      });
  };

  getMatkul = () => {
        const self = this
        fetch(BASE_URL + '/api/absensi/?kelas=' + this.state.selectedKelas, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            self.setState({
                matkul: data.results.filter(x => x.dosen == window.sessionStorage.getItem("user_id"))
            })
        });
  }

  getKelas = () => {
        const self = this
        fetch(BASE_URL + '/api/kelas/?jurusan=' + this.state.selectedJurusan, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                kelas: data.results
            })
        });
    }



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
          jadwals: data.results,
          numPage: data.num_pages,
          dataCount: data.count,
          next: data.next,
          previous: data.previous,
          loading: !self.state.loading
        });
      });
  };

  onFilterData = () => {
    const self = this;

    let matkul = this.state.selectedMatkul;
    let jurusan = this.state.selectedJurusan;
    let date = this.state.selectedDate;
    let kelas = this.state.selectedKelas;
    let dosen = window.sessionStorage.getItem("user_id")

    this.setState({ loading: true });

    fetch(
      BASE_URL +
        `/api/jadwal/?dosen=${dosen}&kelas=${kelas}&matkul=${matkul}&jurusan=${jurusan}1&tanggal=${date}`,
      {
        method: "get",
        headers: {
          Authorization: "JWT " + window.sessionStorage.getItem("token")
        }
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          jadwals: data.results.filter(x => x.dosen == dosen),
          loading: false
        });
      });
  };

  render() {
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Daftar Hadir Mahasiswa</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">
                <strong>Daftar Hadir</strong>
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
                    <i className="fa fa-list " /> Daftar Pertemuan
                  </h5>
                </div>
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-lg-2">
                      <label className="form-label">Jurusan : </label>
                    </div>
                    <div className="col-lg-2">
                      <label className="form-label">Kelas : </label>
                    </div>
                    <div className="col-lg-2">
                      <label className="form-label">Mata Kuliah : </label>
                    </div>
                    <div className="col-lg-2">
                      <label className="form-label">Tanggal : </label>
                    </div>
                    <div className="col-lg-3" />
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <select
                        value={this.state.selectedJurusan}
                        onChange={e => {
                          this.setState({ 
                            selectedJurusan: e.target.value 
                          }, () => {
                            this.getKelas()
                          });
                        }}
                        className="form-control"
                      >
                        <option value="">Pilih Jurusan</option>
                        {this.state.jurusan.map((jurusan, key) => (
                          <option key={key} value={jurusan.id}>
                            {jurusan.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-2">
                      <select
                        value={this.state.selectedKelas}
                        onChange={e => {
                          this.setState({ 
                            selectedKelas: e.target.value 
                          }, () => {
                            this.getMatkul()
                          });
                        }}
                        className="form-control"
                      >
                        <option value="">Pilih Kelas</option>
                        {this.state.kelas
                          .filter(
                            item =>
                              item.jurusan_info.id == this.state.selectedJurusan
                          )
                          .map((kelas, key) => (
                            <option key={key} value={kelas.id}>
                              {kelas.nama}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-2">
                      <select
                        value={this.state.selectedMatkul}
                        onChange={e => {
                          this.setState({ selectedMatkul: e.target.value });
                        }}
                        className="form-control"
                      >
                        <option value="">Pilih Mata Kuliah</option>
                        {this.state.matkul
                          .map((matkul, key) => (
                            <option key={key} value={matkul.mata_kuliah}>
                              {matkul.mata_kuliah_info.nama}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-2">
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.selectedDate}
                        onChange={e => {
                          this.setState({ selectedDate: e.target.value });
                        }}
                      />
                    </div>
                    <div className="col-lg-3">
                      <button
                        onClick={this.onFilterData}
                        className="btn btn-info"
                        type="button"
                      >
                        <i className="fa fa-filter" /> Filter
                      </button>

                      <button
                        onClick={() => {
                          const self = this;
                          this.setState({
                            selectedJurusan: "",
                            selectedKelas: "",
                            selectedMatkul: "",
                            selectedDate: ""
                          });
                        }}
                        style={{ marginLeft: "5px" }}
                        className="btn btn-warning"
                        type="button"
                      >
                        <i className="fa fa-close" /> Reset
                      </button>
                    </div>
                  </div>
                  <br />
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
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>HARI</th>
                            <th>TANGGAL</th>
                            <th>MATA KULIAH</th>
                            <th>RUANGAN</th>
                            <th>WAKTU</th>
                            <th>KELAS</th>
                            <th>DOSEN</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.jadwals != null
                            ? this.state.jadwals.map((jadwal, key) => (
                                <tr key={key}>
                                  <th>
                                    {
                                      this.state.days.find(
                                        dy =>
                                          dy.day ==
                                          moment(jadwal.start).format("dddd")
                                      ).hari
                                    }
                                  </th>
                                  <td>
                                    {moment(jadwal.start).format("D MMM YYYY")}
                                  </td>
                                  <td>{jadwal.title}</td>
                                  <td>{jadwal.ruangan_info.nama}</td>
                                  <td>
                                    {jadwal.jam_mulai +
                                      " - " +
                                      jadwal.jam_selesai}
                                  </td>
                                  <td>{jadwal.kelas_info.nama}</td>
                                  <td>{jadwal.dosen_info.nama}</td>
                                  <td>
                                    <center>
                                      <Link
                                        to={{
                                          pathname: "daftar-hadir",
                                          state: { jadwal: jadwal }
                                        }}
                                      >
                                        <button
                                          className="btn btn-primary btn-sm"
                                          type="button"
                                        >
                                          <i className="fa fa-id-card" />
                                        </button>
                                      </Link>
                                    </center>
                                  </td>
                                </tr>
                              ))
                            : "Jadwal Tidak Ditemukan"}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Jadwal;
