import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";
import CurrencyInput from "react-currency-input";
import {terbilang} from "../../../config/terbilang.js";
import {titleCase} from "../../../config/capitalize.js";
import Select from "react-select";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import moment from "moment";
import "react-select/dist/react-select.css";

let mahasiswa = [];
let account = [];
let accountTujuan = [];

class Tagihan extends Component {
    constructor(props) {
        super(props);

        let pembayaran = {};
        pembayaran.bayar_kuliah = "false";

        this.state = {
            pembayaran,
            biaya_pendidikan: false,
            mahasiswa: [],
            riwayat: [],
            loadingApprove: false,
            account: [],
            check: false,
            kampus: {},
            kwitansi: [],
            tagihan: [],
            loading: true,
            jurusan: null,
            judul: null,
            search: false,
            mahasiswa_selected: false,
            check_pembayaran: 1
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

    componentWillMount() {
        const self = this;

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
                    kampus: data,
                    loading: false
                });
            });
    }

    getMahasiswa = (query) => {
        const self = this;

        this.setState({search: true})

        fetch(BASE_URL + `/api/mahasiswa/?mahasiswa=${query}`, {
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
                if (typeof(data.results) !== 'undefined'){
                    self.setState({
                        mahasiswa: data.results.filter(x => x.calon == false),
                        search: false
                    });
                } else {
                    if (data.length != 0) {
                        self.setState({
                            mahasiswa: data.filter(x => x.calon == false),
                            search: false
                        });
                    }
                }
            });
    }

    getTagihan = id => {
        const self = this;
        this.setState({tagihan: []})
        fetch(BASE_URL + `/api/tagihan/?mahasiswa=${id}`, {
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
                    tagihan: data
                });
            });
    };

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    addPembayaran = () => {
        const self = this;
        let pembayaran = {...this.state.pembayaran};

        typeof pembayaran.judul == "undefined" ? pembayaran.judul = "-" : null
        pembayaran.mahasiswa = this.state.mahasiswa.find(data => data.nim == pembayaran.mahasiswa).id
        pembayaran.jurusan = this.state.mahasiswa.find(data => data.id == pembayaran.mahasiswa).jurusan_info.nama
        self.setState({jurusan: pembayaran.jurusan, judul: pembayaran.judul, loadingApprove: true})

        console.log(JSON.stringify(pembayaran))

        fetch(BASE_URL + "/api/pembayaran-mahasiswa/", {
            method: "post",
            headers: {
                Authorization: "JWT " + window.sessionStorage.getItem("token"),
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(pembayaran)
        })
            .then(function (response) {
                if (response.status == 201) {
                    toastr.success("Pembayaran telah dikirim", "Sukses ! ");
                } else {
                    toastr.warning("Pembayaran gagal dikirim", "Gagal ! ");
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
                                self.setState({check: true, loadingApprove: false})
                                setTimeout(() => {
                                    self.exportData()
                                }, 100)
                                setTimeout(() => {
                                    let pembayaran = {...self.state.pembayaran}
                                    pembayaran = {}
                                    pembayaran.bayar_kuliah = "false"
                                    self.setState({pembayaran})
                                }, 200)
                            }
                        }
                    );
                }
            });
    };

    isRealValue = (obj) => {
        return obj && obj !== 'null' && obj !== 'undefined';
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

        mahasiswa = [...this.state.mahasiswa];
        const {selectedOption} = this.state;
        this.state.mahasiswa.map((data, key) => {
            mahasiswa[key].value = data.nim;
            mahasiswa[key].label = data.nim + " | " + data.nama;
        });

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Pembayaran Mahasiswa</h2>
                        <ol className="breadcrumb">
                            Dashboard
                            <li className="breadcrumb-item active">
                                <strong>Pembayaran</strong>
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
                                    <i className="fa fa-list "/> Input Pembayaran Mahasiswa
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
                                                            ? this.state.kwitansi.transaksi[0].kwitansi[0].judul.toUpperCase()
                                                            : "null"}
                                                    </h2>
                                                </td>
                                                <td
                                                    style={{width: "20%", border: "1px solid black"}}
                                                    className="text-center"
                                                >
                                                    <h2>
                                                        No.{" "}
                                                        {this.state.check
                                                            ? this.state.kwitansi.transaksi[0].kwitansi[0]
                                                                .kode
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
                                                    : {this.state.check ? this.state.kwitansi.mahasiswa_info.nama : null}
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
                                                    : Rp.{" "}
                                                    {this.state.pembayaran.nominal != null
                                                        ? this.formatNumber(
                                                            this.state.pembayaran.nominal
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
                                                    :
                                                    {this.state.pembayaran.nominal != null
                                                        ? terbilang(this.state.pembayaran.nominal)
                                                        : null}{" "}
                                                    rupiah
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
                                                    : {this.state.check ? this.state.jurusan : null}
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
                                                        ? this.state.kwitansi.transaksi[0].kwitansi[0]
                                                            .keterangan
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
                                                        Mataram, {moment(new Date()).format("DD-MM-YYYY")}
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

                                {this.state.loading ? (
                                    <div className="spiner-example">
                                        <div className="sk-spinner sk-spinner-double-bounce">
                                            <div className="sk-double-bounce1"/>
                                            <div className="sk-double-bounce2"/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row">
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">
                                                NIM Mahasiswa
                                            </label>
                                            <div className="col-lg-4">
                                                <Select
                                                    name="form-field-name"
                                                    value={this.state.pembayaran.mahasiswa}
                                                    onChange={(selectedOption) => {
                                                        if (selectedOption != null) {
                                                            let pembayaran = {...this.state.pembayaran};
                                                            let check_pembayaran;
                                                            pembayaran.mahasiswa =
                                                                selectedOption != null ? selectedOption.nim : null;
                                                            check_pembayaran =
                                                                selectedOption != null ? selectedOption.sisa_bayar : null;
                                                            this.setState({pembayaran, check_pembayaran});
                                                            this.getTagihan(pembayaran.mahasiswa);
                                                        }
                                                    }}
                                                    onInputChange={(inputValue) => {
                                                        if (inputValue != "") this.getMahasiswa(inputValue);
                                                    }}
                                                    options={mahasiswa}
                                                />
                                            </div>

                                            {
                                                this.state.search ?
                                                    <h3 className="text-warning">Mencari Mahasiswa ... </h3>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div>
                                            {
                                                this.state.check_pembayaran > 0 ?
                                                    this.state.pembayaran.mahasiswa != null ?
                                                        <div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-2 col-form-label">
                                                                    Biaya Pendidikan
                                                                </label>
                                                                <div className="col-lg-4">
                                                                    <select
                                                                        value={this.state.pembayaran.bayar_kuliah}
                                                                        onChange={e => {
                                                                            let pembayaran = [];
                                                                            pembayaran = this.state.pembayaran;
                                                                            pembayaran.bayar_kuliah = e.target.value;
                                                                            this.setState({pembayaran});
                                                                        }}
                                                                        defaultValue={false}
                                                                        className="form-control m-b"
                                                                    >
                                                                        <option value={false}>Tidak</option>
                                                                        <option value={true}>Ya</option>
                                                                    </select>
                                                                </div>
                                                                {
                                                                    this.state.pembayaran.bayar_kuliah == 'true' ?
                                                                      <div className="col-lg-5">
                                                                          <small className="mb-0 text-success"><code>Akun Sumber otomatis adalah Akun Pendapatan Biaya Pendidikan</code></small>
                                                                      </div>
                                                                      :
                                                                      null
                                                                }
                                                            </div>
                                                            {
                                                                this.state.pembayaran.bayar_kuliah == "true" ? (
                                                                    <div>
                                                                        <div className="form-group row">
                                                                            <label className="col-lg-2 col-form-label">
                                                                                Nominal Tagihan (Rp.)
                                                                            </label>
                                                                            <div className="col-lg-4">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control m-b"
                                                                                    disabled="disabled"
                                                                                    value={
                                                                                        this.state.tagihan != 0 ?
                                                                                            this.formatNumber(
                                                                                                this.state.tagihan
                                                                                                    .find(
                                                                                                        data =>
                                                                                                            data.mahasiswa_info.nim ==
                                                                                                            this.state.pembayaran.mahasiswa && data.status == false
                                                                                                    ).nominal.toFixed(2)
                                                                                            )
                                                                                            : "Mencari nilai tagihan..."
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <label className="col-lg-2 col-form-label">
                                                                                Masa Tagihan
                                                                            </label>
                                                                            <div className="col-lg-4">
                                                                                <select
                                                                                    disabled={
                                                                                        this.state.pembayaran.mahasiswa == null
                                                                                            ? "disabled"
                                                                                            : null
                                                                                    }
                                                                                    value={this.state.pembayaran.tagihan}
                                                                                    onChange={e => {
                                                                                        let pembayaran = [];
                                                                                        pembayaran = this.state.pembayaran;
                                                                                        pembayaran.tagihan = e.target.value;
                                                                                        this.setState({pembayaran});
                                                                                    }}
                                                                                    defaultValue={true}
                                                                                    className="form-control m-b"
                                                                                >
                                                                                    <option value="">Pilih Masa Tagihan</option>
                                                                                    {this.state.tagihan
                                                                                        .filter(
                                                                                            data =>
                                                                                                data.mahasiswa_info.nim ==
                                                                                                this.state.pembayaran.mahasiswa &&
                                                                                                data.status == false
                                                                                        )
                                                                                        .map((tagihan, key) => (
                                                                                            <option value={tagihan.id}>
                                                                                                Bulan{" "}
                                                                                                {moment(tagihan.tanggal).format("MM-YYYY")}
                                                                                            </option>
                                                                                        ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) :
                                                                <div className="form-group row">
                                                                    <label className="col-lg-2 col-form-label">Uraian</label>
                                                                    <div className="col-lg-4">
                                                                        <input
                                                                            type="text"
                                                                            disabled=""
                                                                            value={this.state.pembayaran.judul}
                                                                            onChange={e => {
                                                                                let pembayaran = {...this.state.pembayaran};
                                                                                pembayaran.judul = e.target.value;
                                                                                this.setState({pembayaran});
                                                                            }}
                                                                            name="pekerjaan_ayah"
                                                                            placeholder="Uraian transaksi"
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        :
                                                        null
                                                :
                                                    <div className="form-group row">
                                                        <label className="col-lg-2 col-form-label">
                                                        </label>
                                                        <div className="col-lg-4">
                                                            <div className="alert alert-success">
                                                                <strong>Pembayaran Biaya Pendidikan Telah Selesai</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Tanggal</label>
                                            <div className="col-lg-4">
                                                <input
                                                    type="date"
                                                    disabled=""
                                                    value={this.state.pembayaran.tanggal_pembayaran}
                                                    onChange={e => {
                                                        let pembayaran = {...this.state.pembayaran};
                                                        pembayaran.tanggal_pembayaran = e.target.value;
                                                        this.setState({pembayaran});
                                                    }}
                                                    name="pekerjaan_ayah"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Nominal</label>
                                            <div className="col-lg-4">
                                                <CurrencyInput
                                                    precision="0"
                                                    className="form-control m-b"
                                                    prefix="Rp "
                                                    value={this.state.pembayaran.nominal}
                                                    onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                        let pembayaran = {...this.state.pembayaran};
                                                        pembayaran.nominal = floatvalue;
                                                        this.setState({pembayaran});
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {
                                            this.state.pembayaran.bayar_kuliah != "true" ?
                                                <div className="form-group row">
                                                    <label className="col-lg-2 col-form-label">
                                                        Akun Sumber
                                                    </label>
                                                    <div className="col-lg-4">
                                                        <Select
                                                            name="form-field-name"
                                                            value={this.state.pembayaran.account}
                                                            onChange={selectedOption => {
                                                                let pembayaran = [];
                                                                pembayaran = this.state.pembayaran;

                                                                pembayaran.account = selectedOption.value;
                                                                this.setState({pembayaran});
                                                            }}
                                                            options={account}
                                                        />
                                                    </div>
                                                    <div className="col-lg-5">
                                                        <small className="mb-0 text-success"><code>Akun Sumber adalah akun jenis pendapatan (Ex. Pendapatan Biaya Seragam)</code></small>
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }

                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">
                                                Akun Tujuan
                                            </label>
                                            <div className="col-lg-4">
                                                <Select
                                                    name="form-field-name"
                                                    value={this.state.pembayaran.account_tujuan}
                                                    onChange={selectedOption => {
                                                        let pembayaran = [];
                                                        pembayaran = this.state.pembayaran;
                                                        pembayaran.account_tujuan = selectedOption.value;
                                                        this.state.pembayaran.bayar_kuliah == "true" ? pembayaran.account = 16 : null
                                                        this.setState({pembayaran});
                                                    }}
                                                    options={accountTujuan}
                                                />
                                            </div>
                                            <div className="col-lg-5">
                                                <small className="mb-0 text-success"><code>Akun Tujuan adalah akun tempat menaruh hasil pembayaran mahasiswa (Ex. Kas, Kas Kampus)</code></small>
                                            </div>
                                        </div>
                                        <div className="hr-line-dashed"/>
                                        <div className="form-group row">
                                            <div className="col-sm-4 col-sm-offset-2">
                                                <button
                                                    onClick={this.addPembayaran}
                                                    disabled={this.state.loadingApprove ? "disabled" : null}
                                                    className="btn btn-primary btn-md"
                                                    type="submit"
                                                >
                                                    {this.state.loadingApprove ? "Menyimpan..." : "Simpan"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tagihan;
