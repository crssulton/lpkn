import React, { Component } from 'react'
import { Link } from 'react-router'
import { BASE_URL } from '../../config/config.js'
import TopHeader from '../../components/common/TopHeaderLanding'
import '../../../public/assets/assets 1/css/landing.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsername (event) {
    this.setState({ username: event.target.value })
  }

  handlePassword (event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (event) {
    const self = this
    self.setState({ loading: true })
    event.preventDefault()

    if (this.state.username == '' || this.state.password == '') {
      toastr.error('Username dan password kosong', 'Gagal ! ')
      self.setState({ loading: false })
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
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function (response) {
      if(response.status != "200") {
        toastr.error('Username atau password Salah', 'Gagal ! ')
      }
      if(response.status == "500") {
        toastr.error('Terjadi kesalahan diserver', 'Gagal ! ')
      }
      return response.json();
    }).then(function (data) {
      if (data.non_field_errors == null) {
        if (data.user.role_display == 'Akademik') {
          window.sessionStorage.setItem('user_id', data.user.profile.id)
        }
        window.sessionStorage.setItem('token', data.token)
        window.sessionStorage.setItem('access', data.token)
        window.sessionStorage.setItem('role', data.user.role)

        window.sessionStorage.setItem('user', data.user.id)

        if (data.user.role_display != 'Owner') {
          window.sessionStorage.setItem('user_id', data.user.profile.id)
          window.sessionStorage.setItem('kampus_id', data.user.profile.kampus_info.id)
        }

        setTimeout(() => {
          window.location = '/'
        }, 500)
      } else {
        swal({
          icon: 'warning',
          title: 'Gagal !',
          text: 'Username atau password salah'
        })
        setTimeout(() => {
          self.setState({ loading: false })
        }, 500)
      }
    })
  }

  render () {
    return (
      <div>
        <TopHeader/>
        <div>
          <div className="passwordBox">
            <div className="row">
              <div className="col-md-12">
                <div className="ibox-content">
                  <div>
                    <br/>
                    <h2 className="text-primary" style={{ textAlign: 'center' }}>Login LPKN</h2>
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <input type="text" autoFocus={true} className="form-control"
                          placeholder="Username" required="" onChange={this.handleUsername}/>
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"
                          required=""true onChange={this.handlePassword}/>
                      </div>
                      <button type="submit" className="btn btn-primary block full-width m-b"
                        type="submit">{this.state.loading ? 'Loading...' : 'Login'}
                      </button>

                      <br/>
                      <p className="text-muted text-center">
                         Belum terdaftar sebagai mahasiswa ?
                      </p>
                      <Link to="registrasi"
                        className="btn btn-sm btn-white btn-block"> REGISTRASI </Link>
                    </form>
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

export default Login
