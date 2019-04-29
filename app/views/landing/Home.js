import React, { Component } from 'react';
import SlideLP from '../../../app/components/common/landing/Slide';

class Home extends Component {

    render() {
        console.log(window.sessionStorage.getItem("key"))
        return (
            <div>
                <SlideLP/>
                <section id="team" className="gray-section team">
                    <div className="container">
                        <div className="row m-b-lg">
                            <div className="col-lg-12 text-center">
                                <div className="navy-line"></div>
                                <h1>LPKN Training Center</h1>
                                <p>LPKN Training Center</p>
                            </div>
                        </div>
                        
                        <div className="row">
                           
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default Home