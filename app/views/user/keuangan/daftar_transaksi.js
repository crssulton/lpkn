import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";
import {terbilang} from "../../../config/terbilang.js";
import Select from "react-select";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import moment from "moment";
import "react-select/dist/react-select.css";
import MonthPickerInput from "react-month-picker-input";
import swal from "sweetalert";

let account = []

class Jadwal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            transaksi: [],
            kampus: [],
            account: [],
            kwitansi: null,
            jurusan: [],
            matkul: [],
            dataCount: 0,
            selectedTransaksi: null,
            next: null,
            previous: null,
            numPage: 0,
            selectedAccount: "",
            selectedYear: "",
            selectedMonth: "",
            selectedKampus: "",
            selectedUraian: ""
        };
    }

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    componentWillMount() {
        const self = this;

        fetch(BASE_URL + "/api/account/", {
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
                    account: data
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

        fetch(BASE_URL + "/api/transaksi/", {
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
                    transaksi: data.results,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    loading: false
                });
            });

    }

    fetchTransaksi = () => {
        const self = this

        this.setState({loading: true})

        fetch(BASE_URL + "/api/transaksi/", {
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
                    transaksi: data.results,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    loading: false
                });
            });
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
                    transaksi: data.results,
                    numPage: data.num_pages,
                    dataCount: data.count,
                    next: data.next,
                    previous: data.previous,
                    loading: !self.state.loading
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
                    transaksi: data.results,
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

        let kampus = this.state.selectedKampus;
        let year = this.state.selectedYear;
        let month = this.state.selectedMonth != "" ? this.state.selectedMonth + 1 : this.state.selectedMonth;
        let account = this.state.selectedAccount;

        this.setState({loading: true});
        console.log(BASE_URL +
            `/api/transaksi/?bulan=${month}&tahun=${year}&akun=${account}&kampus=${kampus}`)
        fetch(
            BASE_URL +
            `/api/transaksi/?bulan=${month}&tahun=${year}&akun=${account}&kampus=${kampus}`,
            {
                method: "get",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token")
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.setState({
                    transaksi: data,
                    loading: false
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
            font: "TimesNewRoman",
            targetStyles: ["*"]
        });
    }

    render() {

        this.state.selectedTransaksi != null ? console.log(JSON.stringify(this.state.selectedTransaksi)) : null

        account = [...this.state.account]
        const {selectedOption} = this.state;
        this.state.account.map((data, key) => {
            account[key].value = data.id
            account[key].label = data.nama
        })

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Daftar Transaksi</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item active">
                                <strong>Daftar Transaksi</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4"/>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div
                                    className="ibox-title"
                                    style={{backgroundColor: "#1ab394", color: "white"}}
                                >
                                    <h5>
                                        {" "}
                                        <i className="fa fa-list "/> Daftar Transaksi
                                    </h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <label className="form-label">Kampus : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Akun : </label>
                                        </div>
                                        <div className="col-lg-2">
                                            <label className="form-label">Bulan : </label>
                                        </div>
                                        <div className="col-lg-3"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <select
                                                value={this.state.selectedKampus}
                                                onChange={e => {
                                                    this.setState({selectedKampus: e.target.value});
                                                }}
                                                className="form-control"
                                            >
                                                <option value="">Pilih Kampus</option>
                                                {this.state.kampus.map((kampus, key) => (
                                                    <option key={key} value={kampus.id}>
                                                        {kampus.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-3">
                                            <Select
                                                name="form-field-name"
                                                value={this.state.selectedAccount}
                                                onChange={(selectedOption) => {
                                                    this.setState({
                                                        selectedAccount: selectedOption.value
                                                    })
                                                }}
                                                options={account}
                                            />
                                        </div>
                                        <div className="col-lg-2" style={{marginRight: '40px'}}>
                                            <button className="btn btn-secondary btn-sm">
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
                                        <div className="col-lg-3">
                                            <button
                                                onClick={this.onFilterData}
                                                className="btn btn-info"
                                                type="button"
                                            >
                                                <i className="fa fa-filter"/> Filter
                                            </button>

                                            <button
                                                onClick={() => {
                                                    const self = this;
                                                    this.fetchTransaksi()
                                                    this.setState({
                                                        selectedAccount: "",
                                                        selectedMonth: "",
                                                        selectedYear: "",
                                                        selectedKampus: ""
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
                                    <br/>
                                    <div className="hr-line-dashed"/>
                                    {this.state.loading ? (
                                        <div className="spiner-example">
                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                <div className="sk-double-bounce1"/>
                                                <div className="sk-double-bounce2"/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>KODE</th>
                                                    <th>TANGGAL</th>
                                                    <th>URAIAN</th>
                                                    <th>NOMINAL</th>
                                                    <th>AKUN SUMBER</th>
                                                    <th>AKUN TUJUAN</th>
                                                    <th>KAMPUS</th>
                                                    <th style={{width: '12%'}}>AKSI</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.transaksi != null
                                                    ? this.state.transaksi.map((transaksi, key) => (
                                                        <tr key={key}>
                                                            <td>{transaksi.kode}</td>
                                                            <td>
                                                                {moment(transaksi.tanggal).format("DD/MM/YYYY")}
                                                            </td>
                                                            <td>{transaksi.uraian}</td>
                                                            <td>{this.formatNumber(transaksi.nominal)}</td>
                                                            <td>{transaksi.account_info.nama}</td>
                                                            <td>{transaksi.account_tujuan_info.nama}</td>
                                                            <td>{transaksi.kampus_info.nama}</td>
                                                            <td>
                                                                <center>
                                                                    {
                                                                        transaksi.nominal_sebelum != 0 && transaksi.pengajuan_edit == true ?

                                                                            <button
                                                                                style={{'margin': '0 5px'}}
                                                                                className="btn btn-primary btn-sm"
                                                                                type="button"
                                                                                data-toggle="modal"
                                                                                data-target="#ModalTransaksiHistori"
                                                                                onClick={() => {
                                                                                    this.setState({transaksi_selected: transaksi})
                                                                                }}
                                                                            >
                                                                                <i className="fa fa-eye"></i></button>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        !transaksi.pengajuan_edit ?
                                                                            <button
                                                                                style={{'margin': '0 5px'}}
                                                                                className="btn btn-secondary btn-sm"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const self = this;
                                                                                    swal({
                                                                                        title: "Ajukan perubahan transaksi ?",
                                                                                        icon: "warning",
                                                                                        buttons: true
                                                                                    }).then((willTerima) => {
                                                                                        if (willTerima) {
                                                                                            swal({
                                                                                                title: "Anda harus mencetak kwitansi terlebih dahulu !",
                                                                                                icon: "warning"
                                                                                            }).then(() => {
                                                                                                self.setState({
                                                                                                    kwitansi: transaksi.kwitansi[0],
                                                                                                    id_transaksi: transaksi.id
                                                                                                }, () => {
                                                                                                    self.exportData()
                                                                                                    self.editTransaksi()
                                                                                                })
                                                                                            })
                                                                                        }
                                                                                    });

                                                                                }}
                                                                            >
                                                                                <i className="fa fa-edit"></i></button>
                                                                            :
                                                                            null
                                                                    }
                                                                    <button
                                                                        onClick={() => {
                                                                            this.setState({kwitansi: transaksi.kwitansi[0]}, () => this.exportData())
                                                                        }}
                                                                        className="btn btn-info btn-sm"
                                                                        type="button"
                                                                    ><i className="fa fa-print"></i></button>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    : "Transaksi Tidak Ditemukan"}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*    Kwitansi*/}
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
                                            {this.state.kwitansi != null
                                                ? this.state.kwitansi.judul.toUpperCase()
                                                : null}
                                        </h2>
                                    </td>
                                    <td
                                        style={{width: "20%", border: "1px solid black"}}
                                        className="text-center"
                                    >
                                        <h2>
                                            No.{" "}
                                            {this.state.kwitansi != null
                                                ? this.state.kwitansi.kode
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
                                        {this.state.kwitansi != null
                                            ? this.state.kwitansi.dari
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
                                        : {this.state.kwitansi != null
                                        ? this.formatNumber(this.state.kwitansi.nominal)
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
                                        : {this.state.kwitansi != null
                                        ? terbilang(this.state.kwitansi.nominal)
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
                                        {this.state.kwitansi != null
                                            ? this.state.kwitansi.jurusan_info.nama == null ? this.state.kwitansi.judul : this.state.kwitansi.judul
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
                                        {this.state.kwitansi != null
                                            ? this.state.kwitansi.keterangan
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
                                            {this.state.kwitansi != null
                                                ? this.state.kwitansi.kampus_info.kota + ", " + moment(this.state.kwitansi.tanggal).format("DD-MM-YYYY")
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
                                    {this.state.kwitansi != null
                                        ? this.state.kwitansi.kampus_info.alamat + ", " + this.state.kwitansi.kampus_info.kota
                                        : null}
                                    <br/>
                                    e-mail :
                                    {this.state.kwitansi != null
                                        ? this.state.kwitansi.kampus_info.email
                                        : null}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal inmodal"
                    id="ModalTransaksiHistori"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content animated bounceInRight">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                >
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <h4 className="modal-title">Rincian Histori Transaksi</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Kode TRX</label>
                                    <div className="col-lg-10">
                                        <p>: {this.state.transaksi_selected != null ? this.state.transaksi_selected.kode : null}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Tanggal</label>
                                    <div className="col-lg-10">
                                        <p>: {this.state.transaksi_selected != null ? moment(this.state.transaksi_selected.tanggal).format("DD/MM/YYYY") : null}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Uraian</label>
                                    <div className="col-lg-10">
                                        <p>: {this.state.transaksi_selected != null ? this.state.transaksi_selected.uraian : null}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Nominal Sebelumnya</label>
                                    <div className="col-lg-10">
                                        <p>:
                                            Rp. {this.state.transaksi_selected != null ? this.formatNumber(this.state.transaksi_selected.nominal_sebelum) : null}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Akun Sumber</label>
                                    <div className="col-lg-10">
                                        <p>: {this.state.transaksi_selected != null ? this.state.transaksi_selected.account_info.nama : null}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Akun Tujuan</label>
                                    <div className="col-lg-10">
                                        <p>: {this.state.transaksi_selected != null ? this.state.transaksi_selected.account_tujuan_info.nama : null}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">Kampus</label>
                                    <div className="col-lg-10">
                                        <p>: {this.state.transaksi_selected != null ? this.state.transaksi_selected.kampus_info.nama : null}</p>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Jadwal;
