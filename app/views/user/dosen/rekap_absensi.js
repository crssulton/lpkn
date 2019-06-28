import React, { Component } from 'react';	
import {BASE_URL} from '../../../config/config.js'
import moment from 'moment'
import print from "print-js";

class RekapMahasiswa extends Component {

	constructor(props){
        super(props);

        this.state = {
            mahasiswas: [],
            loading: true,
            absensi: [],
            jadwal: [],
            jurusan: [],
            kelas: [],
            matkul:[],
            selectedJurusan: "",
            selectedKelas: "",
            selectedMatkul: ""
        }
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

    componentDidMount(){
    	const self = this

    	fetch(BASE_URL + '/api/jurusan/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				jurusan: data.results,
				loading: false
			})
		});

    }

    getMatkul = () => {
        console.log(this.state.selectedJurusan)
        const self = this
        fetch(BASE_URL + '/api/absensi/?kelas=' + this.state.selectedKelas, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            self.setState({
                matkul: data.results.filter(x => x.dosen == window.sessionStorage.getItem("user_id"))
            })
        });
    }

    getKelas = () => {
        const self = this
        fetch(BASE_URL + '/api/kelas/?jurusan=' + this.state.selectedJurusan, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                kelas: data.results
            })
        });
    }

    onFilterData = () => {
    	const self = this

    	let jurusan = this.state.selectedJurusan
    	let kelas = this.state.selectedKelas
    	let matkul = this.state.selectedMatkul

    	if (this.state.selectedMatkul != "" && this.state.selectedJurusan != "" && this.state.selectedKelas != "") {
    		this.setState({loading:true})

			fetch(BASE_URL + `/api/absensi/?matkulid=${matkul}&kelas=${kelas}&jurusan=${jurusan}`, {
				method: 'get',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				self.setState({
					absensi: data.results
				})
			});
			console.log(BASE_URL + `/api/jadwal/?matkul=${matkul}&jurusan=${jurusan}&kelas=${kelas}`)
			fetch(BASE_URL + `/api/jadwal/?matkul=${matkul}&jurusan=${jurusan}&kelas=${kelas}`, {
				method: 'get',
				headers: {
					'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
				}
			}).then(function(response) {
				return response.json();
			}).then(function(data) {
				self.setState({
					jadwal: data.results.filter(x => x.kelas_info.id == kelas),
					loading: false
				})
			});
    	}else{
    		toastr.warning("Silahkan melengkapi format filter data")
    	}
    }

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Rekap Absensi Mahasiswa</h2>
		                <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                Absensi
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Rekap Absensi</strong>
                            </li>
                        </ol>
		            </div>
		            <div className="col-lg-4">
                        <div className="title-action">
                            <a onClick={() => this.exportData() } className="btn btn-primary"><i className="fa fa-print"></i> Cetak </a>
                        </div>
                    </div>
		        </div>
		        <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="col-lg-12">
                            <div className="ibox ">
                                <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                    <h5> <i className="fa fa-list "></i> Rekap Absensi Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                	<div className="row">
                                		<div className="col-lg-12">
                                		<div className="row">
			                              <div className="col-lg-3">
			                                <label className="form-label">Jurusan : </label>
			                              </div>
			                              <div className="col-lg-3">
			                                <label className="form-label">Kelas : </label>
			                              </div>
			                              <div className="col-lg-3">
			                                <label className="form-label">Mata Kuliah : </label>
			                              </div>
			                              <div className="col-lg-3" />
			                            </div>
			                            <div className="row">
			                              <div className="col-lg-3">
			                                <select
			                                  value={this.state.selectedJurusan}
			                                  onChange={e => {
			                                    this.setState({ 
			                                        selectedJurusan: e.target.value,
			                                        selectedMatkul: "",
			                                        selectedKelas: ""
			                                    }, () =>{
			                                        this.getKelas()
			                                    })
			                                  }}
			                                  className="form-control"
			                                >
			                                  <option value="">Pilih Jurusan</option>
			                                  {this.state.jurusan
			                                    .map((jurusan, key) => (
			                                      <option key={key} value={jurusan.id}>
			                                        {jurusan.nama}
			                                      </option>
			                                    ))}
			                                </select>
			                              </div>
			                              <div className="col-lg-3">
			                                <select
			                                  value={this.state.selectedKelas}
			                                  onChange={e => {
			                                    this.setState({ 
			                                        selectedKelas: e.target.value 
			                                    }, () => {
			                                        this.getMatkul()
			                                    });
			                                  }}
			                                  className="form-control"
			                                >
			                                  <option value="">Pilih Kelas</option>
			                                  {this.state.kelas
			                                    .filter(item => item.jurusan_info.id == this.state.selectedJurusan)
			                                    .map((kelas, key) => (
			                                      <option key={key} value={kelas.id}>
			                                        {kelas.nama}
			                                      </option>
			                                    ))}
			                                </select>
			                              </div>
			                              <div className="col-lg-3">
			                                <select
			                                  value={this.state.selectedMatkul}
			                                  onChange={e => {
			                                    this.setState({ selectedMatkul: e.target.value });
			                                  }}
			                                  className="form-control"
			                                >
			                                  <option value="">Pilih Mata Kuliah</option>
			                                  {this.state.matkul
			                                    .map((matkul, key) => (
			                                      <option key={key} value={matkul.mata_kuliah}>
			                                        {matkul.mata_kuliah_info.nama}
			                                      </option>
			                                    ))}
			                                </select>
			                              </div>
			                              
			                              <div className="col-lg-3">
			                                <button
			                                  onClick={this.onFilterData}
			                                  className="btn btn-info"
			                                  type="button"
			                                >
			                                  <i className="fa fa-filter" /> Filter
			                                </button>

			                                <button
			                                  onClick={() => {
			                                    const self = this
			                                    this.setState({
			                                      selectedJurusan: "",
			                                      selectedKelas: "",
			                                      selectedMatkul: ""
			                                    });
			                                    
			                                  }}
			                                  style={{ marginLeft: "5px" }}
			                                  className="btn btn-warning"
			                                  type="button"
			                                >
			                                  <i className="fa fa-close" /> Reset
			                                </button>
			                              </div>
			                            </div>
		                                <div className="hr-line-dashed"></div>
		                                {
		                                this.state.loading ?
                            			<div className="spiner-example">
			                                <div className="sk-spinner sk-spinner-double-bounce">
			                                    <div className="sk-double-bounce1"></div>
			                                    <div className="sk-double-bounce2"></div>
			                                </div>
			                            </div>
			                            :
                                        <div className="table-responsive" >
                                        <div id="print_data">
                                        	<table>
								                <tr style={{ width: "100%" }}>
								                  <td>Mata Kuliah </td>
								                  <td style={{ width: "70%" }}>
								                    : {this.state.selectedMatkul != "" ? this.state.matkul.find(item => item.mata_kuliah == this.state.selectedMatkul).mata_kuliah_info.nama : null}
								                  </td>
								                </tr>
								                <tr style={{ width: "100%" }}>
								                  <td>Kelas </td>
								                  <td style={{ width: "70%" }}>
								                    : {this.state.selectedKelas != "" ? this.state.kelas.find(item => item.id == this.state.selectedKelas).nama : null}
								                  </td>
								                </tr>
								                <tr style={{ width: "100%" }}>
								                  <td>Jurusan </td>
								                  <td style={{ width: "70%" }}>
								                    : {this.state.selectedJurusan != "" ? this.state.jurusan.find(item => item.id == this.state.selectedJurusan).nama : null}
								                  </td>
								                </tr>
								            </table>
								            <br/><br/>
                                        	<table className="table table-bordered">
                                        		<thead>
                                        			<tr>
	                                        			<th style={{'width': '5%'}}>NIM</th>
	                                        			<th style={{'width': '15%'}}>NAMA MAHASISWA</th>
	                                        			{
	                                        				this.state.jadwal.map((data, key) =>
	                                        					<th style={{'width': '5%'}}>
	                                        						Pertemuan {key+1} <br/>
	                                        						<small> ( {moment(data.start).format("DD/MM/YYYY")} )</small>
	                                        					</th>
	                                        				)
	                                        			}
                                        			</tr>
                                        		</thead>
                                        		<tbody>
                                        		{
                                        			this.state.absensi.map((mhs, key) =>
                                        				mhs.daftar.map((data, key) => 
                                        					<tr>
	                                        					<td>{data.mahasiswa_info.nim}</td>
	                                        					<td>{data.mahasiswa_info.nama}</td>
	                                        					{
	                                        						this.state.jadwal.map((jadwal, key) => 
	                                        							<td style={{'textAlign':'center'}}>
	                                        								{
	                                        									data.kehadiran.find(presensi => presensi.jadwal == jadwal.id).status == "tanpa_keterangan" ?
	                                        									"Tnp. Keterangan" : null
	                                        								}
	                                        								{
	                                        									data.kehadiran.find(presensi => presensi.jadwal == jadwal.id).status == "hadir" ?
	                                        									"Hadir" : null
	                                        								}
	                                        								{
	                                        									data.kehadiran.find(presensi => presensi.jadwal == jadwal.id).status == "sakit" ?
	                                        									"Sakit" : null
	                                        								}
	                                        								{
	                                        									data.kehadiran.find(presensi => presensi.jadwal == jadwal.id).status == "izin" ?
	                                        									"Izin" : null
	                                        								}
	                                        							</td>
	                                        						)
	                                        					}
	                                        				</tr>
                                        				)
                                        			)
                                        		}
                                        		</tbody>
                                        	</table>
                                        </div>
                                        </div>
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

export default RekapMahasiswa