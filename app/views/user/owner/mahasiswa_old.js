import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";

class Mahasiswa_old extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mahasiswas: [],
            mahasiswasTmp: [],
            reportMahasiswa: [],
            mahasiswa: [],
            loading: true,
            selectedJurusan: 0,
            selectedKampus: 0,
            selectedNama: "",
            key: null,
            profil: false,
            jurusans: [],
            kampus: [],
            magang: [],
            bekerja: [],
            selectedStatus: ""
        };
    }

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    componentDidMount() {
        const self = this;

        fetch(BASE_URL + "/api/magang/", {
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
                    magang: data.results
                });
            });

        fetch(BASE_URL + "/api/bekerja/", {
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
                    bekerja: data.results
                });
            });

        fetch(BASE_URL + "/api/mahasiswa/", {
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
                    mahasiswas: data,
                    mahasiswasTmp: data,
                    loading: !self.state.loading
                });
            });

        fetch(BASE_URL + "/api/kampus/", {
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
                    kampus: data.results
                });
            });

        fetch(BASE_URL + "/api/jurusan/", {
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
                    jurusans: data.results
                });
            });
    }

    exportData = () => {
        printJS({
            printable: "print_data",
            type: "html",
            modalMessage: "Sedang memuat data...",
            showModal: true,
            maxWidth: "1300",
            font_size: "8pt",
            documentTitle: "DATA MAHASISWA",
            targetStyles: ["*"]
        });
    };

    handleSelectedJurusan = e => {
        this.setState({
            loading: !this.state.loading,
            selectedJurusan: e.target.value
        });
        setTimeout(() => {
            this.setState({loading: !this.state.loading});
        }, 1000);
    };

    getMahasiswa = id => {
        this.setState({
            mahasiswa: this.state.mahasiswas.find(data => data.id == id),
            profil: true
        });
    };

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Daftar Mahasiswa</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item">View Cabang</li>
                            <li className="breadcrumb-item active">
                                <strong>Mahasiswa</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4">
                        <div className="title-action">
                            <a onClick={() => this.exportData()} className="btn btn-primary">
                                <i className="fa fa-print"/> Cetak{" "}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">

                        <div style={{backgroundColor: "white", display: 'none'}}>
                            <table style={{fontSize: "8pt"}} className="table table-bordered" id="print_data">
                                <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>NIM.</th>
                                    <th>NAMA</th>
                                    <th>ALAMAT</th>
                                    <th>TMPT LAHIR</th>
                                    <th>TGL LAHIR</th>
                                    <th>JK</th>
                                    <th>JURUSAN</th>
                                    <th>STATUS</th>
                                    <th>ANGKATAN</th>
                                    <th>TOTAL BAYAR</th>
                                    <th>KAMPUS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.mahasiswasTmp
                                    .filter(mahasiswa => mahasiswa.calon == false)
                                    .map((data, key) => (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{data.nim}</td>
                                            <td>{data.nama}</td>
                                            <td>{data.alamat}</td>
                                            <td>{data.tempat_lahir}</td>
                                            <td>{data.tgl_lahir}</td>
                                            <td>{data.jenis_kelamin}</td>
                                            <td>{data.jurusan_info.nama}</td>
                                            <td>
                                                {data.aktif ? (
                                                    "Aktif"
                                                ) : (
                                                    "Tidak Aktif"
                                                )}
                                            </td>
                                            <td>{data.tahun_angkatan}</td>
                                            <td>{data.total_bayar}</td>
                                            <td>{data.kampus_info.nama}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div
                                    className="ibox-title"
                                    style={{backgroundColor: "#1ab394", color: "white"}}
                                >
                                    <h5>
                                        {" "}
                                        <i className="fa fa-list "/> Daftar Mahasiswa
                                    </h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label className="form-label">Filter Kampus : </label>
                                        </div>
                                        <div className="col-lg-4">
                                            <label className="form-label">Filter Jurusan : </label>
                                        </div>
                                        <div className="col-lg-4">
                                            <label className="form-label">Pencarian : </label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <select
                                                value={this.state.selectedKampus}
                                                onChange={e => {
                                                    if (e.target.value != "0") {
                                                        this.setState({
                                                            mahasiswasTmp: this.state.mahasiswas.filter(
                                                                data => data.kampus_info.id == e.target.value
                                                            ),
                                                            selectedKampus: e.target.value
                                                        });
                                                    } else {
                                                        let mahasiswas = this.state.mahasiswas;
                                                        this.setState({
                                                            mahasiswasTmp: mahasiswas,
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
                                        <div className="col-lg-4">
                                            <select
                                                disabled={
                                                    this.state.selectedKampus == "0" ? "disabled" : null
                                                }
                                                value={this.state.selectedJurusan}
                                                onChange={e => {
                                                    if (e.target.value != "0") {
                                                        this.setState({
                                                            mahasiswasTmp: this.state.mahasiswas.filter(
                                                                data =>
                                                                    data.jurusan_info.id == e.target.value &&
                                                                    data.kampus_info.id ==
                                                                    this.state.selectedKampus
                                                            ),
                                                            selectedJurusan: e.target.value
                                                        });
                                                    } else {
                                                        let mahasiswas = this.state.mahasiswas.filter(
                                                            data =>
                                                                data.kampus_info.id == this.state.selectedKampus
                                                        );
                                                        this.setState({
                                                            mahasiswasTmp: mahasiswas,
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
                                        <div className="col-lg-4">
                                            <input
                                                type="text"
                                                value={this.state.selectedNama}
                                                onChange={(e) => {
                                                    this.setState({selectedNama: e.target.value})
                                                }}
                                                disabled=""
                                                placeholder="Nama Mahasiswa"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="hr-line-dashed"/>
                                    {this.state.loading ? (
                                        <div className="spiner-example">
                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                <div className="sk-double-bounce1"/>
                                                <div className="sk-double-bounce2"/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>NIM</th>
                                                    <th>NAMA</th>
                                                    <th>KAMPUS</th>
                                                    <th>STATUS</th>
                                                    <th>DETAIL</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.mahasiswasTmp
                                                    .filter(mahasiswa => mahasiswa.calon == false && mahasiswa.nama.toLowerCase().includes(this.state.selectedNama))
                                                    .map((mahasiswa, key) => (
                                                        <tr key={key}>
                                                            <td>{mahasiswa.nim}</td>
                                                            <td>{mahasiswa.nama}</td>
                                                            <td>{mahasiswa.kampus_info.nama}</td>
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
                                                                    <i className="fa fa-eye"/>
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
                                    style={{backgroundColor: "#1ab394", color: "white"}}
                                >
                                    <h5>
                                        {" "}
                                        <i className="fa fa-user"/> Profil Mahasiswa
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
                                                <h3 style={{textAlign: "center"}}>
                                                    <strong>{this.state.mahasiswa.nama}</strong>
                                                </h3>
                                                <p style={{textAlign: "center"}}>
                                                    {this.state.mahasiswa.nim}
                                                </p>
                                            </div>
                                            {this.state.bekerja != null ? this.state.bekerja.find(
                                                data => data.mahasiswa == this.state.mahasiswa.id
                                            ) != null ? (
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td style={{width: "40%"}}>
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
                                            ) : null : null}

                                            {this.state.magang != null ? this.state.magang.find(
                                                data => data.mahasiswa == this.state.mahasiswa.id
                                            ) != null ? (
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td style={{width: "40%"}}>
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
                                            ) : null : null}

                                            <table className="table" style={{width: "100%"}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{width: "40%"}}>
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

export default Mahasiswa_old;
