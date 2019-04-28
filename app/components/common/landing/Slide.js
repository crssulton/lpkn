import React, { Component } from 'react';
// import logo from '../../../../public/assets/assets 1/img/logo.png'
import { Link } from 'react-router';

class Slide extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="page-top" className="landing-page no-skin-config">
                <div id="inSlider" className="carousel slide" data-ride="carousel" >
                    <ol className="carousel-indicators">
                        <li className="active" data-target="#inSlider" data-slide-to="0"></li>
                        <li data-target="#inSlider" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="item active" style={{'width':'100%'}}>
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>LPKN<br/>
                                    Training Center</h1>
                                    <p>Lembaga Pendidikan Kompetensi Nasional.</p>
                                    <p>
                                        <Link to="registrasi" className="btn btn-lg btn-primary"> Registrasi </Link>
                                    </p>
                                </div>
                                <div className="carousel-image wow zoomIn">
                                </div>
                            </div>

                            <div style={{'width':'100%'}} className="header-back one"></div>

                        </div>
                        <div className="item">
                            <div className="container">
                                <div className="carousel-caption blank">
                                    <h1>LPKN<br/>
                                    Training Center</h1>
                                    <p>Lembaga Pendidikan Kompetensi Nasional.</p>
                                    <p>
                                        <Link to="registrasi" className="btn btn-lg btn-primary"> Registrasi </Link>
                                    </p>
                                </div>
                            </div>

                            <div style={{'width':'100%'}} className="header-back two"></div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#inSlider" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#inSlider" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }

}

export default Slide