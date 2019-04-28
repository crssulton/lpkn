import React, { Component } from 'react';
import logo from '../../../public/assets/assets 1/img/laptop4.png'
import '../../../public/assets/assets 1/css/plugins/steps/jquery.steps.css'
import { Link } from 'react-router';

class Registrasi extends Component {

    constructor(props){
        super(props);
        this.state ={
            calon: [],
            alert: false,
            loading: false
        }
    }

    onChangeNama = e => {
        let calon = {...this.state.calon}
        calon.nama = e.target.value
        calon.tahun_angkatan = 2019
        calon.angkatan = 1
        this.setState({calon})
    }
    onChangeAlamat = e => {
        let calon = {...this.state.calon}
        calon.alamat = e.target.value
        this.setState({calon})
    }
    onChangeTempatLahir = e => {
        let calon = {...this.state.calon}
        calon.tempat_lahir = e.target.value
        this.setState({calon})
    }
    onChangeTglLahir = e => {
        let calon = {...this.state.calon}
        calon.tgl_lahir = e.target.value
        this.setState({calon})
    }
    onChangeJK = e => {
        let calon = {...this.state.calon}
        calon.jenis_kelamin = e.target.value
        this.setState({calon})
    }
    onChangeAgama = e => {
        let calon = {...this.state.calon}
        calon.agama = e.target.value
        this.setState({calon})
    }
    onChangeNoHp = e => {
        let calon = {...this.state.calon}
        calon.no_hp = e.target.value
        this.setState({calon})
    }
    onChangeEmail = e => {
        let calon = {...this.state.calon}
        calon.email = e.target.value
        this.setState({calon})
    }
    onChangeFacebook = e => {
        let calon = {...this.state.calon}
        calon.id_facebook = e.target.value
        this.setState({calon})
    }
    onChangeWhatsapp = e => {
        let calon = {...this.state.calon}
        calon.wa_or_line = e.target.value
        this.setState({calon})
    }
    onChangeAsalSekolah = e => {
        let calon = {...this.state.calon}
        calon.asal_sekolah = e.target.value
        this.setState({calon})
    }
    onChangeTahunTamat = e => {
        let calon = {...this.state.calon}
        calon.tahun_tamat = e.target.value
        this.setState({calon})
    }
    onChangeTinggiBadan = e => {
        let calon = {...this.state.calon}
        calon.tinggi_badan = e.target.value
        this.setState({calon})
    }
    onChangeBeratBadan = e => {
        let calon = {...this.state.calon}
        calon.berat_badan = e.target.value
        this.setState({calon})
    }
    onChangeNamaAyah = e => {
        let calon = {...this.state.calon}
        calon.nama_ayah = e.target.value
        this.setState({calon})
    }
    onChangePekerjaanAyah = e => {
        let calon = {...this.state.calon}
        calon.pekerjaan_ayah = e.target.value
        this.setState({calon})
    }
    onChangeNamaIbu = e => {
        let calon = {...this.state.calon}
        calon.nama_ibu = e.target.value
        this.setState({calon})
    }
    onChangePekerjaanIbu = e => {
        let calon = {...this.state.calon}
        calon.pekerjaan_ibu = e.target.value
        this.setState({calon})
    }
    onChangeAlamatWali = e => {
        let calon = {...this.state.calon}
        calon.alamat_wali = e.target.value
        this.setState({calon})
    }
    onChangeRencanaKerja = e => {
        let calon = {...this.state.calon}
        calon.rencana_kerja = e.target.value
        this.setState({calon})
    }
    onChangeRencanaKerjaLainnya = e => {
        let calon = {...this.state.calon}
        calon.rencana_kerja_lainnya = e.target.value
        this.setState({calon})
    }
    onChangeInformasiLPKN = e => {
        let calon = {...this.state.calon}
        calon.informasi_ttg_lpkn = e.target.value
        this.setState({calon})
    }
    onChangePesan = e => {
        let calon = {...this.state.calon}
        calon.pesan = e.target.value
        this.setState({calon})
    }
    onChangeJurusan = e => {
        let calon = {...this.state.calon}
        calon.jurusan = e.target.value
        this.setState({calon})
    }
    onChangeKampus = e => {
        let calon = {...this.state.calon}
        calon.kampus = e.target.value
        this.setState({calon})
    }

    handleResigtrasiCalon = (e) => {
        e.preventDefault()
        const self = this
        self.setState({
            loading: !this.state.loading
        })
        console.log(JSON.stringify(this.state.calon))
        fetch('http://lpkn.itec.my.id:9000/api/pendaftaran/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
            body: JSON.stringify(this.state.calon)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            self.setState({
                loading: !self.state.loading,
                alert: !self.state.alert
            })
        });
    }


    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight" style={{'marginTop' : '5%'}}>
                <div className="row">
                <div className="col-lg-12">
                    <div className="text-center">
                        <img src={logo} alt="laptop" style={{ 'marginBottom' : '3%'}}/>
                    </div><br/>
                    <div className="ibox">
                    {
                        this.state.alert?
                        <div className="ibox-content" style={{'margin' : '0 5%'}}>
                            <div className="alert alert-success" role="alert">
                              <h4 className="alert-heading">Terima Kasih!</h4>
                              <p>Pendaftaran online berhasil dilakukan, data anda telah tersimpan.</p>
                              <hr/>
                              <p className="mb-0">Silahkan menunggu proses selanjutnya ...</p>
                            </div>
                        </div>
                        :
                        <div className="ibox-content" style={{'margin' : '0 5%'}}>
                            <h2>
                                Pendaftaran Online Mahasiswa Baru
                            </h2>
                            <p>
                                Silahkan lengkapi formulir pendaftaran
                            </p>

                            <form id="form" className="wizard-big">
                                <h1>Data Diri</h1>
                                <fieldset>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Nama Lengkap *</label>
                                                <input 
                                                    id="userName" 
                                                    name="userName" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.nama}
                                                    onChange={this.onChangeNama}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Alamat *</label>
                                                <input 
                                                    id="alamat" 
                                                    name="alamat" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.alamat}
                                                    onChange={this.onChangeAlamat}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Tempat Lahir *</label>
                                                <input 
                                                    id="tempat_lahir" 
                                                    name="tempat_lahir" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.tempat_lahir}
                                                    onChange={this.onChangeTempatLahir}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Tgl Lahir *</label>
                                                <input 
                                                    id="tgl_lahir" 
                                                    name="tgl_lahir" 
                                                    type="date" 
                                                    className="form-control required"
                                                    value={this.state.calon.tgl_lahir}
                                                    onChange={this.onChangeTglLahir}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Jenis Kelamin *</label>
                                                <select 
                                                    onChange={this.onChangeJK} 
                                                    value={this.state.calon.jenis_kelamin} 
                                                    id="jenis_kelamin" 
                                                    name="jenis_kelamin" 
                                                    className="form-control required">
                                                    <option value="">Pilih Jenis Kelamin</option>
                                                    <option value="L">Laki - Laki</option>
                                                    <option value="P">Perempuan</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Agama *</label>
                                                 <select 
                                                    value={this.state.calon.agama}
                                                    onChange={this.onChangeAgama}
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
                                                <label>No Hp *</label>
                                                <input 
                                                    id="no_hp" 
                                                    name="no_hp" 
                                                    type="number" 
                                                    className="form-control required"
                                                    value={this.state.calon.no_hp}
                                                    onChange={this.onChangeNoHp}
                                                    />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Email *</label>
                                                <input 
                                                    id="email" 
                                                    name="email" 
                                                    type="email" 
                                                    className="form-control required"
                                                    value={this.state.calon.email}
                                                    onChange={this.onChangeEmail}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>ID Facebook *</label>
                                                <input 
                                                    id="id_facebook" 
                                                    name="id_facebook" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.id_facebook}
                                                    onChange={this.onChangeFacebook}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Whatsapp / Line *</label>
                                                <input 
                                                    id="wa_or_line" 
                                                    name="wa_or_line" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.wa_or_line}
                                                    onChange={this.onChangeWhatsapp}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Asal Sekolah *</label>
                                                <input 
                                                    id="asal_sekolah" 
                                                    name="asal_sekolah" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.asal_sekolah}
                                                    onChange={this.onChangeAsalSekolah}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Tahun Tamat *</label>
                                                <input 
                                                    id="tahun_tamat" 
                                                    name="tahun_tamat" 
                                                    type="number" 
                                                    className="form-control required"
                                                    value={this.state.calon.tahun_tamat}
                                                    onChange={this.onChangeTahunTamat}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Tinggi Badan *</label>
                                                <input 
                                                    id="tinggi_badan" 
                                                    name="tinggi_badan" 
                                                    type="number" 
                                                    className="form-control required"
                                                    value={this.state.calon.tinggi_badan}
                                                    onChange={this.onChangeTinggiBadan}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Berat Badan *</label>
                                                <input 
                                                    id="berat_badan" 
                                                    name="berat_badan" 
                                                    type="number" 
                                                    className="form-control required"
                                                    value={this.state.calon.berat_badan}
                                                    onChange={this.onChangeBeratBadan}
                                                    />
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>
                                <h1>Data Orang Tua & Wali</h1>
                                <fieldset>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Nama Ayah *</label>
                                                <input 
                                                    id="nama_ayah" 
                                                    name="nama_ayah" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.nama_ayah}
                                                    onChange={this.onChangeNamaAyah}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Pekerjaan Ayah *</label>
                                                <input 
                                                    id="pekerjaan_ayah" 
                                                    name="pekerjaan_ayah" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.pekerjaan_ayah}
                                                    onChange={this.onChangePekerjaanAyah}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Nama Ibu *</label>
                                                <input 
                                                    id="nama_ibu" 
                                                    name="nama_ibu" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.nama_ibu}
                                                    onChange={this.onChangeNamaIbu}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Pekerjaan Ibu *</label>
                                                <input 
                                                    id="pekerjaan_ibu" 
                                                    name="pekerjaan_ibu" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.pekerjaan_ibu}
                                                    onChange={this.onChangePekerjaanIbu}
                                                    />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Alamat Wali</label>
                                                <input 
                                                    id="alamat_wali" 
                                                    name="alamat_wali" 
                                                    type="text" 
                                                    className="form-control"
                                                    value={this.state.calon.alamat_wali}
                                                    onChange={this.onChangeAlamatWali}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <h1>Informasi Tambahan</h1>
                                <fieldset>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Rencana Kerja *</label>
                                                <select 
                                                    value={this.state.calon.rencana_kerja}
                                                    onChange={this.onChangeRencanaKerja}
                                                    id="rencana_kerja" 
                                                    name="rencana_kerja" 
                                                    className="form-control required">
                                                    <option value="">Pilih Rencana Kerja</option>
                                                    <option value="hotel/kapal pesiar">Bekerja di Hotel/Kapal Pesiar</option>
                                                    <option value="industri maskapai">Bekerja di Industri Maskapai</option>
                                                    <option value="bank/koperasi">Bekerja di Bank/Koperasi</option>
                                                    <option value="perkantoran">Bekerja di Perkantoran</option>
                                                    <option value="travel agent">Bekerja di Travel Agent</option>
                                                    <option value="pemerintahan">Bekerja di Pemerintahan</option>
                                                    <option value="industri retail">Bekerja di Industri Retail</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Rencana Kerja Lainnya *</label>
                                                <input 
                                                    id="rencana_kerja_lainnya" 
                                                    name="rencana_kerja_lainnya" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.rencana_kerja_lainnya}
                                                    onChange={this.onChangeRencanaKerjaLainnya}
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label>Informasi ttg LPKN *</label>
                                                <select 
                                                    value={this.state.calon.informasi_ttg_lpkn}
                                                    onChange={this.onChangeInformasiLPKN}
                                                    id="informasi_ttg_lpkn" 
                                                    name="informasi_ttg_lpkn" 
                                                    className="form-control required">
                                                    <option value="">Pilih</option>
                                                    <option value="google">Google</option>
                                                    <option value="facebook">Facebook</option>
                                                    <option value="instagram">Instagram</option>
                                                    <option value="koran">Koran</option>
                                                    <option value="twitter">Twitter</option>
                                                    <option value="radio">Radio</option>
                                                    <option value="brosur">Brosur</option>
                                                    <option value="spanduk">Spanduk</option>
                                                    <option value="info dari sekolah">Info dari Sekolah</option>
                                                    <option value="infor dari keluarga">Infor dari Keluarga</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Jurusan *</label>
                                                <select 
                                                    value={this.state.calon.jurusan}
                                                    onChange={this.onChangeJurusan}
                                                    id="jurusan" 
                                                    name="jurusan" 
                                                    className="form-control required">
                                                    <option value="">Pilih Jurusan</option>
                                                    <option value="1">Jurusan 1</option>
                                                    <option value="2">Jurusan 2</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Kampus *</label>
                                                <select 
                                                    value={this.state.calon.kampus}
                                                    onChange={this.onChangeKampus}
                                                    id="kampus" 
                                                    name="kampus" 
                                                    className="form-control required">
                                                    <option value="">Pilih Kampus</option>
                                                    <option value="1">Kampus 1</option>
                                                    <option value="2">Kampus 2</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Pesan *</label>
                                                <input 
                                                    id="pesan" 
                                                    name="pesan" 
                                                    type="text" 
                                                    className="form-control required"
                                                    value={this.state.calon.pesan}
                                                    onChange={this.onChangePesan}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <h1>Selesai</h1>
                                <fieldset >
                                    <h2>Silahkan periksa kembali data anda</h2>
                                    <table className="table">
                                        <tr>
                                            <td><b>Nama</b></td>
                                            <td> : {this.state.calon.nama}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Alamat</b></td>
                                            <td> : {this.state.calon.alamat}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Tempat Lahir</b></td>
                                            <td> : {this.state.calon.tempat_lahir}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Tanggal Lahir</b></td>
                                            <td> : {this.state.calon.tgl_lahir}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Jenis Kelamin</b></td>
                                            <td> : {this.state.calon.jenis_kelamin}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Agama</b></td>
                                            <td> : {this.state.calon.agama}</td>
                                        </tr>
                                        <tr>
                                            <td><b>No Hp</b></td>
                                            <td> : {this.state.calon.no_hp}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td> : {this.state.calon.email}</td>
                                        </tr>
                                        <tr>
                                            <td><b>ID Facebook</b></td>
                                            <td> : {this.state.calon.id_facebook}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Whatsapp/Line</b></td>
                                            <td> : {this.state.calon.wa_or_line}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Asal Sekolah</b></td>
                                            <td> : {this.state.calon.asal_sekolah}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Tahun Tamat</b></td>
                                            <td> : {this.state.calon.tahun_tamat}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Tinggi Badan</b></td>
                                            <td> : {this.state.calon.tinggi_badan}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Berat Badan</b></td>
                                            <td> : {this.state.calon.berat_badan}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Nama Ayah</b></td>
                                            <td> : {this.state.calon.nama_ayah}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Pekerjaan Ayah</b></td>
                                            <td> : {this.state.calon.pekerjaan_ayah}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Nama Ibu</b></td>
                                            <td> : {this.state.calon.nama_ibu}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Pekerjaan Ibu</b></td>
                                            <td> : {this.state.calon.pekerjaan_ibu}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Alamat Wali</b></td>
                                            <td> : {this.state.calon.alamat_wali}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Rencana Kerja</b></td>
                                            <td> : {this.state.calon.rencana_kerja}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Rencana Kerja Lainnya</b></td>
                                            <td> : {this.state.calon.rencana_kerja_lainnya}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Informasi LPKN</b></td>
                                            <td> : {this.state.calon.informasi_ttg_lpkn}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Jurusan</b></td>
                                            <td> : {this.state.calon.jurusan}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Kampus</b></td>
                                            <td> : {this.state.calon.kampus}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Pesan</b></td>
                                            <td> : {this.state.calon.pesan}</td>
                                        </tr>
                                    </table>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            {
                                                this.state.loading ?
                                                <div className="spiner-example">
                                                  <div className="sk-spinner sk-spinner-circle">
                                                      <div className="sk-circle1 sk-circle"></div>
                                                      <div className="sk-circle2 sk-circle"></div>
                                                      <div className="sk-circle3 sk-circle"></div>
                                                      <div className="sk-circle4 sk-circle"></div>
                                                      <div className="sk-circle5 sk-circle"></div>
                                                      <div className="sk-circle6 sk-circle"></div>
                                                      <div className="sk-circle7 sk-circle"></div>
                                                      <div className="sk-circle8 sk-circle"></div>
                                                      <div className="sk-circle9 sk-circle"></div>
                                                      <div className="sk-circle10 sk-circle"></div>
                                                      <div className="sk-circle11 sk-circle"></div>
                                                      <div className="sk-circle12 sk-circle"></div>
                                                  </div>
                                                </div>
                                                :
                                                <button 
                                                    onClick={this.handleResigtrasiCalon}
                                                    className="btn btn-primary" 
                                                    type="submit"
                                                    style={{'margin' : '3% auto', 'display' : 'block'}}
                                                    >Daftar</button>
                                            }
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    }
                    </div>
                    </div>

                </div>
           
            </div>
        )
    }

}

export default Registrasi