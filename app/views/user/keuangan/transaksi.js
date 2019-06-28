import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";
import CurrencyInput from "react-currency-input";
import {terbilang} from "../../../config/terbilang.js";
import Select from "react-select";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import moment from "moment";
import "react-select/dist/react-select.css";

let account = []
let account_tujuan = []
let kelompok_account = []

class Tagihan extends Component {

    constructor(props) {
        super(props);

        let transaksiBaru = {}
        transaksiBaru.saldo_awal = "false"

        this.state = {
            transaksi: [],
            account: [],
            kelompok_account: [],
            loading: true,
            check: false,
            form: false,
            selected: null,
            jurusans: [],
            transaksiBaru,
            kwitansi: {},
            kampus: {},
            add: true,
            addForm: true,
            jurusans: [],
            edittransaksi: {}
        }
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedOption) {
            console.log(`Selected: ${selectedOption.label}`);
        }
    }

    formatNumber = num => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    componentDidMount() {
        const self = this

        fetch(BASE_URL + '/api/transaksi/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data.results)
            self.setState({
                transaksi: data.results,
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

        fetch(BASE_URL + '/api/kelompok-account/', {
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
                kelompok_account: data.results
            })
        });

    }

    handleChangeKode = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].kode = e.target.value
        this.setState({
            transaksi,
            edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeUraian = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].uraian = e.target.value
        this.setState({
            transaksi,
            edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }
    handleChangeNominal = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].nominal = e.target.value
        this.setState({
            transaksi,
            edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeTanggal = e => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].tanggal = e.target.value
        this.setState({
            transaksi,
            edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    handleChangeAccount = (selectedOption) => {
        let transaksi = []
        transaksi = this.state.transaksi
        transaksi.filter(data => data.id == this.state.selected)[0].account = selectedOption.value
        this.setState({
            transaksi,
            edittransaksi: transaksi.filter(data => data.id == this.state.selected)[0]
        })
    }

    edittransaksi = () => {
        const self = this
        let edittransaksi = this.state.edittransaksi
        delete edittransaksi.id
        self.setState({edittransaksi})

        fetch(BASE_URL + '/api/transaksi/' + this.state.selected + '/', {
            method: 'put',
            body: JSON.stringify(this.state.edittransaksi),
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.status == 200) {
                toastr.success("transaksi berhasil diubah", "Sukses ! ")
                self.setState({
                    addForm: !self.state.addForm
                })
            } else {
                toastr.warning("Gagal mengubah transaksi", "Gagal ! ")
            }
        }).then(function (data) {

        });
    }

    addtransaksiUraian = (e) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.uraian = e.target.value
        this.setState({transaksiBaru})
    }
    addtransaksiTanggal = (e) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.tanggal = e.target.value
        this.setState({transaksiBaru})
    }
    addtransaksiNominal = (e, maskedvalue, floatvalue) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.nominal = floatvalue
        this.setState({transaksiBaru})
    }
    addtransaksiAkun = (selectedOption) => {
        if (selectedOption) {
            let transaksiBaru = {}
            transaksiBaru = this.state.transaksiBaru
            transaksiBaru.account = selectedOption.value
            this.setState({transaksiBaru})
        }
    }
    addtransaksiKelompokAkun = (selectedOption) => {
        if (selectedOption) {
            let transaksiBaru = {}
            transaksiBaru = this.state.transaksiBaru
            transaksiBaru.kelompok_account = selectedOption.value
            this.setState({transaksiBaru})
        }
    }
    addtransaksiPenyusutan = (e) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.jumlah_penyusutan = e.target.value
        this.setState({transaksiBaru})
    }
    addtransaksiKode = (e) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.kode = e.target.value
        this.setState({transaksiBaru})
    }
    addtransaksiAkunAkunTujuan = (selectedOption) => {
        if (selectedOption) {
            let transaksiBaru = {}
            transaksiBaru = this.state.transaksiBaru
            transaksiBaru.account_tujuan = selectedOption.value
            this.setState({transaksiBaru})
        }
    }
    addtransaksiSaldoAwal = (e) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.saldo_awal = e.target.value
        this.setState({transaksiBaru})
    }
    addtransaksiJurusan = (e) => {
        let transaksiBaru = {}
        transaksiBaru = this.state.transaksiBaru
        transaksiBaru.jurusan = e.target.value
        this.setState({transaksiBaru})
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

    addtransaksi = () => {
        const self = this
        let addButton = document.getElementsByClassName("btn-add")
        console.log(JSON.stringify(this.state.transaksiBaru))
        addButton[0].setAttribute("disabled", "disabled")

        fetch(BASE_URL + '/api/transaksi/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.transaksiBaru)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {

            if (data.id != null || data.id != undefined) {
                addButton[0].removeAttribute("disabled")
                let transaksi = []
                let transaksiBaru = {}
                transaksiBaru = self.state.transaksiBaru

                transaksi = self.state.transaksi
                transaksi.push(data)

                transaksiBaru.kode = null
                transaksiBaru.uraian = null
                transaksiBaru.tanggal = null
                transaksiBaru.nominal = null

                self.setState({
                    addForm: true,
                    transaksi,
                    transaksiBaru: {},
                    kwitansi: data.kwitansi[0]

                }, () => {
                    self.setState({check: true})
                    setTimeout(() => {
                        self.exportData()
                    }, 100)
                })
                toastr.success("Akun berhasil ditambahkan", "Sukses ! ")
            } else {
                addButton[0].removeAttribute("disabled")
                self.setState({
                    addForm: true
                })
                toastr.warning("Gagal menambahkan Akun", "Gagal ! ")
            }
        });
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

    handleDeleteTransaksi = (id, key) => {
        console.log(id)
        const self = this
        swal({
            title: "Hapus Transaksi ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(BASE_URL + '/api/transaksi/' + id, {
                        method: 'delete',
                        headers: {
                            'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
                        }
                    }).then(function (response) {
                        if (response.status == 204) {
                            self.setState({
                                transaksi: self.state.transaksi.filter(data => data.id !== id)
                            })
                            swal("Sukses! transaksi telah dihapus!", {
                                icon: "success",
                            });
                        }
                    }).then(function (data) {
                    });
                }
            });
    }

    render() {

        kelompok_account = [...this.state.kelompok_account]
        this.state.kelompok_account.map((data, key) => {
            kelompok_account[key].value = data.id
            kelompok_account[key].label = data.nama
        })

        account = [...this.state.account]
        const {selectedOption} = this.state;
        this.state.account.filter(x => x.kelompok_account == this.state.transaksiBaru.kelompok_account).map((data, key) => {
            account[key].value = data.id
            account[key].label = data.nama
        })

        account_tujuan = [...this.state.account]
        this.state.account.map((data, key) => {
            account_tujuan[key].value = data.id
            account_tujuan[key].label = data.nama
        })


        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Tambah Transaksi</h2>
                        <ol className="breadcrumb">
                            Dashboard
                            <li className="breadcrumb-item active">
                                <strong>Tambah Transaksi</strong>
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
                                    <i className="fa fa-list "/> Tambah Transaksi
                                </h5>
                            </div>
                            <div className="ibox-content">
                                <div className="form-group row"><label className="col-lg-2 col-form-label">Kode</label>
                                    <div className="col-lg-4">
                                        <input
                                            type="text"
                                            className="form-control m-b"
                                            name="transaksi"
                                            value={this.state.transaksiBaru.kode}
                                            onChange={this.addtransaksiKode}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row"><label className="col-lg-2 col-form-label">Kelompok
                                    Akun</label>
                                    <div className="col-lg-4">
                                        <Select
                                            name="form-field-name"
                                            value={this.state.transaksiBaru.kelompok_account}
                                            onChange={this.addtransaksiKelompokAkun}
                                            options={kelompok_account}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row"><label className="col-lg-2 col-form-label">Akun
                                    Sumber</label>
                                    <div className="col-lg-4">
                                        <Select
                                            name="form-field-name"
                                            disabled={this.state.transaksiBaru.kelompok_account == null ? "disabled" : null}
                                            value={this.state.transaksiBaru.account}
                                            onChange={this.addtransaksiAkun}
                                            options={account}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Uraian</label>
                                    <div className="col-lg-4">
                                        <input
                                            type="text"
                                            className="form-control m-b"
                                            name="transaksi"
                                            value={this.state.transaksiBaru.uraian}
                                            onChange={this.addtransaksiUraian}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Tanggal</label>
                                    <div className="col-lg-4">
                                        <input
                                            type="date"
                                            className="form-control m-b"
                                            name="transaksi"
                                            value={this.state.transaksiBaru.tanggal}
                                            onChange={this.addtransaksiTanggal}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Nominal</label>
                                    <div className="col-lg-4">
                                        <CurrencyInput
                                            precision="0"
                                            className="form-control m-b"
                                            prefix="Rp "
                                            value={this.state.transaksiBaru.nominal}
                                            onChangeEvent={this.addtransaksiNominal}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row"><label className="col-lg-2 col-form-label">Saldo
                                    Awal</label>
                                    <div className="col-lg-4">
                                        <select
                                            defaultValue={false}
                                            value={this.state.transaksiBaru.saldo_awal}
                                            onChange={this.addtransaksiSaldoAwal}
                                            className="form-control"
                                        >
                                            <option value={false}>Tidak</option>
                                            <option value={true}>Ya</option>
                                        </select>
                                    </div>
                                </div>

                                {
                                    this.state.transaksiBaru.saldo_awal == "true" ? null
                                        :
                                        <div className="form-group row"><label className="col-lg-2 col-form-label">Akun
                                            Tujuan</label>
                                            <div className="col-lg-4">
                                                <Select
                                                    name="form-field-name"
                                                    value={this.state.transaksiBaru.account_tujuan}
                                                    onChange={this.addtransaksiAkunAkunTujuan}
                                                    options={account}
                                                />
                                            </div>
                                        </div>
                                }

                                <button
                                    className="btn btn-primary btn-sm btn-add"
                                    type="button"
                                    onClick={this.addtransaksi}>
                                    Tambah Transaksi
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
                                    : Administrator {this.state.kampus.nama}
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
                                    :
                                    {this.state.check
                                        ? terbilang(this.state.kwitansi.nominal)
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
                                    : {this.state.kwitansi.judul}
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
                                    <b>
                                        {this.state.check
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
                                    <b>Yang bersangkutan</b>
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
                                Kampus : {this.state.kampus.alamat}, {this.state.kampus.kota} <br/>
                                e-mail : {this.state.kampus.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tagihan;
