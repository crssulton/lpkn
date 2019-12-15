import React, {Component} from 'react';
import {Link} from 'react-router';
import {BASE_URL} from '../../../config/config.js'
import 'react-select/dist/react-select.css';
import CurrencyInput from "react-currency-input";
import moment from "moment";

let account = []

class Anggaran extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pengajuan_anggaran: [],
            loading: true,
            form: false,
            selected: null,
            pengajuanBaru: {},
            add: true,
            account: [],
            addForm: true,
            edit_pengajuan_anggaran: {},
            newPengajuan: {},
            num_pages: null,
            next: null,
            previous: null,
            count: null,
        }
    }

    getNextData = () => {
        const self = this;
        this.setState({loading: true});
        fetch(this.state.next, {
            method: "get",
            headers: {
                Authorization: "JWT " + window.sessionStorage.getItem("token")
            }
        })
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              self.setState({
                  pengajuan_anggaran: data.results,
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
        this.setState({loading: true});
        fetch(this.state.previous, {
            method: "get",
            headers: {
                Authorization: "JWT " + window.sessionStorage.getItem("token")
            }
        })
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              self.setState({
                  pengajuan_anggaran: data.results,
                  num_pages: data.num_pages,
                  next: data.next,
                  previous: data.previous,
                  count: data.count,
                  loading: false
              });
          });
    };

    componentWillMount() {
        const self = this

        fetch(BASE_URL + '/api/pengajuan-anggaran/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                pengajuan_anggaran: data.results,
                num_pages: data.num_pages,
                next: data.next,
                previous: data.previous,
                count: data.count,
                loading: !self.state.loading
            })
        });

        fetch(BASE_URL + '/api/account/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                account: data
            })
        });

    }

    addItem = () => {
        const self = this
        let addButton = document.getElementsByClassName("btn-add")

        addButton[0].setAttribute("disabled", "disabled")

        let newPengajuan = {...this.state.newPengajuan}

        fetch(BASE_URL + '/api/pengajuan-anggaran/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPengajuan)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {

            if (data.id != null || data.id != undefined) {
                addButton[0].removeAttribute("disabled")
                let pengajuan_anggaran = []
                let newPengajuan = {}
                newPengajuan = self.state.newPengajuan

                pengajuan_anggaran = self.state.pengajuan_anggaran
                pengajuan_anggaran.push(data)

                self.setState({
                    addForm: true,
                    pengajuan_anggaran,
                    newPengajuan: {}

                })
                toastr.success("Item berhasil ditambahkan", "Sukses ! ")
            } else {
                addButton[0].removeAttribute("disabled")
                self.setState({
                    addForm: true
                })
                toastr.warning("Gagal menambahkan Item", "Gagal ! ")
            }
        });
    }

    editItem = () => {
        const self = this
        fetch(BASE_URL + '/api/pengajuan-anggaran/' + this.state.selected + '/', {
            method: 'put',
            body: JSON.stringify(this.state.edit_pengajuan_anggaran),
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.status == 200) {
                toastr.success("Item berhasil diubah", "Sukses ! ")
                self.setState({
                    addForm: !self.state.addForm
                })
            } else {
                toastr.warning("Item mengubah kelas", "Gagal ! ")
            }
        }).then(function (data) {

        });
    }

    handleDeleteItem = (id, key) => {
        const self = this
        swal({
            title: "Hapus Item?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
          .then((willDelete) => {
              if (willDelete) {
                  fetch(BASE_URL + '/api/pengajuan-anggaran/' + id, {
                      method: 'delete',
                      headers: {
                          'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
                      }
                  }).then(function (response) {

                      self.setState({
                          pengajuan_anggaran: self.state.pengajuan_anggaran.filter(data => data.id !== id)
                      })
                      swal("Sukses! Item telah dihapus!", {
                          icon: "success",
                      });
                  }).then(function (data) {
                      self.setState({
                          pengajuan_anggaran: self.state.pengajuan_anggaran.filter(data => data.id !== id)
                      })
                      swal("Sukses! Item telah dihapus!", {
                          icon: "success",
                      })
                  });
              }
          });
    }


    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };

    approveTransaksi = (id) => {
        const self = this
        swal({
            title: "Buat Transaksi Item ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
          .then((willDelete) => {
              if (willDelete) {
                  fetch(BASE_URL + '/api/pengajuan-anggaran/' + id + '/approve/', {
                      method: 'post',
                      headers: {
                          'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                      }
                  }).then(function (response) {
                      let pengajuan_anggaran = [...self.state.pengajuan_anggaran]

                      if (response.status == 200 || response.status == 201) {
                          pengajuan_anggaran.find(data => data.id == id).approved = true
                          self.setState({
                              pengajuan_anggaran
                          })
                          swal("Sukses! Item telah dimasukkan dalam Transaksi!", {
                              icon: "success",
                          });
                      } else {
                          toastr.warning("Terjadi kesalahan", "Gagal ! ")
                      }
                  }).then(function (data) {
                  });
              }
          });
    }

    render() {
        account = [...this.state.account]
        const {selectedOption} = this.state;
        this.state.account.map((data, key) => {
            account[key].value = data.id
            account[key].label = data.nama
        })
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
                  <div className="col-lg-2">
                  </div>
              </div>
              <div className="wrapper wrapper-content">
                  <div className="row animated fadeInRight">
                      <div className="row">
                          <div className="col-lg-8">
                              <div className="ibox ">
                                  <div className="ibox-title"
                                       style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                      <h5><i className="fa fa-list "></i> List Pengajuan</h5>
                                  </div>

                                  <div className="ibox-content">
                                      <br/>
                                      {this.state.loading ? (
                                        <div className="spiner-example">
                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                <div className="sk-double-bounce1"/>
                                                <div className="sk-double-bounce2"/>
                                            </div>
                                        </div>
                                      ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped" align="right">
                                                <thead>
                                                <tr>
                                                    <th>NAMA</th>
                                                    <th>URAIAN</th>
                                                    <th>TANGGAL</th>
                                                    <th>PENGAJUAN</th>
                                                    <th>SISA</th>
                                                    <th>DIKIRIMKAN</th>
                                                    <th>STATUS</th>
                                                    <th>
                                                        <center>AKSI</center>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.pengajuan_anggaran.map((data, key) =>
                                                      <tr key={key}>
                                                          <td>{data.nama}</td>
                                                          <td>{data.uraian}</td>
                                                          <td>{moment(data.created).format("D/M/Y")}</td>
                                                          <td>{this.formatNumber(data.harga)}</td>
                                                          <td>{this.formatNumber(data.sisa)}</td>
                                                          <td>{this.formatNumber(data.transfer)}</td>
                                                          <td>
                                                              {data.approved ? (
                                                                  data.verified ?
                                                                    <span className="badge badge-secondary">
                                                                    Expired
                                                                  </span>
                                                                    :
                                                                    <span className="badge badge-primary">
                                                                    Diterima
                                                                  </span>
                                                                )
                                                                :
                                                                <span className="badge badge-warning">
                                                                    Menunggu
                                                                  </span>
                                                              }
                                                          </td>
                                                          <td>
                                                              {
                                                                  data.approved ?
                                                                    <center>
                                                                        <Link to={{
                                                                            pathname: 'pengajuan',
                                                                            state: {pengajuan: data}
                                                                        }}>
                                                                            <button
                                                                              style={{'margin': '0 5px'}}
                                                                              className="btn btn-info btn-sm"
                                                                              type="button"
                                                                              onClick={() => {
                                                                                  this.setState({
                                                                                      selected: data.id,
                                                                                      addForm: false
                                                                                  })
                                                                              }}
                                                                            >
                                                                                <i className="fa fa-eye"></i>
                                                                            </button>
                                                                        </Link>
                                                                    </center>
                                                                    :
                                                                    <center>
                                                                        <button
                                                                          style={{'margin': '0 5px'}}
                                                                          className="btn btn-info btn-sm"
                                                                          type="button"
                                                                          onClick={() => {
                                                                              this.setState({
                                                                                  selected: data.id,
                                                                                  addForm: false
                                                                              })
                                                                          }}
                                                                        >
                                                                            <i className="fa fa-edit"></i></button>

                                                                        <button
                                                                          onClick={() => this.handleDeleteItem(data.id, key)}
                                                                          className="btn btn-danger btn-sm"
                                                                          type="button"
                                                                        ><i className="fa fa-trash"></i></button>
                                                                    </center>
                                                              }
                                                          </td>
                                                      </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                      )
                                      }
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
                                                  <i className="fa fa-chevron-left"/> Sebelumnya{" "}
                                              </button>
                                              <button
                                                disabled={this.state.next == null ? "disabled" : null}
                                                onClick={this.getNextData}
                                                className="btn btn-white"
                                                type="button"
                                              >
                                                  {" "}
                                                  Selanjutnya <i className="fa fa-chevron-right"/>{" "}
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="col-lg-4">
                              <div className="ibox ">
                                  {
                                      this.state.addForm ?
                                        <div className="ibox-title"
                                             style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                            <h5><i className="fa fa-plus"></i> Tambah Pengajuan Anggaran</h5>
                                        </div>
                                        :
                                        <div className="ibox-title"
                                             style={{'backgroundColor': '#fad284', 'color': 'white'}}>
                                            <h5><i className="fa fa-pencil"></i> Ubah Pengajuan Anggaran</h5>
                                        </div>
                                  }
                                  {
                                      this.state.addForm ?
                                        <div className="ibox-content">

                                            <div className="">
                                                <div className="form-group row"><label
                                                  className="col-lg-3 col-form-label">Nama Pengajuan</label>
                                                    <div className="col-lg-9">
                                                        <input
                                                          value={this.state.newPengajuan.nama}
                                                          onChange={(e) => {
                                                              let newPengajuan = {...this.state.newPengajuan}
                                                              newPengajuan.nama = e.target.value
                                                              this.setState({newPengajuan})
                                                          }}
                                                          type="text"
                                                          className="form-control m-b"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row"><label
                                                  className="col-lg-3 col-form-label">Harga</label>
                                                    <div className="col-lg-9">
                                                        <CurrencyInput
                                                          precision="0"
                                                          className="form-control m-b"
                                                          prefix="Rp "
                                                          value={this.state.newPengajuan.harga}
                                                          onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                              let newPengajuan = {...this.state.newPengajuan}
                                                              newPengajuan.harga = floatvalue
                                                              newPengajuan.jumlah = 1
                                                              this.setState({newPengajuan})
                                                          }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row"><label
                                                  className="col-lg-3 col-form-label">Uraian</label>
                                                    <div className="col-lg-9">
                                                        <input
                                                          value={this.state.newPengajuan.uraian}
                                                          onChange={(e) => {
                                                              let newPengajuan = {...this.state.newPengajuan}
                                                              newPengajuan.uraian = e.target.value
                                                              this.setState({newPengajuan})
                                                          }}
                                                          type="text"
                                                          className="form-control m-b"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                  className="btn btn-primary btn-sm btn-add"
                                                  type="button"
                                                  onClick={this.addItem}>
                                                    Tambah
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <div className="ibox-content">

                                            <div className="">
                                                <div className="form-group row"><label
                                                  className="col-lg-3 col-form-label">Nama Pengajuan</label>
                                                    <div className="col-lg-9">
                                                        <input
                                                          value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].nama}
                                                          onChange={(e) => {
                                                              let pengajuan_anggaran = []
                                                              pengajuan_anggaran = this.state.pengajuan_anggaran
                                                              pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].nama = e.target.value
                                                              this.setState({
                                                                  pengajuan_anggaran,
                                                                  edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                              })
                                                          }}
                                                          type="text"
                                                          className="form-control m-b"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row"><label
                                                  className="col-lg-3 col-form-label">Harga</label>
                                                    <div className="col-lg-9">
                                                        <CurrencyInput
                                                          precision="0"
                                                          className="form-control m-b"
                                                          prefix="Rp "
                                                          value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].harga}
                                                          onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                              let pengajuan_anggaran = []
                                                              pengajuan_anggaran = this.state.pengajuan_anggaran
                                                              pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].harga = floatvalue
                                                              this.setState({
                                                                  pengajuan_anggaran,
                                                                  edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                              })
                                                          }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row"><label
                                                  className="col-lg-3 col-form-label">Uraian</label>
                                                    <div className="col-lg-9">
                                                        <input
                                                          value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].uraian}
                                                          onChange={(e) => {
                                                              let pengajuan_anggaran = []
                                                              pengajuan_anggaran = this.state.pengajuan_anggaran
                                                              pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].uraian = e.target.value
                                                              this.setState({
                                                                  pengajuan_anggaran,
                                                                  edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                              })
                                                          }}
                                                          type="text"
                                                          className="form-control m-b"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                  style={{'marginRight': '10px'}}
                                                  className="btn btn-info btn-add"
                                                  type="button"
                                                  onClick={this.editItem}>
                                                    Edit
                                                </button>
                                                <button
                                                  className="btn btn-danger "
                                                  type="button"
                                                  onClick={() => {
                                                      this.setState({addForm: !this.state.addForm})
                                                  }}>
                                                    Batal
                                                </button>
                                            </div>
                                        </div>
                                  }

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
    }

}

export default Anggaran