import React, {Component} from "react";
import {BASE_URL} from "../../../config/config.js";
import {Link} from "react-router";

class Mahasiswa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mahasiswas: [],
            mahasiswa: [],
            loading: true,
            key: null,
            magang: [],
            bekerja: [],
            profil: false,
            jurusans: [],
            selectedStatus: "",
            sendMagang: {},
            sendKeterangan: {},
            sendBekerja: {},
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

    exportData(){
        printJS({
            printable: 'print_data',
            type: 'html',
            modalMessage:"Sedang memuat data...",
            showModal:true,
            maxWidth:'1300',
            font_size:'8pt',
            documentTitle:'DAFTAR MAHASISWA MAGANG',
            targetStyles: ['*']
        })
    }

    componentDidMount() {
        const self = this;

        fetch(BASE_URL + "/api/mahasiswa/?status=magang", {
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
                    loading: !self.state.loading
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

        this.fetchMagang()
        this.fetchBekerja()

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

    fetchMagang = () => {
        const self = this
        fetch(BASE_URL + "/api/magang/?kampus=" + window.sessionStorage.getItem("kampus_id"), {
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
                    magang: data
                });
            });
    }

    fetchBekerja = () => {
        const self = this
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
    }

    onFilterData = () => {
        const self = this;

        this.setState({loading: true});

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
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
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
            this.setState({loading: !this.state.loading});
        }, 1000);
    };

    getMahasiswa = id => {
        this.setState({
            mahasiswa: this.state.mahasiswas.find(data => data.id == id),
            profil: true
        });
    };

    fetchMahasiswa = () => {
        const self = this;

        this.setState({loading: true})

        fetch(BASE_URL + "/api/mahasiswa/?status=magang", {
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
                    loading: false
                });
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
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.setState({
                    kelas: data.results,
                    selectedKelas: ""
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
                    mahasiswas: data.results,
                    num_pages: data.num_pages,
                    next: data.next,
                    previous: data.previous,
                    count: data.count,
                    loading: false
                });
            });
    };

    updateStatusMahasiswa = () => {
        const self = this;
        let mahasiswa = this.state.mahasiswa;
        let status = ""
        let kirim = {}
        if (
            this.state.selectedStatus == "aktif" ||
            this.state.selectedStatus == "tidak_aktif" || this.state.selectedStatus == "pindah"
        ) {
            if (this.state.selectedStatus == "aktif"){
                kirim = {
                    status : "aktif"
                }
            } else if (this.state.selectedStatus == "aktif") {
                kirim = {
                    status: "tidak_aktif",
                    keterangan: mahasiswa.keterangan
                }
            } else {
                kirim = {
                    status: "pindah",
                    keterangan: mahasiswa.keterangan
                }
            }

            fetch(BASE_URL + "/api/mahasiswa/" + this.state.mahasiswa.id + "/", {
                method: "patch",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(kirim)
            })
                .then(function (response) {
                    if (response.status == 200) {
                        toastr.success("Data berhasil diubah", "Sukses ! ");
                        self.setState({profil: false})
                        self.fetchMahasiswa();
                    } else toastr.warning("Data gagal diubah", "Gagal ! ");
                })
                .then(function (data) {
                });
        } else if (this.state.selectedStatus == "magang") {
            let sendMagang = {...this.state.sendMagang};
            sendMagang.mahasiswa = this.state.mahasiswa.id;
            kirim = {
                status : "magang"
            }

            fetch(BASE_URL + "/api/mahasiswa/" + this.state.mahasiswa.id + "/", {
                method: "patch",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(kirim)
            })
                .then(function (response) {
                })
                .then(function (data) {
                });

            fetch(BASE_URL + "/api/magang/", {
                method: "post",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendMagang)
            })
                .then(function (response) {
                    if (response.status == 201) {
                        self.fetchMagang()
                        toastr.success("Data berhasil diubah", "Sukses ! ");
                        self.setState({selectedStatus: null, profil: false});
                        self.fetchMahasiswa();
                    } else toastr.warning("Data gagal diubah", "Gagal ! ");
                })
                .then(function (data) {
                });
        } else if (this.state.selectedStatus == "bekerja") {
            let sendBekerja = {...this.state.sendBekerja};
            sendBekerja.mahasiswa = this.state.mahasiswa.id;
            kirim = {
                status : "bekerja"
            }

            fetch(BASE_URL + "/api/mahasiswa/" + this.state.mahasiswa.id + "/", {
                method: "patch",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(kirim)
            })
                .then(function (response) {
                })
                .then(function (data) {
                });
            fetch(BASE_URL + "/api/bekerja/", {
                method: "post",
                headers: {
                    Authorization: "JWT " + window.sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendBekerja)
            })
                .then(function (response) {
                    if (response.status == 201) {
                        self.fetchBekerja()
                        toastr.success("Data berhasil diubah", "Sukses ! ");
                        self.setState({selectedStatus: null, profil: false});
                        self.fetchMahasiswa();
                    } else toastr.warning("Data gagal diubah", "Gagal ! ");
                })
                .then(function (data) {
                });
        }
    };

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };

    render() {
        const styletb = {
            borderCollapse: "collapse",
            borderSpacing: 0,
            borderStyle: "solid",
            width: "100%",
            fontSize: "12px"
        };

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Daftar Mahasiswa Magang</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item active">
                                <strong>Mahasiswa</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4">
                        <div className="title-action" onClick={this.exportData}>
                            <a className="btn btn-primary">
                                <i className="fa fa-print"/> Cetak{" "}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
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
                                        <div className="col-lg-3">
                                            <label className="form-label">Jurusan : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Kelas : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Nama : </label>
                                        </div>
                                        <div className="col-lg-3"/>
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
                                                {this.state.jurusans.map((jurusan, key) => (
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
                                                    this.setState({selectedKelas: e.target.value});
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
                                                    this.setState({selectedMahasiswa: e.target.value});
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-3">
                                            <button
                                                onClick={this.onFilterData}
                                                className="btn btn-info btn-sm"
                                                type="button"
                                            >
                                                <i className="fa fa-filter"/> Filter
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
                                                style={{marginLeft: "5px"}}
                                                className="btn btn-warning btn-sm"
                                                type="button"
                                            >
                                                <i className="fa fa-close"/> Reset
                                            </button>
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
                                                    <th>JURUSAN</th>
                                                    <th>STATUS</th>
                                                    <th>DETAIL</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.mahasiswas
                                                    .filter(x => x.calon == false && x.lulus == false)
                                                    .map((mahasiswa, key) => (
                                                        <tr key={key}>
                                                            <td>{mahasiswa.nim}</td>
                                                            <td>{mahasiswa.nama}</td>
                                                            <td>
                                                                {this.state.jurusans.length === 0
                                                                    ? null
                                                                    : this.state.jurusans.find(
                                                                        jurusan =>
                                                                            jurusan.id == mahasiswa.jurusan
                                                                    ).nama}
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-warning">
                                                                    MAGANG
                                                                </span>
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
                                                <p style={{textAlign: "center"}}>
                                                    <select
                                                        value={this.state.selectedStatus}
                                                        onChange={e =>
                                                            this.setState({selectedStatus: e.target.value})
                                                        }
                                                        style={{width: "50%", margin: "0 auto"}}
                                                        className="form-control m-b"
                                                        name="account"
                                                    >
                                                        <option value="">--Status--</option>
                                                        <option value="aktif">Aktif</option>
                                                        <option value="tidak_aktif">Tidak Aktif</option>
                                                        <option value="magang">Magang</option>
                                                        <option value="bekerja">Bekerja</option>
                                                        <option value="pindah">Pindah Jurusan</option>
                                                    </select>
                                                </p>
                                                {this.state.selectedStatus == "magang" ? (
                                                    <div>
                                                        <label>Lokasi Magang</label>
                                                        <input
                                                            value={this.state.sendMagang.tempat}
                                                            onChange={e => {
                                                                let sendMagang = {...this.state.sendMagang};
                                                                sendMagang.tempat = e.target.value;
                                                                this.setState({sendMagang});
                                                            }}
                                                            type="text"
                                                            disabled=""
                                                            placeholder="Lokasi"
                                                            className="form-control"
                                                        />
                                                        <br/>
                                                        <label>Tanggal Mulai</label>
                                                        <input
                                                            value={this.state.sendMagang.tanggal_mulai}
                                                            onChange={e => {
                                                                let sendMagang = {...this.state.sendMagang};
                                                                sendMagang.tanggal_mulai = e.target.value;
                                                                this.setState({sendMagang});
                                                            }}
                                                            type="date"
                                                            disabled=""
                                                            placeholder="Tanggal"
                                                            className="form-control"
                                                        />
                                                        <br/>
                                                        <label>Tanggal Selesai</label>
                                                        <input
                                                            value={this.state.sendMagang.tanggal_selesai}
                                                            onChange={e => {
                                                                let sendMagang = {...this.state.sendMagang};
                                                                sendMagang.tanggal_selesai = e.target.value;
                                                                this.setState({sendMagang});
                                                            }}
                                                            type="date"
                                                            disabled=""
                                                            placeholder="Tanggal"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                ) : this.state.selectedStatus == "bekerja" ? (
                                                    <div>
                                                        <label>Lokasi Bekerja</label>
                                                        <input
                                                            value={this.state.sendBekerja.tempat}
                                                            onChange={e => {
                                                                let sendBekerja = {...this.state.sendBekerja};
                                                                sendBekerja.tempat = e.target.value;
                                                                this.setState({sendBekerja});
                                                            }}
                                                            type="text"
                                                            disabled=""
                                                            placeholder="Lokasi"
                                                            className="form-control"
                                                        />
                                                        <br/>
                                                        <label>Tanggal</label>
                                                        <input
                                                            value={this.state.sendBekerja.tanggal_mulai}
                                                            onChange={e => {
                                                                let sendBekerja = {...this.state.sendBekerja};
                                                                sendBekerja.tanggal_mulai = e.target.value;
                                                                this.setState({sendBekerja});
                                                            }}
                                                            type="date"
                                                            disabled=""
                                                            placeholder="Tanggal"
                                                            className="form-control"
                                                        />
                                                        <br/>
                                                    </div>
                                                ) : null}
                                            </div>

                                            {
                                                this.state.selectedStatus == "tidak_aktif" || this.state.selectedStatus == "pindah" ?
                                                    <div>
                                                        <label>Keterangan</label>
                                                        <input
                                                            value={this.state.mahasiswa.keteranngan}
                                                            onChange={e => {
                                                                let sendKeterangan = {...this.state.sendKeterangan};
                                                                sendKeterangan.keterangan = e.target.value;
                                                                this.setState({sendKeterangan});
                                                            }}
                                                            type="text"
                                                            disabled=""
                                                            placeholder="Keterangan"
                                                            className="form-control"
                                                        />
                                                        <br/>
                                                    </div>
                                                    :
                                                    null
                                            }

                                            {this.state.mahasiswa.bekerja.length != 0 ? (
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td style={{width: "40%"}}>
                                                            <b>Lokasi Bekerja</b>{" "}
                                                        </td>
                                                        <td>
                                                            :{" "}
                                                            {
                                                                this.state.mahasiswa.bekerja[0].tempat
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
                                                                moment(this.state.mahasiswa.bekerja[0].tanggal_mulai).format("DD-MM-YYYY")
                                                            }
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            ) : null}

                                            {this.state.mahasiswa.magang.length != 0 ? (
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td style={{width: "40%"}}>
                                                            <b>Lokasi Magang</b>{" "}
                                                        </td>
                                                        <td>
                                                            :{" "}
                                                            {
                                                                this.state.mahasiswa.magang[0].tempat
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
                                                                moment(this.state.mahasiswa.magang[0].tanggal_mulai).format("DD-MM-YYYY")
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
                                                                moment(this.state.mahasiswa.magang[0].tanggal_selesai).format("DD-MM-YYYY")
                                                            }
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            ) : null}

                                            <table className="table" style={{width: "100%"}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{width: "40%"}}>
                                                        <b>Angkatan Ke-</b>{" "}
                                                    </td>
                                                    <td>: {this.state.mahasiswa.angkatan} Tahun {this.state.mahasiswa.tahun_angkatan}</td>
                                                </tr>
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
                                                    <td>: {moment(this.state.mahasiswa.tgl_lahir).format("DD-MM-YYYY")}</td>
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
                                                        <b>Keterangan</b>
                                                    </td>
                                                    <td>: {this.state.mahasiswa.keterangan}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Total Bayar</b>
                                                    </td>
                                                    <td>: {this.formatNumber(this.state.mahasiswa.total_bayar)}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Telah Dibayar</b>
                                                    </td>
                                                    <td>: {this.formatNumber(this.state.mahasiswa.total_bayar - this.state.mahasiswa.sisa_bayar)}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Sisa Bayar</b>
                                                    </td>
                                                    <td>: {this.formatNumber(this.state.mahasiswa.sisa_bayar)}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Status Pembayaran</b>
                                                    </td>
                                                    <td>
                                                        {
                                                            this.state.mahasiswa.sisa_bayar > 0 ?
                                                                <span
                                                                    className="badge badge-warning"> Belum Selesai</span>
                                                                :
                                                                <span className="badge badge-primary">Selesai</span>
                                                        }
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>

                                            <div>
                                                <div className="col-sm-6">
                                                    <button
                                                        className="btn btn-info btn-block"
                                                        type="button"
                                                        onClick={this.updateStatusMahasiswa}
                                                    >
                                                        Ubah
                                                    </button>
                                                </div>
                                                <div className="col-sm-6">

                                                </div>
                                            </div>

                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{display: "none"}} >
                        <table className="table table-bordered" id="print_data"
                        >
                            <thead>
                            <tr>
                                <th
                                >
                                    NO.
                                </th>
                                <th
                                >
                                    NIM.
                                </th>
                                <th
                                >
                                    NAMA
                                </th>
                                <th
                                >
                                    ALAMAT
                                </th>
                                <th

                                >
                                    JK
                                </th>
                                <th

                                >
                                    JURUSAN
                                </th>
                                <th

                                >
                                    ANGKATAN
                                </th>
                                <th>LOKASI</th>
                                <th>MULAI</th>
                                <th>SELESAI</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.mahasiswas
                                .filter(x => x.calon == false && x.lulus == false)
                                .map((data, key) => (
                                    <tr>
                                        <td>
                                            {key + 1}
                                        </td>
                                        <td>
                                            {data.nim}
                                        </td>
                                        <td>
                                            {data.nama}
                                        </td>
                                        <td>
                                            {data.alamat}
                                        </td>
                                        <td>
                                            {data.jenis_kelamin}
                                        </td>
                                        <td>
                                            {data.jurusan_info.nama}
                                        </td>
                                        <td>
                                            {data.tahun_angkatan}
                                        </td>
                                        <td>
                                            {data.magang[0].tempat}
                                        </td>
                                        <td>
                                            {moment(data.magang[0].tanggal_mulai).format("DD-MM-YYYY")}
                                        </td>
                                        <td>
                                            {moment(data.magang[0].tanggal_selesai).format("DD-MM-YYYY")}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default Mahasiswa;
