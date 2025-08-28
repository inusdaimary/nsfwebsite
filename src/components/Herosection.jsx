import React from "react";
import Dashboard from "../layout/Dashboard";
import { Link } from "react-router-dom";

import Header from "./Header";
const Herosection = () => {
    return (
        <>
            <Header />
            <div className="hero overlay" style={{ backgroundImage: "url('images/bg_3.jpg')" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 ml-auto">
                            <h1 className="text-white">NSF Martyrs’ Memorial Trophy 2025</h1>
                            <p>25th Silver Jubilee Edition Goal for Peace</p>
                            <div id="date-countdown"></div>
                            <p>
                                <Link to="Book-Ticket" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</Link >
                                <Link to="#" className="more light">Learn More</Link >

                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Dashboard />
        </>
    )

}


export default Herosection;