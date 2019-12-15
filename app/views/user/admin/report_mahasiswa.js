import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import swal from "sweetalert";
import MonthPickerInput from "react-month-picker-input";

class List_pendaftar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendaftars: [],
      pendaftar: [],
      jurusans: [],
      kampus: [],
      dataCount: 0,
      next: null,
      previous: null,
      numPage: 0,
      loading: false,
      selectedKampus: "",
      selectedJurusan: "",
      selectedLimit: 20,
      selectedMonth: "",
      selectedYear: "",
      key: null,
      profil: false,
      selectedPendaftar: "",
      key: null,
      filtered: false
    };
  }

  componentDidMount() {
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

  getPendaftar = () =>{
    const self = this;
    let { selectedMonth, selectedYear,selectedKampus, selectedJurusan, selectedLimit }  = this.state;
    this.setState({loading: true});

    fetch(BASE_URL + `/api/mahasiswa/?bulan=${selectedMonth}&kampus=${selectedKampus}&jurusan=${selectedJurusan}&limit=${selectedLimit}&tahun=${selectedYear}`, {
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
          pendaftars: data,
          loading: false,
          filtered: true
        });
      });
  };

  handleSelectedJurusan = e => {
    this.setState({
      loading: !this.state.loading,
      selectedJurusan: e.target.value
    });
    setTimeout(() => {
      this.setState({ loading: !this.state.loading });
    }, 1000);
  };

  getpendaftar = id => {
    let index;
    this.state.pendaftars.forEach(function(o, key) {
      if (o.id == id) {
        index = key;
      }
    });

    this.setState({
      pendaftar: this.state.pendaftars[index],
      profil: true,
      key: index
    });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
  };

  getBulan = (x) => {
    if (x == 1) return "Januari";
    if (x == 2) return "Februari";
    if (x == 3) return "Maret";
    if (x == 4) return "April";
    if (x == 5) return "Mei";
    if (x == 6) return "Juni";
    if (x == 7) return "Juli";
    if (x == 8) return "Agustus";
    if (x == 9) return "September";
    if (x == 10) return "Oktober";
    if (x == 11) return "November";
    if (x == 12) return "Desember";
  };

  render() {
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Export Data Calon Mahasiswa</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Export Data</li>
              <li className="breadcrumb-item active">
                <strong>Calon Mahasiswa</strong>
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
                    <i className="fa fa-list " /> Daftar Calon Mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  <div className="alert alert-info" role="alert">
                    <p className="mb-0">** Perhatian! Silahkan Filter Data terlebih dahulu sesuai kampus, jurusan dan tanggal.</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <label className="form-label">Kampus: </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label">Jurusan: </label>
                    </div>
                    <div className="col-lg-2">
                      <label className="form-label">Bulan: </label>
                    </div>
                    <div className="col-sm-1">
                      <label className="form-label"></label>
                    </div>
                    <div className="col-lg-1" >
                      <label className="form-label">Jumlah: </label>
                    </div>
                    <div className="col-lg-3">
                      <label className="form-label"></label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <select
                        value={this.state.selectedKampus}
                        onChange={e => {
                          if (e.target.value != "0") {
                            this.setState({
                              selectedKampus: e.target.value
                            });
                          }
                        }}
                        className="form-control"
                      >
                        <option value="0">Semua Kampus</option>
                        {this.state.kampus.map((kampus, key) => (
                          <option key={key} value={kampus.id}>
                            {kampus.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-3">
                      <select
                        disabled={
                          this.state.selectedKampus == "0" ? "disabled" : null
                        }
                        value={this.state.selectedJurusan}
                        onChange={e => {
                          if (e.target.value != "0") {
                            this.setState({
                              selectedJurusan: e.target.value
                            });
                          }
                        }}
                        className="form-control"
                      >
                        <option value="0">Semua Jurusan</option>
                        {this.state.jurusans
                          .filter(
                            data =>
                              data.kampus_info.id == this.state.selectedKampus
                          )
                          .map((jurusan, key) => (
                            <option key={key} value={jurusan.id}>
                              {jurusan.nama}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-2">
                      <button className="btn btn-secondary btn-sm">
                        <MonthPickerInput
                          closeOnSelect={true}
                          style={{backgroundColor: "red"}}
                          onChange={(
                            maskedValue,
                            selectedYear,
                            selectedMonth
                          ) => {
                            selectedMonth+=1;
                            this.setState({selectedYear, selectedMonth});
                          }}
                        />
                      </button>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-lg-1">
                      <select name="" id="" className="form-control" defaultValue={20} style={{fontSize: '12px'}}>
                        <option value="">Semua</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div className="col-lg-3">
                      <button
                        onClick={this.getPendaftar}
                        className="btn btn-info"
                        type="button"
                      >
                        <i className="fa fa-filter" /> Filter
                      </button>

                      {
                        this.state.filtered ?
                          <button
                            onClick={() => {
                              const self = this
                              this.setState({
                                selectedKampus: "",
                                selectedJurusan: "",
                                selectedMonth: "",
                                selectedYear: ""
                              });
                              this.exportData()
                            }}
                            style={{ marginLeft: "5px" }}
                            className="btn btn-primary"
                            type="button"
                          >
                            <i className="fa fa-print" /> Cetak
                          </button>
                          :
                          null
                      }


                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>
                  {this.state.loading ? (
                    <div className="spiner-example">
                      <div className="sk-spinner sk-spinner-double-bounce">
                        <div className="sk-double-bounce1" />
                        <div className="sk-double-bounce2" />
                      </div>
                    </div>
                  ) : (
                    <div className="table bordered" id="print_data">
                      <h3 style={{textAlign: 'center'}}>List Calon Mahasiswa LPKN</h3>
                      <br/>
                      <h5>Jumlah Data : {this.state.pendaftars.length} </h5>
                      <h5>Masa Bulan  : {this.getBulan(this.state.selectedMonth)} / {this.state.selectedYear} </h5>
                      <table className="table">
                        <thead>
                        <tr>
                          <th>NO.</th>
                          <th>NIM.</th>
                          <th>NAMA</th>
                          <th>JURUSAN</th>
                          <th>JENIS KELAMIN</th>
                          <th>NO HP</th>
                          <th>ANGKATAN</th>
                          <th>KAMPUS PILIHAN</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pendaftars.length !== 0 ? null : (
                          <tr>
                            <td style={{ textAlign: "center" }} colSpan="7">
                              Data Kosong
                            </td>
                          </tr>
                        )}
                        {this.state.pendaftars
                          .map((pendaftar, key) => (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>{pendaftar.nim}</td>
                              <td>{pendaftar.nama.toUpperCase()}</td>
                              <td>{pendaftar.jurusan_info.nama}</td>
                              <td>{pendaftar.jenis_kelamin}</td>
                              <td>{pendaftar.no_hp}</td>
                              <td>{pendaftar.tahun_angkatan}</td>
                              <td>{pendaftar.kampus_info.nama}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List_pendaftar;
