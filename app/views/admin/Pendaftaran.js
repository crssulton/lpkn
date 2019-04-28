import React, { Component } from 'react';
import { Link } from 'react-router';

class Pendaftaran extends Component {

    constructor(props){
        // window.location.reload();
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

        toastr.options = {
          "closeButton": true,
          "debug": false,
          "progressBar": true,
          "preventDuplicates": false,
          "positionClass": "toast-top-right",
          "onclick": null,
          "showDuration": "400",
          "hideDuration": "1000",
          "timeOut": "7000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
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
            toastr.error("Data mahasiswa gagal ditambahkan", "Error ! ")
          }).then(function(data) {
            console.log(data)
            if(data.non_field_errors != null) {
                toastr.error("Data mahasiswa gagal ditambahkan", "Error ! ")
            }else{
                self.setState({
                    loading: !self.state.loading,
                    alert: !self.state.alert
                })
                toastr.success("Data mahasiswa berhasil ditambahkan", "Sukses ! ")
            }
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title">
                                    <h5> <i className="fa fa-plus "></i> Pendaftaran Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="panel panel-primary">
                                                <div className="panel-heading">
                                                    DATA DIRI
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Nama Lengkap</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="userName" 
                                                                        name="userName" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.nama}
                                                                        onChange={this.onChangeNama}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Alamat</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="alamat" 
                                                                        name="alamat" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.alamat}
                                                                        onChange={this.onChangeAlamat}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Tempat Lahir</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="tempat_lahir" 
                                                                        name="tempat_lahir" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.tempat_lahir}
                                                                        onChange={this.onChangeTempatLahir}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Tanggal Lahir</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="tgl_lahir" 
                                                                        name="tgl_lahir" 
                                                                        type="date" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.tgl_lahir}
                                                                        onChange={this.onChangeTglLahir}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Jenis Kelamin</label>
                                                                <div className="col-sm-9">
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
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Agama</label>
                                                                <div className="col-sm-9">
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
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">No Hp</label>
                                                                <div className="col-sm-9">
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
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Email</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="email" 
                                                                        name="email" 
                                                                        type="email" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.email}
                                                                        onChange={this.onChangeEmail}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">ID Facebook</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="id_facebook" 
                                                                        name="id_facebook" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.id_facebook}
                                                                        onChange={this.onChangeFacebook}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Whatsapp / Line</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="wa_or_line" 
                                                                        name="wa_or_line" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.wa_or_line}
                                                                        onChange={this.onChangeWhatsapp}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Asal Sekolah</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="asal_sekolah" 
                                                                        name="asal_sekolah" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.asal_sekolah}
                                                                        onChange={this.onChangeAsalSekolah}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Tahun Tamat</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="tahun_tamat" 
                                                                        name="tahun_tamat" 
                                                                        type="number" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.tahun_tamat}
                                                                        onChange={this.onChangeTahunTamat}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Tinggi Badan</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="tinggi_badan" 
                                                                        name="tinggi_badan" 
                                                                        type="number" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.tinggi_badan}
                                                                        onChange={this.onChangeTinggiBadan}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Berat Badan</label>
                                                                <div className="col-sm-9">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="panel panel-primary">
                                                <div className="panel-heading">
                                                    DATA ORANG TUA
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Nama Ayah</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="nama_ayah" 
                                                                        name="nama_ayah" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.nama_ayah}
                                                                        onChange={this.onChangeNamaAyah}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Pekerjaan Ayah</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="pekerjaan_ayah" 
                                                                        name="pekerjaan_ayah" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.pekerjaan_ayah}
                                                                        onChange={this.onChangePekerjaanAyah}
                                                                        />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Nama Ibu</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="nama_ibu" 
                                                                        name="nama_ibu" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.nama_ibu}
                                                                        onChange={this.onChangeNamaIbu}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Pekerjaan Ibu</label>
                                                                <div className="col-sm-9">
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel panel-primary">
                                                <div className="panel-heading">
                                                    Data Wali
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Nama Wali</label>
                                                                <div className="col-sm-9">
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel panel-primary">
                                                <div className="panel-heading">
                                                    DATA TAMBAHAN
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Rencana kerja</label>
                                                                <div className="col-sm-9">
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
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Rencana kerja lainnya</label>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        id="rencana_kerja_lainnya" 
                                                                        name="rencana_kerja_lainnya" 
                                                                        type="text" 
                                                                        className="form-control required"
                                                                        value={this.state.calon.rencana_kerja_lainnya}
                                                                        onChange={this.onChangeRencanaKerjaLainnya}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Informasi ttg lpkn</label>
                                                                <div className="col-sm-9">
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
                                                            
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Jurusan</label>
                                                                <div className="col-sm-9">
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
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Kampus</label>
                                                                <div className="col-sm-9">
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
                                                            </div>
                                                            <div className="hr-line-dashed"></div>
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Pesan</label>
                                                                <div className="col-sm-9">
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel panel-primary">
                                                <div className="panel-heading">
                                                    Pembayaran
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group  row">
                                                                <label className="col-sm-3 col-form-label">Bayar Diawal</label>
                                                                <div className="col-sm-9">
                                                                    <div className="form-check">
                                                                      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                                                                      <label className="form-check-label" for="exampleRadios1" style={{'margin':'0 20px'}}>
                                                                        Ya
                                                                      </label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                                                                      <label className="form-check-label" for="exampleRadios2" style={{'margin':'0 20px'}}>
                                                                        Tidak
                                                                      </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Pendaftaran