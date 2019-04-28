import React, { Component } from 'react';   
import cookie from 'react-cookies'; 

class Jadwal extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            jadwals: []
        }
    }

    componentDidMount(){
        const self = this
        fetch('http://lpkn.itec.my.id:9000/api/jadwal/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJha2FkZW1pazEiLCJleHAiOjE1NTQwNzg0MjAsImVtYWlsIjoiIn0.lSNi_8XtzTP_jeldmMUic27TuHlYMCCNN47tyZgOLy0'
            }
        }).then(function(response) {
            console.log(response)
            return response.json();
        }).then(function(data) {
            console.log(data)
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
                                    <h5> <i className="fa fa-list "></i> Daftar Mata Kuliah</h5>
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
                                        
                                        <div className="table-responsive">
                                            <table className="table table-striped" align="right">
                                                <thead>
                                                <tr>
                                                    <th>HARI</th>
                                                    <th>TANGGAL</th>
                                                    <th rowspan="2">MATA KULIAH</th>
                                                    <th>JML PERTEMUAN</th>
                                                    <th>DOSEN</th>
                                                    <th>WAKTU</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                
                                                {
                                                    this.state.jadwals.map((jadwal, key) =>
                                                    <tr>
                                                        <th>Senin</th>
                                                        <td>{jadwal.start}</td>
                                                        <td>{jadwal.title}</td>
                                                        <td>12</td>
                                                        <td>Ahmad Budiman S.Kom</td>
                                                        <td>{jadwal.jam}</td>
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

export default Jadwal