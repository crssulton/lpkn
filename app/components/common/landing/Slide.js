import React, { Component } from 'react';
// import logo from '../../../../public/assets/assets 1/img/logo.png'
import { Link } from 'react-router';

class Slide extends Component {

    render() {
        return (
            <div id="inSlider" className="carousel carousel-fade" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <div className="container">
                            <div className="carousel-caption wow zoomIn">
                                {/* <img src={logo} alt="laptop"/> */}
                                <h1>LPKN<br/>
                                    Training Center</h1>
                                <p>Lembaga Pendidikan Kompetensi Nasional.</p>
                                <p>
                                    <Link to="registrasi" className="btn btn-lg btn-primary"> Registrasi </Link>
                                </p>
                            </div>
                        </div>
                        <div className="header-back two"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Slide