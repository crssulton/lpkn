import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'

class RekapMahasiswa extends Component {

    constructor(props) {
        super(props);

        const {dosen} = this.props.location.state

        this.state = {
            mahasiswas: [],
            dosen,
            loading: true,
            absensi: [],
            jadwal: [],
            jurusan: [],
            kelas: [],
            loading: true,
            matkul: [],
            selectedMatkul: "",
            selectedKelas: ""
        }
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
        const self = this

        fetch(BASE_URL + '/api/absensi/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                absensi: data.results.filter(item => item.dosen == self.state.dosen.id)
            })
        });

        fetch(BASE_URL + '/api/jadwal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                jadwal: data.results,
                loading: false
            })
        });

        fetch(BASE_URL + '/api/kelas/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                kelas: data.results
            })
        });


    }

    render() {
        console.log(this.state.absensi)
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Rekap Absensi Dosen</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                Absensi
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Rekap Absensi</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4">
                        <div className="title-action">
                            <a onClick={() => this.exportData()} className="btn btn-primary"><i
                                className="fa fa-print"></i> Cetak </a>
                        </div>
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                    <h5><i className="fa fa-list "></i> Rekap Absensi Dosen</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label className="form-label">Mata Kuliah : </label>
                                        </div>
                                        <div className="col-lg-3"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <select
                                                value={this.state.selectedMatkul}
                                                onChange={e => {
                                                    console.log()
                                                    this.setState({
                                                        selectedMatkul: this.state.absensi[e.target.value].mata_kuliah_info.id,
                                                        selectedKelas: this.state.absensi[e.target.value].kelas
                                                    });
                                                }}
                                                className="form-control"
                                            >
                                                <option value="">Pilih Mata Kuliah</option>
                                                {this.state.absensi
                                                    .filter(x => x.dosen == this.state.dosen.id)
                                                    .map((absensi, key) => (
                                                        <option key={key} value={key}>
                                                            {absensi.mata_kuliah_info.nama} | {absensi.kelas_info.nama} |
                                                            Angkatan {absensi.kelas_info.angkatan}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className="col-lg-3">

                                        </div>
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <div className="table-responsive">
                                                <table className="">
                                                    <tr style={{'width': '100%'}}>
                                                        <td style={{'width': '6%'}}><h4>Dosen</h4></td>
                                                        <td><h4> : {this.state.dosen.nama}</h4></td>
                                                    </tr>
                                                    <tr style={{'width': '100%'}}>
                                                        <td style={{'width': '6%'}}><h4>Kelas</h4></td>
                                                        <td>
                                                            <h4> : {this.state.selectedKelas != "" ? this.state.kelas.find(x => x.id == this.state.selectedKelas).nama : null}</h4>
                                                        </td>
                                                    </tr>
                                                    <tr style={{'width': '100%'}}>
                                                        <td style={{'width': '6%'}}><h4>Angkatan</h4></td>
                                                        <td>
                                                            <h4> : {this.state.selectedKelas != "" ? this.state.kelas.find(x => x.id == this.state.selectedKelas).angkatan : null}</h4>
                                                        </td>
                                                    </tr>
                                                </table>
                                                {
                                                    this.state.loading ?
                                                        <div className="spiner-example">
                                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                                <div className="sk-double-bounce1"></div>
                                                                <div className="sk-double-bounce2"></div>
                                                            </div>
                                                        </div>
                                                        :
                                                        this.state.absensi.filter(x => x.mata_kuliah_info.id == this.state.selectedMatkul && x.kelas == this.state.selectedKelas).map((absen, key) =>
                                                            <table className="table table-bordered" id="print_data">
                                                                <thead>
                                                                <tr>
                                                                    <th rowSpan={2} style={{'width': '5%'}}>KODE</th>
                                                                    <th rowSpan={2} style={{'width': '15%'}}>MATA KULIAH</th>
                                                                    <th style={{textAlign: 'center'}} colSpan={this.state.jadwal.length}>PERTEMUAN</th>
                                                                </tr>
                                                                <tr>
                                                                    {
                                                                        this.state.jadwal.filter(x => x.mata_kuliah == absen.mata_kuliah && x.kelas == this.state.selectedKelas).map((data, key) =>
                                                                            <th style={{'width': '5%'}}>
                                                                                <small> {moment(data.start).format("DD/MM/YYYY")} </small>
                                                                            </th>
                                                                        )
                                                                    }
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        {absen.mata_kuliah_info.kode}
                                                                    </td>
                                                                    <td>
                                                                        {absen.mata_kuliah_info.nama}
                                                                    </td>
                                                                    {
                                                                        this.state.jadwal.filter(x => x.mata_kuliah == absen.mata_kuliah && x.kelas == this.state.selectedKelas).map((data, key) =>
                                                                            <td>
                                                                                {
                                                                                    data.dosen_hadir ? "Hadir" : "Tidak Hadir"
                                                                                }
                                                                            </td>
                                                                        )
                                                                    }
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        )
    }

}

export default RekapMahasiswa