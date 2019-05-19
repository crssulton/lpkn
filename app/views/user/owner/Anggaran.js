import React, { Component } from "react";
import { Link } from "react-router";
import { BASE_URL } from "../../../config/config.js";
import CurrencyInput from "react-currency-input";

class Anggaran extends Component {
  constructor(props) {
    super(props);

    const { pengajuan } = this.props.location.state;

    this.state = {
      pengajuan,
      pengajuan_anggaran: [],
      loading: true,
      form: false,
      selected: null,
      pengajuanBaru: {},
      add: true,
      addForm: true,
      edit_pengajuan_anggaran: {},
      newPengajuan: {}
    };
  }

  componentWillMount() {
    const self = this;

    fetch(BASE_URL + "/api/pengajuan-anggaran/", {
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
          pengajuan_anggaran: data.results,
          loading: !self.state.loading
        });
      });
  }

  editItem = () => {
    const self = this;
    console.log(JSON.stringify(this.state.edit_pengajuan_anggaran));
    fetch(BASE_URL + "/api/pengajuan-anggaran/" + this.state.selected + "/", {
      method: "put",
      body: JSON.stringify(this.state.edit_pengajuan_anggaran),
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(response) {
        if (response.status == 200) {
          toastr.success("Item berhasil diubah", "Sukses ! ");
          self.setState({
            addForm: !self.state.addForm
          });
        } else {
          toastr.warning("Item mengubah kelas", "Gagal ! ");
        }
      })
      .then(function(data) {});
  };

  handleDeleteItem = (id, key) => {
    const self = this;
    swal({
      title: "Hapus Item?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        fetch(BASE_URL + "/api/pengajuan-anggaran/" + id, {
          method: "delete",
          headers: {
            Authorization: "JWT " + window.sessionStorage.getItem("token")
          }
        })
          .then(function(response) {
            self.setState({
              pengajuan_anggaran: self.state.pengajuan_anggaran.filter(
                data => data.id !== id
              )
            });
            swal("Sukses! Item telah dihapus!", {
              icon: "success"
            });
          })
          .then(function(data) {
            self.setState({
              pengajuan_anggaran: self.state.pengajuan_anggaran.filter(
                data => data.id !== id
              )
            });
            swal("Sukses! Item telah dihapus!", {
              icon: "success"
            });
          });
      }
    });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <h2>Pengajuan Anggaran</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/main">Home</Link>
              </li>
              <li className="breadcrumb-item active">
                <strong>Pengajuan Anggaran</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-2" />
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox ">
                  <div
                    className="ibox-title"
                    style={{ backgroundColor: "#1ab394", color: "white" }}
                  >
                    <h5>
                      {" "}
                      <i className="fa fa-list " /> List Pengajuan
                    </h5>
                  </div>

                  <div className="ibox-content">
                    <div className="row">
                      <div className="col-lg-2">
                        <button
                          className="btn btn-info"
                          onClick={() => this.props.history.goBack()}
                        >
                          {" "}
                          <i className="fa fa-arrow-left " /> Kembali{" "}
                        </button>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped" align="right">
                        <thead>
                          <tr>
                            <th>NO</th>
                            <th>NAMA BARANG</th>
                            <th>SPESIFIKASI</th>
                            <th>JUMLAH</th>
                            <th>SATUAN</th>
                            <th>HARGA</th>
                            {this.state.pengajuan.status == "pending" ? <th><center>AKSI</center></th> : null}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.pengajuan_anggaran
                            .filter(x => x.pengajuan == this.state.pengajuan.id)
                            .map((data, key) => (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.nama_barang}</td>
                                <td>{data.spesifikasi}</td>
                                <td>{data.jumlah}</td>
                                <td>{data.satuan}</td>
                                <td>Rp. {this.formatNumber(data.harga)}</td>
                                {
                                this.state.pengajuan.status == "pending" ?
                                <td>
                                  <center>
                                    <button
                                      style={{ margin: "0 5px" }}
                                      className="btn btn-info btn-sm"
                                      type="button"
                                      onClick={() => {
                                        this.setState({
                                          selected: data.id,
                                          addForm: false
                                        });
                                        $("#ModalEditAnggaran").modal("show");
                                      }}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>

                                    <button
                                      onClick={() =>
                                        this.handleDeleteItem(data.id, key)
                                      }
                                      className="btn btn-danger btn-sm"
                                      type="button"
                                    >
                                      <i className="fa fa-trash" />
                                    </button>
                                  </center>
                                </td>
                                :
                                null
                                }
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="ModalEditAnggaran" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">×</span>{" "}
                  <span className="sr-only">close</span>
                </button>
                <h4 id="modalTitle" className="modal-title">
                  Input Gaji Pegawai
                </h4>
              </div>
              <div className="modal-body">
                {!this.state.addForm ? (
                  <div className="ibox-content">
                    <div className="">
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Nama Barang
                        </label>
                        <div className="col-lg-9">
                          <input
                            value={
                              this.state.pengajuan_anggaran.filter(
                                data => data.id === this.state.selected
                              )[0].nama_barang
                            }
                            onChange={e => {
                              let pengajuan_anggaran = [];
                              pengajuan_anggaran = this.state
                                .pengajuan_anggaran;
                              pengajuan_anggaran.filter(
                                data => data.id == this.state.selected
                              )[0].nama_barang = e.target.value;
                              this.setState({
                                pengajuan_anggaran,
                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(
                                  data => data.id == this.state.selected
                                )[0]
                              });
                            }}
                            type="text"
                            className="form-control m-b"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Spesifikasi
                        </label>
                        <div className="col-lg-9">
                          <input
                            value={
                              this.state.pengajuan_anggaran.filter(
                                data => data.id === this.state.selected
                              )[0].spesifikasi
                            }
                            onChange={e => {
                              let pengajuan_anggaran = [];
                              pengajuan_anggaran = this.state
                                .pengajuan_anggaran;
                              pengajuan_anggaran.filter(
                                data => data.id == this.state.selected
                              )[0].spesifikasi = e.target.value;
                              this.setState({
                                pengajuan_anggaran,
                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(
                                  data => data.id == this.state.selected
                                )[0]
                              });
                            }}
                            type="text"
                            className="form-control m-b"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Satuan
                        </label>
                        <div className="col-lg-9">
                          <select
                            value={
                              this.state.pengajuan_anggaran.filter(
                                data => data.id === this.state.selected
                              )[0].satuan
                            }
                            onChange={e => {
                              let pengajuan_anggaran = [];
                              pengajuan_anggaran = this.state
                                .pengajuan_anggaran;
                              pengajuan_anggaran.filter(
                                data => data.id == this.state.selected
                              )[0].satuan = e.target.value;
                              this.setState({
                                pengajuan_anggaran,
                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(
                                  data => data.id == this.state.selected
                                )[0]
                              });
                            }}
                            className="form-control m-b"
                          >
                            <option value="">--Pilih Satuan--</option>
                            <option value="buah">Buah</option>
                            <option value="unit">Unit</option>
                            <option value="lembar">Lembar</option>
                            <option value="batang">Batang</option>
                            <option value="bungkus">Bungkus</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Jumlah
                        </label>
                        <div className="col-lg-9">
                          <input
                            value={
                              this.state.pengajuan_anggaran.filter(
                                data => data.id === this.state.selected
                              )[0].jumlah
                            }
                            onChange={e => {
                              let pengajuan_anggaran = [];
                              pengajuan_anggaran = this.state
                                .pengajuan_anggaran;
                              pengajuan_anggaran.filter(
                                data => data.id == this.state.selected
                              )[0].jumlah = e.target.value;
                              this.setState({
                                pengajuan_anggaran,
                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(
                                  data => data.id == this.state.selected
                                )[0]
                              });
                            }}
                            type="number"
                            className="form-control m-b"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">Harga</label>
                        <div className="col-lg-9">
                          <CurrencyInput
                            precision="0"
                            className="form-control m-b"
                            prefix="Rp "
                            value={
                              this.state.pengajuan_anggaran.filter(
                                data => data.id === this.state.selected
                              )[0].harga
                            }
                            onChangeEvent={(e, maskedvalue, floatvalue) => {
                              let pengajuan_anggaran = [];
                              pengajuan_anggaran = this.state
                                .pengajuan_anggaran;
                              pengajuan_anggaran.filter(
                                data => data.id == this.state.selected
                              )[0].harga = floatvalue;
                              this.setState({
                                pengajuan_anggaran,
                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(
                                  data => data.id == this.state.selected
                                )[0]
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.editItem}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Anggaran;
