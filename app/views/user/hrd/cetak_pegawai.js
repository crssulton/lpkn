import React from 'react';
import print from 'print-js'
import {BASE_URL} from '../../../config/config.js'


const styles = {
	'border': '1px solid black',
	'width': '100%',

}

export default class cetak_pegawai extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
        this.state = {
            pegawai: []
        }
	}

	shouldComponentUpdate(){
		printJS({ printable: 'print_data', type: 'html', header: 'PrintJS - Form Element Selection' })
	}

	componentWillMount(){
		const self = this
		
		fetch(BASE_URL + '/api/pegawai/', {
			method: 'get',
			headers: {
				'Authorization': 'JWT ' + window.sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			self.setState({
				pegawai: data.results
			})
		});
	}

	exportData(){
        printJS({
            printable: 'print_data',
            type: 'html',
            modalMessage:"Sedang memuat data...",
            showModal:true,
            maxWidth:'1300',
            font_size:'8pt',
            documentTitle:'DATA PEGAWAI',
            targetStyle: [
                'margin',
                'color',
                'border-collapse',
                'border-spacing',
                'border-style',
                'border',
                'background-color',
                'border-style',
                'margin-bottom',
                'padding',
                'Label',
                'background'
            ]
        })
     }

	render() {
		const styletb = {
            borderCollapse:'collapse',
            borderSpacing:0,
            borderStyle:'solid',
            width:'100%',
            fontSize:'12px'
        }

		return (
			<div style={{'backgroundColor': 'white', 'display' : 'none'}}>
				<button onClick={() => this.exportData()}>print</button>
				<table border="1" align="left" style={styletb} id="print_data" width="100%" style={{fontSize:'12px'}}>
                    <thead>
                    <tr>
                    	<th align="left" style={{background:'#e5e5e5',padding:'4px'}}>NO.</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>NAMA</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>ALAMAT</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>TMPT LAHIR</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>TGL LAHIR</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>JK</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>AGAMA</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>HP</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>STATUS</th>
                        <th align="left" style={{background:'#e5e5e5',padding:'4px'}}>PENDIDIKAN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    	this.state.pegawai.map((data, key) =>
                    		<tr >
                    			<td style={{padding:'4px',textAlign:'left'}}>{key+1}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.nama}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.alamat}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.tempat_lahir}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.tgl_lahir}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.jenis_kelamin}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.agama}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.no_hp}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.status_menikah}</td>
                                <td style={{padding:'4px',textAlign:'left'}}>{data.pendidikan_terakhir.toUpperCase()}</td>
                            </tr>
                    	)
                    }
                    </tbody>
                </table>
			</div>
		);
	}
}
