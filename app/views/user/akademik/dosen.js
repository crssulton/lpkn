import React, {Component} from 'react';
import {BASE_URL} from '../../../config/config.js'
import {Link} from 'react-router';

class Dosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dosen: [],
            selectedDosen: ""
        }
    }

    componentDidMount() {
        const self = this;
        this.setState({loading: true});

        fetch(BASE_URL + `/api/dosen/`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                dosen: data.results,
                loading: false
            })
        });
    }

    onFilterData = () => {
        const self = this;

        this.setState({loading: true});

        fetch(BASE_URL + `/api/dosen/?dosen=${this.state.selectedDosen}`, {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                dosen: data,
                loading: false
            })
        });

    };


    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-8">
                        <h2>Rekap Absensi Dosen</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                Dashboard
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Absensi Dosen</strong>
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
                                    <h5><i className="fa fa-list "></i> Rekap Absensi Dosen</h5>
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label className="form-label">Nama : </label>
                                        </div>
                                        <div className="col-lg-3"/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <input
                                                type="text"
                                                placeholder="Nama Dosen"
                                                className="form-control"
                                                value={this.state.selectedDosen}
                                                onChange={e => {
                                                    this.setState({selectedDosen: e.target.value});
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
                                                        selectedDosen: ""
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
                                                        <th>NAMA</th>
                                                        <th>PENDIDIKAN</th>
                                                        <th>ALAMAT</th>
                                                        <th>
                                                            <center>AKSI</center>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        this.state.dosen.map((dosen, key) =>
                                                            <tr key={key}>
                                                                <td>{dosen.nama}</td>
                                                                <td>{dosen.pendidikan_terakhir.toUpperCase()}</td>
                                                                <td>{dosen.alamat}</td>
                                                                <td>
                                                                    <center>
                                                                        <Link to={{
                                                                            pathname: 'rekap-dosen',
                                                                            state: {dosen: dosen}
                                                                        }}>
                                                                            <button
                                                                                className="btn btn-primary btn-sm"
                                                                                type="button"
                                                                            ><i className="fa fa-id-card"></i></button>
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

export default Dosen