import React, {Component} from 'react';
import $ from 'jquery'
import FullCalendar from 'fullcalendar-reactwrapper';
import moment from 'moment'
import {BASE_URL} from '../../../config/config.js'
import swal from 'sweetalert';

class Jadwal extends Component {
    constructor(props) {
        super(props);
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var mm = String(m + 1);
        if (mm.length == 1) {
            mm = '0' + mm;
        }
        var today = y + '-' + mm + '-' + d;
        this.state = {
            today: today,
            events: [],
            jadwalBaru: {},
            tmpDate: '',
            title: '',
            loading: true,
            idJadwalSelected: null,
            matkuls: [],
            ruangan: [],
            dosens: [],
            eventSelected: {},
            jurusans: [],
            listDay: [],
            absensi: [],
            kelas: [],
            selectedJurusan: "",
            selectedMatkul: ""
        }
    }

    componentDidMount() {
        const self = this
        fetch(BASE_URL + '/api/jadwal/?all=1', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                events: data.results,
                loading: false
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

        fetch(BASE_URL + '/api/jurusan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                jurusans: data.results
            })
        });

    }

    getKelas = () => {
        const self = this
        fetch(BASE_URL + '/api/absensi/?matkul=' + this.state.selectedMatkul, {
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
    };

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
            let jadwalBaru = self.state.jadwalBaru
            jadwalBaru.dosen = data.results.find(x => x.mata_kuliah == self.state.jadwalBaru.mata_kuliah && x.kelas == self.state.jadwalBaru.kelas).dosen;
            self.setState({
                jadwalBaru
            })
        });
    };

    addJadwal = () => {
        const self      = this;
        let toggle      = 0;
        let bentrok     = false;
        let addButton   = document.getElementsByClassName("btn-add");
        addButton[0].setAttribute("disabled", "disabled");
        
        this.state.events.map(item => {
            self.state.listDay.map(day => {
                if (item.start == moment(day).format('YYYY-MM-DD') && item.jam_mulai.substr(0, 5) == self.state.jadwalBaru.jam_mulai && item.ruangan == self.state.jadwalBaru.ruangan){
                    swal({
                      icon: 'warning',
                      text: `Jadwal Bentrok! Terdapat Mata Kuliah ${item.title} pada tgl ${moment(day).format('DD/MM/YYYY')} pukul ${item.jam_mulai.substr(0, 5)} di ${item.ruangan_info.nama}`
                    });
                    addButton[0].removeAttribute("disabled");
                    bentrok = true;
                    return;
                }
            })
        });

        if (!bentrok)
        this.state.listDay.map(data => {
            let jadwalBaru = {};
            let newJadwal = {};
            jadwalBaru = this.state.jadwalBaru;
            jadwalBaru.title = $("#namaMatkul option:selected").text();
            jadwalBaru.start = moment(data).format('YYYY-MM-DD');
            newJadwal.title = $("#namaMatkul option:selected").text();
            newJadwal.start = moment(data).format('YYYY-MM-DD');
            newJadwal.jam_mulai = jadwalBaru.jam_mulai;
            newJadwal.ruangan = jadwalBaru.ruangan;

            fetch(BASE_URL + '/api/jadwal/', {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(self.state.jadwalBaru)
            }).then(function (response) {
                if (response.status == 400 || response.status == 500) {
                    toastr.warning("Jadwal gagal ditambahkan", "Gagal ! ")
                    addButton[0].removeAttribute("disabled")
                } else {
                    toggle += 1;
                    let events = {...self.state.events}
                    let jadwalBaru = {...self.state.jadwalBaru}
                    events = Object.assign([], events)

                    jadwalBaru.jam_mulai = null
                    jadwalBaru.jam_selesai = null

                    events.push(newJadwal);

                    self.setState({
                        events,
                        jadwalBaru
                    })

                    if (toggle == self.state.listDay.length) {
                        self.setState({listDay: []})
                        toastr.success("Jadwal berhasil ditambahkan", "Sukses ! ")
                        addButton[0].removeAttribute("disabled")

                    }

                }
            }).then(function (data) {

            })

        })
    }

    deleteJadwal = () => {
        const self = this
        // let index = self.state.events.map(function (event) { return event.id; }).indexOf(self.state.idJadwalSelected);
        swal({
            title: "Hapus Jadwal ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
          .then((willDelete) => {
              if (willDelete) {
                  fetch(BASE_URL + '/api/jadwal/' + self.state.idJadwalSelected, {
                      method: 'delete',
                      headers: {
                          'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
                      }
                  }).then(function (response) {
                      if (response.status == 204) {
                          self.setState({
                              events: self.state.events.filter(jadwal => jadwal.id != self.state.idJadwalSelected)
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
            }, () => {
                self.getKelas();
            })
        });
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
            self.getMatkul();
        })
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
            } else {
                swal({
                    icon: 'warning',
                    title: 'Mata Kuliah Belum Dibuatkan Absensi !'
                })

                jadwalBaru.mata_kuliah = ""
                jadwalBaru.kelas = ""
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

    onChangeRuangan = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.ruangan = e.target.value
        jadwalBaru.ujian = false
        this.setState({jadwalBaru})
    }
    onChangeRuangan = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.ruangan = e.target.value
        jadwalBaru.ujian = false
        jadwalBaru.start = this.state.listDay
        jadwalBaru.tahun_angkatan = moment(new Date()).format("YYYY")
        this.setState({jadwalBaru})
    }

    deleteListDay = (key) => {
        let listDay = [];
        listDay = this.state.listDay;
        listDay = listDay.filter((item, index) => index != key);
        this.setState({listDay});
    }


    render() {
        return (
          <div>
              <div className="row wrapper border-bottom white-bg page-heading">
                  <div className="col-lg-10">
                      <h2>Jadwal Perkuliahan</h2>
                      <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                              Dashboard
                          </li>
                          <li className="breadcrumb-item active">
                              <strong>Jadwal</strong>
                          </li>
                      </ol>
                  </div>
                  <div className="col-lg-2">
                  </div>
              </div>
              <div className="wrapper wrapper-content">
                  <div className="row animated">
                      <div className="col-lg-4">
                          <div className="ibox ">
                              <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                  <h5>Input Jadwal</h5>
                              </div>
                              <div className="ibox-content">
                                  <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Jurusan</label>
                                      <div className="col-lg-10">
                                          <select
                                            onChange={this.onChangeJurusan}
                                            value={this.state.jadwalBaru.jurusan}
                                            className="form-control">
                                              <option value="">Pilih Jurusan</option>
                                              {
                                                  this.state.jurusans.map((jurusan, key) =>
                                                    <option key={key} value={jurusan.id}>{jurusan.nama}</option>
                                                  )
                                              }
                                          </select>
                                      </div>
                                  </div>
                                  <div className="form-group row"><label className="col-lg-2 col-form-label">Mata
                                      Kuliah</label>
                                      <div className="col-lg-10">
                                          <select id="namaMatkul" className="form-control m-b"
                                                  value={this.state.jadwalBaru.mata_kuliah} name="account"
                                                  onChange={this.onChangeMatkul}>
                                              <option value="">Pilih Mata Kuliah</option>
                                              {
                                                  this.state.matkuls.map((matkul, key) =>
                                                    <option key={key} value={matkul.id}>{matkul.nama}</option>
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
                                                  this.state.kelas.filter(data => data.mata_kuliah == this.state.selectedMatkul).map((kelas, key) =>
                                                    <option key={key} value={kelas.kelas_info.id}>{kelas.kelas_info.nama}</option>
                                                  )
                                              }
                                          </select>
                                      </div>
                                  </div>
                                  <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Tanggal</label>
                                      <div className="col-lg-10">
                                          {
                                              this.state.listDay.map((date, key) =>
                                                <span key={key} onClick={() => this.deleteListDay(key)}
                                                      style={{'margin': '2px 6px', 'cursor': 'pointer'}}
                                                      className="badge badge-info">{moment(date).format('DD-MM-YYYY')}</span>
                                              )
                                          }
                                      </div>
                                  </div>
                                  <div className="form-group row"><label className="col-lg-2 col-form-label">Jam
                                      Mulai</label>
                                      <div className="col-lg-10">
                                          <input onChange={this.onChangeJamMulai}
                                                 value={this.state.jadwalBaru.jam_mulai} type="time"
                                                 className="form-control m-b" name="account"/>
                                      </div>
                                  </div>
                                  <div className="form-group row"><label className="col-lg-2 col-form-label">Jam
                                      Selesai</label>
                                      <div className="col-lg-10">
                                          <input onChange={this.onChangeJamSelesai}
                                                 value={this.state.jadwalBaru.jam_selesai} type="time"
                                                 className="form-control m-b" name="account"/>
                                      </div>
                                  </div>
                                  <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Ruang</label>
                                      <div className="col-lg-10">
                                          <select value={this.state.jadwalBaru.ruangan} onChange={this.onChangeRuangan}
                                                  className="form-control m-b" name="account">
                                              <option>Pilih Ruangan</option>
                                              {
                                                  this.state.ruangan.map((ruangan, key) =>
                                                    <option key={key} value={ruangan.id}>{ruangan.nama}</option>
                                                  )
                                              }
                                          </select>
                                      </div>
                                  </div>
                                  <div className="form-group row"><label
                                    className="col-lg-2 col-form-label">Dosen</label>
                                      <div className="col-lg-10">
                                          <select
                                            value={this.state.jadwalBaru.dosen}
                                            onChange={this.onChangeDosen}
                                            disabled="disabled"
                                            className="form-control m-b"
                                            name="account">
                                              <option value="">Pilih Dosen</option>
                                              {
                                                  this.state.dosens.map((dosen, key) =>
                                                    <option key={key} value={dosen.id}>{dosen.nama}</option>
                                                  )
                                              }
                                          </select>
                                      </div>
                                  </div>
                                  <div>
                                      <button type="button" className="btn btn-primary btn-add" onClick={this.addJadwal}
                                              data-dismiss="modal">Simpan
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-8">
                          <div className="ibox ">
                              <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                                  <h5>Kalender Akademik</h5>
                              </div>
                              {
                                  !this.state.loading ?
                                    <div className="ibox-content">
                                        {
                                            this.state.events != null ?
                                              <FullCalendar
                                                id="your-custom-ID"
                                                header={{
                                                    left: 'today',
                                                    center: 'title',
                                                    right: 'prev,next'
                                                }}
                                                dayClick={
                                                    (event, jsEvent, view) => {
                                                        let listDay = []
                                                        listDay = this.state.listDay
                                                        listDay.push(event._d)
                                                        this.setState({
                                                            tmpDate: event,
                                                            today: moment(event._d).format('YYYY-MM-DD'),
                                                            listDay
                                                        })
                                                        // $('#fullCalModal').modal('show');
                                                    }}
                                                eventClick={
                                                    (event, jsEvent, view) => {
                                                        let eventSelected = this.state.events.find(obj => obj.id == event.id);
                                                        this.setState({
                                                            tmpDate: event,
                                                            idJadwalSelected: event.id,
                                                            eventSelected
                                                        })

                                                        $('#ModalEditJadwal').modal('show');
                                                    }}
                                                eventDrop={
                                                    (event, jsEvent, view) => {
                                                        // console.log("Start " + moment(event.start).format('YYYY-MM-DD'))
                                                        // console.log("Jadi tgl " + event.end)
                                                        toastr.success("Jadwal berhasil diubah", "Sukses ! ")
                                                    }
                                                }
                                                defaultDate={this.state.today}
                                                navLinks={true}
                                                editable={true}
                                                eventLimit={true}
                                                events={this.state.events}
                                              />
                                              :
                                              <div className="spiner-example">
                                                  <div className="sk-spinner sk-spinner-double-bounce">
                                                      <div className="sk-double-bounce1"></div>
                                                      <div className="sk-double-bounce2"></div>
                                                  </div>
                                              </div>
                                        }
                                    </div>
                                    :
                                    <div className="spiner-example">
                                        <div className="sk-spinner sk-spinner-double-bounce">
                                            <div className="sk-double-bounce1"></div>
                                            <div className="sk-double-bounce2"></div>
                                        </div>
                                    </div>
                              }
                          </div>
                      </div>
                  </div>

                  <div id="ModalEditJadwal" className="modal fade">
                      <div className="modal-dialog">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <button type="button" className="close" data-dismiss="modal"><span
                                    aria-hidden="true">×</span> <span className="sr-only">close</span></button>
                                  <h4 id="modalTitle" className="modal-title">Detail Mata Kuliah</h4>
                              </div>
                              <div className="modal-body">
                                  <div className="table-responsive">
                                      {
                                          this.state.idJadwalSelected != null ?
                                            <table className="table">
                                                <tr style={{'width': '30%'}}>
                                                    <td><b>MATA KULIAH</b></td>
                                                    <td>: {this.state.eventSelected.title}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>KELAS</b></td>
                                                    <td>: {this.state.eventSelected.kelas_info.nama}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>JURUSAN</b></td>
                                                    <td>: {this.state.eventSelected.jurusan_info.nama}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>TANGGAL</b></td>
                                                    <td>: {this.state.eventSelected.start}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>JAM MULAI</b></td>
                                                    <td>: {this.state.eventSelected.jam_mulai}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>JAM SELESAI</b></td>
                                                    <td>: {this.state.eventSelected.jam_selesai}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>RUANGAN</b></td>
                                                    <td>: {this.state.eventSelected.ruangan_info.nama}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>DOSEN</b></td>
                                                    <td>: {this.state.eventSelected.dosen_info.nama}</td>
                                                </tr>
                                            </table>
                                            :
                                            null
                                      }

                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-default" data-dismiss="modal">Tutup</button>
                                  <button onClick={this.deleteJadwal} type="button" className="btn btn-danger"
                                          data-dismiss="modal">Hapus
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
        )
    }

}

export default Jadwal
