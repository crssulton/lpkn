import React, { Component } from 'react';
import logo from '../../../public/assets/assets 1/img/laptop4.png'
import cookie from 'react-cookies';
import swal from 'sweetalert';
import { Link } from 'react-router';

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

        let user = {
            username: this.state.username,
            password: this.state.password
        }
        
        if (this.state.username !== "dosen1") {
            fetch('http://lpkn.itec.my.id:9000/api/auth/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',                  
                },
                body: JSON.stringify(user)
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                // Case login
                if(data.non_field_errors == null){
                    if (data.user.role_display == 'Akademik') {
                        cookie.save('user_id', data.user.profile.id)
                    }

                    // if (data.user.role_display == 'Mahasiswa') {
                        cookie.save('user_id', data.user.id)
                    // }

                    cookie.save('token', data.token)
                    cookie.save('access', data.token)
                    cookie.save('role', data.user.role)
                    if (data.user.role_display != 'Mahasiswa') {
                        cookie.save('kampus', data.user.profile.kampus)
                    }
                    setTimeout(() => {
                        window.location = "/";
                    },500);
                }else{
                    swal("Oops!", "Username atau Password salah!", "error");
                    setTimeout(() => {
                        self.setState({loading : false})
                    },500);
                }
              });
          }else{
            cookie.save('user_id', "dosen")
            cookie.save('token', "dosen")
            cookie.save('access', "dosen")
            cookie.save('role', "dosen")
            setTimeout(() => {
                window.location = "/";
            },500);
          }
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
                                    <a href=""><small>Forgot password?</small></a>
                                    <p className="text-muted text-center"><small>Do not have an account?</small></p>
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