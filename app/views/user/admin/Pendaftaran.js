import React, { Component } from 'react';
import {BASE_URL} from '../../../config/config.js'

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
        fetch(BASE_URL + '/api/pendaftaran/', {
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
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                Welcome in INSPINIA ReactJS Seed Project
                            </h1>
                            <small>
                                It is an application skeleton for a typical web app. You can use it to quickly bootstrap your webapp projects.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Pendaftaran