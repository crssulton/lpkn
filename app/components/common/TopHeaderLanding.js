import React from 'react'
import { smoothlyMenu } from '../layouts/Helpers'
import logo from '../../../public/assets/assets 1/img/laptop4.png'
import '../../../public/assets/assets 1/css/landing.css'

class TopHeader extends React.Component {
  toggleNavigation (e) {
    e.preventDefault()
    $('body').toggleClass('mini-navbar')
    smoothlyMenu()
  }

  render () {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top white-bg" role="navigation" style={{ marginBottom: 0 }}>
          <div className="navbar-header">
            <a className="navbar-minimalize minimalize-styl-2" style={{marginTop: '0px'}}
              href="#"> <img src={logo} alt="logo" width="80" style={{padding: '5px'}}/>
            </a>
          </div>

          <ul className="nav navbar-top-links navbar-left">
            <li>
              <a href="http://www.lpkntrainingcenter.sch.id/"  className="navlanding" style={{ color: '#212F3C' }}>
                <i className="fa fa-home"></i> Portal LPKN
              </a>
            </li>
            <li style={styles}>
              <a href="#" style={{ color: 'white' }} className="navlanding">
                <i className="fa fa-graduation-cap"></i> SIA LPKN
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

const styles = {
  backgroundColor: '#34495E'
}

export default TopHeader
