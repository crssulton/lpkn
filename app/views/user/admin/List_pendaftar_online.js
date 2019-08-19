import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";
import swal from "sweetalert";
import moment from "moment";
import Select from "react-select";
import "react-select/dist/react-select.css";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";

let account = [];
let accountTujuan = [];

class List_pendaftar extends Component {
    constructor(props) {
        super(props);

        let pendaftar = {};
        pendaftar.biaya_pendaftaran = "true";

        this.state = {
            pendaftars: [],
            pendaftar,
            jurusans: [],
            kampus: [],
            dataCount: 0,
            kwitansi: [],
            next: null,
            previous: null,
            numPage: 0,
            loading: true,
            selectedJurusan: "all",
            key: null,
            profil: false,
            key: null,
            loadingApprove: false,
            account: [],
            kampus: {}
        };
    }

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
    }

    componentDidMount() {
        const self = this;

        this.getPendaftar()

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

        fetch(BASE_URL + "/api/account/", {
            method: "get",
            headers: {
                Authorization: "JWT " + window.sessionStorage.getItem("token"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.setState({
                    account: data
                });
            });

        let kampus = window.sessionStorage.getItem("kampus_id")

        fetch(BASE_URL + `/api/kampus/${kampus}/`, {
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
                    kampus: data
                });
            });
    }

    getPendaftar = () => {
        const self = this;

        this.setState({loading: true})

        fetch(BASE_URL + "/api/pendaftaran/?approved=0&online=1", {
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
                    pendaftars: data,
                    numPage: data.num_pages,
                    dataCount: data.count,
                    next: data.next,
                    previous: data.previous,
                    loading: false
                });
            });
    }

    getNextData = () => {
        const self = this;
        this.setState({loading: true})
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
                    pendaftars: data.results,
                    numPage: data.num_pages,
                    dataCount: data.count,
                    next: data.next,
                    previous: data.previous,
                    loading: !self.state.loading
                });
            });
    }

    getPreviousData = () => {
        const self = this;
        this.setState({loading: true})
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
                    pendaftars: data.results,
                    numPage: data.num_pages,
                    dataCount: data.count,
                    next: data.next,
                    previous: data.previous,
                    loading: !self.state.loading
                });
            });
    }

    handleSelectedJurusan = e => {
        this.setState({
            loading: !this.state.loading,
            selectedJurusan: e.target.value
        });
        setTimeout(() => {
            this.setState({loading: !this.state.loading});
        }, 1000);
    };

    getpendaftar = id => {

        let pendaftar = this.state.pendaftars.find(data => data.id == id)
        pendaftar.biaya_pendaftaran = "true"

        this.setState({
            pendaftar,
            profil: true
        });
    };

    handleUpdatependaftar = () => {
        const self = this;
        const id = this.state.pendaftar.id

        let pendaftar = {...this.state.pendaftar};

        if (pendaftar.biaya_pendaftaran == "true") {
            pendaftar.biaya_pendaftaran_nominal = 250000;

            if (pendaftar.account_tujuan != null) {
                swal({
                    title: "Approve " + this.state.pendaftar.nama + " ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                }).then(willTerima => {
                    if (willTerima) {
                        self.setState({loadingApprove: true})
                        fetch(BASE_URL + "/api/pendaftaran/" + this.state.pendaftar.id + "/", {
                            method: "patch",
                            headers: {
                                Authorization: "JWT " + window.sessionStorage.getItem("token"),
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(pendaftar)
                        })
                            .then(function (response) {
                                if (response.status == 200) {
                                    self.handleTerimaCalon(id)
                                }
                                return response.json();
                            })
                            .then(function (data) {
                            });
                    }
                });
            } else {
                toastr.warning("Silahkan mengisi akun tujuan")
            }
        } else {
            swal({
                title: "Approve " + this.state.pendaftar.nama + " ?",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willTerima => {
                if (willTerima) {
                    self.setState({loadingApprove: true})
                    fetch(BASE_URL + "/api/pendaftaran/" + this.state.pendaftar.id + "/", {
                        method: "patch",
                        headers: {
                            Authorization: "JWT " + window.sessionStorage.getItem("token"),
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(pendaftar)
                    })
                        .then(function (response) {
                            if (response.status == 200) {
                                self.handleTerimaCalon(id)
                            }
                            return response.json();
                        })
                        .then(function (data) {
                        });
                }
            });
        }

    }

    handleTerimaCalon = key => {
        const self = this;
        fetch(BASE_URL + "/api/pendaftaran/" + key + "/approve/", {
            method: "post",
            headers: {
                Authorization: "JWT " + window.sessionStorage.getItem("token")
            }
        })
            .then(function (response) {
                if (response.status == 201) {
                    toastr.success("Calon mahasiswa berhasil ditambahkan", "Sukses ! ");
                    let pendaftars = [];

                    pendaftars = self.state.pendaftars.filter(data => data.id != key)
                    self.setState({
                        profil: false,
                        loadingApprove: false,
                        pendaftars
                    });
                    self.getPendaftar()
                }
                return response.json();
            })
            .then(function (data) {
                if (data.id != null) {
                    self.setState(
                        {
                            kwitansi: data
                        },
                        () => {
                            if (typeof (data.transaksi[0]) !== 'undefined') {
                                self.setState({check: true}, () => {
                                    setTimeout(() => {
                                        self.exportData()
                                    }, 100)
                                })
                            }
                        }
                    );
                }
            });
    };

    handleDeletePendaftar = key => {
        const self = this;
        swal({
            title: "Hapus " + key.nama + " ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                fetch(BASE_URL + "/api/pendaftaran/" + key.id, {
                    method: "delete",
                    headers: {
                        Authorization: "JWT " + window.sessionStorage.getItem("token")
                    }
                })
                    .then(function (response) {
                        let pendaftars = [];
                        pendaftars = self.state.pendaftars;
                        delete pendaftars[self.state.key];
                        self.setState({
                            profil: false,
                            pendaftars
                        });
                        swal("Sukses! Pendaftar telah dihapus!", {
                            icon: "success"
                        });
                    })
                    .then(function (data) {
                        let pendaftars = [];
                        pendaftars = self.state.pendaftars;
                        delete pendaftars[self.state.key];
                        self.setState({
                            profil: false,
                            pendaftars
                        });
                        swal("Sukses! Pendaftar telah dihapus!", {
                            icon: "success"
                        });
                    });
            }
        });
    };

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    onFilterData = () => {
        const self = this;

        this.setState({loading: true})

        let pendaftar = this.state.selectedPendaftar

        fetch(BASE_URL + `/api/pendaftaran/?pendaftar=${pendaftar}`, {
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
                    pendaftars: data.filter(x => x.approved == false && x.online_register == true),
                    numPage: data.num_pages,
                    dataCount: data.count,
                    next: data.next,
                    previous: data.previous,
                    loading: false
                });
            });
    }

    render() {

        account = [...this.state.account];
        this.state.account.map((data, key) => {
            account[key].value = data.id;
            account[key].label = data.nama;
        });

        accountTujuan = [...this.state.account];
        this.state.account.map((data, key) => {
            account[key].value = data.id;
            account[key].label = data.nama;
        });

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>List Pendaftaran Online</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item active">
                                <strong>List Pendaftar Online</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4"/>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-7">
                            <div className="ibox ">
                                <div
                                    className="ibox-title"
                                    style={{backgroundColor: "#1ab394", color: "white"}}
                                >
                                    <h5>
                                        {" "}
                                        <i className="fa fa-list "/> Daftar pendaftar online
                                    </h5>
                                </div>
                                <div className="ibox-content">

                                    <div style={{display: "none"}}>
                                        <div className="row" id="print_data">
                                            <img
                                                style={{
                                                    position: "absolute",
                                                    left: "270px",
                                                    top: "100px",
                                                    width: "50%",
                                                    height: "auto",
                                                    opacity: "0.3"
                                                }}
                                                src={logo}
                                                alt="logo lpkn"
                                            />
                                            <table style={{width: "100%"}}>
                                                <tr
                                                    style={{height: "100px", border: "1px solid black"}}
                                                >
                                                    <td
                                                        style={{width: "20%", border: "1px solid black"}}
                                                    >
                                                        <div className="text-center">
                                                            <img
                                                                style={{
                                                                    marginLeft: "10px",
                                                                    padding: "0px",
                                                                    width: "100px"
                                                                }}
                                                                src={logo}
                                                                alt="logo lpkn"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td style={{border: "1px solid black"}}>
                                                        <h2 className="text-center">KWITANSI BUKTI</h2>
                                                        <h2 className="text-center">
                                                            {this.state.check
                                                                ? this.state.kwitansi.transaksi[0].kwitansi[0].judul.toUpperCase()
                                                                : null}
                                                        </h2>
                                                    </td>
                                                    <td
                                                        style={{width: "20%", border: "1px solid black"}}
                                                        className="text-center"
                                                    >
                                                        <h2>
                                                            No.{" "}
                                                            {this.state.check
                                                                ? this.state.kwitansi.transaksi[0].kwitansi[0].kode
                                                                : null}
                                                        </h2>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style={{padding: "8px 8px"}}>
                                                        Telah Terima Dari
                                                    </td>
                                                    <td
                                                        colSpan="2"
                                                        style={{padding: "30px 0px 8px 8px"}}
                                                    />
                                                </tr>
                                                <tr>
                                                    <td style={{padding: "8px 8px"}}>Nama</td>
                                                    <td
                                                        colSpan="2"
                                                        style={{
                                                            borderBottom: "1px dashed black",
                                                            padding: "8px 0px"
                                                        }}
                                                    >
                                                        :{" "}
                                                        {this.state.check
                                                            ? this.state.kwitansi.nama
                                                            : null}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{padding: "8px 8px"}}>Nominal</td>
                                                    <td
                                                        colSpan="2"
                                                        style={{
                                                            borderBottom: "1px dashed black",
                                                            padding: "8px 0px"
                                                        }}
                                                    >
                                                        : Rp. 250.000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{padding: "8px 8px"}}>Terbilang</td>
                                                    <td
                                                        colSpan="2"
                                                        style={{
                                                            borderBottom: "1px dashed black",
                                                            padding: "8px 0px"
                                                        }}
                                                    >
                                                        : Dua ratus lima puluh ribu rupiah
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{padding: "8px 8px"}}>Program</td>
                                                    <td
                                                        colSpan="2"
                                                        style={{
                                                            borderBottom: "1px dashed black",
                                                            padding: "8px 0px"
                                                        }}
                                                    >
                                                        :{" "}
                                                        {this.state.check
                                                            ? this.state.kwitansi.jurusan_info.nama
                                                            : null}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{padding: "8px 8px"}}>Keterangan</td>
                                                    <td
                                                        colSpan="2"
                                                        style={{
                                                            borderBottom: "1px dashed black",
                                                            padding: "8px 0px"
                                                        }}
                                                    >
                                                        :{" "}
                                                        {this.state.check
                                                            ? this.state.kwitansi.transaksi[0].kwitansi[0].keterangan
                                                            : null}
                                                    </td>
                                                </tr>
                                            </table>
                                            <br/>
                                            <div className="row">
                                                <div className="col-md-4"/>
                                                <div className="col-md-4"/>
                                                <div className="col-md-4">
                                                    <p style={{textAlign: "center"}}>
                                                        <b>
                                                            {this.state.check
                                                                ? this.state.kampus.kota
                                                                : null}, {moment(this.state.check
                                                            ? this.state.kwitansi.tanggal
                                                            : null).format("DD-MM-YYYY")}
                                                        </b>
                                                    </p>
                                                </div>
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <p
                                                        style={{
                                                            borderTop: "1px solid black",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        <b>Siswa yang bersangkutan</b>
                                                    </p>
                                                </div>
                                                <div className="col-md-6"/>
                                                <div className="col-md-3">
                                                    <p
                                                        style={{
                                                            borderTop: "1px solid black",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        <b>Bagian Administrasi</b>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p
                                                        style={{
                                                            borderBottom: "1px solid black",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        <i>
                                                            Note: Lembar untuk siswa, lembar merah untuk
                                                            lembaga, hijau untuk arsip
                                                        </i>
                                                        <br/>
                                                        <i>
                                                            Biaya yang dibayarkan tidak bisa ditarik kembali
                                                            kecuali ada perjanjian
                                                        </i>
                                                    </p>
                                                </div>
                                                <p style={{textAlign: "center"}}>
                                                    Kampus : {this.state.kampus.alamat}, {this.state.kampus.kota}
                                                    <br/>
                                                    e-mail : {this.state.kampus.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label className="form-label">Nama Pendaftar: </label>
                                        </div>
                                        <div className="col-lg-3"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <input
                                                type="text"
                                                placeholder="Nama Pendaftar"
                                                className="form-control"
                                                value={this.state.selectedPendaftar}
                                                onChange={e => {
                                                    this.setState({selectedPendaftar: e.target.value});
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-6">
                                            <button
                                                onClick={this.onFilterData}
                                                className="btn btn-info"
                                                type="button"
                                            >
                                                <i className="fa fa-filter"/> Filter
                                            </button>

                                            <button
                                                onClick={() => {
                                                    const self = this
                                                    this.setState({
                                                        selectedPendaftar: ""
                                                    });
                                                    this.getPendaftar()
                                                }}
                                                style={{marginLeft: "5px"}}
                                                className="btn btn-warning"
                                                type="button"
                                            >
                                                <i className="fa fa-close"/> Reset
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>

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
                                                    <th>NO.</th>
                                                    <th>NAMA</th>
                                                    <th>JURUSAN</th>
                                                    <th style={{textAlign: "center"}}>AKSI</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.pendaftars.length !== 0 ? null : (
                                                    <tr>
                                                        <td style={{textAlign: "center"}} colSpan="4">
                                                            Data Kosong
                                                        </td>
                                                    </tr>
                                                )}
                                                {this.state.pendaftars
                                                    .map((pendaftar, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{pendaftar.nama}</td>
                                                            <td>
                                                                {pendaftar.jurusan_info.nama}
                                                            </td>
                                                            <td>
                                                                <center>
                                                                    <button
                                                                        style={{margin: "0 5px"}}
                                                                        className="btn btn-info btn-sm"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            this.getpendaftar(pendaftar.id)
                                                                        }
                                                                    >
                                                                        <i className="fa fa-eye"/>
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
                                            <button disabled={this.state.previous == null ? "disabled" : null}
                                                    onClick={this.getPreviousData} className="btn btn-white"
                                                    type="button"><i className="fa fa-chevron-left"></i> Sebelumnya
                                            </button>
                                            <button disabled={this.state.next == null ? "disabled" : null}
                                                    onClick={this.getNextData} className="btn btn-white"
                                                    type="button"> Selanjutnya <i className="fa fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="ibox ">
                                <div
                                    className="ibox-title"
                                    style={{backgroundColor: "#1ab394", color: "white"}}
                                >
                                    <h5>
                                        {" "}
                                        <i className="fa fa-user"/> Profil Pendaftar Online
                                    </h5>
                                </div>
                                <div className="ibox-content">
                                    {this.state.profil ? (
                                        <div className="table-responsive">
                                            <div className="ibox-content profile-content">
                                                <h3 style={{textAlign: "center"}}>
                                                    <strong>{this.state.pendaftar.nama}</strong>
                                                </h3>
                                                <p style={{textAlign: "center"}}>
                          <span className="badge badge-warning">
                            Belum Di Approve
                          </span>
                                                </p>
                                            </div>
                                            <div className="tabs-container">
                                                <ul className="nav nav-tabs" role="tablist">
                                                    <li className="active">
                                                        <a
                                                            className="nav-link active"
                                                            data-toggle="tab"
                                                            href="#tab-1"
                                                        >
                                                            Data Pendaftar
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="nav-link"
                                                            data-toggle="tab"
                                                            href="#tab-3"
                                                        >
                                                            Biaya Pendaftaran
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div
                                                        role="tabpanel"
                                                        id="tab-1"
                                                        className="tab-pane active"
                                                    >
                                                        <div className="panel-body">
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Alamat
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <input
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.alamat = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        value={this.state.pendaftar.alamat}
                                                                        type="text"
                                                                        className="form-control m-b"
                                                                        name="account"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Tmpt Lahir
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <input
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.tempat_lahir = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        value={this.state.pendaftar.tempat_lahir}
                                                                        type="text"
                                                                        className="form-control m-b"
                                                                        name="account"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Tgl Lahir
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <input
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.tgl_lahir = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        value={this.state.pendaftar.tgl_lahir}
                                                                        type="date"
                                                                        className="form-control m-b"
                                                                        name="account"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Jenis Kelamin
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <select
                                                                        className="form-control m-b"
                                                                        value={this.state.pendaftar.jenis_kelamin}
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.jenis_kelamin = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        name="jenis_kelamin"
                                                                    >
                                                                        <option>Pilih</option>
                                                                        <option value="L">Laki - Laki</option>
                                                                        <option value="P">Perempuan</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Agama
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <select
                                                                        id="agama"
                                                                        name="agama"
                                                                        className="form-control required"
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.agama = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        value={this.state.pendaftar.agama}
                                                                    >
                                                                        <option value="">Pilih Agama</option>
                                                                        <option value="islam">Islam</option>
                                                                        <option value="hindu">Hindu</option>
                                                                        <option value="budha">Budha</option>
                                                                        <option value="protestan">Protestan</option>
                                                                        <option value="katolik">Katolik</option>
                                                                        <option value="konghucu">Konghucu</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    HP
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <input
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.no_hp = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        value={this.state.pendaftar.no_hp}
                                                                        type="number"
                                                                        className="form-control m-b"
                                                                        name="account"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Asal Sekolah
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <input
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.asal_sekolah = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        value={this.state.pendaftar.asal_sekolah}
                                                                        type="text"
                                                                        className="form-control m-b"
                                                                        name="account"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label">
                                                                    Jurusan
                                                                </label>
                                                                <div className="col-lg-9">
                                                                    <select
                                                                        value={this.state.pendaftar.jurusan}
                                                                        onChange={e => {
                                                                            let pendaftar = [];
                                                                            pendaftar = this.state.pendaftar;
                                                                            pendaftar.jurusan = e.target.value;
                                                                            this.setState({pendaftar});
                                                                        }}
                                                                        id="jurusan"
                                                                        name="jurusan"
                                                                        className="form-control m-b"
                                                                    >
                                                                        <option value="">Pilih Jurusan</option>
                                                                        {this.state.jurusans.map((jurusan, i) => (
                                                                            <option key={i} value={jurusan.id}>
                                                                                {jurusan.nama}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div role="tabpanel" id="tab-3" className="tab-pane">
                                                        <div className="panel-body">
                                                            <div className="form-group row">
                                                                <div>
                                                                    <label className="col-lg-3 col-form-label">
                                                                        Biaya Pendaftaran
                                                                    </label>
                                                                    <div className="col-lg-9">
                                                                        <select
                                                                            value={this.state.pendaftar.biaya_pendaftaran}
                                                                            onChange={e => {
                                                                                let pendaftar = [];
                                                                                pendaftar = this.state.pendaftar;
                                                                                pendaftar.biaya_pendaftaran = e.target.value;
                                                                                this.setState({pendaftar});
                                                                            }}
                                                                            id="jurusan"
                                                                            name="jurusan"
                                                                            defaultValue={true}
                                                                            className="form-control m-b"
                                                                        >
                                                                            <option value={"true"}>Ya</option>
                                                                            <option value={"false"}>Tidak</option>
                                                                        </select>
                                                                    </div>
                                                                    {this.state.pendaftar.biaya_pendaftaran != "true" ? (
                                                                        <div>
                                                                            <label className="col-lg-3 col-form-label">
                                                                                Keterangan
                                                                            </label>
                                                                            <div className="col-lg-9">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control m-b"
                                                                                    value={this.state.pendaftar.keterangan}
                                                                                    onChange={e => {
                                                                                        let pendaftar = [];
                                                                                        pendaftar = this.state.pendaftar;
                                                                                        pendaftar.keterangan = e.target.value;
                                                                                        this.setState({pendaftar});
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <label className="col-lg-3 col-form-label">

                                                                            </label>
                                                                            <div className="col-lg-9">
                                                                                <div className="alert alert-warning" role="alert">
                                                                                    * Silahkan Pilih Akun KAS pada masing-masing Cabang !
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <label className="col-lg-3 col-form-label">
                                                                                    Akun Tujuan
                                                                                </label>
                                                                                <div className="col-lg-9">
                                                                                    <Select
                                                                                      name="form-field-name"
                                                                                      value={this.state.pendaftar.account_tujuan}
                                                                                      onChange={selectedOption => {
                                                                                          let pendaftar = [];
                                                                                          pendaftar = this.state.pendaftar;
                                                                                          pendaftar.account = 15
                                                                                          pendaftar.account_tujuan = selectedOption.value;
                                                                                          this.setState({pendaftar});
                                                                                      }}
                                                                                      options={account}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <center style={{margin: "3% 0"}}>
                                                {this.state.loadingApprove ? (
                                                    <button
                                                        style={{margin: "0 3%"}}
                                                        disabled
                                                        className="btn btn-primary"
                                                        type="button"
                                                    >
                                                        Menyimpan...
                                                    </button>
                                                ) : (
                                                    <button
                                                        style={{margin: "0 3%"}}
                                                        onClick={() =>
                                                            this.handleUpdatependaftar()
                                                        }
                                                        className="btn btn-primary"
                                                        type="button"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        this.handleDeletependaftar()
                                                    }
                                                    className="btn btn-danger"
                                                    type="button"
                                                >
                                                    Tolak
                                                </button>
                                            </center>
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

export default List_pendaftar;
