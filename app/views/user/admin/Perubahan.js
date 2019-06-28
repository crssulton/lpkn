import React, { Component } from 'react';
import { Link} from 'react-router';

class Perubahan extends Component {

    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Perubahan Data</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <strong>Perubahan Data</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
                <div className="wrapper wrapper-content">
                    <div className="row animated fadeInRight">
                        <div className="ibox ">
                            <div className="ibox-title">
                                <h5>Form</h5>
                            </div>
                            <div className="ibox-content">
                                isi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Perubahan