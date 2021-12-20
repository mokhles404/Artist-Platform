import React from 'react'
import { HashLink } from 'react-router-hash-link';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const Nav = () => {
    return (
        <header className="page_header header_white toggler_xs_right tall_header ">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 display_table">
                    <div className="header_left_logo display_table_cell"> <Link to="./" className="logo top_logo">
                <img src="assets/images/logo.png" />
            </Link> </div>
                    <div className="header_mainmenu display_table_cell text-center">
                        {/* <!-- main nav start --> */}
                        <nav className="mainmenu_wrapper">
                            <ul className="mainmenu nav sf-menu">
                                {/* <li className="active"> <a href="#canvas">Home</a>
                                    <ul>
                                        <li> <a href="index.html">Home</a> </li>
                                        <li> <a href="index-static.html">Home static intro</a> </li>
                                        <li> <a href="index-single.html">Home single page</a> </li>
                                    </ul>
                                </li> */}
                                <li>  <HashLink to="#about">About</HashLink> </li>
                               

                                <li>  <HashLink to="#contactus" >Contact US</HashLink> </li>
                               
                            </ul>
                        </nav>
                        {/* <!-- eof main nav --> */}
                        {/* <!-- header toggler --><span className="toggle_menu"><span></span></span> */}
                    </div>
                    <div className="header_right_buttons display_table_cell text-right hidden-xs"> <Link to="/login" className="theme_button color1">Login</Link> </div>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Nav
