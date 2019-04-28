import React, { Component } from 'react';
import { Link } from 'react-router';

class Input extends Component {
    constructor(props) {
        super(props);
        $('#fullCalModal').modal('hide');
        this.state = {
            pilih:''	
        }
        this.handlePilih   = this.handlePilih.bind(this)
    }
    handlePilih(event){
        this.setState({ 
            pilih : event.target.value 
        })
    }
    render() {
        var pilihanInput;
        if (this.state.pilih!=='') {
            pilihanInput = 
            <div>
                <table>
                    {/* <thead></thead> */}
                    <tbody>
                        <tr>
                            <th style={{width: 100}}>MATAKULIAH</th><td style={{width: 10}}>:</td><td>{this.state.pilih}</td>
                        </tr>
                        <tr>
                            <th>DOSEN</th><td>:</td><td>BAPAK IQBAL</td>
                        </tr>
                        <tr>
                            <th>KELAS</th><td>:</td><td>ABS 1</td>
                        </tr>
                    </tbody>
                </table><br/>
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
                    <tr>
                        <td className="text-center">1</td>
                        <td>Asir</td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}} readOnly/></td>
                        <td>
                            <div className="row">
                                <div className="col-lg-12">
                                    <select className="form-control">
                                        <option value="">Pilih</option>
                                        <option value="Lulus">Lulus</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td className="text-center"><textarea rows="2" cols="20"/></td>
                    </tr>
                    <tr>
                        <td className="text-center">2</td>
                        <td>Basd</td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}}/></td>
                        <td className="text-center"><input type="number" style={{width: 50}} readOnly/></td>
                        <td>
                            <div className="row">
                                <div className="col-lg-12">
                                    <select className="form-control">
                                        <option value="">Pilih</option>
                                        <option value="Lulus">Lulus</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td className="text-center"><textarea rows="2" cols="20"/></td>
                    </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <Link to="/nilai" className="btn btn-sm btn-warning block full-width"> Simpan </Link>
                    </div>
                </div>
            </div>;
        } else {
            pilihanInput = <div className="alert alert-danger"> Pilih Matakuliah yang ingin di input nilainya. </div>;
        }
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Input Nilai</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Home</Link>
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
                                            <option value="">-- Pilih Mata Kuliah --</option>
                                            <option value="pil 1">option 1</option>
                                            <option value="pil 2">option 2</option>
                                            <option value="pil 3">option 3</option>
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