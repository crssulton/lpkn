import React, { Component } from 'react';
import { Link } from 'react-router';

class Bap extends Component {
    constructor(props) {
        super(props);
        $('#fullCalModal').modal('hide');
    }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Berita Acara Perkuliahan</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/main">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/absen">Absen Mahasiswa</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>BAP</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title">
                                    <h5>Berita Acara Perkuliahan </h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="ibox ">
                                                <div className="ibox-title">
                                                    <h5>Pertemuan Sebelumnya </h5><br/><hr/>
                                                    <input type="text" placeholder="Nama Dosen" className="form-control" readOnly/><br/>
                                                    <textarea rows="4" cols="35" placeholder="Materi" readOnly/><br/>
                                                    <input type="text" placeholder="Note" className="form-control" readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="ibox ">
                                                <div className="ibox-title">
                                                    <h5>Pertemuan Sekarang </h5><br/><hr/>
                                                    <input type="text" placeholder="Nama Dosen" className="form-control"/><br/>
                                                    <textarea rows="4" cols="35" placeholder="Materi"/><br/>
                                                    <input type="text" placeholder="Note" className="form-control"/><br/>
                                                    <button className="btn btn-sm btn-warning">Simpan</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="ibox ">
                                                <div className="ibox-title">
                                                    <h5>Pertemuan Selanjutnya </h5><br/><hr/>
                                                    <input type="text" placeholder="Nama Dosen" className="form-control"/><br/>
                                                    <textarea rows="4" cols="35" placeholder="Materi"/><br/>
                                                    <input type="text" placeholder="Note" className="form-control"/><br/>
                                                    <button className="btn btn-sm btn-warning">Simpan</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div><hr/>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <Link to="/absen" className="btn btn-sm btn-default block full-width"> Kembali </Link>
                                        </div>
                                        <div className="col-lg-8"></div>
                                        <div className="col-lg-2">
                                            <Link to="/jadwal" className="btn btn-sm btn-warning block full-width"> Mulai Perkuliahan </Link>
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

export default Bap