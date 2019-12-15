import React, {Component} from 'react';
import {Link} from 'react-router';
import {BASE_URL} from '../../config/config.js'
import TopHeader from '../../components/common/TopHeaderLanding'
import '../../../public/assets/assets 1/css/landing.css'

class Registrasi extends Component {
  constructor(props){
    super(props);
    this.state ={
        jurusans: [],
        kampus: [],
        pendaftar: {},
        loading     : false,
        alert: false
    }
  }

  componentDidMount = () => {
    const self = this
    fetch(BASE_URL + '/api/jurusan/', {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        self.setState({
            jurusans: data.results
        })
    });

    fetch(BASE_URL + '/api/kampus/', {
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

    let pendaftar = {...this.state.pendaftar}
    pendaftar.online_register = true

    fetch(BASE_URL + '/api/pendaftaran/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(self.state.pendaftar)
      }).then(function(response) {
        if (response.status == 201) {

            let nama = pendaftar.nama;
            swal({
                icon: 'success',
                title: `Selamat ${nama}, anda telah terdaftar !`,
                text: 'Silahkan menunggu proses selanjutnya dari LPKN'
            });
            pendaftar.nama = null;
            pendaftar.alamat = null;
            pendaftar.tempat_lahir = null;
            pendaftar.asal_sekolah = null;
            pendaftar.no_hp = null;


            self.setState({
                pendaftar,
                loading: !self.state.loading,
            })
        }else{
            self.setState({
                loading: !self.state.loading,
            });
            swal({
                icon: 'warning',
                title: 'Gagal mendaftar secara online !'
            })
        }
      }).then(function(data) {

    });
  }
  render() {
    return (
        <div className="">
            <TopHeader/>
            <div className="bgColor">
                <div className="passwordBox">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ibox-content">
                                <div>
                                    <br/>
                                    <h2 className="text-primary" style={{textAlign: 'center'}}>Registrasi Mahasiswa</h2>
                                    <br/>
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <div className="form-group">
                                                <label>Nama Lengkap <small style={{color: 'red'}}>*</small></label>
                                                <input
                                                    value={this.state.pendaftar.nama}
                                                    onChange={(e) => {
                                                        let pendaftar = []
                                                        pendaftar = this.state.pendaftar
                                                        pendaftar.nama = e.target.value
                                                        this.setState({pendaftar})
                                                    }}
                                                    id="userName"
                                                    name="userName"
                                                    type="text"
                                                    className="form-control required"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Jenis Kelamin <small style={{color: 'red'}}>*</small>
                                                        </label>
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
                                                        <label>Sekolah Asal <small style={{color: 'red'}}>*</small>
                                                        </label>
                                                        <input
                                                            value={this.state.pendaftar.asal_sekolah}
                                                            onChange={(e) => {
                                                                let pendaftar = []
                                                                pendaftar = this.state.pendaftar
                                                                pendaftar.asal_sekolah = e.target.value
                                                                this.setState({pendaftar})
                                                            }}
                                                            id="asal_sekolah"
                                                            name="asal_sekolah"
                                                            type="text"
                                                            className="form-control required"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Alamat <small style={{color: 'red'}}>*</small></label>
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
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Tempat Lahir <small style={{color: 'red'}}>*</small>
                                                        </label>
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
                                                        <label>Nomor Telefon <small style={{color: 'red'}}>*</small>
                                                        </label>
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
                                                        <label>Kampus <small style={{color: 'red'}}>*</small></label>
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
                                                                this.state.kampus.map((kampus, i) =>
                                                                    <option key={i}
                                                                            value={kampus.id}>{kampus.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Jurusan <small style={{color: 'red'}}>*</small></label>
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
                                                                this.state.jurusans.filter(x => x.kampus == this.state.pendaftar.kampus).map((jurusan, i) =>
                                                                    <option key={i}
                                                                            value={jurusan.id}>{jurusan.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                        </fieldset>

                                        <button type="submit" className="btn btn-primary block full-width m-b"
                                                type="submit">{this.state.loading ? "Loading..." : "DAFTAR"}</button>

                                        <p className="text-muted text-center">Sudah Terdaftar Sebagai Mahasiswa ?</p>
                                        <Link to="login" className="btn btn-sm btn-white btn-block"> MASUK </Link>
                                    </form>
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


export default Registrasi