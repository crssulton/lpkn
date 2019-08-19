import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'

class Daftar extends Component {

  constructor(props) {
    super(props);

    const {kelas} = this.props.location.state

    this.state = {
      mahasiswas: [],
      loading: true,
      jurusans: [],
      kelas,
      angkatan: [],
      loadingSimpan: false,
      daftars: [],
      sendDaftar: [],
      selectedJurusan: kelas.jurusan_info.id,
      selectedAngkatan: "",
      selectedMahasiswa: "",
      checkAll: false
    }
  }

  componentDidMount() {
    const self = this

    fetch(BASE_URL + "/api/mahasiswa/?jurusan=" + this.state.selectedJurusan, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        self.setState({
          mahasiswas: data,
          loading: false
        });
      });

    fetch(BASE_URL + '/api/daftar/', {
      method: 'get',
      headers: {
        'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      let mhs = [...data.results]
      mhs.map(data => {
        data.check = false
      })
      self.setState({
        daftars: data.results
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

    fetch(BASE_URL + '/api/angkatan/', {
      method: 'get',
      headers: {
        'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      self.setState({
        angkatan: data
      })
    });

  }

  fetchDaftar = () => {
    const self = this

    this.setState({loading: true})

    fetch(BASE_URL + "/api/mahasiswa/?jurusan=" + this.state.selectedJurusan, {
      method: "get",
      headers: {
        Authorization: "JWT " + window.sessionStorage.getItem("token")
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        self.setState({
          mahasiswas: data,
          loading: false
        });
      });
  };

  render() {
    console.log(this.state.kelas)
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Daftar Mahasiswa Kelas {this.state.kelas.nama}</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                Dashboard
              </li>
              <li className="breadcrumb-item active">
                Absensi
              </li>
              <li className="breadcrumb-item active">
                <strong>Daftar Mahasiswa</strong>
              </li>
            </ol>
          </div>
          <div className="col-lg-4">
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="row animated fadeInRight">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-title" style={{'backgroundColor': '#1ab394', 'color': 'white'}}>
                  <h5><i className="fa fa-list "></i> Daftar Mahasiswa</h5>
                </div>
                <div className="ibox-content">
                  {
                    this.state.loading ?
                      <div className="spiner-example">
                        <div className="sk-spinner sk-spinner-double-bounce">
                          <div className="sk-double-bounce1"></div>
                          <div className="sk-double-bounce2"></div>
                        </div>
                      </div>
                      :
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                          <tr>
                            <th>NIM</th>
                            <th>NAMA</th>
                            <th>JURUSAN</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                            this.state.mahasiswas.filter(mahasiswa => mahasiswa.calon == false && (mahasiswa.kelas == this.state.kelas.id))
                              .map((mahasiswa, key) =>

                                <tr key={key}>
                                  <td>{mahasiswa.nim}</td>
                                  <td>{mahasiswa.nama}</td>
                                  <td>
                                    {
                                      (this.state.jurusans.length === 0) ? null :
                                        this.state.jurusans.find((jurusan) => (jurusan.id == mahasiswa.jurusan)).nama
                                    }
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
      </div>


    )
  }

}

export default Daftar