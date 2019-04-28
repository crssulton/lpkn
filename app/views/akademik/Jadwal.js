import React, { Component } from 'react';
import $ from 'jquery'
import FullCalendar from 'fullcalendar-reactwrapper';
import { Link } from 'react-router';
import moment from 'moment'
import cookie from 'react-cookies'; 

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
            dosens: [],
            eventSelected: {},
            jurusans: [],
            listDay: []
        }
    }

    componentDidMount(){
        const self = this
        fetch('http://lpkn.itec.my.id:9000/api/jadwal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                events: data.results
            })
        });

        fetch('http://lpkn.itec.my.id:9000/api/dosen/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                dosens: data.results
            })
        });

        fetch('http://lpkn.itec.my.id:9000/api/mata-kuliah/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                matkuls: data.results
            })
        });

        fetch('http://lpkn.itec.my.id:9000/api/jurusan/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token')
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
        jadwalBaru.kampus = cookie.load('kampus')
        this.setState({jadwalBaru}) 

        console.log(this.state.jadwalBaru)
        fetch('http://lpkn.itec.my.id:9000/api/jadwal/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + cookie.load('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(self.state.jadwalBaru)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            let events = []
            events = self.state.events
            events.push(self.state.jadwalBaru)

            self.setState({
                events,
                jadwalBaru: {}
            })

            addButton[0].removeAttribute("disabled")
            toastr.success("Jadwal berhasil ditambahkan", "Sukses ! ")
        });
    }

    deleteJadwal= () => {
        const self = this
        let index = self.state.events.map(function (event) { return event.id; }).indexOf(self.state.idJadwalSelected);
        // swal({
        //   title: "Hapus Mata Kuliah ?",
        //   icon: "warning",
        //   buttons: true,
        //   dangerMode: true,
        // })
        // .then((willDelete) => {
        //   if (willDelete) {
        //     fetch('http://lpkn.itec.my.id:9000/api/jadwal/' + self.state.idJadwalSelected, {
        //         method: 'delete',
        //         headers: {
        //             'Authorization': 'JWT ' + cookie.load('token')
        //         }
        //     }).then(function(response) {
        //         self.setState({
        //             events: self.state.slice(index+1, self.state.events.length)
        //         })
        //         swal("Sukses! Jadwal telah dihapus!", {
        //           icon: "success",
        //         });
        //     }).then(function(data) {
        //         let eventsCopy = []
        //         eventsCopy = self.state.events
        //         let events = eventsCopy.slice(index+1, eventsCopy.length)
        //         self.setState({
        //             events
        //         })
        //         swal("Sukses! Jadwal telah dihapus!", {
        //           icon: "success",
        //         });
        //     });
        //   }
        // });
    }

    onChangeMatkul = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.mata_kuliah = e.target.value
        this.setState({jadwalBaru}) 
    }

    onChangeJam = (e) => {
        let jadwalBaru = {}
        jadwalBaru = this.state.jadwalBaru
        jadwalBaru.jam = e.target.value
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

    deleteListDay = (key) => {
        let listDay = []
        listDay = this.state.listDay
        delete listDay[key]
        this.setState({listDay})
    }

    
    render() {
        console.log(this.state.listDay)
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
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Waktu</label>
                                        <div className="col-lg-10">
                                            <input onChange={this.onChangeJam} value={this.state.jadwalBaru.jam} type="text" className="form-control m-b" name="account"/>
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
                                            console.log("Start " + moment(event.start).format('YYYY-MM-DD'))
                                            console.log("Jadi tgl " + event.end)
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
                                    <h4 id="modalTitle" className="modal-title">Lihat Mata Kuliah</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Mata Kuliah</label>
                                        <div className="col-lg-10">
                                            <select className="form-control m-b" name="account" value={this.state.eventSelected.mata_kuliah} onChange={this.onChangeTitle}>
                                                <option >Pilih Mata Kuliah</option>
                                                {
                                                    this.state.matkuls.map((matkul, key) => 
                                                        <option value={matkul.id}>{matkul.nama}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Tanggal</label>
                                        <div className="col-lg-10">
                                            <input type="text" disabled="disabled" value={this.state.eventSelected.start} className="form-control m-b" name="account"/>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Waktu</label>
                                        <div className="col-lg-10">
                                            <input type="text" className="form-control m-b" name="account" value={this.state.eventSelected.jam}/>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label className="col-lg-2 col-form-label">Pilih Dosen</label>
                                        <div className="col-lg-10">
                                            <select className="form-control m-b" name="account" value={this.state.eventSelected.dosen}>
                                            {
                                                this.state.dosens.map((dosen, key) => 
                                                    <option value={dosen.id}>{dosen.nama}</option>
                                                )
                                            }
                                            </select>
                                        </div>
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
