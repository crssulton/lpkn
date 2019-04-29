import React, { Component } from 'react';
import cookie from 'react-cookies';	

class Dashboard extends Component {



    componentDidMount(){
    
    }

 

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Dashboard</h2>
		                <ol className="breadcrumb">
		                    <li className="breadcrumb-item active">
		                        <a href="index.html">Dashboard</a>
		                    </li>
		                </ol>
		            </div>
		        </div>
		        <div className="row wrapper wrapper-content animated fadeInRight">
		            
		        </div>

            </div>
        )
    }

}

export default Dashboard