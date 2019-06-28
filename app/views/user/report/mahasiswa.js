import React from 'react';
import { BASE_URL } from "../../../config/config.js";
import {browserHistory} from 'react-router';
import print from "print-js";

let toggle = false
let goBack = false

export default class mahasiswa extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		toggle = false
		const {selectedJurusan} = this.props.location.state
		const {selectedKampus} = this.props.location.state

		this.state = {
			mahasiswas: [],
			mahasiswasTmp: [],
			selectedJurusan,
			selectedKampus
		}

	}

	componentWillMount = () => {
		const self = this;
	    fetch(BASE_URL + "/api/mahasiswa/", {
	      method: "get",
	      headers: {
	        Authorization: "JWT " + window.sessionStorage.getItem("token")
	      }
	    })
	      .then(function(response) {
	        return response.json();
	      })
	      .then(function(data) {
	        if (self.state.selectedKampus != 0 && self.state.selectedJurusan != 0) {

	        	self.setState({
		          mahasiswas: data.results,
		          mahasiswasTmp: data.results.filter(data => data.kampus_info.id == self.state.selectedKampus)
		        })

		        self.setState({
					mahasiswasTmp: self.state.mahasiswasTmp.filter(data => data.jurusan_info.id == self.state.selectedJurusan && data.kampus_info.id == self.state.selectedKampus)
				})
	        }

	        if (self.state.selectedKampus != 0) {
	        	self.setState({
		          mahasiswas: data.results,
		          mahasiswasTmp: data.results.filter(data => data.kampus_info.id == self.state.selectedKampus)
		        })
	        }

	        if (self.state.selectedJurusan != 0) {
	        	self.setState({
					mahasiswasTmp: self.state.mahasiswasTmp.filter(data => data.jurusan_info.id == self.state.selectedJurusan && data.kampus_info.id == self.state.selectedKampus)
				})
	        }

	        if (self.state.selectedKampus == 0 && self.state.selectedJurusan == 0) {

	        	self.setState({
		          mahasiswas: data.results,
		          mahasiswasTmp: data.results
		        })
	        }
	        
	      });
	}

	componentDidUpdate(){
		if (toggle) {
			this.exportData()
			this.props.history.push('/mahasiswa')
		}
		toggle = true
	}

	exportData = () => {
	    printJS({
	      printable: "print_data",
	      type: "html",
	      modalMessage: "Sedang memuat data...",
	      showModal: true,
	      maxWidth: "1300",
	      font_size: "8pt",
	      documentTitle: "DATA MAHASISWA",
	      targetStyles: ["*"]
	    });

	  }

	render() {
		return (
			<div style={{ backgroundColor: "white"}} id="print_data">
            <table className="table table-bordered"
            >
              <thead>
                <tr>
                  <th
                  >
                    NO.
                  </th>
                  <th
                  >
                    NIM.
                  </th>
                  <th
                  >
                    NAMA
                  </th>
                  <th
                  >
                    ALAMAT
                  </th>
                  <th
                    
                  >
                    TMPT LAHIR
                  </th>
                  <th
                    
                  >
                    TGL LAHIR
                  </th>
                  <th
                    
                  >
                    JK
                  </th>
                  <th
                    
                  >
                    JURUSAN
                  </th>
                  <th
                    
                  >
                    TOTAL BAYAR
                  </th>
                  <th
                    
                  >
                    ANGKATAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.mahasiswasTmp
                 .map((data, key) => (
                    <tr>
                      <td>
                        {key + 1}
                      </td>
                      <td>
                        {data.nim}
                      </td>
                      <td>
                        {data.nama}
                      </td>
                      <td>
                        {data.alamat}
                      </td>
                      <td>
                        {data.tempat_lahir}
                      </td>
                      <td>
                        {data.tgl_lahir}
                      </td>
                      <td>
                        {data.jenis_kelamin}
                      </td>
                      <td>
                        {data.jurusan_info.nama}
                      </td>
                      <td>
                        {data.total_bayar}
                      </td>
                      <td>
                        {data.tahun_angkatan}
                      </td>
                    </tr>
                  ))}

              </tbody>
            </table>
          </div>
		);
	}
}
