import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'

class Pengumuman extends Component {
    
    constructor() {
        super()
        this.state = {
            tags: [],
            selectedMahasiswa: false,
            selectedDosen:false,
            selectedSemuaJurusan:'',
            selectedKelas:'',
            jurusans: [],
            pengumuman:[],
            kirimPengumuman:[],
            judulPengumuman:'',
            isiPengumuman:'',
            kelas:[]
        }
        this.handleKirim = this.handleKirim.bind(this)
    }

    componentDidMount(){
        const self = this
        fetch(BASE_URL + '/api/jurusan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                jurusans: data.results
            })
        });

        fetch(BASE_URL + '/api/pengumuman/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                pengumuman: data.results
            })
        });

        fetch(BASE_URL + '/api/kelas/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                kelas: data.results
            })
        });
    }

    handleKirim(key) {
        const self = this
        var jurusan = true;
        var jurusanSatu = '';
        var kelas = '';
        
        if (self.state.selectedJurusan==="0" || self.state.selectedJurusan==="") {
            jurusan=true;
            jurusanSatu=null;
        }
        else{
            jurusan=false;
            jurusanSatu=self.state.selectedJurusan;
        }

        if (self.state.selectedKelas==="0" || self.state.selectedKelas==="") {
            kelas=null;
        }
        else{
            kelas=self.state.selectedKelas;
        }

        var kirimPengumuman = {
            untuk_dosen:self.state.selectedDosen,
            untuk_mhs:self.state.selectedMahasiswa,
            untuk_semua_jurusan:jurusan,
            untuk_jurusan:jurusanSatu,
            untuk_kelas:kelas,
            judul:self.state.judulPengumuman,
            isi:self.state.isiPengumuman
        }
        console.log(JSON.stringify(kirimPengumuman))
        fetch(BASE_URL + '/api/pengumuman/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',     
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')             
            },
            body: JSON.stringify(kirimPengumuman)
          }).then(function(response) {
              console.log(response.status)
            if(response.status === 201 || response.status === 200){
                toastr.success("Pengumuman berhasil ditambahkan", "Sukses ! ")
                self.setState({
                    selectedMahasiswa: false,
                    selectedDosen:false,
                    selectedSemuaJurusan:'',
                    selectedKelas:'',
                    kirimPengumuman:[],
                    judulPengumuman:'',
                    isiPengumuman:'',
                })
                fetch(BASE_URL + '/api/pengumuman/', {
                    method: 'get',
                    headers: {
                        'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
                    }
                }).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    self.setState({
                        pengumuman: data.results
                    })
                });
            } else {
                toastr.error("Pengumuman gagal ditambahkan", "Error ! ")
                self.setState({
                    selectedMahasiswa: false,
                    selectedDosen:false,
                    selectedSemuaJurusan:'',
                    selectedKelas:'',
                    kirimPengumuman:[],
                    judulPengumuman:'',
                    isiPengumuman:'',
                })
            }
          }).then(function(data) {
        });
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Pengumuman Akademik</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pengumuman</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="tabs-container"><br/>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="active"><a className="nav-link" data-toggle="tab" href="#tab-1"> Buat Pengumuman</a></li>
                        <li><a className="nav-link" data-toggle="tab" href="#tab-2"> Daftar Pengumuman</a></li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" id="tab-1" className="tab-pane active">
                            <div className="panel-body">
                                <div className="ibox-content">
                                    <div className="form-group row">
                                        <div className="col-md-12"><input type="text" className="form-control" value={this.state.judulPengumuman} onChange={(e) => this.setState({judulPengumuman: e.target.value })} placeholder="Judul Pengumuman" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <textarea className="form-control" rows="10" value={this.state.isiPengumuman} onChange={(e) => this.setState({isiPengumuman: e.target.value })}></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-lg-2">
                                            <h5>Penerima : </h5>
                                        </div>
                                        <div>
                                            <div className="pretty p-switch p-fill">
                                                {
                                                    (this.state.selectedMahasiswa)?
                                                    <input type="checkbox" checked  onChange={(e) => this.setState({selectedMahasiswa: !this.state.selectedMahasiswa}) } />:
                                                    <input type="checkbox"  onChange={(e) => this.setState({selectedMahasiswa: !this.state.selectedMahasiswa}) } />
                                                }
                                                <div className="state">
                                                  <label>Mahasiswa</label>
                                                </div>
                                            </div>
                                            <div className="pretty p-switch p-fill">
                                                {
                                                    (this.state.selectedDosen)?
                                                    <input type="checkbox" checked onChange={(e) => this.setState({selectedDosen: !this.state.selectedDosen}) }  />:
                                                    <input type="checkbox" onChange={(e) => this.setState({selectedDosen: !this.state.selectedDosen}) }  />
                                                }
                                                <div className="state">
                                                  <label>Dosen</label>
                                                </div>
                                            </div>

                                        </div>

                                        <br/>
                                        {
                                            this.state.selectedMahasiswa ?
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label className="col-sm-2 col-form-label">Jurusan </label>
                                                    <div className="col-sm-8">
                                                        <select
                                                            value={this.state.selectedJurusan}
                                                            onChange={(e) => 
                                                                this.setState({selectedJurusan: e.target.value})} 
                                                            className="form-control">
                                                            <option value="">Pilih</option>
                                                            <option value="0">Semua Jurusan</option>
                                                            {
                                                                this.state.jurusans.map((jurusan, i) => 
                                                                    <option key={i} value={jurusan.id}>{jurusan.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {
                                                    (this.state.selectedJurusan === "0" || this.state.selectedJurusan === "" || this.state.selectedJurusan === undefined)? null:
                                                    <div className="col-lg-6">
                                                        <label className="col-sm-2 col-form-label">Kelas </label>
                                                        <div className="col-sm-8">
                                                            <select
                                                                value={this.state.selectedKelas}
                                                                onChange={(e) => 
                                                                    this.setState({selectedKelas: e.target.value})}
                                                                className="form-control">
                                                                <option value="">Pilih</option>
                                                                <option value="0">Semua Kelas</option>
                                                                {
                                                                    this.state.kelas.filter(kel => kel.jurusan == this.state.selectedJurusan).map((kelas, key) =>
                                                                        <option key={key} value={kelas.id}>Kelas {kelas.nama}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            : null
                                        }

                                            
                                    </div>
                                    <div className="hr-line-dashed"></div>
                                    <div className="form-group row">
                                        <button className="btn btn-primary btn-sm" onClick={this.handleKirim}>Kirim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" id="tab-2" className="tab-pane">
                            <div className="panel-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{'width': '4%'}}>No</th>
                                            <th style={{'width': '20%'}}>Judul</th>
                                            <th style={{'width': '40%'}}>Pengumuman</th>
                                            <th style={{'width': '10%'}}>Tanggal</th>
                                            <th style={{'width': '26%'}}>Penerima</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.pengumuman.filter(asal => asal.dari == 5).map((pengumuman, key) => 

                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{pengumuman.judul}</td>
                                            <td>{pengumuman.isi}</td>
                                            <td>{moment(pengumuman.create).format('D MMM YYYY')}</td>
                                            <td>
                                            {
                                                (pengumuman.untuk_dosen)? " Semua Dosen, ":null
                                            }{
                                                (pengumuman.untuk_semua_jurusan)? " Semua Jurusan, ":null
                                            }{
                                                (pengumuman.untuk_jurusan!==null)? " "+
                                                this.state.jurusans.find((jurus) => 
                                                (jurus.id == pengumuman.untuk_jurusan)).nama+", ":null
                                            }{
                                                (pengumuman.untuk_kelas!==null)? " Kelas "+
                                                this.state.kelas.find((kel) => 
                                                (kel.id == pengumuman.untuk_kelas)).nama+", ":null
                                            }
                                            </td>
                                        </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br/><br/><br/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Pengumuman