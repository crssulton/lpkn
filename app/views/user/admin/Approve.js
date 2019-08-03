import React, {Component} from "react";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import {Link} from "react-router";
import swal from "sweetalert";
import {terbilang} from "../../../config/terbilang.js";
import Select from "react-select";
import moment from "moment";
import "react-select/dist/react-select.css";
import CurrencyInput from "react-currency-input";
import {BASE_URL} from "../../../config/config.js";

let account = []
let account_tujuan = []

class Approve extends Component {
    constructor(props) {
        super(props);

        let pembayaranBaru = {}
        pembayaranBaru.account = null
        pembayaranBaru.account_tujuan = null

        this.state = {
            approveStatus: "",
            pembayaran: [],
            account: [],
            fotoBukti: "",
            selectedData: null,
            num_pages: null,
            next: null,
            previous: null,
            kampus: [],
            check: false,
            count: null,
            jurusan: [],
            jurusanKwitansi: null,
            selectedJurusan: null,
            selectedMahasiswa: null,
            pembayaranBaru
        };
    }

    componentDidMount() {
        const self = this;
        fetch(BASE_URL + "/api/pembayaran-mahasiswa/", {
            method: "GET",
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
                    pembayaran: data.results,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count
                });
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

        fetch(BASE_URL + '/api/kampus/' + window.sessionStorage.getItem("kampus_id") + '/', {
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
                kampus: data
            })
        });

        fetch(BASE_URL + '/api/jurusan/', {
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
                jurusan: data.results
            })
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
                    pembayaran: data.results,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
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
                    pembayaran: data.results,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    loading: false
                });
            });
    };

    handleApprove = () => {
        const self = this;

        swal({
            title: "Terima Pembayaran ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willApprove => {
            if (willApprove) {
                fetch(
                    BASE_URL + "/api/pembayaran-mahasiswa/" + this.state.selectedData.id + "/",
                    {
                        method: "patch",
                        headers: {
                            Authorization: "JWT " + window.sessionStorage.getItem("token"),
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(this.state.pembayaranBaru)
                    }
                )
                    .then(function (response) {

                        if (response.status == 200) {
                            toastr.success(
                                "Pembayaran telah di terima",
                                "Sukses ! "
                            );
                            self.setState({
                                pembayaranBaru: {},
                                pembayaran: self.state.pembayaran.filter(data => data.id != self.state.selectedData.id)
                            });
                        } else {
                            toastr.warning(
                                "Pembayaran gagal di terima",
                                "Gagal ! "
                            );
                        }
                        return response.json()
                    })
                    .then(function (data) {
                        self.setState({
                            jurusanKwitansi: self.state.jurusan.find(x => x.id == data.transaksi[0].jurusan).nama,
                            kwitansi: data.transaksi[0].kwitansi[0]

                        }, () => {
                            self.setState({check: true})
                            setTimeout(() => {
                                self.exportData()
                            }, 100)
                        })
                    });
            }
        });
    };

    handleReject = (id) => {
        const self = this;

        swal({
            title: "Tolak Pembayaran ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willApprove => {
            if (willApprove) {
                fetch(
                    BASE_URL + "/api/pembayaran-mahasiswa/" + this.state.selectedData.id + "/reject/",
                    {
                        method: "post",
                        headers: {
                            Authorization: "JWT " + window.sessionStorage.getItem("token"),
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }
                    }
                )
                    .then(function (response) {
                        if (response.status == 200) {
                            toastr.success(
                                "Pembayaran telah di tolak",
                                "Sukses ! "
                            );
                            self.setState({
                                pembayaran: self.state.pembayaran.filter(data => data.id != id)
                            });
                        } else {
                            toastr.warning(
                                "Pembayaran gagal di tolak",
                                "Gagal ! "
                            );
                        }
                        return response.json()
                    })
                    .then(function (data) {

                    });
            }
        });
    };

    handleUpdate = () => {
        const self = this
        let nominal = {
            nominal: this.state.selectedData.nominal
        };

        fetch(
            BASE_URL + "/api/pembayaran-mahasiswa/" + this.state.selectedData.id + "/",
            {
                method: "patch",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(nominal)
            }
        )
            .then(function (response) {
                if (response.status == 200) {
                    toastr.success(
                        "Nominal pembayaran telah diubah",
                        "Sukses ! "
                    );
                } else {
                    toastr.warning(
                        "Nominal pembayaran gagal diubah",
                        "Gagal ! "
                    );
                }
                return response.json()
            })
            .then(function (data) {

            });
    }

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    render() {
        account = [...this.state.account]
        this.state.account.map((data, key) => {
            account[key].value = data.id
            account[key].label = data.nama
        })

        account_tujuan = [...this.state.account]
        this.state.account.map((data, key) => {
            account[key].value = data.id
            account[key].label = data.nama
        })

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Approve Pembayaran</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Approve</strong>
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
                                    <i className="fa fa-list "/> List Pembayaran
                                </h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="form-label">Filter Jurusan : </label>
                                    </div>
                                    <div className="col-lg-3">
                                        <label className="form-label">NIM Mahasiswa : </label>
                                    </div>
                                    <div className="col-lg-3">

                                    </div>
                                    <div className="col-lg-2">

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <select
                                            value={this.state.selectedJurusan}
                                            onChange={e => {
                                                this.setState({selectedJurusan: e.target.value})
                                            }}
                                            className="form-control"
                                        >
                                            <option value="0">Semua Jurusan</option>
                                            {this.state.jurusan
                                                .map((jurusan, key) => (
                                                    <option key={key} value={jurusan.id}>
                                                        {jurusan.nama}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="text"
                                            disabled=""
                                            placeholder="NIM Mahasiswa"
                                            className="form-control"
                                            value={this.state.selectedMahasiswa}
                                            onChange={e => {
                                                this.setState({selectedMahasiswa: e.target.value})
                                            }}

                                        />
                                    </div>

                                    <div className="col-lg-3">
                                        <button
                                            onClick={this.filterData}
                                            className="btn btn-info"
                                            type="button"
                                        >
                                            <i className="fa fa-filter"/> Filter
                                        </button>

                                        <button
                                            style={{marginLeft: '5px'}}
                                            className="btn btn-warning"
                                            type="button"
                                        >
                                            <i className="fa fa-close"/> Reset
                                        </button>
                                    </div>
                                    <div className="col-lg-2">

                                    </div>
                                </div>
                                <div className="hr-line-dashed"/>
                                <div className="table-responsive">
                                    <table className="table table-striped" align="right">
                                        <thead>
                                        <tr>
                                            <th>NO.</th>
                                            <th>NIM</th>
                                            <th>NAMA</th>
                                            <th>TANGGAL</th>
                                            <th>NOMINAL</th>
                                            <th>STATUS</th>
                                            <th>
                                                <center>BUKTI</center>
                                            </th>
                                            <th>
                                                <center>AKSI</center>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.pembayaran
                                            .filter(x => x.status == "pending")
                                            .map((data, key) => (
                                                <tr>
                                                    <td>{key + 1}</td>
                                                    <td>{data.mahasiswa_info.nim}</td>
                                                    <td>{data.mahasiswa_info.nama.toUpperCase()}</td>
                                                    <td>
                                                        {moment(data.tanggal_pembayaran).format(
                                                            "DD/MM/YYYY"
                                                        )}
                                                    </td>
                                                    <td>Rp. {this.formatNumber(data.nominal)}</td>
                                                    <td>{data.status.toUpperCase()}</td>
                                                    <td>
                                                        <center>
                                                            <a
                                                                onClick={() =>
                                                                    this.setState({fotoBukti: data.bukti})
                                                                }
                                                                data-toggle="modal"
                                                                data-target="#myModal"
                                                                className="btn btn-secondary btn-sm"
                                                            >
                                                                <i className="fa fa-image"/>
                                                            </a>
                                                        </center>
                                                    </td>
                                                    <td>
                                                        <center>
                                                            <button
                                                                onClick={() =>
                                                                    this.setState({selectedData: data})
                                                                }
                                                                data-toggle="modal"
                                                                data-target="#ModalAkunTransaksi"
                                                                className="btn btn-primary btn-sm"
                                                                type="button"
                                                            >
                                                                <i className="fa fa-check"/>
                                                            </button>
                                                            <button
                                                                style={{marginLeft: "5px"}}
                                                                onClick={() =>
                                                                    this.setState({selectedData: data})
                                                                }
                                                                data-toggle="modal"
                                                                data-target="#ModalTransaksiUpdate"
                                                                className="btn btn-info btn-sm"
                                                                type="button"
                                                            >
                                                                <i className="fa fa-pencil"/>
                                                            </button>
                                                            <button
                                                                style={{marginLeft: "5px"}}
                                                                onClick={() => {
                                                                    this.setState({selectedData: data})
                                                                    this.handleReject(data.id)
                                                                }}
                                                                className="btn btn-danger btn-sm"
                                                                type="button"
                                                            >
                                                                <i className="fa fa-close"/>
                                                            </button>
                                                        </center>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                    <div
                                        className="modal inmodal"
                                        id="myModal"
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
                                                    <h4 className="modal-title">Bukti Pembayaran</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <center>
                                                        <img
                                                            src={this.state.fotoBukti}
                                                            style={{width: "100%"}}
                                                        />
                                                    </center>
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

                                    <div
                                        className="modal inmodal"
                                        id="ModalAkunTransaksi"
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
                                                    <h4 className="modal-title">Pilih Akun Transaksi</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group row">
                                                        <label className="col-lg-2 col-form-label">Akun Tujuan</label>
                                                        <div className="col-lg-10">
                                                            <Select
                                                                name="form-field-name"
                                                                value={this.state.pembayaranBaru.account_tujuan}
                                                                onChange={(selectedOption) => {
                                                                    let pembayaranBaru = {...this.state.pembayaranBaru}
                                                                    pembayaranBaru.account_tujuan = selectedOption.value;
                                                                    pembayaranBaru.account = 16
                                                                    this.setState({pembayaranBaru});
                                                                }}
                                                                options={account_tujuan}
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
                                    <div
                                        className="modal inmodal"
                                        id="ModalTransaksiUpdate"
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
                                                    <h4 className="modal-title">Ubah Data Transaksi</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group row">
                                                        <label className="col-lg-2 col-form-label">Nominal</label>
                                                        <div className="col-lg-10">
                                                            <CurrencyInput
                                                                precision="0"
                                                                className="form-control m-b"
                                                                prefix="Rp "
                                                                value={this.state.selectedData != null ? this.state.selectedData.nominal : null}
                                                                onChangeEvent={(
                                                                    e,
                                                                    maskedvalue,
                                                                    floatvalue
                                                                ) => {
                                                                    let selectedData = this.state.selectedData
                                                                    selectedData.nominal = floatvalue;
                                                                    this.setState({ selectedData });
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
                                                        onClick={this.handleUpdate}
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-dismiss="modal"
                                                    >
                                                        Ubah
                                                    </button>
                                                </div>
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
                                            <tr style={{height: "100px", border: "1px solid black"}}>
                                                <td style={{width: "20%", border: "1px solid black"}}>
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
                                                        {this.state.check
                                                            ? this.state.kwitansi.kode
                                                            : null}
                                                    </h2>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td style={{padding: "8px 8px"}}>Telah Terima Dari</td>
                                                <td colSpan="2" style={{padding: "30px 0px 8px 8px"}}/>
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
                                                        ? this.state.selectedData.mahasiswa_info.nama
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
                                                    :{" "}
                                                    {this.state.check
                                                        ? this.formatNumber(
                                                            this.state.kwitansi.nominal
                                                        )
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
                                                    :{" "}
                                                    {this.state.check
                                                        ? terbilang(
                                                            this.state.kwitansi.nominal
                                                        )
                                                        : null} Rupiah
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
                                                        ? this.state.jurusanKwitansi
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
                                                    <b>{this.state.check
                                                        ? this.state.kwitansi.kampus_info.kota
                                                        : null}, {moment(this.state.check
                                                            ? this.state.kwitansi.kampus_info.tanggal
                                                            : null).format("DD-MM-YYYY")}</b>
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
                                                        Note: Lembar untuk siswa, lembar merah untuk lembaga,
                                                        hijau untuk arsip
                                                    </i>
                                                    <br/>
                                                    <i>
                                                        Biaya yang dibayarkan tidak bisa ditarik kembali kecuali
                                                        ada perjanjian
                                                    </i>
                                                </p>
                                            </div>
                                            <p style={{textAlign: "center"}}>
                                                Kampus : {this.state.kampus.alamat},  {this.state.kampus.kota} <br/>
                                                e-mail : {this.state.kampus.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Approve;
