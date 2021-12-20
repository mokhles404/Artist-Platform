import React from 'react'
import { HashLink } from 'react-router-hash-link';

import {
  Link
} from "react-router-dom";
function Navbar() {
  const logostyle = {
    marginRight:"3vw",
    maxWidth:"140px",
    
    
  };

  return (
    <header className="navbar navbar-expand-md navbar-dark d-print-none" >
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
          <span className="navbar-toggler-icon" />
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <Link to="/">
          <img alt={"logo"} src="assets/logo/logo4.png"  style={logostyle}/>
      </Link>
        </h1>
        <div className="navbar-nav flex-row order-md-last float-right ">
          <div className="m-auto d-flex justify-content-center ">
            <div className="col-md-6 col-lg-6 col-xl-6"  style={{marginRight:"20px", width:"130px",}}>
              <Link to="/login" className="d-block btn btn-danger " >Login</Link>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6" style={{ width:"130px",}}>
              <Link to="/singup" className="d-block btn btn-danger" >Sign up</Link>
            </div>
          </div>


        </div>
        <div className="collapse navbar-collapse " id="navbar-menu">
          <div  className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <HashLink to="/" className="nav-link">
                  <span className="nav-link-title">
                    Home
              </span>
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#about" className="nav-link">
                  <span className="nav-link-title">
                    About
              </span>
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#contactus" className="nav-link">
                  <span className="nav-link-title">
                    Contact US
              </span>
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
