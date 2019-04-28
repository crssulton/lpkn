import React from 'react';
import Progress from '../../common/landing/Progress';
import Footer from '../../common/landing/Footer';
import TopHeader from '../../common/landing/TopHeader';

class Main extends React.Component {

    render() {
        return (
            <div id="page-top">
                <Progress/>
                <TopHeader/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }

    componentDidMount(){
        $('body').addClass('gray-bg');
    }

    componentWillUnmount(){
        $('body').removeClass('gray-bg');
    }
}

export default Main