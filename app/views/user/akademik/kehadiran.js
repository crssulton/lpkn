import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import moment from "moment";

class Kehadiran extends Component {
  constructor(props) {
    super(props);

    let { jadwal } = this.props.location.state;
    console.log(jadwal);
    this.state = {
      daftars: [],
      loading: true,
      jadwal,
      absensi: [],
      loadingSimpan: false,
      daftars: [],
      selectedAbsensi: null,
      sendDaftar: [],
      selectedJurusan: 0,
      checkAll: false,
      kehadiran: [],
      sendKehadiran: {},
      nameSearch: "",
      bap: ""
    };
  }

  componentWillMount() {
    const self = this;

    fetch(BASE_URL + "/api/absensi/", {
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
          absensi: data.results.find(
            data => data.mata_kuliah == self.state.jadwal.mata_kuliah_info.id
          ),
          selectedAbsensi: data.results.find(
            data => data.mata_kuliah == self.state.jadwal.mata_kuliah_info.id
          ).id
        });
      });
  }

  componentDidMount() {
    const self = this;

    fetch(BASE_URL + "/api/daftar/", {
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
          daftars: data.results,
          loading: !self.state.loading
        });
      });
  }

  getDaftar = () => {
    const self = this;
    fetch(BASE_URL + "/api/daftar/", {
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
          daftars: data.results
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
      documentTitle: "Daftar Hadir Mahasiswa",
      font_size: "17pt",
      targetStyles: ["*"]
    });
  }

  handleIsiBAP = () => {
    const self = this;

    let isiBap = {
      bap: this.state.bap
    };

    swal({
      title: "Isi Berita Acara ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willApprove => {
      if (willApprove) {
        console.log(BASE_URL + "/api/jadwal/" + this.state.jadwal.id + "/");
        fetch(BASE_URL + "/api/jadwal/" + this.state.jadwal.id + "/", {
          method: "patch",
          headers: {
            Authorization: "JWT " + window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(isiBap)
        })
          .then(function(response) {
            if (response.status == 200) {
              toastr.success("BAP Telah diisi", "Sukses ! ");
            } else {
              toastr.warning("Gagal mengisi BAP", "Gagal ! ");
            }
          })
          .then(function(data) {});
      }
    });
    let jadwal = this.state.jadwal;
    jadwal.bap = this.state.bap;
    this.setState({ jadwal });
  };

  changeKehadiran = (status, daftar) => {
    const self = this;
    let newKehadiran = {};
    newKehadiran.daftar = daftar.id;
    newKehadiran.jadwal = this.state.jadwal.id;
    newKehadiran.status = status.target.value
    let idKehadiran = daftar.kehadiran.find(
      x => x.jadwal == this.state.jadwal.id
    ).id;

    console.log(BASE_URL +
        "/api/kehadiran/" +
        idKehadiran +
        "/")

    console.log(JSON.stringify(newKehadiran))

    fetch(
      BASE_URL +
        "/api/kehadiran/" +
        idKehadiran +
        "/",
      {
        method: "patch",
        headers: {
          Authorization:
            "JWT " +
            window.sessionStorage.getItem(
              "token"
            ),
          "Content-Type":
            "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newKehadiran)
      }
    )
      .then(function(response) {
        if (response.status == 200) {
          self.getDaftar();
          toastr.success(
            "Data berhasil diubah",
            "Sukses ! "
          );
        } else {
          toastr.warning(
            "Data gagal diubah",
            "Gagal ! "
          );
        }
      })
      .then(function(data) {});
  }

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
            <h2>Daftar Hadir Mahasiswa {this.state.matkul}</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">Kehadiran Mahasiswa</li>
              <li className="breadcrumb-item active">
                <strong>Kehadiran</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4">
            <div className="title-action">
              <a onClick={() => this.exportData()} className="btn btn-primary">
                <i className="fa fa-print" /> Cetak{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="col-lg-12">
              <div className="title-action">
                <a
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#ModalIsiBAP"
                >
                  <i className="fa fa-pencil" /> Isi Berita Acara{" "}
                </a>
              </div>
              <br />
              <div className="ibox ">
                <div
                  className="ibox-title"
                  style={{ backgroundColor: "#1ab394", color: "white" }}
                >
                  <h5>
                    {" "}
                    <i className="fa fa-list " /> Daftar Hadir Mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-lg-6">
                      <table>
                        <tr>
                          <td style={{ width: "40%" }}>Mata Kuliah </td>
                          <td>: {this.state.jadwal.mata_kuliah_info.nama}</td>
                        </tr>
                        <tr style={{ width: "100%" }}>
                          <td>Kelas </td>
                          <td style={{ width: "70%" }}>
                            : {this.state.jadwal.kelas_info.nama}
                          </td>
                        </tr>
                        <tr>
                          <td>Tanggal </td>
                          <td>
                            :{" "}
                            {moment(this.state.jadwal.start).format(
                              "DD/MM/YYYY"
                            )}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>Dosen </td>
                          <td>
                            : {this.state.jadwal.dosen_info.nama}{" "}
                            {window.sessionStorage.getItem("role") == "5"
                              ? this.state.jadwal.dosen_hadir
                                ? "( Hadir )"
                                : "( Tidak Hadir )"
                              : null}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingTop: "10px" }}>Berita Acara </td>
                          <td style={{ paddingTop: "10px" }}>
                            : <i>{this.state.jadwal.bap}</i>{" "}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-lg-4" />
                    <div className="col-lg-2" />
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
                            <th>NO </th>
                            <th>NIM </th>
                            <th>NAMA </th>
                            <th>
                             PILIH
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.daftars
                            .filter(
                              data =>
                                data.absensi == this.state.selectedAbsensi &&
                                data.kehadiran.find(
                                  x => x.jadwal == this.state.jadwal.id
                                )
                            )
                            .map((daftar, key) => (
                              <tr key={key} style={{ width: "100%" }}>
                                <td style={{ width: "10%" }}>{key + 1}</td>
                                <td style={{ width: "20%" }}>
                                  {daftar.mahasiswa_info.nim}
                                </td>
                                <td style={{ width: "50%" }}>
                                  {daftar.mahasiswa_info.nama}
                                </td>
                                <td style={{ width: "20%" }}>
                                  <center>
                                    <div className="row" >
                                      <div className="radio" style={{textAlign:'left'}}>
                                        <label className="radio-inline">
                                          <input  
                                            type="radio" 
                                            onClick={(e) => this.changeKehadiran(e, daftar)}
                                            name={`optradio_${key}`} 
                                            value="hadir"
                                            defaultChecked={daftar.kehadiran.find(x => x.jadwal == this.state.jadwal.id).status == "hadir" ? true : false}
                                            />
                                            Hadir
                                        </label>
                                        <label className="radio-inline">
                                          <input 
                                            type="radio" 
                                            onClick={(e) => this.changeKehadiran(e, daftar)}
                                            value="tanpa_keterangan"
                                            defaultChecked={daftar.kehadiran.find(x => x.jadwal == this.state.jadwal.id).status == "tanpa_keterangan" ? true : false}
                                            name={`optradio_${key}`}
                                            />
                                            T. Keterangan
                                        </label>
                                      </div>
                                      <div className="radio" style={{textAlign:'left'}}>
                                        <label className="radio-inline">
                                          <input 
                                            type="radio" 
                                            onClick={(e) => this.changeKehadiran(e, daftar)}
                                            value="sakit"
                                            defaultChecked={daftar.kehadiran.find(x => x.jadwal == this.state.jadwal.id).status == "sakit" ? true : false}
                                            name={`optradio_${key}`}
                                            />
                                            Sakit
                                        </label>
                                        <label className="radio-inline">
                                          <input 
                                            type="radio" 
                                            defaultChecked={daftar.kehadiran.find(x => x.jadwal == this.state.jadwal.id).status == "izin" ? true : false}
                                            onClick={(e) => this.changeKehadiran(e, daftar)}
                                            value="izin"
                                            name={`optradio_${key}`}
                                            />
                                            Izin
                                        </label>  
                                      </div>
                                    </div>
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
          </div>

          <div style={{ backgroundColor: "white", display: "none" }}>
            <div id="print_data">
              <table>
                <tr style={{ width: "100%" }}>
                  <td>Mata Kuliah </td>
                  <td style={{ width: "70%" }}>
                    : {this.state.jadwal.mata_kuliah_info.nama}
                  </td>
                </tr>
                <tr style={{ width: "100%" }}>
                  <td>Kelas </td>
                  <td style={{ width: "70%" }}>
                    : {this.state.jadwal.kelas_info.nama}
                  </td>
                </tr>
                <tr style={{ width: "100%" }}>
                  <td>Tanggal </td>
                  <td style={{ width: "70%" }}>: {this.state.jadwal.start} </td>
                </tr>
                <tr style={{ width: "100%" }}>
                  <td>Dosen </td>
                  <td style={{ width: "70%" }}>
                    : {this.state.jadwal.dosen_info.nama}
                  </td>
                </tr>
              </table>
              <br />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>NIM</th>
                    <th>NAMA</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.daftars
                    .filter(
                      data =>
                        data.absensi == this.state.selectedAbsensi &&
                        data.kehadiran.find(
                          x => x.jadwal == this.state.jadwal.id
                        )
                    )
                    .map((daftar, key) => (
                      <tr>
                        <td>{key + 1}</td>
                        <td>{daftar.mahasiswa_info.nim}</td>
                        <td>{daftar.mahasiswa_info.nama}</td>
                        <td>
                          {daftar.kehadiran
                            .find(x => x.jadwal == this.state.jadwal.id)
                            .status.toUpperCase()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="modal inmodal"
            id="ModalIsiBAP"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content animated bounceInRight">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span>
                  </button>
                  <h4 className="modal-title">Isi Berita Acara</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input
                        className="form-control"
                        type="text"
                        name="form-field-name"
                        value={this.state.bap}
                        onChange={e => {
                          this.setState({ bap: e.target.value });
                        }}
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
                    onClick={this.handleIsiBAP}
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
    );
  }
}

export default Kehadiran;
