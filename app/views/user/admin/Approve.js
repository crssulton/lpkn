import React, { Component } from 'react';
import { Link} from 'react-router';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'

class Approve extends Component {

    constructor(props){
        super(props);
        this.state = {
            approveStatus: "",
            pembayaran: [],
            fotoBukti: ""
        }
    }

    componentDidMount(){
        const self = this
        fetch(BASE_URL + '/api/pembayaran-mahasiswa/', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                pembayaran: data.results
            })
        });

    }

    handleApprove = (e, id) => {
        const self = this
        let status = e.target.value

        swal({
          title: status.toUpperCase() + " Pembayaran ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willApprove) => {
          if (willApprove) {
            fetch(BASE_URL + '/api/pembayaran-mahasiswa/' + id + '/' + status + '/', {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                console.log(response)
                if (response.status == 200) {
                    toastr.success("Pembayaran telah di" + status.toUpperCase(), "Sukses ! ")
                    self.setState({pembayaran : self.state.pembayaran.filter(data => data.id != id) })
                }else{
                    toastr.warning("Pembayaran gagal di " + status.toUpperCase(), "Gagal ! ")
                }
            }).then(function(data) {
                
            });
          }
        });
    }

    formatNumber = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

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
                                            <th>NO AKUN</th>
                                            <th>NIM</th>
                                            <th>NAMA</th>
                                            <th>TGL</th>
                                            <th>REKENING PENYETOR</th>
                                            <th>REKENING TUJUAN</th>
                                            <th>NOMINAL</th>
                                            <th>FOTO</th>
                                            <th>AKSI</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.pembayaran.filter(x => x.status == 'pending').map(data => 
                                                <tr>
                                                    <td>14001</td>
                                                    <td>{data.mahasiswa_info.nim}</td>
                                                    <td>{data.mahasiswa_info.nama.toUpperCase()}</td>
                                                    <td>{data.tanggal_pembayaran}</td>
                                                    <td>12871282221</td>
                                                    <td>91772238227</td>
                                                    <td>{this.formatNumber(data.nominal)}</td>
                                                    <td>
                                                        <center>
                                                            <button 
                                                                onClick={() => this.setState({fotoBukti: data.bukti})}
                                                                data-toggle="modal" data-target="#myModal"
                                                                className="btn btn-info btn-sm" 
                                                                type="button"
                                                                ><i className="fa fa-external-link"></i></button>
                                                        </center>
                                                    </td>
                                                    <td>
                                                        <select
                                                            onChange={(e) => this.handleApprove(e, data.id)}
                                                            value={this.state.approveStatus}
                                                            className="form-control">
                                                            <option>Pilih</option>
                                                            <option value="verify">Terima</option>
                                                            <option value="reject">Tolak</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                    
                                    <div className="modal inmodal" id="myModal" tabIndex="-1" role="dialog" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content animated bounceInRight">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                                        <h4 className="modal-title">Bukti Pembayaran</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <center>
                                                            <img src={this.state.fotoBukti} style={{'width':'100%'}} />
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