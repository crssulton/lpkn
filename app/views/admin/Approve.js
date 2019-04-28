import React, { Component } from 'react';
import { Link} from 'react-router';

class Approve extends Component {

    render() {
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
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="ibox ">
                            <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                <h5> <i className="fa fa-list "></i> List Pembayaran</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <table className="table table-striped" align="right">
                                        <thead>
                                        <tr>
                                            <th>NO INVOICE</th>
                                            <th>NIM</th>
                                            <th>NAMA</th>
                                            <th>TGL</th>
                                            <th>REKENING PENYETOR</th>
                                            <th>REKENING TUJUAN</th>
                                            <th>FOTO</th>
                                            <th>AKSI</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>7126167</td>
                                                <td>11.00.11</td>
                                                <td>Muhammad Iqbal</td>
                                                <td>03-03-2019</td>
                                                <td>12871282221</td>
                                                <td>91772238227</td>
                                                <td>
                                                    <center>
                                                        <button 
                                                            data-toggle="modal" data-target="#myModal"
                                                            className="btn btn-info btn-sm" 
                                                            type="button"
                                                            ><i className="fa fa-external-link"></i></button>
                                                    </center>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control">
                                                        <option>Pilih</option>
                                                        <option>Terima</option>
                                                        <option>Tolak</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3226167</td>
                                                <td>11.00.11</td>
                                                <td>Rizky Dwi Hadi</td>
                                                <td>03-03-2019</td>
                                                <td>12871282221</td>
                                                <td>91772238227</td>
                                                <td>
                                                    <center>
                                                        <button 
                                                            data-toggle="modal" data-target="#myModal"
                                                            className="btn btn-info btn-sm" 
                                                            type="button"
                                                            ><i className="fa fa-external-link"></i></button>
                                                    </center>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control">
                                                        <option>Pilih</option>
                                                        <option>Terima</option>
                                                        <option>Tolak</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <div className="modal inmodal" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content animated bounceInRight">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                                        <h4 className="modal-title">Bukti Pembayaran</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <center>
                                                            <img src="http://smmptnbarat.id/images/mandiri_11.png"style={{'width':'50%'}} />
                                                        </center>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-white" data-dismiss="modal">Tutup</button>
                                                    </div>
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

export default Approve