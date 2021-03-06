import React, { Component } from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookies'; 

class Absen extends Component {
    constructor(props) {
        super(props);
        $('#fullCalModal').modal('hide');
        this.state = {
            mahasiswas: [],
        }
    }


    componentDidMount(){
        const self = this
        fetch('http://lpkn.itec.my.id:9000/api/mahasiswa/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJha2FkZW1pazEiLCJleHAiOjE1NTQwNTE1NTQsImVtYWlsIjoiIn0.RLsFF9gIEey-OFI3O5RViJKXWGS5sFtVelS7gm4MqHc'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            self.setState({
                mahasiswas: data.results,
            })
        });
    }

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Absen Mahasiswa</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/main">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Absen Mahasiswa</strong>
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
                                    <h5>Daftar Absensi Mahasiswa </h5>
                                </div>
                                <div className="ibox-content">
                                    
                                    <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>NO.</th>
                                                    <th>NIM</th>
                                                    <th>NAMA</th>
                                                    <th>JURUSAN</th>                                                    
                                                    <th style={{'textAlign': 'center'}}>AKSI</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.mahasiswas.filter(mahasiswa => mahasiswa.calon == false).map((mahasiswa, key) => 

                                                        <tr>
                                                            <td>{key+1}</td>
                                                            <td>{mahasiswa.nim}</td>
                                                            <td>{mahasiswa.nama}</td>
                                                            <td>{mahasiswa.jurusan}</td>
                                                            <td>
                                                                <center>
                                                                    <select className="form-control m-b" name="account">
                                                                        <option>Hadir</option>
                                                                        <option>Tidak Hadir</option>
                                                                    </select>
                                                                </center>
                                                            </td>

                                                        </tr>

                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>

                                    <div className="row">
                                        
                                        <div className="col-lg-12">
                                            <Link to="/bap" className="btn btn-sm btn-warning block full-width"> Isi Berita Acara </Link>
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

export default Absen