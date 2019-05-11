import React, { Component } from 'react';

class Dashboard extends Component {
    componentDidMount(){
    }

    render() {
        return (
            <div >
                <div className="row wrapper border-bottom white-bg page-heading">
		            <div className="col-lg-8">
		                <h2>Dashboard Owner</h2>
		                <ol className="breadcrumb">
		                    <li className="breadcrumb-item active">
		                        <a>Dashboard</a>
		                    </li>
		                </ol>
		            </div>
		        </div>
		        <div className="row wrapper wrapper-content animated fadeInRight">
		        	<div className="row">
	                    <div className="col-lg-3">
	                        <div className="ibox ">
	                            <div className="ibox-title">
	                                <h5>Cabang Kampus</h5>
	                            </div>
	                            <div className="ibox-content">
	                                <h1 className="no-margins">4</h1>
	                                <small>Total income</small>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-lg-3">
	                        <div className="ibox ">
	                            <div className="ibox-title">
	                                <span className="label label-info float-right">Annual</span>
	                                <h5>Mahasiswa</h5>
	                            </div>
	                            <div className="ibox-content">
	                                <h1 className="no-margins">275,800</h1>
	                                <small>New orders</small>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-lg-3">
	                        <div className="ibox ">
	                            <div className="ibox-title">
	                                <span className="label label-primary float-right">Today</span>
	                                <h5>Staff</h5>
	                            </div>
	                            <div className="ibox-content">
	                                <h1 className="no-margins">106,120</h1>
	                                <small>New visits</small>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-lg-3">
	                        <div className="ibox ">
	                            <div className="ibox-title">
	                                <span className="label label-danger float-right">Low value</span>
	                                <h5>Dosen</h5>
	                            </div>
	                            <div className="ibox-content">
	                                <h1 className="no-margins">80,600</h1>
	                                <small>In first month</small>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                
	                <div className="row">
	                    <div className="col-lg-4">
	                        <div className="ibox ">
	                            <div className="ibox-title">
	                                <h5>Messages</h5>
	                                <div className="ibox-tools">
	                                    <a className="collapse-link">
	                                        <i className="fa fa-chevron-up"></i>
	                                    </a>
	                                    <a className="close-link">
	                                        <i className="fa fa-times"></i>
	                                    </a>
	                                </div>
	                            </div>
	                            <div className="ibox-content ibox-heading">
	                                <h3><i className="fa fa-envelope-o"></i> New messages</h3>
	                                <small><i className="fa fa-tim"></i> You have 22 new messages and 16 waiting in draft folder.</small>
	                            </div>
	                            <div className="ibox-content">
	                                <div className="feed-activity-list">

	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right text-navy">1m ago</small>
	                                            <strong>Monica Smith</strong>
	                                            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</div>
	                                            <small className="text-muted">Today 5:60 pm - 12.06.2014</small>
	                                        </div>
	                                    </div>

	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right">2m ago</small>
	                                            <strong>Jogn Angel</strong>
	                                            <div>There are many variations of passages of Lorem Ipsum available</div>
	                                            <small className="text-muted">Today 2:23 pm - 11.06.2014</small>
	                                        </div>
	                                    </div>

	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right">5m ago</small>
	                                            <strong>Jesica Ocean</strong>
	                                            <div>Contrary to popular belief, Lorem Ipsum</div>
	                                            <small className="text-muted">Today 1:00 pm - 08.06.2014</small>
	                                        </div>
	                                    </div>

	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right">5m ago</small>
	                                            <strong>Monica Jackson</strong>
	                                            <div>The generated Lorem Ipsum is therefore </div>
	                                            <small className="text-muted">Yesterday 8:48 pm - 10.06.2014</small>
	                                        </div>
	                                    </div>


	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right">5m ago</small>
	                                            <strong>Anna Legend</strong>
	                                            <div>All the Lorem Ipsum generators on the Internet tend to repeat </div>
	                                            <small className="text-muted">Yesterday 8:48 pm - 10.06.2014</small>
	                                        </div>
	                                    </div>
	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right">5m ago</small>
	                                            <strong>Damian Nowak</strong>
	                                            <div>The standard chunk of Lorem Ipsum used </div>
	                                            <small className="text-muted">Yesterday 8:48 pm - 10.06.2014</small>
	                                        </div>
	                                    </div>
	                                    <div className="feed-element">
	                                        <div>
	                                            <small className="float-right">5m ago</small>
	                                            <strong>Gary Smith</strong>
	                                            <div>200 Latin words, combined with a handful</div>
	                                            <small className="text-muted">Yesterday 8:48 pm - 10.06.2014</small>
	                                        </div>
	                                    </div>

	                                </div>
	                            </div>
	                        </div>
	                    </div>

	                    <div className="col-lg-8">

	                        <div className="row">
	                            <div className="col-lg-6">
	                                <div className="ibox ">
	                                    <div className="ibox-title">
	                                        <h5>User project list</h5>
	                                        <div className="ibox-tools">
	                                            <a className="collapse-link">
	                                                <i className="fa fa-chevron-up"></i>
	                                            </a>
	                                            <a className="close-link">
	                                                <i className="fa fa-times"></i>
	                                            </a>
	                                        </div>
	                                    </div>
	                                    <div className="ibox-content table-responsive">
	                                        <table className="table table-hover no-margins">
	                                            <thead>
	                                                <tr>
	                                                    <th>Status</th>
	                                                    <th>Date</th>
	                                                    <th>User</th>
	                                                    <th>Value</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
	                                                <tr>
	                                                    <td><small>Pending...</small></td>
	                                                    <td><i className="fa fa-clock-o"></i> 11:20pm</td>
	                                                    <td>Samantha</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 24% </td>
	                                                </tr>
	                                                <tr>
	                                                    <td><span className="label label-warning">Canceled</span> </td>
	                                                    <td><i className="fa fa-clock-o"></i> 10:40am</td>
	                                                    <td>Monica</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 66% </td>
	                                                </tr>
	                                                <tr>
	                                                    <td><small>Pending...</small> </td>
	                                                    <td><i className="fa fa-clock-o"></i> 01:30pm</td>
	                                                    <td>John</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 54% </td>
	                                                </tr>
	                                                <tr>
	                                                    <td><small>Pending...</small> </td>
	                                                    <td><i className="fa fa-clock-o"></i> 02:20pm</td>
	                                                    <td>Agnes</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 12% </td>
	                                                </tr>
	                                                <tr>
	                                                    <td><small>Pending...</small> </td>
	                                                    <td><i className="fa fa-clock-o"></i> 09:40pm</td>
	                                                    <td>Janet</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 22% </td>
	                                                </tr>
	                                                <tr>
	                                                    <td><span className="label label-primary">Completed</span> </td>
	                                                    <td><i className="fa fa-clock-o"></i> 04:10am</td>
	                                                    <td>Amelia</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 66% </td>
	                                                </tr>
	                                                <tr>
	                                                    <td><small>Pending...</small> </td>
	                                                    <td><i className="fa fa-clock-o"></i> 12:08am</td>
	                                                    <td>Damian</td>
	                                                    <td className="text-navy"> <i className="fa fa-level-up"></i> 23% </td>
	                                                </tr>
	                                            </tbody>
	                                        </table>
	                                    </div>
	                                </div>
	                            </div>
	                            <div className="col-lg-6">
	                                <div className="ibox ">
	                                    <div className="ibox-title">
	                                        <h5>Small todo list</h5>
	                                        <div className="ibox-tools">
	                                            <a className="collapse-link">
	                                                <i className="fa fa-chevron-up"></i>
	                                            </a>
	                                            <a className="close-link">
	                                                <i className="fa fa-times"></i>
	                                            </a>
	                                        </div>
	                                    </div>
	                                    <div className="ibox-content">
	                                        <ul className="todo-list m-t small-list">
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-check-square"></i> </a>
	                                                <span className="m-l-xs todo-completed">Buy a milk</span>

	                                            </li>
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-square-o"></i> </a>
	                                                <span className="m-l-xs">Go to shop and find some products.</span>

	                                            </li>
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-square-o"></i> </a>
	                                                <span className="m-l-xs">Send documents to Mike</span>
	                                                <small className="label label-primary"><i className="fa fa-clock-o"></i> 1 mins</small>
	                                            </li>
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-square-o"></i> </a>
	                                                <span className="m-l-xs">Go to the doctor dr Smith</span>
	                                            </li>
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-check-square"></i> </a>
	                                                <span className="m-l-xs todo-completed">Plan vacation</span>
	                                            </li>
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-square-o"></i> </a>
	                                                <span className="m-l-xs">Create new stuff</span>
	                                            </li>
	                                            <li>
	                                                <a href="#" className="check-link"><i className="fa fa-square-o"></i> </a>
	                                                <span className="m-l-xs">Call to Anna for dinner</span>
	                                            </li>
	                                        </ul>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div className="row">
	                            <div className="col-lg-12">
	                                <div className="ibox ">
	                                    <div className="ibox-title">
	                                        <h5>Transactions worldwide</h5>
	                                        <div className="ibox-tools">
	                                            <a className="collapse-link">
	                                                <i className="fa fa-chevron-up"></i>
	                                            </a>
	                                            <a className="close-link">
	                                                <i className="fa fa-times"></i>
	                                            </a>
	                                        </div>
	                                    </div>
	                                    <div className="ibox-content">

	                                        <div className="row">
	                                            <div className="col-lg-6">
	                                                <table className="table table-hover margin bottom">
	                                                    <thead>
	                                                        <tr>
	                                                            <th style={{"width": "1%"}} className="text-center">No.</th>
	                                                            <th>Transaction</th>
	                                                            <th className="text-center">Date</th>
	                                                            <th className="text-center">Amount</th>
	                                                        </tr>
	                                                    </thead>
	                                                    <tbody>
	                                                        <tr>
	                                                            <td className="text-center">1</td>
	                                                            <td> Security doors
	                                                            </td>
	                                                            <td className="text-center small">16 Jun 2014</td>
	                                                            <td className="text-center"><span className="label label-primary">$483.00</span></td>

	                                                        </tr>
	                                                        <tr>
	                                                            <td className="text-center">2</td>
	                                                            <td> Wardrobes
	                                                            </td>
	                                                            <td className="text-center small">10 Jun 2014</td>
	                                                            <td className="text-center"><span className="label label-primary">$327.00</span></td>

	                                                        </tr>
	                                                        <tr>
	                                                            <td className="text-center">3</td>
	                                                            <td> Set of tools
	                                                            </td>
	                                                            <td className="text-center small">12 Jun 2014</td>
	                                                            <td className="text-center"><span className="label label-warning">$125.00</span></td>

	                                                        </tr>
	                                                        <tr>
	                                                            <td className="text-center">4</td>
	                                                            <td> Panoramic pictures</td>
	                                                            <td className="text-center small">22 Jun 2013</td>
	                                                            <td className="text-center"><span className="label label-primary">$344.00</span></td>
	                                                        </tr>
	                                                        <tr>
	                                                            <td className="text-center">5</td>
	                                                            <td>Phones</td>
	                                                            <td className="text-center small">24 Jun 2013</td>
	                                                            <td className="text-center"><span className="label label-primary">$235.00</span></td>
	                                                        </tr>
	                                                        <tr>
	                                                            <td className="text-center">6</td>
	                                                            <td>Monitors</td>
	                                                            <td className="text-center small">26 Jun 2013</td>
	                                                            <td className="text-center"><span className="label label-primary">$100.00</span></td>
	                                                        </tr>
	                                                    </tbody>
	                                                </table>
	                                            </div>
	                                            <div className="col-lg-6">
	                                                <div id="world-map" style={{"height": "300px"}}></div>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>

	                    </div>


	                </div>
		        </div>
            </div>
        )
    }

}

export default Dashboard