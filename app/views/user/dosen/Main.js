import React, { Component } from 'react';   
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            jadwals: [],
            next: null,
          selectedMahasiswa: "",
          previous: null,
          count: null,
            months:[
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 
                    'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            days:[
                {day:'Sunday',hari:'Minggu'}, 
                {day:'Monday',hari:'Senin'}, 
                {day:'Tuesday',hari:'Selasa'}, 
                {day:'Wednesday',hari:'Rabu'}, 
                {day:'Thursday',hari:'Kamis'}, 
                {day:'Friday',hari:'Jum'+"'"+'at'}, 
                {day:'Saturday',hari:'Sabtu'}],
        }
    }

    getNextData = () => {
    const self = this;
    this.setState({ loading: true });
    fetch(this.state.next, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          tagihans: data.results,
          loading: false
        });
      });
  };

  getPreviousData = () => {
    const self = this;
    this.setState({ loading: true });
    fetch(this.state.previous, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          num_pages: data.num_pages,
          next: data.next,
          previous: data.previous,
          count: data.count,
          tagihans: data.results,
          loading: false
        });
      });
  };

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
                jadwals: data.results
            })
        });
    }

    
    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Jadwal Perkuliahan</h2>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Jadwal Perkuliahan</h5>
                                </div>
                                <div className="ibox-content">
                                    {
                                        this.state.loading?
                                        <div className="spiner-example">
                                            <div className="sk-spinner sk-spinner-double-bounce">
                                                <div className="sk-double-bounce1"></div>
                                                <div className="sk-double-bounce2"></div>
                                            </div>
                                        </div> :
                                        
                                        <div>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>HARI</th>
                                                    <th>TANGGAL</th>
                                                    <th>MATA KULIAH</th>
                                                    <th>KELAS</th>
                                                    <th>RUANGAN</th>
                                                    <th>WAKTU</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                
                                                {
                                                    this.state.jadwals.map((jadwal, key) =>
                                                    <tr key={key}>
                                                        <th>{this.state.days.find((dy) => (dy.day == moment(jadwal.start).format('dddd'))).hari}</th>
                                                        <td>{moment(jadwal.start).format('D MMM YYYY')}</td>
                                                        <td>{jadwal.title}</td>
                                                        <td>{jadwal.kelas_info.nama}</td>
                                                        <td>{jadwal.ruangan_info.nama}</td>
                                                        <td>{jadwal.jam_mulai +" - "+jadwal.jam_selesai}</td>
                                                    </tr>
                                                    )
                                                }
                                            
                                                </tbody>
                                            </table>
                                        </div>

                                    }
                                    <div className="text-center">
                                      <div className="btn-group">
                                        <button
                                          disabled={this.state.previous == null ? "disabled" : null}
                                          onClick={this.getPreviousData}
                                          className="btn btn-white"
                                          type="button"
                                        >
                                          <i className="fa fa-chevron-left" /> Sebelumnya{" "}
                                        </button>
                                        <button
                                          disabled={this.state.next == null ? "disabled" : null}
                                          onClick={this.getNextData}
                                          className="btn btn-white"
                                          type="button"
                                        >
                                          {" "}
                                          Selanjutnya <i className="fa fa-chevron-right" />{" "}
                                        </button>
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

export default Main