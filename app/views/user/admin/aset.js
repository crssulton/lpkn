import React, {Component} from 'react';
import swal from 'sweetalert';
import {BASE_URL} from '../../../config/config.js'
import 'react-day-picker/lib/style.css';
import 'react-select/dist/react-select.css';

let account = []
let transaksi = []

class DataJurnal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			aset: [],
			account: [],
			loading: true,
			transaksi: [],
			form: false,
			selectedAset: [],
			asetBaru: {},
			add: true,
			addForm: true,
			jurusans: [],
			editaset: {}
		}
	}

	componentDidMount() {
		const self = this

		fetch(BASE_URL + '/api/aset/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			self.setState({
				aset: data.results,
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
		}).then(function (response) {
			return response.json();
		}).then(function (data) {
			self.setState({
				account: data
			})
		});

	}

	handleChangeKode = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].transaksi = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}
	handleChangeJumlahPenyusutan = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].jumlah_penyusutan = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}
	handleChangeHarga = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].jumlah_kredit = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}

	handleChangeTanggal = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].tanggal = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}

	handleChangeAccount = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].account = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}

	handleChangeTipe = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].tipe = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}

	handleChangeJenis = e => {
		let aset = []
		aset = this.state.aset
		aset.filter(data => data.id == this.state.selected)[0].jenis = e.target.value
		this.setState({
			aset,
			editaset: aset.filter(data => data.id == this.state.selected)[0]
		})
	}

	editaset = () => {
		const self = this
		let editaset = this.state.editaset
		delete editaset.id
		self.setState({editaset})

		fetch(BASE_URL + '/api/data-aset/' + this.state.selected + '/', {
			method: 'put',
			body: JSON.stringify(this.state.editaset),
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then(function (response) {
			if (response.status == 200) {
				toastr.success("aset berhasil diubah", "Sukses ! ")
				self.setState({
					addForm: !self.state.addForm
				})
			} else {
				toastr.warning("Gagal mengubah aset", "Gagal ! ")
			}
		}).then(function (data) {

		});
	}

	addasetTanggal = (e) => {
		let asetBaru = {}
		asetBaru = this.state.asetBaru
		asetBaru.tanggal = e.target.value
		this.setState({asetBaru})
	}
	addasetHarga = (e, maskedvalue, floatvalue) => {
		let asetBaru = {}
		asetBaru = this.state.asetBaru
		asetBaru.harga = floatvalue
		this.setState({asetBaru})
	}
	addasetJumlahPenyusutan = (e, maskedvalue, floatvalue) => {
		let asetBaru = {}
		asetBaru = this.state.asetBaru
		asetBaru.jumlah_penyusutan = floatvalue
		this.setState({asetBaru})
	}
	addasetNama = (e) => {
		let asetBaru = {}
		asetBaru = this.state.asetBaru
		asetBaru.nama = e.target.value
		this.setState({asetBaru})
	}
	addasetAccount = (selectedOption) => {
		let asetBaru = {}
		asetBaru = this.state.asetBaru
		asetBaru.account = selectedOption.value
		this.setState({asetBaru})
	}
	addasetTransaksi = (selectedOption) => {
		let asetBaru = {}
		asetBaru = this.state.asetBaru
		asetBaru.transaksi = selectedOption.value
		this.setState({asetBaru})
	}

	addaset = () => {
		const self = this
		let addButton = document.getElementsByClassName("btn-add")
		addButton[0].setAttribute("disabled", "disabled")

		fetch(BASE_URL + '/api/aset/', {
			method: 'post',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.asetBaru)
		}).then(function (response) {
			if (response.status == 400 || response.status) {
			}
			return response.json();
		}).then(function (data) {
			if (data.id != null || data.id != undefined) {
				addButton[0].removeAttribute("disabled")
				let aset = []
				let asetBaru = {}
				asetBaru = self.state.asetBaru

				aset = self.state.aset
				aset.push(data)

				asetBaru.jumlah_kredit = null
				asetBaru.jumlah_debet = null
				asetBaru.tanggal = null

				self.setState({
					addForm: true,
					aset,
					asetBaru

				})
				toastr.success("Aset berhasil ditambahkan", "Sukses ! ")
			} else {
				addButton[0].removeAttribute("disabled")
				self.setState({
					addForm: true
				})
				toastr.warning("Gagal menambahkan Aset", "Gagal ! ")
			}
		});
	}

	handleDeleteaset = (id, key) => {
		const self = this
		swal({
			title: "Hapus Data Jurnal ?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					fetch(BASE_URL + '/api/aset/' + id, {
						method: 'delete',
						headers: {
							'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
						}
					}).then(function (response) {

						self.setState({
							aset: self.state.aset.filter(data => data.id !== id)
						})
						swal("Sukses! aset telah dihapus!", {
							icon: "success",
						});
					}).then(function (data) {
						self.setState({
							aset: self.state.aset.filter(data => data.id !== id)
						})
						swal("Sukses! aset telah dihapus!", {
							icon: "success",
						});
					});
				}
			});
	}

	handleApproveAset = (id, key) => {
		const self = this
		swal({
			title: "Buat Akumulasi Penyusutan ?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					fetch(BASE_URL + '/api/aset/' + id + '/approve/', {
						method: 'post',
						headers: {
							'Authorization': 'JWT ' + window.sessionStorage.getItem('token')
						}
					}).then(function (response) {
						return response.json()
					}).then(function (data) {
            if (data.id != null && data.id != undefined) {
              let aset  = self.state.aset;
              aset[key] = data;
              let year  = new Date().getFullYear();
              self.setState({
                aset
              });
              swal(`Sukses! Aset Tahun ${year} telah diakumulasi!`, {
                icon: "success",
              });
            }else {
              swal("Gagal! Aset gagal diakumulasi!", {
                icon: "warning",
              });
            }
					});
				}
			});
	}

	formatNumber = (num) => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	checkDisabled = (data) => {
		let year = new Date().getFullYear();
		let hasil = data.find(x => x.tanggal.substring(0, 4) == year);

		if (hasil == undefined) {
			return true;
		} else if (hasil.approved == true) {
			return true;
		} else {
			return false;
		}
	};

  checkAkumulasiAktif = () => {
    let aset   = this.state.aset;
    let year   = new Date().getFullYear();
    let status = false;
    aset.map(data => {
      data.penyusutanAset.map(item => {
        if (item.tanggal.substring(0, 4) == year && item.approved == false) {
          status = true;
        }
      })
    })

    return status;
  };

	render() {
		account = [...this.state.account]
		const {selectedOption} = this.state;
		this.state.account.map((data, key) => {
			account[key].value = data.id
			account[key].label = data.nama
		})

		return (
			<div>
				<div className="row wrapper border-bottom white-bg page-heading">
					<div className="col-lg-12">
						<h2>Daftar Aset</h2>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								Dashboard
							</li>
							<li className="breadcrumb-item active">
								<strong>Aset</strong>
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
									<h5><i className="fa fa-list "></i> Daftar Aset</h5>
								</div>
								<div className="ibox-content">
                  {
                    this.checkAkumulasiAktif() ?
                      <div className="alert alert-danger" role="alert">
                        <p className="mb-0">** Perhatian! Ada aset yang belum di Akumulasikan !!!</p>
                      </div>
                      :
                      null
                  }
									<div className="row">
										<div className="col-lg-6">

										</div>
									</div>
									<div className="hr-line-dashed"></div>
									{

										<div className="table-responsive">
											<table className="table table-striped" align="right">
												<thead>
												<tr>
													<th style={{'width': '5%'}}>NO.</th>
													<th style={{'width': '5%'}}>NAMA</th>
													<th style={{'width': '5%'}}>TANGGAL PEMBELIAN</th>
													<th style={{'width': '10%'}}>NILAI</th>
													<th style={{'width': '10%'}}>JUMLAH PENYUSUTAN / TAHUN</th>
													<th style={{'width': '10%'}}>AKUN</th>
													<th style={{'width': '10%'}}>KAMPUS</th>
													<th style={{'width': '15%', 'textAlign': 'center'}}>AKSI</th>

												</tr>
												</thead>
												<tbody>
												{
													this.state.aset.map((data, key) =>
														<tr key={key}>
															<td>{key + 1}</td>
															<td>{data.nama}</td>
															<td>{moment(data.tanggal).format("DD/MM/YYYY")}</td>
															<td>{this.formatNumber(data.harga)}</td>
															<td>{data.jumlah_penyusutan} X</td>
															<td>{data.account_info.nama}</td>
															<td>{data.kampus_info.nama}</td>
															<td>
																<center>
																	<button
																		style={{'margin': '0 5px'}}
																		className="btn btn-primary btn-sm"
																		type="button"
																		data-toggle="modal"
																		data-target="#ModalDetailPenyusutan"
																		onClick={() => {
																			this.setState({selectedAset: data.penyusutanAset, addForm: false})
																		}}
																	>
																		<i className="fa fa-eye"></i></button>

																	<button
																		disabled={this.checkDisabled(data.penyusutanAset)}
																		style={{'margin': '0 5px'}}
																		className="btn btn-success btn-sm"
																		type="button"
																		onClick={() => this.handleApproveAset(data.id, key)}
																	>
																		<i className="fa fa-check-square"></i></button>

																	{/*<button*/}
																	{/*	onClick={() => this.handleDeleteaset(data.id, key)}*/}
																	{/*	className="btn btn-danger btn-sm"*/}
																	{/*	type="button"*/}
																	{/*><i className="fa fa-trash"></i></button>*/}
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

					<div
						className="modal inmodal"
						id="ModalDetailPenyusutan"
						tabIndex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content animated bounceInRight">
								<div className="modal-header">
									<button
										type="button"
										className="close"
										data-dismiss="modal"
									>
										<span aria-hidden="true">&times;</span>
										<span className="sr-only">Close</span>
									</button>
									<h4 className="modal-title">Detail Penyusutan Aset</h4>
								</div>
								<div className="modal-body">
									<table className="table table-hover">
										<thead>
										<th>No</th>
										<th>Tanggal</th>
										<th>Akumulasi Penyusutan</th>
										<th>Beban</th>
                    <th>Status</th>
										</thead>
										<tbody>
										{
											this.state.selectedAset.map((data, key) =>
												<tr key={key}>
													<td>{key + 1}</td>
													<td>{moment(data.tanggal).format("DD/MM/YYYY")}</td>
													<td>{this.formatNumber(data.kredit.toFixed(2))}</td>
													<td>{this.formatNumber(data.nilai_buku.toFixed(2))}</td>
                          <td>{data.approved ? <i className="fa fa-check"></i> : null }
                          </td>
												</tr>
											)
										}
										</tbody>
									</table>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-white"
										data-dismiss="modal"
									>
										Tutup
									</button>

								</div>
							</div>
						</div>
					</div>

				</div>


			</div>


		)
	}

}

export default DataJurnal