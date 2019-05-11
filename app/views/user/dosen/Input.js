import React, { Component } from 'react';
import { Link } from 'react-router';
import {BASE_URL} from '../../../config/config.js'

class Input extends Component {
    constructor(props) {
        super(props);
        $('#fullCalModal').modal('hide');
        this.state = {
            pilih:'',
            absensi: [],
            daftars: [],
            kehadiran: [],
            keaktifan: [],
            nilai: [],
            selectedMatkul: 0
        }
        this.handlePilih   = this.handlePilih.bind(this)
    }

    componentWillMount = () => {
        const self = this
        fetch(BASE_URL + '/api/absensi/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                absensi: data.results
            })
        });

        fetch(BASE_URL + '/api/nilai/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                nilai: data.results
            })
        });

    }

    handlePilih(event){
        this.setState({ 
            pilih : event.target.value 
        })
        this.setState({selectedMatkul: event.target.value})
    }

    editNilai = () => {
        this.state.nilai.map(data => {
            let sendNilai = {}
            sendNilai.kehadiran = data.kehadiran
            sendNilai.keaktifan = data.keaktifan
            sendNilai.ujian     = data.ujian
            sendNilai.tugas     = data.tugas
            sendNilai.nilai_angka = data.nilai_angka
            sendNilai.nilai_grade = data.nilai_grade
            sendNilai.status      = data.status
            if(data.keterangan != "") sendNilai.keterangan  = data.keterangan

            console.log(JSON.stringify(sendNilai))
            fetch(BASE_URL + '/api/nilai/' + data.id + '/', {
                method: 'patch',
                headers: {
                    'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(sendNilai)
            }).then(function(response) {
                
                if (response.status == 200) {
                    
                }else{
                }
            }).then(function(data) {
                
            });
        })
        toastr.success("Data berhasil diubah", "Sukses ! ")
    }

    render() {
        var pilihanInput;
        if (this.state.pilih!=='') {
            pilihanInput = 
            <div>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th style={{width: 40}} className="text-center" rowSpan='2'>No.</th>
                        <th rowSpan='2'>Nama Mahasiswa</th>
                        <th className="text-center" colSpan='4'>Nilai</th>
                        <th rowSpan='2'>Nilai Akhir</th>
                        <th rowSpan='2'>Grade</th>
                        <th rowSpan='2'>Lulus/Tidak</th>
                        <th rowSpan='2'>Rekomendasi</th>
                    </tr>
                    <tr>
                        <th>Kehadiran</th>
                        <th>Keaktifan</th>
                        <th>Ujian Akhir</th>
                        <th>Tugas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.nilai.filter(x => x.mata_kuliah == this.state.selectedMatkul).map((data, key) =>
                            <tr key={key}>
                                <td className="text-center">{data.id}</td>
                                <td>{data.mahasiswa_info.nama}</td>
                                <td className="text-center">
                                    <input 
                                        value={data.kehadiran} 
                                        onChange={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).kehadiran = e.target.value
                                            this.setState({nilai})
                                        }}
                                        type="number" 
                                        style={{width: 50}}/>
                                </td>
                                <td className="text-center">
                                    <input 
                                        value={data.keaktifan} 
                                        onChange={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).keaktifan = e.target.value
                                            this.setState({nilai})
                                        }}
                                        onBlur={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_angka = 
                                            ((10/100)*data.kehadiran) + ((10/100)*data.keaktifan) + ((10/100)*data.tugas) + ((70/100)*data.ujian)
                                            let grade = nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_angka
                                            if (grade >= 85) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "A"
                                            }else if (grade < 85 && grade >= 70) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "B"
                                            }else if (grade < 70 && grade >=60) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "C"
                                            }else if (grade < 60 && grade >=40) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "D"
                                            }else if (grade < 40) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "E"
                                            }
                                            this.setState({nilai})
                                        }}
                                        type="number" 
                                        style={{width: 50}}/>
                                </td>
                                <td className="text-center">
                                    <input 
                                        value={data.ujian} 
                                        onChange={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).ujian = e.target.value
                                            this.setState({nilai})
                                        }}
                                        onBlur={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_angka = 
                                            ((10/100)*data.kehadiran) + ((10/100)*data.keaktifan) + ((10/100)*data.tugas) + ((70/100)*data.ujian)
                                            let grade = nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_angka
                                            if (grade >= 85) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "A"
                                            }else if (grade < 85 && grade >= 70) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "B"
                                            }else if (grade < 70 && grade >=60) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "C"
                                            }else if (grade < 60 && grade >=40) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "D"
                                            }else if (grade < 40) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "E"
                                            }
                                            this.setState({nilai})
                                        }}
                                        type="number" 
                                        style={{width: 50}}/>
                                </td>
                                <td className="text-center">
                                    <input 
                                        value={data.tugas} 
                                        onChange={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).tugas = e.target.value
                                            this.setState({nilai})
                                        }}
                                        onBlur={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_angka = 
                                            ((10/100)*data.kehadiran) + ((10/100)*data.keaktifan) + ((10/100)*data.tugas) + ((70/100)*data.ujian)
                                            let grade = nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_angka
                                            if (grade >= 85) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "A"
                                            }else if (grade < 85 && grade >= 70) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "B"
                                            }else if (grade < 70 && grade >=60) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "C"
                                            }else if (grade < 60 && grade >=40) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "D"
                                            }else if (grade < 40) {
                                                nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).nilai_grade = "E"
                                            }
                                            this.setState({nilai})
                                        }}
                                        type="number" 
                                        style={{width: 50}}/>
                                </td>
                                <td className="text-center">
                                    <input 
                                        value={data.nilai_angka} 
                                        type="number" 
                                        style={{width: 50}} 
                                        readOnly/>
                                </td>
                                <td className="text-center">
                                    <input 
                                        type="text" 
                                        style={{width: 50}} 
                                        value={data.nilai_grade} 
                                        readOnly/>
                                </td>
                                <td>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <select 
                                                value={data.status}
                                                className="form-control"
                                                onChange={(e) => {
                                                    let nilai = [...this.state.nilai]
                                                    nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).status = e.target.value
                                                    this.setState({nilai})
                                                }}
                                                >
                                                <option value="lulus">Lulus</option>
                                                <option value="tidak_lulus">Tidak</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <input rows="2" cols="20"  
                                        value={data.keterangan} 
                                        onChange={(e) => {
                                            let nilai = [...this.state.nilai]
                                            nilai.find(x => x.mata_kuliah == this.state.selectedMatkul && x.mahasiswa == data.mahasiswa).keterangan = e.target.value
                                            this.setState({nilai})
                                        }}/>
                                    </td>
                            </tr>
                        )
                    }
                    
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <button 
                            className="btn btn-sm btn-warning block full-width"
                            onClick={this.editNilai}
                            > 
                            Simpan 
                        </button>
                    </div>
                </div>
            </div>;
        } else {
            pilihanInput = <div className="alert alert-warning"> ** Pilih Mata Kuliah  </div>;
        }
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Input Nilai Mahasiswa</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Input Nilai</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <h5>Form Input Nilai</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <select className="form-control m-b" onChange={this.handlePilih}>
                                            <option>-- Pilih Mata Kuliah --</option>
                                            {
                                                this.state.absensi.map((matkul, key) => 
                                                    <option value={matkul.mata_kuliah}>{matkul.mata_kuliah_info.nama}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-8"></div>
                                </div>
                            </div>
                            {pilihanInput}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Input