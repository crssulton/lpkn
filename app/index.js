import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

// eslint-disable-next-line no-unused-vars
import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap'


let components = null;

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './../public/styles/style.css'


if (window.sessionStorage.getItem('access') === null || window.sessionStorage.getItem('role') === null){
  components = require('./routes/landing').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') == "1") {
  components = require('./routes/mahasiswa').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') == "2"){
  components = require('./routes/dosen').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '3') {
  components = require('./routes/admin').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '4') {
  components = require('./routes/keuangan').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '5'){
  components = require('./routes/akademik').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '6') {
  components = require('./routes/kepala_cabang').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '7') {
  components = require('./routes/HRD').default;
}
else if (window.sessionStorage.getItem('access') !== 'undefined' && window.sessionStorage.getItem('role') === '8') {
  components = require('./routes/owner').default;
}


ReactDOM.render(
  <Router history={hashHistory}>{components}</Router>,
  document.getElementById('root')
);