import React, { Component } from "react";
import { BASE_URL } from "../../../config/config.js";
import swal from "sweetalert";
import {Link} from "react-router";

class Calon_Mahasiswa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mahasiswas: [],
            mahasiswa: [],
            jurusan: [],
            kampus: [],
            loading: true,
            selectedJurusan: "all",
            key: null,
            profil: false,
            key: null,
            num_pages: null,
            next: null,
            previous: null,
            count: null,
            selectedMahasiswa: "",
            selectedJurusan: "",
            selectedKelas: "",
            kelas: []
        };
    }

    componentDidMount() {
        const self = this;

        this.fetchMahasiswa();

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

        fetch(BASE_URL + "/api/kelas/", {
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
                    kelas: data.results
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

    fetchMahasiswa = () => {
        const self = this;

        this.setState({ loading: true });

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
    };

    onFilterData = () => {
        const self = this;

        this.setState({ loading: true });

        let mahasiswa = this.state.selectedMahasiswa;
        let jurusan = this.state.selectedJurusan;
        let kelas = this.state.selectedKelas;

        fetch(
            BASE_URL +
            `/api/mahasiswa/?mahasiswa=${mahasiswa}&kelas=${kelas}&jurusan=${jurusan}`,
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
                    mahasiswas: data,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    loading: false
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

    getKelas = () => {
        const self = this;
        fetch(BASE_URL + "/api/kelas/?jurusan=" + this.state.selectedJurusan, {
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
                    kelas: data.results
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
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="form-label">Jurusan : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Kelas : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Nama : </label>
                                        </div>
                                        <div className="col-lg-3" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <select
                                                value={this.state.selectedJurusan}
                                                onChange={e => {
                                                    this.setState(
                                                        {
                                                            selectedJurusan: e.target.value
                                                        },
                                                        () => {
                                                            this.getKelas();
                                                        }
                                                    );
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
                                        <div className="col-lg-3">
                                            <select
                                                value={this.state.selectedKelas}
                                                onChange={e => {
                                                    this.setState({ selectedKelas: e.target.value });
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
                                                            {kelas.nama} | Angkatan {kelas.angkatan_info.angkatan}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-3">
                                            <input
                                                type="text"
                                                placeholder="Mahasiswa"
                                                className="form-control"
                                                value={this.state.selectedMahasiswa}
                                                onChange={e => {
                                                    this.setState({ selectedMahasiswa: e.target.value });
                                                }}
                                            />
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
                                                    this.fetchMahasiswa();
                                                    this.setState({
                                                        selectedMahasiswa: "",
                                                        selectedJurusan: "",
                                                        selectedKelas: ""
                                                    });
                                                }}
                                                style={{ marginLeft: "5px" }}
                                                className="btn btn-warning btn-sm"
                                                type="button"
                                            >
                                                <i className="fa fa-close" /> Reset
                                            </button>
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
                                                            <td>{mahasiswa.jurusan_info.nama}</td>
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
                                                        src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
                                                    />
                                                )}
                                            </div>
                                            <div className="ibox-content profile-content">
                                                <h3 style={{ textAlign: "center" }}>
                                                    <strong>{this.state.mahasiswa.nama.toUpperCase()}</strong>
                                                </h3>
                                                <h5 style={{ textAlign: "center" }}>
                                                    <strong>{this.state.mahasiswa.nim}</strong>
                                                </h5>
                                                <center>
                                                    <span className="badge badge-secondary">
                                                        {this.state.mahasiswa.status.toUpperCase()}
                                                    </span>
                                                </center>
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
                                                                        <b>Angkatan Ke-</b>{" "}
                                                                    </td>
                                                                    <td>
                                                                        : {this.state.mahasiswa.angkatan} Tahun{" "}
                                                                        {this.state.mahasiswa.tahun_angkatan}
                                                                    </td>
                                                                </tr>
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
                                                                    <td>: {moment(this.state.mahasiswa.tgl_lahir).format("DD-MM-YYYY")}</td>
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
                                                                        <b>Keterangan</b>
                                                                    </td>
                                                                    <td>
                                                                        {this.state.mahasiswa.keterangan}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <b>Jurusan</b>
                                                                    </td>
                                                                    <td>
                                                                        {this.state.mahasiswa.jurusan_info.nama}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <b>Kampus</b>
                                                                    </td>
                                                                    <td>
                                                                        {this.state.mahasiswa.kampus_info.nama}
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
                                                                        <b>Telah Dibayar</b>
                                                                    </td>
                                                                    <td>
                                                                        : Rp.{" "}
                                                                        {this.formatNumber(
                                                                            this.state.mahasiswa.total_bayar -
                                                                            this.state.mahasiswa.sisa_bayar
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
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <Link to={{
                                                pathname: 'edit-mahasiswa',
                                                state: {staf: this.state.mahasiswa}
                                            }}>
                                                <button className="btn btn-info btn-block">Ubah Data</button>
                                            </Link>
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
