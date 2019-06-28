import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";

class Daftar extends Component {
  constructor(props) {
    super(props);

    const { absensiData } = this.props.location.state;
    const { matkul } = this.props.location.state;
    console.log(absensiData);
    this.state = {
      mahasiswas: [],
      loading: true,
      jurusans: [],
      matkul,
      absensiData,
      loadingSimpan: false,
      daftars: [],
      sendDaftar: [],
      selectedJurusan: absensiData.jurusan_info.id,
      selectedAngkatan: "",
      checkAll: false
    };
  }

  componentDidMount() {
    const self = this;

    fetch(BASE_URL + "/api/mahasiswa/?jurusan=" + this.state.selectedJurusan, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let mhs = [...data.results];
        mhs.map(data => {
          data.check = false;
        });
        self.setState({
          mahasiswas: mhs,
          loading: !self.state.loading
        });
      });

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
        let mhs = [...data.results];
        mhs.map(data => {
          data.check = false;
        });
        self.setState({
          daftars: data.results
        });
      });

    fetch(BASE_URL + "/api/angkatan/", {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let mhs = [...data.results];
        mhs.map(data => {
          data.check = false;
        });
        self.setState({
          angkatan: absensiData
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
          selectedJurusan: data.results[0].id,
          jurusans: data.results
        });
      });
  }

  handleDeleteCheck = id => {
    fetch(BASE_URL + "/api/daftar/" + id + "/", {
      method: "delete",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        if (response.status == 204) {
          toastr.success("Mahasiswa telah dihilangkan dari daftar", "Sukses!");
        } else {
          toastr.warning("Mahasiswa gagal dihilangkan dari daftar", "Gagal!");
        }
      })
      .then(function(data) {});
  };

  handleCheck = id => {
    let listDaftar = this.state.daftars.filter(
      data => data.absensi == this.state.absensiData.id && data.mahasiswa == id
    );
    if (listDaftar.length != 0) {
      this.setState({
        daftars: this.state.daftars.filter(
          data =>
            data.absensi == this.state.absensiData.id && data.mahasiswa != id
        )
      });
      this.handleDeleteCheck(listDaftar[0].id);
    } else {
      let daftars = [...this.state.daftars];
      let tmpDaftar = {};
      tmpDaftar.absensi = this.state.absensiData.id;
      tmpDaftar.mahasiswa = id;

      let sendDaftar = [...this.state.sendDaftar];
      sendDaftar.push(tmpDaftar);
      daftars.push(tmpDaftar);
      this.setState({ sendDaftar, daftars });
    }
  };

  handleCheckAll = id => {
    this.setState(
      {
        checkAll: !this.state.checkAll
      },
      () => {
        let daftars = [...this.state.daftars];
        let sendDaftar = [...this.state.sendDaftar];

        if (this.state.checkAll) {
          this.state.mahasiswas
            .filter(
              mahasiswa =>
                mahasiswa.calon == false &&
                mahasiswa.jurusan == this.state.selectedJurusan
            )
            .map(mahasiswa => {
              let tmpDaftar = {};
              tmpDaftar.absensi = this.state.absensiData.id;
              tmpDaftar.mahasiswa = mahasiswa.id;
              daftars.push(tmpDaftar);
              sendDaftar.push(tmpDaftar);
            });
          this.setState({ daftars, sendDaftar });
        } else {
          this.setState({ daftars: [], sendDaftar: [] });
        }
      }
    );
  };

  sendDaftar = () => {
    const self = this;
    let status = false;

    if (this.state.sendDaftar.length != 0) {
      this.state.sendDaftar.map(data => {
        fetch(BASE_URL + "/api/daftar/", {
          method: "post",
          headers: {
            Authorization: "JWT " + window.sessionStorage.getItem("token"),
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(function(response) {
            if (response.status == 201) {
              toastr.success("Berhasil menambahkan mahasiswa", "Sukses ! ");
              status = true;
            } else {
              status = false;
            }
          })
          .then(function(data) {});
      });
      //   	Promise.all(promises).then(function(results) {
      //     if (status) toastr.success("Berhasil menambahkan mahasiswa", "Sukses ! ")
      //  			else toastr.warning("Gagal menambahkan mahasiswa", "Gagal ! ")
      // })
    } else {
      toastr.warning("Daftar tidak boleh kosong", "Gagal ! ");
    }

    // if (status) toastr.success("Berhasil menambahkan mahasiswa", "Sukses ! ")
    // else toastr.warning("Gagal menambahkan mahasiswa", "Gagal ! ")
  };

  render() {
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Absensi {this.state.matkul}</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">Absensi</li>
              <li className="breadcrumb-item active">
                <strong>Daftar Mahasiswa</strong>
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
                    <i className="fa fa-list " /> Daftar Mahasiswa
                  </h5>
                </div>
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-lg-4">
                      <label className="form-label">Jurusan : </label>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Angkatan : </label>
                    </div>
                    <div className="col-lg-3" />
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <select
                        value={this.state.selectedJurusan}
                        onChange={e => {
                          this.setState({
                            selectedJurusan: e.target.value
                          });
                        }}
                        className="form-control"
                      >
                        <option value="">Pilih Jurusan</option>
                        {this.state.jurusans.map((jurusan, key) => (
                          <option key={key} value={jurusan.id}>
                            {jurusan.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-4">
                      <select
                        value={this.state.selectedAngkatan}
                        onChange={e => {
                          this.setState({
                            selectedAngkatan: e.target.value
                          });
                        }}
                        className="form-control"
                      >
                        <option value="">Pilih Angkatan</option>
                        {this.state.angkatan.map((angkatan, key) => (
                          <option key={key} value={angkatan.angkatan}>
                            {angkatan.tahun} | Angkatan ke-{angkatan.angkatan}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-3">
                      <button
                        onClick={this.onFilterData}
                        className="btn btn-info btn-sm"
                        type="button"
                      >
                        <i className="fa fa-filter" /> Filter
                      </button>

                      <button
                        onClick={() => {
                          const self = this;
                          this.fetchKelas();
                          this.setState({
                            selectedAngkatan: "",
                            selectedJurusan: ""
                          });
                        }}
                        style={{ marginLeft: "5px" }}
                        className="btn btn-warning btn-sm"
                        type="button"
                      >
                        <i className="fa fa-close" /> Reset
                      </button>
                    </div>
                    <div className="col-lg-2">
                      {this.state.loadingSimpan ? (
                        <button
                          disabled
                          className="btn btn-primary push-right"
                          onClick={this.sendDaftar}
                        >
                          <i className="fa fa-save" /> Menyimpan...
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary push-right"
                          onClick={this.sendDaftar}
                        >
                          <i className="fa fa-save" /> Simpan
                        </button>
                      )}
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
                            <th>
                              <center>PILIH</center>
                            </th>
                          </tr>
                          <tr>
                            <td colSpan="3" />
                            <td>
                              <center>
                                <input
                                  type="checkbox"
                                  checked={this.state.checkAll}
                                  onChange={this.handleCheckAll}
                                />
                              </center>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.mahasiswas
                            .filter(mahasiswa => mahasiswa.calon == false)
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
                                  <center>
                                    <input
                                      type="checkbox"
                                      checked={
                                        this.state.daftars.find(
                                          data =>
                                            data.absensi ==
                                              this.state.absensiData.id &&
                                            data.mahasiswa == mahasiswa.id
                                        )
                                          ? true
                                          : false
                                      }
                                      value={mahasiswa.id}
                                      onChange={e =>
                                        this.handleCheck(mahasiswa.id)
                                      }
                                    />
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
        </div>
      </div>
    );
  }
}

export default Daftar;
