import React from "react";
import logo from "../../../../public/assets/assets 1/img/logo_bw.png";
import {browserHistory} from 'react-router';

export default class invoice_print extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate = () => {
  	window.print()
  	this.props.history.goBack()
  }

  render() {
    return (
      <div className="white-bg">
        <div className="wrapper wrapper-content p-xl">
          <div className="ibox-content p-xl">
            <div className="row">
              <div className="col-sm-6">
                <h5>From:</h5>
                <address>
                  <strong>LPKN Training Center.</strong>
                  <br />
                  Kampus Mataram <br />
                  Jl. Pejanggik 60 Pajang Timur, Mataram
                  <br />
                  <abbr title="Phone">Tlp:</abbr> 0370-632437
                </address>
              </div>

              <div className="col-sm-6 text-right">
                <h4>Invoice No.</h4>
                <h4 className="text-navy">INV-000567F7-00</h4>
                <span>To:</span>
                <address>
                  <strong>Muhammad Ramdani</strong>
                  <br />
                  01.002.019
                  <br />
                  Manajemen
                  <br />
                </address>
                <p>
                  <span>
                    <strong>Invoice Date:</strong> Mei 13, 2019
                  </span>
                  <br />
                  <span>
                    <strong>Due Date:</strong> April 31 , 2019
                  </span>
                </p>
              </div>
            </div>

            <img
                style={{
                  position: "absolute",
                  left: "270px",
                  top: "100px",
                  width: "50%",
                  height: "auto",
                  opacity: "0.3"
                }}
                src={logo}
                alt="logo lpkn"
              />

            <div className="table-responsive m-t">
              <table className="table invoice-table">
                <thead>
                  <tr>
                  	<th>Item</th>
                    <th>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <strong>Pembayaran SPP Mahasiswa</strong>
                      </div>
                      <small>
                        Pembayaran SPP Bulan Mei 2018
                      </small>
                    </td>
                    <td>Rp. 2.000.000</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>

            <table className="table invoice-total">
              <tbody>
                <tr>
                  <td>
                    <strong>Sub Total :</strong>
                  </td>
                  <td>Rp. 2.000.000</td>
                </tr>
                <tr>
                  <td>
                    <strong>TOTAL :</strong>
                  </td>
                  <td>Rp. 2.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
