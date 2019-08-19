import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import {Link} from 'react-router';

class ListMahasiswa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            mahasiswa: [],
            jurusan: [],
            kelas: [],
            selectedJurusan: "",
            selectedKelas: "",
            selectedMahasiswa: ""
        }
    }

    componentWillMount() {
        const self = this;
        fetch(BASE_URL + `/api/jurusan/`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                jurusan: data.results
            })
        });
    }

    onFilterData = () => {
        const self = this;

        this.setState({loading: true});

        let mahasiswa = this.state.selectedMahasiswa;
        let jurusan = this.state.selectedJurusan;
        let kelas = this.state.selectedKelas;

        fetch(BASE_URL + `/api/mahasiswa/?mahasiswa=${mahasiswa}&kelas=${kelas}&jurusan=${jurusan}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                mahasiswa: data,
                loading: false
            })
        });

    };

    getKelas = () => {
        const self = this;
        fetch(BASE_URL + '/api/kelas/?jurusan=' + this.state.selectedJurusan, {
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
    };


    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Transkrip Nilai Mahasiswa</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Transkrip</strong>
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
                                    <h5><i className="fa fa-list "></i> Transkrip Nilai Mahasiswa</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className="form-label">Jurusan : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Kelas : </label>
                                        </div>
                                        <div className="col-lg-3">
                                            <label className="form-label">Nama : </label>
                                        </div>
                                        <div className="col-lg-3"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <select
                                                value={this.state.selectedJurusan}
                                                onChange={e => {
                                                    this.setState({
                                                        selectedJurusan: e.target.value
                                                    }, () => {
                                                        this.getKelas()
                                                    });
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
                                                    this.setState({selectedKelas: e.target.value});
                                                }}
                                                className="form-control"
                                            >
                                                <option value="">Pilih Kelas</option>
                                                {this.state.kelas
                                                    .filter(item => item.jurusan_info.id == this.state.selectedJurusan)
                                                    .map((kelas, key) => (
                                                        <option key={key} value={kelas.id}>
                                                            {kelas.nama} | Angkatan- {kelas.angkatan_info.angkatan}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-3">
                                            <input
                                                type="text"
                                                placeholder="Nama/NIM Mahasiswa"
                                                className="form-control"
                                                value={this.state.selectedMahasiswa}
                                                onChange={e => {
                                                    this.setState({selectedMahasiswa: e.target.value});
                                                }}
                                            />
                                        </div>

                                        <div className="col-lg-3">
                                            <button
                                                onClick={this.onFilterData}
                                                className="btn btn-info"
                                                type="button"
                                            >
                                                <i className="fa fa-filter"/> Filter
                                            </button>

                                            <button
                                                onClick={() => {
                                                    const self = this;
                                                    this.setState({
                                                        selectedMahasiswa: "",
                                                        selectedJurusan: "",
                                                        selectedKelas: ""
                                                    });

                                                }}
                                                style={{marginLeft: "5px"}}
                                                className="btn btn-warning"
                                                type="button"
                                            >
                                                <i className="fa fa-close"/> Reset
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
                                            </div> :

                                            <div>
                                                <table className="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th>NIM</th>
                                                        <th>NAMA</th>
                                                        <th>JURUSAN</th>
                                                        <th>KELAS</th>
                                                        <th>TAHUN ANGKATAN</th>
                                                        <th>
                                                            <center>AKSI</center>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        this.state.mahasiswa.map((mahasiswa, key) =>
                                                            <tr key={key}>
                                                                <td>{mahasiswa.nim}</td>
                                                                <td>{mahasiswa.nama}</td>
                                                                <td>{mahasiswa.jurusan_info.nama}</td>
                                                                <td>{mahasiswa.kelas_info.nama}</td>
                                                                <td>{mahasiswa.tahun_angkatan}</td>
                                                                <td>
                                                                    <center>
                                                                        <Link to={{
                                                                            pathname: 'transkrip',
                                                                            state: {mahasiswa: mahasiswa}
                                                                        }}>
                                                                            <button
                                                                                className="btn btn-primary btn-sm"
                                                                                type="button"
                                                                            ><i className="fa fa-eye"></i></button>
                                                                        </Link>
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


            </div>


        )
    }

}

export default ListMahasiswa