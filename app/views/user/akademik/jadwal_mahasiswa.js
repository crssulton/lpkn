import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'

class Jadwal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            jadwals: [],
            kelas: [],
            jurusan: [],
            matkuls: [],
            ruangan: [],
            dosens: [],
            kelas: [],
            jadwalBaru: {},
            selectedJurusan: null,
            selectedKelas: null,
            mahaMahasiswa: [],
            eventSelected: null,
            selectedJurusan: "",
            selectedMatkul: "",
            months: [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
                'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            days: [
                {day: 'Sunday', hari: 'Minggu'},
                {day: 'Monday', hari: 'Senin'},
                {day: 'Tuesday', hari: 'Selasa'},
                {day: 'Wednesday', hari: 'Rabu'},
                {day: 'Thursday', hari: 'Kamis'},
                {day: 'Friday', hari: 'Jum' + "'" + 'at'},
                {day: 'Saturday', hari: 'Sabtu'}],
        }
    }

    componentDidMount() {
        const self = this;
        let kampus_id = window.sessionStorage.getItem('kampus_id');
        fetch(BASE_URL + '/api/jadwal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                jadwals: data.results
            })
        });

        fetch(BASE_URL + '/api/jurusan', {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                jurusan: data.results.filter(item => item.kampus == kampus_id)
            })
        });

        fetch(BASE_URL + '/api/dosen/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                dosens: data.results
            })
        });

        fetch(BASE_URL + '/api/kelas/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                kelas: data.results
            })
        });

        fetch(BASE_URL + '/api/ruangan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                ruangan: data.results
            })
        });

    }

    onChangeMatkul = (e) => {
        const self = this
        let value = e.target.value
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru

        let id = value

        fetch(BASE_URL + `/api/absensi/?matkulid=${id}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.results.length != 0) {
                jadwalBaru.mata_kuliah = value
                self.setState({
                    jadwalBaru,
                    selectedMatkul: value
                })

                if(jadwalBaru.kelas != null && jadwalBaru.kelas != undefined){
                    self.getDosen();
                }
            } else {
                swal({
                    icon: 'warning',
                    title: 'Mata Kuliah Belum Dibuatkan Absensi !'
                })

                jadwalBaru.mata_kuliah = ""
                jadwalBaru.dosen = ""
                self.setState({
                    jadwalBaru,
                    selectedMatkul: null
                })
            }
        });

    }

    onChangeJamMulai = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.jam_mulai = moment(e.target.value, "h:mm A").format("HH:mm")
        this.setState({jadwalBaru})
    }

    onChangeJadwal = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.start = e.target.value
        this.setState({jadwalBaru})
    }

    onChangeJamSelesai = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.jam_selesai = moment(e.target.value, "h:mm A").format("HH:mm")
        this.setState({jadwalBaru})
    }

    onChangeUjian = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.ujian = e.target.value
        this.setState({jadwalBaru})
    }

    onChangeKelas = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.kelas = e.target.value
        this.setState({
            jadwalBaru
        }, () => this.getDosen())
    }

    onChangeDosen = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.dosen = e.target.value
        this.setState({jadwalBaru})
    }
    onChangeJurusan = (e) => {
        const self = this

        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.jurusan = e.target.value
        this.setState({
            jadwalBaru,
            selectedJurusan: e.target.value
        }, () => {
            self.getMatkul()
        })
    };

    onChangeRuangan = (e) => {
        let jadwalBaru;
        jadwalBaru = this.state.jadwalBaru;
        jadwalBaru.ruangan = e.target.value;
        jadwalBaru.ujian = false;
        this.setState({jadwalBaru})
    };

    onChangeRuangan = (e) => {
        let jadwalBaru
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.ruangan = e.target.value
        jadwalBaru.ujian = false
        jadwalBaru.tahun_angkatan = moment(new Date()).format("YYYY")
        this.setState({jadwalBaru})
    };

    getKelas = () => {
        const self = this
        fetch(BASE_URL + '/api/kelas/?jurusan=' + this.state.selectedJurusan, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                kelas: data.results
            })
        });
    }

    getDosen = () => {
        const self = this
        fetch(BASE_URL + `/api/absensi/?matkulid=${this.state.jadwalBaru.mata_kuliah}&kelas=${this.state.jadwalBaru.kelas}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            let jadwalBaru = self.state.jadwalBaru;

            jadwalBaru.dosen = data.results.find(x => x.mata_kuliah == jadwalBaru.mata_kuliah && x.kelas == jadwalBaru.kelas).dosen
            self.setState({
                jadwalBaru
            })
        });
    };

    getMatkul = () => {
        const self = this
        fetch(BASE_URL + `/api/mata-kuliah/?jurusan=${this.state.jadwalBaru.jurusan}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                matkuls: data.results
            })
        });
    }

    editJadwal = () => {
        const self = this
        let jadwalBaru = this.state.jadwalBaru;
        let jadwals    = this.state.jadwals;
        fetch(BASE_URL + '/api/jadwal/' + jadwalBaru.id + '/', {
            method: 'patch',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(jadwalBaru)
        }).then(function (response) {
            if (response.status === 200) {
                self.broadcastJadwal(jadwalBaru);
            }
            return response.json()
        }).then(function (data) {
            // console.log(data)
            if (data.id != null && data.id != undefined) {
                for (let i = 0; i < jadwals.length; i++) {
                    if (jadwals[i].id == jadwalBaru.id) jadwals[i] = data
                }
                self.setState({jadwals});
            }
        })

    }

    broadcastJadwal = (jadwalBaru) => {
        const self = this;
        const kirimPengumuman = {
            untuk_dosen: true,
            untuk_mhs: true,
            untuk_semua_jurusan: false,
            untuk_jurusan: jadwalBaru.jurusan,
            untuk_kelas: jadwalBaru.kelas,
            judul: "Perubahan Jadwal " + jadwalBaru.title,
            isi: "Perubahan jadwal untuk mata kuliah "
              + jadwalBaru.title + " yaitu pada hari " + this.state.days.find((dy) => (dy.day == moment(jadwalBaru.start).format('dddd'))).hari + " tanggal " + moment(jadwalBaru.start).format('DD-MM-YYYY')
              + " mulai pukul " + jadwalBaru.jam_mulai + " sampai " + jadwalBaru.jam_selesai + " di ruangan " + this.state.ruangan.find(data => data.id == jadwalBaru.ruangan).nama
        }

        fetch(BASE_URL + '/api/pengumuman/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(kirimPengumuman)
        }).then(function (response) {
            if (response.status === 201 || response.status === 200) {
                toastr.success('Jadwal berhasil diubah', 'Sukses ! ')

            } else {
                toastr.error('Jadwal gagal diubah', 'Error ! ')
            }
        }).then(function (data) {
        })
    }

    deleteJadwal = (id) => {
        const self = this;
        swal({
            title: "Hapus Jadwal ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
          .then((willDelete) => {
              if (willDelete) {
                  fetch(BASE_URL + '/api/jadwal/' + id, {
                      method: 'delete',
                      headers: {
                          'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
                      }
                  }).then(function (response) {
                      if (response.status == 204) {
                          self.setState({
                              jadwals: self.state.jadwals.filter(jadwal => jadwal.id != id)
                          })
                          toastr.success("Jadwal berhasil dihapus", "Sukses ! ")
                      } else {
                          toastr.warning("Jadwal gagal dihapus", "Gagal ! ")
                      }
                  }).then(function (data) {

                  });
              }
          });
    }

    exportData() {
        printJS({
            printable: "print_data",
            type: "html",
            modalMessage: "Sedang memuat data...",
            showModal: true,
            maxWidth: "1300",
            font: "TimesNewRoman",
            targetStyles: ["*"]
        });
    }

    render() {
        return (
          <div>
              <div className="row wrapper border-bottom white-bg page-heading">
                  <div className="col-lg-8">
                      <h2>Jadwal Mahasiswa</h2>
                      <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                              Dashboard
                          </li>
                          <li className="breadcrumb-item active">
                              <strong>List Jadwal Mahasiswa</strong>
                          </li>
                      </ol>
                  </div>
                  <div className="col-lg-4">
                      <div className="title-action">
                          <a onClick={() => this.exportData()} className="btn btn-primary"><i
                            className="fa fa-print"></i> Cetak </a>
                      </div>
                  </div>
              </div>
              <div className="wrapper wrapper-content">
                  <div className="row animated fadeInRight">
                      <div className="col-lg-12">
                          <div className="ibox ">
                              <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                  <h5><i className="fa fa-list "></i> Jadwal</h5>
                              </div>
                              <div className="ibox-content">
                                  <div className="col-lg-12">
                                      <label className="col-sm-1 col-form-label">Jurusan</label>
                                      <div className="col-sm-4">
                                          <select
                                            value={this.state.selectedJurusan}
                                            onChange={(e) => {
                                                this.setState({
                                                    selectedJurusan: e.target.value
                                                }, () => {
                                                    this.getKelas()
                                                })
                                            }}
                                            className="form-control">
                                              <option>Pilih Jurusan</option>
                                              {
                                                  this.state.jurusan.map((jurusan, key) =>
                                                    <option key={key} value={jurusan.id}>{jurusan.nama}</option>
                                                  )
                                              }
                                          </select>
                                      </div>

                                      <label className="col-sm-1 col-form-label">Kelas</label>
                                      <div className="col-sm-4">
                                          <select
                                            value={this.state.selectedKelas}
                                            onChange={(e) => this.setState({selectedKelas: e.target.value})}
                                            className="form-control">
                                              <option>Pilih Kelas</option>
                                              {
                                                  this.state.kelas.map((kelas, key) =>
                                                    <option key={key} value={kelas.id}>{kelas.nama} | Angkatan- {kelas.angkatan_info.angkatan}</option>
                                                  )
                                              }
                                          </select>
                                      </div>

                                  </div>

                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  {
                                      this.state.loading ?
                                        <div className="spiner-example">
                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                <div className="sk-double-bounce1"></div>
                                                <div className="sk-double-bounce2"></div>
                                            </div>
                                        </div> :

                                        <div id="print_data">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>HARI</th>
                                                    <th>TANGGAL</th>
                                                    <th>MATA KULIAH</th>
                                                    <th>KELAS</th>
                                                    <th>RUANGAN</th>
                                                    <th>WAKTU</th>
                                                    <th>TRAINER</th>
                                                    <th>AKSI</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {
                                                    this.state.jadwals.filter(data => data.jurusan == this.state.selectedJurusan && data.kelas == this.state.selectedKelas)
                                                      .map((jadwal, key) =>
                                                        <tr key={key}>
                                                            <th>{this.state.days.find((dy) => (dy.day == moment(jadwal.start).format('dddd'))).hari}</th>
                                                            <td>{moment(jadwal.start).format('D MMM YYYY')}</td>
                                                            <td>{jadwal.title}</td>
                                                            <td>{jadwal.kelas_info.nama}</td>
                                                            <td>{jadwal.ruangan_info.nama}</td>
                                                            <td>{jadwal.jam_mulai + " - " + jadwal.jam_selesai}</td>
                                                            <td>{jadwal.dosen_info.nama}</td>
                                                            <td>
                                                                <center>
                                                                    <button
                                                                      style={{margin: "0 5px"}}
                                                                      className="btn btn-info btn-sm"
                                                                      type="button"
                                                                      onClick={() => {
                                                                          this.setState({
                                                                              jadwalBaru: jadwal
                                                                          }, () => {
                                                                              this.getMatkul()
                                                                              this.getDosen()
                                                                              $('#ModalEditJadwal').modal('show')
                                                                          });
                                                                      }}
                                                                    >
                                                                        <i className="fa fa-edit"/>
                                                                    </button>

                                                                    <button
                                                                      onClick={() =>
                                                                        this.deleteJadwal(jadwal.id)
                                                                      }
                                                                      className="btn btn-danger btn-sm"
                                                                      type="button"
                                                                    >
                                                                        <i className="fa fa-trash"/>
                                                                    </button>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                      )
                                                }

                                                </tbody>
                                            </table>
                                        </div>

                                  }
                              </div>
                          </div>
                      </div>

                  </div>
              </div>

              {/*Modal Edit Jadwal*/}
              <div id="ModalEditJadwal" className="modal fade">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal"><span
                                aria-hidden="true">×</span> <span className="sr-only">close</span></button>
                              <h4 id="modalTitle" className="modal-title">Detail Mata Kuliah</h4>
                          </div>
                          <div className="modal-body">
                              <div>
                                  {
                                      this.state.jadwalBaru != null ?
                                        <div>
                                            <div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Jurusan</label>
                                                    <div className="col-lg-10">
                                                        <select
                                                          onChange={this.onChangeJurusan}
                                                          value={this.state.jadwalBaru.jurusan}
                                                          className="form-control">
                                                            <option value="">Pilih Jurusan</option>
                                                            {
                                                                this.state.jurusan.map((jurusan, key) =>
                                                                  <option key={key}
                                                                          value={jurusan.id}>{jurusan.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Mata Kuliah</label>
                                                    <div className="col-lg-10">
                                                        <select id="namaMatkul" className="form-control m-b"
                                                                name="account" value={this.state.jadwalBaru.mata_kuliah}
                                                                onChange={this.onChangeMatkul}>
                                                            <option>Pilih Mata Kuliah</option>
                                                            {
                                                                this.state.matkuls.map((matkul, key) =>
                                                                  <option key={key}
                                                                          value={matkul.id}>{matkul.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Kelas</label>
                                                    <div className="col-lg-10">
                                                        <select
                                                          onChange={this.onChangeKelas}
                                                          className="form-control"
                                                          value={this.state.jadwalBaru.kelas}
                                                        >
                                                            <option value="">Pilih Kelas</option>
                                                            {
                                                                this.state.kelas.filter(data => data.jurusan_info.id == this.state.jadwalBaru.jurusan).map((kelas, key) =>
                                                                  <option key={key} value={kelas.id}>{kelas.nama} |
                                                                      Angkatan - {kelas.angkatan}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Tanggal</label>
                                                    <div className="col-lg-10">
                                                        <input onChange={this.onChangeJadwal}
                                                               value={this.state.jadwalBaru.start} type="date"
                                                               className="form-control m-b" name="account"/>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Jam Mulai</label>
                                                    <div className="col-lg-10">
                                                        <input onChange={this.onChangeJamMulai}
                                                               value={this.state.jadwalBaru.jam_mulai} type="time"
                                                               className="form-control m-b" name="account"/>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Jam Selesai</label>
                                                    <div className="col-lg-10">
                                                        <input onChange={this.onChangeJamSelesai}
                                                               value={this.state.jadwalBaru.jam_selesai} type="time"
                                                               className="form-control m-b" name="account"/>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Ruang</label>
                                                    <div className="col-lg-10">
                                                        <select value={this.state.jadwalBaru.ruangan}
                                                                onChange={this.onChangeRuangan}
                                                                value={this.state.jadwalBaru.ruangan}
                                                                className="form-control m-b" name="account">
                                                            <option>Pilih Ruangan</option>
                                                            {
                                                                this.state.ruangan.map((ruangan, key) =>
                                                                  <option key={key}
                                                                          value={ruangan.id}>{ruangan.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row"><label
                                                  className="col-lg-2 col-form-label">Trainer</label>
                                                    <div className="col-lg-10">
                                                        <select
                                                          value={this.state.jadwalBaru.dosen}
                                                          onChange={this.onChangeDosen}
                                                          disabled="disabled"
                                                          className="form-control m-b"
                                                          name="account">
                                                            <option>Pilih Trainer</option>
                                                            {
                                                                this.state.dosens.map((dosen, key) =>
                                                                  <option key={key}
                                                                          value={dosen.id}>{dosen.nama}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        :
                                        null
                                  }

                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Tutup</button>
                              <button onClick={this.editJadwal} type="button" className="btn btn-primary"
                                      data-dismiss="modal">Simpan
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

          </div>


        )
    }

}

export default Jadwal