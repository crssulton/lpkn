import React, { Component } from 'react';
import { Link} from 'react-router';

class Anggaran extends Component {

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Pengajuan Anggaran</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pengajuan Anggaran</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="ibox ">
                                    <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                        <h5> <i className="fa fa-list "></i> List Pengajuan</h5>
                                    </div>

                                     <div className="ibox-content">
                                        <div className="table-responsive">
                                            <table className="table table-striped" align="right">
                                                <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>NAMA BARANG</th>
                                                    <th>SPESIFIKASI</th>
                                                    <th>SATUAN</th>
                                                    <th>JUMLAH</th>
                                                    <th>HARGA</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Komputer</td>
                                                        <td>core i7</td>
                                                        <td>Buah</td>
                                                        <td>5</td>
                                                        <td>28.000.000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Mac Book</td>
                                                        <td>core i7</td>
                                                        <td>Unit</td>
                                                        <td>5</td>
                                                        <td>28.000.000</td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                            <div className="hr-line-dashed"></div>
                                            <button className="btn btn-info btn-block">Ajukan</button>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="ibox ">
                                    <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                        <h5> <i className="fa fa-plus "></i> Tambah Pengajuan</h5>
                                    </div>

                                     <div className="ibox-content">

                                        <div className="">
                                            <div className="form-group row"><label className="col-lg-3 col-form-label">Nama Barang</label>
                                            <div className="col-lg-9">
                                                <input 
                                                    type="text" 
                                                    className="form-control m-b" 
                                                    />
                                            </div>
                                            </div>

                                            <div className="form-group row"><label className="col-lg-3 col-form-label">Spesifikasi</label>
                                            <div className="col-lg-9">
                                                <input 
                                                    type="text" 
                                                    className="form-control m-b" 
                                                    />
                                            </div>
                                            </div>

                                            <div className="form-group row"><label className="col-lg-3 col-form-label">Satuan</label>
                                            <div className="col-lg-9">
                                                <select className="form-control m-b">
                                                    <option value="">Pilih Satuan</option>
                                                    <option value="">Buah</option>
                                                    <option value="">Unit</option>
                                                    <option value="">Lembar</option>
                                                    <option value="">Batang</option>
                                                    <option value="">Bungkus</option>
                                                </select>
                                            </div>
                                            </div>

                                            <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah</label>
                                            <div className="col-lg-9">
                                                <input 
                                                    type="number" 
                                                    className="form-control m-b" 
                                                    />
                                            </div>
                                            </div>

                                            <div className="form-group row"><label className="col-lg-3 col-form-label">Harga</label>
                                            <div className="col-lg-9">
                                                <input 
                                                    type="number" 
                                                    className="form-control m-b" 
                                                    />
                                            </div>
                                            </div>


                                        <button
                                            className="btn btn-primary btn-sm btn-add" 
                                            type="button"
                                            onClick={this.addMataKuliah}>
                                            Tambah
                                        </button>
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

export default Anggaran