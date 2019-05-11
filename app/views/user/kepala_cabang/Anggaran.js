import React, { Component } from 'react';
import { Link} from 'react-router';
import {BASE_URL} from '../../../config/config.js'

class Anggaran extends Component {

    constructor(props){
        super(props);

        const {pengajuan} = this.props.location.state

        this.state = {
            pengajuan,
            pengajuan_anggaran:[],
            loading: true,
            form: false,
            selected: null,
            pengajuanBaru: {},
            add: true,
            addForm: true,
            edit_pengajuan_anggaran : {},
            newPengajuan: {}
        }
    }

    componentWillMount(){
        const self = this
        
        fetch(BASE_URL + '/api/pengajuan-anggaran/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                pengajuan_anggaran: data.results,
                loading: !self.state.loading
            })
        });

    }

    addItem = ()=> {
        const self = this
        let addButton = document.getElementsByClassName("btn-add")

        addButton[0].setAttribute("disabled", "disabled")

        let newPengajuan = {...this.state.newPengajuan}
        newPengajuan.pengajuan = this.state.pengajuan.id

        console.log(JSON.stringify(this.state.newPengajuan))
        fetch(BASE_URL + '/api/pengajuan-anggaran/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPengajuan)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            if(data.id != null || data.id != undefined){
                addButton[0].removeAttribute("disabled")
                let pengajuan_anggaran = []
                let newPengajuan = {}
                newPengajuan = self.state.newPengajuan

                pengajuan_anggaran = self.state.pengajuan_anggaran
                pengajuan_anggaran.push(data)

                self.setState({
                    addForm: true,
                    pengajuan_anggaran,
                    newPengajuan: {}
                    
                })
                toastr.success("Item berhasil ditambahkan", "Sukses ! ")
            }else{
                addButton[0].removeAttribute("disabled")
                self.setState({
                    addForm: true
                })
                toastr.warning("Gagal menambahkan Item", "Gagal ! ")
            }
        });
    }

    editItem = () => {
        const self = this
        console.log(JSON.stringify(this.state.edit_pengajuan_anggaran))
        fetch(BASE_URL + '/api/pengajuan-anggaran/'+ this.state.selected+'/', {
            method: 'put',
            body: JSON.stringify(this.state.edit_pengajuan_anggaran),
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if (response.status == 200) {
                toastr.success("Item berhasil diubah", "Sukses ! ")
                self.setState({
                    addForm: !self.state.addForm
                })
            }else{
                toastr.warning("Item mengubah kelas", "Gagal ! ")
            }
        }).then(function(data) {
            
        });
    }

    handleDeleteItem = (id, key)=> {
        const self = this
        swal({
          title: "Hapus Item?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            fetch(BASE_URL + '/api/pengajuan-anggaran/' + id, {
                method: 'delete',
                headers: {
                    'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
                }
            }).then(function(response) {

                self.setState({
                    pengajuan_anggaran: self.state.pengajuan_anggaran.filter(data => data.id !== id)
                })
                swal("Sukses! Item telah dihapus!", {
                  icon: "success",
                });
            }).then(function(data) {
                self.setState({
                    pengajuan_anggaran: self.state.pengajuan_anggaran.filter(data => data.id !== id)
                })
                swal("Sukses! Item telah dihapus!", {
                  icon: "success",
                });
            });
          }
        });
    }
    

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Pengajuan Anggaran</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Pengajuan Anggaran</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="ibox ">
                                    
                                    <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                        <h5> <i className="fa fa-list "></i> List Pengajuan</h5>
                                    </div>

                                     <div className="ibox-content">
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <button className="btn btn-info" onClick={() => this.props.history.goBack() }> <i className="fa fa-arrow-left "></i> Kembali </button>
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>
                                        <div className="table-responsive">
                                            <table className="table table-striped" align="right">
                                                <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>NAMA BARANG</th>
                                                    <th>SPESIFIKASI</th>
                                                    <th>JUMLAH</th>
                                                    <th>HARGA</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.pengajuan_anggaran.filter(x => x.pengajuan == this.state.pengajuan.id)
                                                        .map((data, key) =>
                                                            <tr key={key}>
                                                                <td>{key+1}</td>
                                                                <td>{data.nama_barang}</td>
                                                                <td>{data.spesifikasi}</td>
                                                                <td>{data.jumlah}</td>
                                                                <td>{data.harga}</td>
                                                                
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            
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

export default Anggaran