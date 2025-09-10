import React from "react";
import { Link } from "react-scroll";
const Header = () => {
    return (

        <>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>
            <header className="site-navbar py-4" role="banner">

                <div className="container">
                    <div className="d-flex align-items-center">
                        <div className="site-logo">
                            {/* <p style={{ color: "white" }}>Naga Students' Federation</p>
                             */}
                            <img
                                src="nsf/nsf.jpeg"
                                alt=""
                                className="band_logo"
                                style={{
                                    marginTop: '-21px',
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginRight: "5px"

                                }}
                            />

                            <img
                                src="nsf/25thNSFAnniversarylogo.png"
                                alt=""
                                className="band_logo"
                                style={{
                                    marginTop: '-21px',
                                    width: "110px",
                                    height: "110px",
                                    borderRadius: "50%",
                                    objectFit: "cover",

                                }}
                            />
                            <img
                                src="nsf/nsflogo.jpg"
                                alt=""
                                className="band_logo"
                                style={{
                                    marginTop: '-21px',
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "50%",
                                    objectFit: "cover",


                                }}
                            />


                        </div>
                        <div className="ml-auto">
                            <nav className="site-navigation position-relative text-right" role="navigation">
                                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block" style={{ cursor: "pointer" }}>
                                    <li >
                                        <Link to="/" smooth={true}
                                            duration={500}
                                            offset={-70} className="nav-link">Home</Link>

                                    </li>
                                    <li>
                                        <Link
                                            to="matches"
                                            smooth={true}
                                            duration={500}
                                            offset={-70}
                                            className="nav-link"
                                        >
                                            Matches
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="Players" smooth={true} duration={500} offset={-70} className="nav-link">Players</Link>
                                    </li>

                                    <li>
                                        <Link to="Contact" smooth={true} duration={500} offset={-70} className="nav-link">Contact</Link>
                                    </li>
                                </ul>
                            </nav>

                            <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"><span
                                className="icon-menu h3 text-white"></span></a>
                        </div>
                    </div>
                </div>

            </header>



        </>
    )


}

export default Header;