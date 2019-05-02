import React from 'react';
import Progress from '../../../common/user/Progress';
import Navigation from '../../../common/user/kepala-cabang/NavigationKepalaCabang';
import Footer from '../../../common/user/Footer';
import TopHeader from '../../../common/user/TopHeader';
import { correctHeight, detectBody } from '../Helpers';

class Main extends React.Component {

    render() {
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        return (
            <div id="wrapper">
                <Progress />
                <Navigation location={this.props.location}/>
                <div id="page-wrapper" className={wrapperClass}>
                    <TopHeader />
                    {this.props.children}
                    <Footer />
                </div>
            </div>

        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

export default Main