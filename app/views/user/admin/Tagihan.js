import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";
import MonthPickerInput from "react-month-picker-input";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import "react-month-picker-input/dist/react-month-picker-input.css";
import CurrencyInput from "react-currency-input";
import moment from "moment";
import {terbilang} from "../../../config/terbilang.js";

class Tagihan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagihans: [],
            selectedStatus: 1,
            kampus: [],
            loading: true,
            jurusans: [],
            selectedKampus: "",
            selectedJurusan: "",
            selectedMonth: "",
            selectedYear: "",
            filterBy: null,
            selectedStatus: "",
            jurusan: [],
            selectedTagihan: null,
            jurusans: [],
            num_pages: null,
            next: null,
            selectedMahasiswa: "",
            previous: null,
            count: null,
            selectedNama: null,
            selectedKelas: null,
            pembayaran: {},
            check: false,
            kwitansi: [],
            kelas: []
        };
    }

    componentDidMount() {
        const self = this;
        this.getTagihan();

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
                    jurusan: data.results
                });
            });

        fetch(BASE_URL + "/api/kelas/", {
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
                    kelas: data.results
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

    getTagihan = () => {
        const self = this;
        this.setState({loading: true});
        fetch(BASE_URL + "/api/tagihan/", {
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
                if (typeof data.results !== "undefined") {
                    self.setState({
                        num_pages: data.num_pages,
                        next: data.next,
                        previous: data.previous,
                        count: data.count,
                        tagihans: data.results,
                        loading: false
                    });
                } else {
                    self.setState({
                        tagihans: data,
                        loading: false
                    });
                }
            });
    };

    filterDataMahasiswa = () => {
        const self = this;
        let date = this.state.selectedDate;
        let status = this.state.selectedStatus;
        let kampus = this.state.selectedKampus;
        let jurusan = this.state.selectedJurusan;
        let mahasiswa = this.state.selectedNama;
        let selectedMonth =
            this.state.selectedMonth > 0
                ? this.state.selectedMonth + 1
                : this.state.selectedMonth;
        let selectedYear = this.state.selectedYear;

        this.setState({loading: true});

        fetch(BASE_URL + `/api/tagihan/?status=${status}&mahasiswa=${mahasiswa}`, {
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

                if (typeof data.results == "undefined") {
                    self.setState({
                        tagihans: data,
                        loading: false,
                        next: null,
                        previous: null
                    });
                } else {
                    self.setState({
                        num_pages: data.num_pages,
                        next: data.next,
                        previous: data.previous,
                        count: data.count,
                        tagihans: data.results,
                        loading: false
                    });
                }
            });
    };

    filterData = () => {
        const self = this;
        let date = this.state.selectedDate;
        let status = this.state.selectedStatus;
        let kampus = this.state.selectedKampus;
        let jurusan = this.state.selectedJurusan;
        let mahasiswa = this.state.selectedNama;
        let selectedMonth =
            this.state.selectedMonth > 0
                ? this.state.selectedMonth + 1
                : this.state.selectedMonth;
        let selectedYear = this.state.selectedYear;

        this.setState({loading: true});
        fetch(
            BASE_URL +
            `/api/tagihan/?kampus=${kampus}&jurusan=${jurusan}&status=${status}&bulan=${selectedMonth}&tahun=${selectedYear}`,
            {
                method: "get",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                if (typeof data.results == "undefined") {
                    self.setState({
                        tagihans: data,
                        loading: false,
                        next: null,
                        previous: null
                    });
                } else {
                    self.setState({
                        num_pages: data.num_pages,
                        next: data.next,
                        previous: data.previous,
                        count: data.count,
                        tagihans: data.results,
                        loading: false
                    });
                }
            });
    };

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
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    tagihans: data.results,
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
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    tagihans: data.results,
                    loading: false
                });
            });
    };

    getKwitansi = (id) => {
        const self = this;

        fetch(BASE_URL + `/api/pembayaran-mahasiswa/?tagihan=${id}`, {
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
                    kwitansi: data[0]
                }, () => {
                    self.setState({check: true})
                    setTimeout(() => {
                        self.exportData();
                    }, 100);
                });
            });
    };

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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
    }

    render() {
        let pickerLang = {
                months: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Spr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                from: "From",
                to: "To"
            },
            mvalue = {year: 2015, month: 11},
            mrange = {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}};

        let makeText = m => {
            if (m && m.year && m.month)
                return pickerLang.months[m.month - 1] + ". " + m.year;
            return "?";
        };

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Tagihan Pembayaran</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item active">
                                <strong>Tagihan</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2"/>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="ibox ">
                            <div
                                className="ibox-title"
                                style={{backgroundColor: "#1ab394", color: "white"}}
                            >
                                <h5>
                                    {" "}
                                    <i className="fa fa-list "/> List Tagihan Pembayaran
                                </h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <select
                                            value={this.state.filterBy}
                                            onChange={e => {
                                                this.setState({filterBy: e.target.value});
                                            }}
                                            className="form-control"
                                        >
                                            <option value="0">-- Filter By --</option>
                                            <option value="1">Jurusan</option>
                                            <option value="2">Mahasiswa</option>
                                        </select>
                                    </div>
                                </div>
                                <br/>

                                {this.state.filterBy == "1" ? (
                                    <div>
                                        <div className="row">
                                            {window.sessionStorage.getItem("role") == "8" ? (
                                                <div className="col-lg-2">
                                                    <label className="form-label">Kampus : </label>
                                                </div>
                                            ) : null}

                                            <div className="col-lg-3">
                                                <label className="form-label">Jurusan : </label>
                                            </div>
                                            <div className="col-lg-2">
                                                <label className="form-label">Kelas : </label>
                                            </div>
                                            <div className="col-lg-2">
                                                <label className="form-label">Tanggal : </label>
                                            </div>
                                            <div className="col-lg-2">
                                                <label className="form-label">Status : </label>
                                            </div>
                                            <div className="col-lg-3"/>
                                        </div>

                                        <div className="row">
                                            {window.sessionStorage.getItem("role") == "8" ? (
                                                <div className="col-lg-2">
                                                    <select
                                                        value={this.state.selectedKampus}
                                                        onChange={e => {
                                                            this.setState({selectedKampus: e.target.value});
                                                        }}
                                                        className="form-control"
                                                    >
                                                        <option value="">Semua Kampus</option>
                                                        {this.state.kampus.map((kampus, key) => (
                                                            <option key={key} value={kampus.id}>
                                                                {kampus.nama}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : null}

                                            <div className="col-lg-3">
                                                <select
                                                    value={this.state.selectedJurusan}
                                                    onChange={e => {
                                                        this.setState({selectedJurusan: e.target.value});
                                                    }}
                                                    className="form-control"
                                                >
                                                    <option value="">Semua Jurusan</option>
                                                    {this.state.jurusans
                                                        .filter(data =>
                                                            this.state.selectedKampus != ""
                                                                ? data.kampus_info.id ==
                                                                this.state.selectedKampus
                                                                : true
                                                        )
                                                        .map((jurusan, key) => (
                                                            <option key={key} value={jurusan.id}>
                                                                {jurusan.nama}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-2">
                                                <select className="form-control">
                                                    <option value="">--Pilih--</option>
                                                    {this.state.kelas
                                                        .filter(data =>
                                                            this.state.selectedJurusan != ""
                                                                ? data.jurusan_info.id ==
                                                                this.state.selectedJurusan
                                                                : true
                                                        )
                                                        .map((kelas, key) => (
                                                            <option key={key} value={kelas.id}>
                                                                {kelas.nama}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-2">
                                                <button className="btn btn-secondary btn-xs">
                                                    <MonthPickerInput
                                                        closeOnSelect={true}
                                                        style={{backgroundColor: "red"}}
                                                        onChange={(
                                                            maskedValue,
                                                            selectedYear,
                                                            selectedMonth
                                                        ) => {
                                                            this.setState({selectedYear, selectedMonth});
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                            <div className="col-lg-2">
                                                <select
                                                    className="form-control"
                                                    value={this.state.selectedStatus}
                                                    onChange={e => {
                                                        this.setState({selectedStatus: e.target.value});
                                                    }}
                                                >
                                                    <option value="">--Pilih--</option>
                                                    <option value="1">Sudah Bayar</option>
                                                    <option value="0">Belum Bayar</option>
                                                </select>
                                            </div>
                                            {
                                                window.sessionStorage.getItem("role") == "8" ?
                                                    <div>
                                                        <br/>
                                                        <br/>
                                                        <br/>
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <div className="col-lg-3">
                                                <button
                                                    onClick={this.filterData}
                                                    className="btn btn-info"
                                                    type="button"
                                                >
                                                    <i className="fa fa-filter"/> Filter
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        const self = this

                                                        this.getTagihan()

                                                        this.setState({
                                                            selectedDate: null,
                                                            selectedStatus: "",
                                                            selectedNama: null,
                                                            selectedKampus: "",
                                                            selectedJurusan: "",
                                                            selectedKelas: ""
                                                        });

                                                    }}
                                                    style={{marginLeft: "5px"}}
                                                    className="btn btn-warning"
                                                    type="button"
                                                >
                                                    <i className="fa fa-close"/> Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : this.state.filterBy == "2" ? (
                                    <div>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <label className="form-label">Mahasiswa : </label>
                                            </div>
                                            <div className="col-lg-3">
                                                <label className="form-label">Status : </label>
                                            </div>
                                            <div className="col-lg-3"/>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3">
                                                <input
                                                    type="text"
                                                    disabled=""
                                                    placeholder="NIM/Nama Mahasiswa"
                                                    className="form-control"
                                                    value={this.state.selectedNama}
                                                    onChange={e => {
                                                        this.setState({selectedNama: e.target.value});
                                                    }}
                                                />
                                            </div>
                                            <div className="col-lg-2">
                                                <select
                                                    className="form-control"
                                                    value={this.state.selectedStatus}
                                                    onChange={e => {
                                                        this.setState({selectedStatus: e.target.value});
                                                    }}
                                                >
                                                    <option value="">--Pilih--</option>
                                                    <option value="1">Sudah Bayar</option>
                                                    <option value="0">Belum Bayar</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-3">
                                                <button
                                                    onClick={this.filterDataMahasiswa}
                                                    className="btn btn-info"
                                                    type="button"
                                                >
                                                    <i className="fa fa-filter"/> Filter
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        this.setState({
                                                            selectedDate: null,
                                                            selectedStatus: "",
                                                            selectedNama: null,
                                                            selectedKampus: "",
                                                            selectedJurusan: "",
                                                            selectedKelas: ""
                                                        });
                                                        this.getTagihan();
                                                    }}
                                                    style={{marginLeft: "5px"}}
                                                    className="btn btn-warning"
                                                    type="button"
                                                >
                                                    <i className="fa fa-close"/> Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
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
                                        <table className="table table-striped" align="right">
                                            <thead>
                                            <tr>
                                                <th>NIM</th>
                                                <th>NAMA</th>
                                                <th>MASA</th>
                                                <th>TAGIHAN</th>
                                                <th>DIBAYARKAN</th>
                                                <th>STATUS</th>
                                                <th>AKSI</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.tagihans.map((tagihan, key) => (
                                                <tr key={key}>
                                                    <td>{tagihan.mahasiswa_info.nim}</td>
                                                    <td>{tagihan.mahasiswa_info.nama}</td>
                                                    <td>
                                                        {moment(tagihan.tanggal).format("DD-MM-YYYY")}
                                                    </td>
                                                    <td>
                                                        {this.formatNumber(Math.round(tagihan.nominal))}
                                                    </td>
                                                    <td>
                                                        {this.formatNumber(Math.round(tagihan.dibayarkan))}
                                                    </td>
                                                    <td>
                                                        {tagihan.status ? (
                                                            <span className="badge badge-primary">
                                  Sudah Bayar
                                </span>
                                                        ) : (
                                                            <span className="badge badge-warning">
                                  Belum Bayar
                                </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {tagihan.status ? (
                                                            <button
                                                                onClick={() => {
                                                                    this.getKwitansi(tagihan.id)
                                                                }}
                                                                className="btn btn-info btn-sm"
                                                                type="button"
                                                            >
                                                                <i className="fa fa-print"/>
                                                            </button>
                                                        ) : (
                                                            null
                                                        )}
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
                                            disabled={this.state.previous == null ? "disabled" : null}
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
                </div>

                <div
                    className="modal inmodal"
                    id="ModalCheckoutTagihan"
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
                                <h4 className="modal-title">Pembayaran Tagihan Mahasiswa</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">NIM</label>
                                    <div className="col-lg-10">
                                        <input
                                            type="text"
                                            disabled="disabled"
                                            className="form-control"
                                            value={
                                                this.state.selectedTagihan != null
                                                    ? this.state.selectedTagihan.mahasiswa_info.nim
                                                    : null
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">NAMA</label>
                                    <div className="col-lg-10">
                                        <input
                                            type="text"
                                            disabled="disabled"
                                            className="form-control"
                                            value={
                                                this.state.selectedTagihan != null
                                                    ? this.state.selectedTagihan.mahasiswa_info.nama
                                                    : null
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">
                                        TAGIHAN (Rp.)
                                    </label>
                                    <div className="col-lg-10">
                                        <input
                                            type="text"
                                            disabled="disabled"
                                            className="form-control"
                                            value={
                                                this.state.selectedTagihan != null
                                                    ? this.formatNumber(
                                                    Math.round(this.state.selectedTagihan.nominal)
                                                    )
                                                    : null
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">NOMINAL</label>
                                    <div className="col-lg-10">
                                        <CurrencyInput
                                            precision="0"
                                            className="form-control m-b"
                                            prefix="Rp "
                                            disabled="disabled"
                                            value={
                                                this.state.tagihan != null
                                                    ? this.state.tagihan.find(
                                                    data =>
                                                        data.mahasiswa == this.state.mahasiswa.id &&
                                                        data.status == false
                                                    ).nominal
                                                    : null
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Akun Tujuan</label>
                                    <div className="col-lg-10"/>
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
                                    onClick={this.handleApprove}
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
                                        ? this.formatNumber(
                                            this.state.kwitansi.transaksi[0].kwitansi[0].dari
                                        )
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
                                    : {this.state.check
                                    ? this.formatNumber(this.state.kwitansi.transaksi[0].kwitansi[0].nominal)
                                    : null}
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
                                    : {this.state.check
                                    ? terbilang(this.state.kwitansi.transaksi[0].kwitansi[0].nominal)
                                    : null} rupiah
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
                                        ? this.state.kwitansi.transaksi[0].kwitansi[0].jurusan_info.nama
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
                                        ? this.state.kwitansi.transaksi[0].kwitansi[0].kampus_info.kota + ", " + moment(this.state.kwitansi.transaksi[0].kwitansi[0].tanggal).format("DD-MM-YYYY")
                                        : null}
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
                                Kampus :
                                {this.state.check
                                ? this.state.kwitansi.transaksi[0].kwitansi[0].kampus_info.alamat + ", " + this.state.kwitansi.transaksi[0].kwitansi[0].kampus_info.kota
                                : null}
                                <br/>
                                e-mail :
                                {this.state.check
                                ? this.state.kwitansi.transaksi[0].kwitansi[0].kampus_info.email
                                : null}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{display: "none"}}>
                    <div className="">
                        <div className="row">
                            <div className="col-sm-6">
                                <h5>From:</h5>
                                <address>
                                    <strong>LPKN Training Center.</strong>
                                    <br/>
                                    Kampus Mataram <br/>
                                    Jl. Pejanggik 60 Pajang Timur, Mataram
                                    <br/>
                                    <abbr title="Phone">Tlp:</abbr> 0370-632437
                                </address>
                            </div>

                            <div className="col-sm-6 text-right">
                                <span>To:</span>
                                <address>
                                    <strong>
                                        {this.state.selectedTagihan != null
                                            ? this.state.selectedTagihan.mahasiswa_info.nama
                                            : null}
                                    </strong>
                                    <br/>
                                    {this.state.selectedTagihan != null
                                        ? this.state.selectedTagihan.mahasiswa_info.nim
                                        : null}
                                    <br/>
                                    {this.state.selectedTagihan != null
                                        ? this.state.jurusans.find(
                                            data =>
                                                data.id ==
                                                this.state.selectedTagihan.mahasiswa_info.jurusan
                                        ).nama
                                        : null}
                                    <br/>
                                </address>
                                <p>
                  <span>
                    <strong>Invoice Date:</strong>{" "}
                      {moment().format("DD-MM-YYYY")}
                  </span>
                                    <br/>
                                    <span>
                    <strong>Due Date:</strong>
                                        {this.state.selectedTagihan != null
                                            ? moment(this.state.selectedTagihan.tanggal).format(
                                                "DD-MM-YYYY"
                                            )
                                            : null}
                  </span>
                                </p>
                            </div>
                        </div>

                        <img
                            style={{
                                position: "absolute",
                                left: "270px",
                                top: "30px",
                                width: "50%",
                                height: "auto",
                                opacity: "0.3"
                            }}
                            src={logo}
                            alt="logo lpkn"
                        />

                        <div className="">
                            <table className="table invoice-table">
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Nominal</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <strong>Pembayaran SPP Mahasiswa</strong>
                                        </div>
                                        <small>
                                            Pembayaran SPP Bulan{" "}
                                            {this.state.selectedTagihan != null
                                                ? moment(this.state.selectedTagihan.tanggal).format(
                                                    "MMMM-YYYY"
                                                )
                                                : null}
                                        </small>
                                    </td>
                                    <td>
                                        Rp.{" "}
                                        {this.state.selectedTagihan != null
                                            ? this.formatNumber(
                                                this.state.selectedTagihan.nominal.toFixed(2)
                                            )
                                            : null}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <table className="table invoice-total">
                            <tbody>
                            <tr>
                                <td>
                                    <strong>Sub Total :</strong>
                                </td>
                                <td>
                                    Rp.{" "}
                                    {this.state.selectedTagihan != null
                                        ? this.formatNumber(
                                            this.state.selectedTagihan.nominal.toFixed(2)
                                        )
                                        : null}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>TOTAL :</strong>
                                </td>
                                <td>
                                    Rp.{" "}
                                    {this.state.selectedTagihan != null
                                        ? this.formatNumber(
                                            this.state.selectedTagihan.nominal.toFixed(2)
                                        )
                                        : null}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tagihan;
