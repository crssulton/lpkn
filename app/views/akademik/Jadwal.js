import React, { Component } from 'react';
import $ from 'jquery'
import FullCalendar from 'fullcalendar-reactwrapper';
import { Link } from 'react-router';
import moment from 'moment'
import {BASE_URL} from '../../config/config.js'

class Jadwal extends Component {
    constructor(props) {
        super(props);
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var mm= String(m+1);
        if(mm.length==1){
            mm='0'+mm;
        }
        var today = y+'-'+mm+'-'+d;
        this.state = {
            today:today,
            events: [],
            jadwalBaru: {},
            tmpDate: '',
            title: '',
            idJadwalSelected: null,
            matkuls: [],
            ruangan: [],
            dosens: [],
            eventSelected: {},
            jurusans: [],
            listDay: []
        }
    }

    componentDidMount(){
        const self = this
        fetch(BASE_URL + '/api/jadwal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                events: data.results
            })
        });

        fetch(BASE_URL + '/api/dosen/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                dosens: data.results
            })
        });

        fetch(BASE_URL + '/api/ruangan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                ruangan: data.results
            })
        });

        fetch(BASE_URL + '/api/mata-kuliah/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                matkuls: data.results
            })
        });

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

    }

    addJadwal = () => {
        const self = this
        let addButton = document.getElementsByClassName("btn-add")
        addButton[0].setAttribute("disabled", "disabled")

        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.title = $("#namaMatkul option:selected").text()
        jadwalBaru.start = this.state.today
        this.setState({jadwalBaru}) 

        fetch(BASE_URL + '/api/jadwal/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(self.state.jadwalBaru)
        }).then(function(response) {
            if (response.status == 400 || response.status == 500) {
                toastr.warning("Jadwal gagal ditambahkan", "Gagal ! ")
                addButton[0].removeAttribute("disabled")
            }else{
                let events = {...self.state.events}
                events = Object.assign([], events)

                events.push(self.state.jadwalBaru)

                self.setState({
                    events,
                    jadwalBaru: {},
                    listDay: []
                })

                addButton[0].removeAttribute("disabled")
                toastr.success("Jadwal berhasil ditambahkan", "Sukses ! ")
            }
        }).then(function(data) {
            
        });
    }

    deleteJadwal= () => {
        const self = this
        // let index = self.state.events.map(function (event) { return event.id; }).indexOf(self.state.idJadwalSelected);
        swal({
          title: "Hapus Mata Kuliah ?",
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
            }).then(function(response) {
                self.setState({
                    events: self.state.slice(index+1, self.state.events.length)
                })
                swal("Sukses! Jadwal telah dihapus!", {
                  icon: "success",
                });
            }).then(function(data) {
                let eventsCopy = []
                eventsCopy = self.state.events
                let events = eventsCopy.slice(index+1, eventsCopy.length)
                self.setState({
                    events
                })
                swal("Sukses! Jadwal telah dihapus!", {
                  icon: "success",
                });
            });
          }
        });
    }

    onChangeMatkul = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.mata_kuliah = e.target.value
        this.setState({jadwalBaru}) 
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

    onChangeDosen = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.dosen = e.target.value
        this.setState({jadwalBaru}) 
    }
    onChangeJurusan = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.jurusan = e.target.value
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
        jadwalBaru.tahun_angkatan = 2019
        this.setState({jadwalBaru}) 
    }

    deleteListDay = (key) => {
        let listDay = []
        listDay = this.state.listDay
        delete listDay[key]
        this.setState({listDay})
    }

    
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Jadwal Perkuliahan</h2>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated">
                        <div className="col-lg-4">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5>Input Jadwal</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Mata Kuliah</label>
                                        <div className="col-lg-10">
                                            <select id="namaMatkul" className="form-control m-b" name="account" onChange={this.onChangeMatkul}>
                                                <option >Pilih Mata Kuliah</option>
                                                {
                                                    this.state.matkuls.map((matkul, key) => 
                                                        <option value={matkul.id}>{matkul.nama}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Jurusan</label>
                                        <div className="col-lg-10">
                                            <select
                                                onChange={this.onChangeJurusan}
                                                className="form-control">
                                                <option value="">Pilih Jurusan</option>
                                                {
                                                    this.state.jurusans.map((jurusan) => 
                                                        <option value={jurusan.id}>{jurusan.nama}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Tanggal</label>
                                        <div className="col-lg-10">
                                            {
                                                this.state.listDay.map((date, key) => 
                                                    <span onClick={() =>this.deleteListDay(key)} style={{'margin': '2px 6px', 'cursor':'pointer'}}  className="badge badge-info">{date}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Jam Mulai</label>
                                        <div className="col-lg-10">
                                            <input onChange={this.onChangeJamMulai}value={this.state.jadwalBaru.jam_mulai} type="time" className="form-control m-b" name="account"/>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Jam Selesai</label>
                                        <div className="col-lg-10">
                                            <input onChange={this.onChangeJamSelesai} value={this.state.jadwalBaru.jam_selesai} type="time" className="form-control m-b" name="account"/>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Ruang</label>
                                        <div className="col-lg-10">
                                            <select value={this.state.jadwalBaru.ruangan} onChange={this.onChangeRuangan} className="form-control m-b" name="account">
                                                <option>Pilih Ruangan</option>
                                                {
                                                    this.state.ruangan.map((ruangan, key) => 
                                                        <option value={ruangan.id}>{ruangan.nama}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Dosen</label>
                                        <div className="col-lg-10">
                                            <select value={this.state.jadwalBaru.dosen} onChange={this.onChangeDosen} className="form-control m-b" name="account">
                                                <option>Pilih Dosen</option>
                                                {
                                                    this.state.dosens.map((dosen, key) => 
                                                        <option value={dosen.id}>{dosen.nama}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary btn-add" onClick={this.addJadwal} data-dismiss="modal">Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5>Kalender Akademik</h5>
                                </div>
                                <div className="ibox-content">
                                <FullCalendar
                                    id = "your-custom-ID"
                                    header = {{
                                        left: 'today',
                                        center: 'title',
                                        right: 'prev,next'
                                    }}
                                    dayClick={
                                            (event, jsEvent, view) => {
                                            let listDay = []
                                            listDay = this.state.listDay
                                            listDay.push(moment(event._d).format('DD-MM-YYYY'))
                                            this.setState({tmpDate: event, today: moment(event._d).format('YYYY-MM-DD'), listDay})
                                            // $('#fullCalModal').modal('show');
                                    }}
                                    eventClick={
                                            (event, jsEvent, view) => {
                                            let eventSelected = this.state.events.find(obj => obj.id == event.id);
                                            this.setState({tmpDate: event, idJadwalSelected: event.id, eventSelected})
                        
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
                                    navLinks= {true} 
                                    editable= {true}
                                    eventLimit= {true} 
                                    events = {this.state.events}	
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="ModalEditJadwal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span> <span className="sr-only">close</span></button>
                                    <h4 id="modalTitle" className="modal-title">Detail Mata Kuliah</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="table-responsive">
                                    {
                                        this.state.idJadwalSelected != null ?
                                        <table className="table">
                                            <tr>
                                                <td><b>MATA KULIAH</b> </td> <td>: {this.state.eventSelected.title}</td>
                                            </tr>
                                            <tr>
                                                <td><b>JURUSAN</b></td> <td>: {this.state.eventSelected.jurusan_info.nama}</td>
                                            </tr>
                                            <tr>
                                                <td><b>TANGGAL</b></td> <td>: {this.state.eventSelected.start}</td>
                                            </tr>
                                            <tr>
                                                <td><b>JAM MULAI</b></td> <td>: {this.state.eventSelected.jam_mulai}</td>
                                            </tr>
                                            <tr>
                                                <td><b>JAM SELESAI</b></td> <td>: {this.state.eventSelected.jam_selesai}</td>
                                            </tr>
                                            <tr>
                                                <td><b>RUANGAN</b></td> <td>: {this.state.eventSelected.ruangan_info.nama}</td>
                                            </tr>
                                            <tr>
                                                <td><b>DOSEN</b></td> <td>: {this.state.eventSelected.dosen_info.nama}</td>
                                            </tr>
                                        </table>
                                        :
                                        null
                                    }
                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Tutup</button>
                                    <button onClick={this.deleteJadwal} type="button" className="btn btn-danger" data-dismiss="modal">Hapus</button>
                                    <button type="button" className="btn btn-info" onClick={this.tolol}>Edit</button>
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
