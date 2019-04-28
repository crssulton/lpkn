import React, { Component } from 'react';
import { Link} from 'react-router';

class Tagihan extends Component {

    constructor(props){
        super(props);
        this.state = {
            tagihans: [],
            selectedStatus: 1
        }
    }

    componentDidMount(){
        const self = this
        fetch('https://tagihan-lpkn.free.beeceptor.com/tagihan', {
            method: 'get'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            self.setState({
                tagihans: data
            })
        });
    }

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Tagihan Pembayaran</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Tagihan</strong>
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
                                <h5> <i className="fa fa-list "></i> List Tagihan Pembayaran</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label className="col-sm-3 col-form-label">Filter :</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" value={this.state.selectedStatus} onChange={(e) => this.setState({selectedStatus: e.target.value}) }>
                                                <option value="1">Sudah Bayar</option>
                                                <option value="0">Belum Bayar</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="col-sm-3 col-form-label">Cari :</label>
                                        <div className="col-sm-9">
                                            <input 
                                                type="text" 
                                                disabled="" 
                                                placeholder="Nama Mahasiswa"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>

                                <div className="table-responsive">
                                    <table className="table table-striped" align="right">
                                        <thead>
                                        <tr>
                                            <th>NO INVOICE</th>
                                            <th>NIM</th>
                                            <th>NAMA</th>
                                            <th>MASA</th>
                                            <th>NILAI</th>
                                            <th>STATUS</th>
                                            <th>AKSI</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.tagihans.filter((tagihan) => tagihan.status == this.state.selectedStatus).map((tagihan, key) =>
                                                <tr>
                                                    <td>{tagihan.invoice}</td>
                                                    <td>{tagihan.nim}</td>
                                                    <td>{tagihan.nama}</td>
                                                    <td>{tagihan.masa}</td>
                                                    <td>{tagihan.nilai}</td>
                                                    <td>
                                                        {
                                                            tagihan.status == 1 ?
                                                            <span className="badge badge-success">Sudah Bayar</span>
                                                            :
                                                            <span className="badge badge-danger">Belum Bayar</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-info btn-sm" 
                                                            type="button"
                                                            ><i className="fa fa-print"></i></button>               
                                                    </td>
                                                </tr>
                                            )
                                        }   
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Tagihan