import React from 'react';
import { Link } from 'react-router';

class TopHeader extends React.Component {
    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleclassName("mini-navbar");
        smoothlyMenu();
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-fixed-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <Link to="home" className="navbar-minimalize minimalize-styl-2 btn btn-primary "> LPKN </Link>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li><Link to="login"> Masuk </Link></li>
                        <li><Link to="registrasi"> Registrasi </Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default TopHeader