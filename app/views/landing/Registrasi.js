import React, { Component } from 'react';
import logo from '../../../public/assets/assets 1/img/laptop4.png'
import cookie from 'react-cookies';
import swal from 'sweetalert';
import { Link } from 'react-router';

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            jurusans: [],
            kampus: [],
            pendaftar: {},
            loading     : false,
        }
    }

    componentDidMount = () => {
        const self = this
        fetch('http://lpkn.itec.my.id:9000/api/jurusan/', {
            method: 'get'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                jurusans: data.results
            })
        });

        fetch('http://lpkn.itec.my.id:9000/api/kampus/', {
            method: 'get'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                kampus: data.results
            })
        });

    }
    
    handleSubmit = (event) => {
        const self = this
        self.setState({loading : true})
        event.preventDefault()
        console.log("babi " + JSON.stringify(self.state.pendaftar))
        fetch('http://lpkn.itec.my.id:9000/api/pendaftaran/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
            body: JSON.stringify(self.state.pendaftar)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log(data)
            if (data.non_field_errors == null) {
                self.setState({
                    loading: !self.state.loading,
                })
                toastr.success("Anda telah didaftarkan secara online", "Sukses ! ")
            }else{
                self.setState({
                    loading: !self.state.loading,
                })
                toastr.warning("Gagal mendaftar secara online", "Error ! ")
            }
        });

    }
    render() {
        return (
            <div className="passwordBox animated fadeInDown">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox-content">
                            <div>
                                <div className="text-center">
                                    <img src={logo} alt="laptop"/>
                                </div><br/>
                                <form onSubmit={this.handleSubmit}>
                                    
                                    <fieldset>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Nama Lengkap *</label>
                                                <input 
                                                    value={this.state.pendaftar.nama}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.nama = e.target.value
                                                        pendaftar.nama_ayah = "Muhram"
                                                        pendaftar.nama_ibu = "Siti Rochmiyati"
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="userName" 
                                                    name="userName" 
                                                    type="text" 
                                                    className="form-control required"
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Jenis Kelamin *</label>
                                                <select 
                                                    value={this.state.pendaftar.jenis_kelamin}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.jenis_kelamin = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="jenis_kelamin" 
                                                    name="jenis_kelamin" 
                                                    className="form-control required">
                                                    <option value="">Pilih Jenis Kelamin</option>
                                                    <option value="L">Laki - Laki</option>
                                                    <option value="P">Perempuan</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tgl Lahir *</label>
                                                <input 
                                                    value={this.state.pendaftar.tgl_lahir}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.tgl_lahir = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="tgl_lahir" 
                                                    name="tgl_lahir" 
                                                    type="date" 
                                                    className="form-control required"
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Agama *</label>
                                                 <select 
                                                    value={this.state.pendaftar.agama}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.agama = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="agama" 
                                                    name="agama" 
                                                    className="form-control required">
                                                    <option value="">Pilih Agama</option>
                                                    <option value="islam">Islam</option>
                                                    <option value="hindu">Hindu</option>
                                                    <option value="budha">Budha</option>
                                                    <option value="protestan">Protestan</option>
                                                    <option value="katolik">Katolik</option>
                                                    <option value="konghucu">Konghucu</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Jurusan *</label>
                                                <select 
                                                    value={this.state.pendaftar.jurusan}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.jurusan = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="jurusan" 
                                                    name="jurusan" 
                                                    className="form-control required">
                                                    <option value="">Pilih Jurusan</option>
                                                    {
                                                        this.state.jurusans.map((jurusan) => 
                                                            <option value={jurusan.id}>{jurusan.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Alamat *</label>
                                                <input 
                                                    value={this.state.pendaftar.alamat}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.alamat = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="alamat" 
                                                    name="alamat" 
                                                    type="text" 
                                                    className="form-control required"
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Email *</label>
                                                <input 
                                                    value={this.state.pendaftar.email}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.email = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="email" 
                                                    name="email" 
                                                    type="email" 
                                                    className="form-control required"
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Tmpt Lahir *</label>
                                                <input 
                                                    value={this.state.pendaftar.tempat_lahir}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.tempat_lahir = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="userName" 
                                                    name="userName" 
                                                    type="text" 
                                                    className="form-control required"
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>No Hp *</label>
                                                <input 
                                                    value={this.state.pendaftar.no_hp}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.no_hp = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="no_hp" 
                                                    name="no_hp" 
                                                    type="number" 
                                                    className="form-control required"
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Kampus *</label>
                                                <select 
                                                    value={this.state.pendaftar.kampus}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.kampus = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control required">
                                                    <option value="">Pilih Kampus</option>
                                                    {
                                                        this.state.kampus.map((kampus) => 
                                                            <option value={kampus.id}>{kampus.nama}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>

                                    <button type="submit" className="btn btn-primary block full-width m-b" type="submit">{ this.state.loading ? "Loading..." : "Daftar" }</button>
                          
                                    <p className="text-muted text-center"><small>Sudah punya akun ?</small></p>
                                    <Link to="login" className="btn btn-sm btn-white btn-block"> Login </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login