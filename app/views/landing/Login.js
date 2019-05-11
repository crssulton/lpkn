import React, { Component } from 'react';
import logo from '../../../public/assets/assets 1/img/laptop4.png';
import swal from 'sweetalert';
import { Link } from 'react-router';
import {BASE_URL} from '../../config/config.js';

class Login extends Component {
  constructor(props){
    super(props);
    this.state ={
      username    :'',
      password    :'',
      loading     : false,
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit   = this.handleSubmit.bind(this)
  }
  handleUsername(event){ this.setState({ username : event.target.value }) }
  handlePassword(event){ this.setState({ password : event.target.value }) }
  handleSubmit(event){
    const self = this
    self.setState({loading : true})
    event.preventDefault()

    if (this.state.username == '' || this.state.password == '') {
      toastr.error("Username dan password kosong", "Gagal ! ")
      self.setState({loading : false})
      return
    }

    let user = {
      username: this.state.username,
      password: this.state.password
    }

    fetch(BASE_URL + '/api/auth/', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',                  
      },
      body: JSON.stringify(user)
    }).then(function(response) {
      return response.json();
      toastr.warning("Gagal mendaftar secara online", "Error ! ")
    }).then(function(data) {

      if(data.non_field_errors == null){
        if (data.user.role_display == 'Akademik') {
            window.sessionStorage.setItem("user_id",  data.user.profile.id);
        }

        window.sessionStorage.setItem("token", data.token);
        window.sessionStorage.setItem("access", data.token);
        window.sessionStorage.setItem("role", data.user.role);
        
        if (data.user.role_display != "Owner") {
          window.sessionStorage.setItem("user_id",  data.user.profile.id);
        }
        
        setTimeout(() => {
            window.location = "/";
        },500);
      }else{
        toastr.warning("Username atau password salah", "Gagal ! ")
        setTimeout(() => {
            self.setState({loading : false})
        },500);
      }
    });
  }
  render() {
    return (
    <div className="passwordBox animated fadeInDown">
        <div className="row">
          <div className="col-md-12">
            <div className="ibox-content">
              <div>
                <div className="text-center">
                  <img src={logo} alt="laptop"/>
                </div><br/>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      <input type="text" className="form-control" placeholder="Username" required="" onChange={this.handleUsername}/>
                  </div>
                  <div className="form-group">
                      <input type="password" className="form-control" placeholder="Password" required="" onChange={this.handlePassword}/>
                  </div>
                  <button type="submit" className="btn btn-primary block full-width m-b" type="submit">{ this.state.loading ? "Loading..." : "Login" }</button>
       
                  <p className="text-muted text-center"><small>Tidak terdaftar sebagai mahasiswa?</small></p>
                  <Link to="registrasi" className="btn btn-sm btn-white btn-block"> Registrasi </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login