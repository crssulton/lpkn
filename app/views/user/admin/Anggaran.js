import React, { Component } from 'react';
import { Link} from 'react-router';
import {BASE_URL} from '../../../config/config.js'
import CurrencyInput from "react-currency-input";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let account = []

class Anggaran extends Component {

    constructor(props){
        super(props);

        this.state = {
            pengajuan_anggaran:[],
            loading: true,
            form: false,
            selected: null,
            pengajuanBaru: {},
            add: true,
            account: [],
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
            console.log(data.results)
            self.setState({
                pengajuan_anggaran: data.results,
                loading: !self.state.loading
            })
        });

        fetch(BASE_URL + '/api/account/', {
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.setState({
                account: data
            })
        });

    }

    addItem = ()=> {
        const self = this
        let addButton = document.getElementsByClassName("btn-add")

        addButton[0].setAttribute("disabled", "disabled")

        let newPengajuan = {...this.state.newPengajuan}

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

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    approveTransaksi = (id) => {
        const self = this
        swal({
          title: "Buat Transaksi Item ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            fetch(BASE_URL + '/api/pengajuan-anggaran/' + id + '/approve/', {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                let pengajuan_anggaran =  [...self.state.pengajuan_anggaran]

                if (response.status == 200 || response.status == 201) {
                    pengajuan_anggaran.find(data => data.id == id).approved = true
                    self.setState({
                        pengajuan_anggaran
                    })
                    swal("Sukses! Item telah dimasukkan dalam Transaksi!", {
                      icon: "success",
                    });
                }else{
                    toastr.warning("Terjadi kesalahan", "Gagal ! ")
                }
            }).then(function(data) {
            });
          }
        });
    }

    render() {
        account = [...this.state.account]
        const { selectedOption } = this.state;
        this.state.account.map((data, key) => {
            account[key].value = data.id
            account[key].label = data.nama
        })
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
                            <div className="col-lg-8">
                                <div className="ibox ">
                                    <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                        <h5> <i className="fa fa-list "></i> List Pengajuan</h5>
                                    </div>

                                     <div className="ibox-content">
                                        <div className="row">
                                          
                                        </div>
                                        <br/>
                                        <div className="table-responsive">
                                            <table className="table table-striped" align="right">
                                                <thead>
                                                <tr>
                                                    <th>NAMA</th>
                                                    <th>URAIAN</th>
                                                    <th>JUMLAH</th>
                                                    <th>NOMINAL</th>
                                                    <th>SISA</th>
                                                    <th>STATUS</th>
                                                    <th><center>AKSI</center></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.pengajuan_anggaran.map((data, key) =>
                                                            <tr key={key}>
                                                                <td>{data.nama}</td>
                                                                <td>{data.uraian}</td>
                                                                <td>{data.jumlah}</td>
                                                                <td>{this.formatNumber(data.harga)}</td>
                                                                <td>{this.formatNumber(data.sisa)}</td>
                                                                <td>
                                                                {data.approved ? (
                                                                  <span className="badge badge-primary">
                                                                    Diterima
                                                                  </span>
                                                                ) 
                                                                :
                                                                <span className="badge badge-warning">
                                                                    Menunggu
                                                                  </span> 
                                                                }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        data.approved ?
                                                                        <center>
                                                                            <Link to={{ pathname: 'pengajuan', state: { pengajuan: data} }}>
                                                                                <button 
                                                                                    style={{'margin' : '0 5px'}} 
                                                                                    className="btn btn-info btn-sm" 
                                                                                    type="button"
                                                                                    onClick={ () => {this.setState({ selected: data.id, addForm: false})} }
                                                                                    >
                                                                                    <i className="fa fa-eye"></i></button>
                                                                            </Link>
                                                                        </center>
                                                                        :
                                                                        <center>
                                                                            <button 
                                                                                style={{'margin' : '0 5px'}} 
                                                                                className="btn btn-info btn-sm" 
                                                                                type="button"
                                                                                onClick={ () => {this.setState({ selected: data.id, addForm: false})} }
                                                                                >
                                                                                <i className="fa fa-edit"></i></button>

                                                                            <button 
                                                                                onClick={() => this.handleDeleteItem( data.id, key )}
                                                                                className="btn btn-danger btn-sm" 
                                                                                type="button"
                                                                                ><i className="fa fa-trash"></i></button>
                                                                        </center>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="ibox ">
                                    {
                                        this.state.addForm ?
                                        <div className="ibox-title" style={{'backgroundColor':'#1ab394', 'color':'white'}}>
                                            <h5> <i className="fa fa-plus"></i> Tambah Pengajuan Anggaran</h5>
                                        </div>
                                        :
                                        <div className="ibox-title" style={{'backgroundColor':'#fad284', 'color':'white'}}>
                                            <h5> <i className="fa fa-pencil"></i> Ubah Pengajuan Anggaran</h5>
                                        </div>
                                    }
                                    {
                                        this.state.addForm ?
                                        <div className="ibox-content">

                                            <div className="">
                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Nama Pengajuan</label>
                                                <div className="col-lg-9">
                                                    <input 
                                                        value={this.state.newPengajuan.nama}
                                                        onChange={(e) => {
                                                            let newPengajuan = {...this.state.newPengajuan}
                                                            newPengajuan.nama = e.target.value
                                                            this.setState({newPengajuan})
                                                        }}
                                                        type="text" 
                                                        className="form-control m-b" 
                                                        />
                                                </div>
                                                </div>

                                 
                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah</label>
                                                <div className="col-lg-9">
                                                    <input 
                                                        value={this.state.newPengajuan.jumlah}
                                                        onChange={(e) => {
                                                            let newPengajuan = {...this.state.newPengajuan}
                                                            newPengajuan.jumlah = e.target.value
                                                            this.setState({newPengajuan})
                                                        }}
                                                        type="number" 
                                                        className="form-control m-b" 
                                                        />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Harga</label>
                                                <div className="col-lg-9">
                                                    <CurrencyInput 
                                                        precision="0" 
                                                        className="form-control m-b" 
                                                        prefix="Rp "
                                                        value={this.state.newPengajuan.harga}
                                                        onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                            let newPengajuan = {...this.state.newPengajuan}
                                                            newPengajuan.harga = floatvalue
                                                            this.setState({newPengajuan})
                                                        }}
                                                    />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Uraian</label>
                                                <div className="col-lg-9">
                                                    <input 
                                                        value={this.state.newPengajuan.uraian}
                                                        onChange={(e) => {
                                                            let newPengajuan = {...this.state.newPengajuan}
                                                            newPengajuan.uraian = e.target.value
                                                            this.setState({newPengajuan})
                                                        }}
                                                        type="text" 
                                                        className="form-control m-b" 
                                                        />
                                                </div>
                                                </div>

                                            <button
                                                className="btn btn-primary btn-sm btn-add" 
                                                type="button"
                                                onClick={this.addItem}>
                                                Tambah
                                            </button>
                                            </div>
                                        </div>
                                        :
                                        <div className="ibox-content">

                                            <div className="">
                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Nama Barang</label>
                                                <div className="col-lg-9">
                                                    <input 
                                                        value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].nama_barang}
                                                        onChange={(e) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].nama_barang = e.target.value
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                        type="text" 
                                                        className="form-control m-b" 
                                                        />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Spesifikasi</label>
                                                <div className="col-lg-9">
                                                    <input 
                                                        value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].spesifikasi}
                                                        onChange={(e) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].spesifikasi = e.target.value
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                        type="text" 
                                                        className="form-control m-b" 
                                                        />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Satuan</label>
                                                <div className="col-lg-9">
                                                    <select
                                                      value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].satuan}
                                                      onChange={(e) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].satuan = e.target.value
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                      className="form-control m-b"
                                                    >
                                                    <option value="">--Pilih Satuan--</option>
                                                      <option value="buah">Buah</option>
                                                      <option value="unit">Unit</option>
                                                      <option value="lembar">Lembar</option>
                                                      <option value="batang">Batang</option>
                                                      <option value="bungkus">Bungkus</option>
                                                    </select>
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Jumlah</label>
                                                <div className="col-lg-9">
                                                    <input 
                                                        value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].jumlah}
                                                        onChange={(e) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].jumlah = e.target.value
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                        type="number" 
                                                        className="form-control m-b" 
                                                        />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Harga</label>
                                                <div className="col-lg-9">
                                                    <CurrencyInput 
                                                        precision="0" 
                                                        className="form-control m-b" 
                                                        prefix="Rp "
                                                        value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].harga}
                                                        onChangeEvent={(e, maskedvalue, floatvalue) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].harga = floatvalue
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Akun</label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        name="form-field-name"
                                                        value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].account}
                                                        onChange={(selectedOption) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].account = selectedOption.value
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                        options={account}
                                                      />
                                                </div>
                                                </div>

                                                <div className="form-group row"><label className="col-lg-3 col-form-label">Akun Tujuan</label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        name="form-field-name"
                                                        value={this.state.pengajuan_anggaran.filter(data => data.id === this.state.selected)[0].account_tujuan}
                                                        onChange={(selectedOption) => {
                                                            let pengajuan_anggaran = []
                                                            pengajuan_anggaran = this.state.pengajuan_anggaran
                                                            pengajuan_anggaran.filter(data => data.id == this.state.selected)[0].account_tujuan = selectedOption.value
                                                            this.setState({
                                                                pengajuan_anggaran,
                                                                edit_pengajuan_anggaran: pengajuan_anggaran.filter(data => data.id == this.state.selected)[0]
                                                            })
                                                        }}
                                                        options={account}
                                                      />
                                                </div>
                                                </div>


                                            <button
                                                style={{'marginRight': '10px'}}
                                                className="btn btn-info btn-add" 
                                                type="button"
                                                onClick={this.editItem}>
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-danger " 
                                                type="button"
                                                onClick={ () => {this.setState({ addForm: !this.state.addForm})} }>
                                                Batal
                                            </button>
                                            </div>
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

export default Anggaran