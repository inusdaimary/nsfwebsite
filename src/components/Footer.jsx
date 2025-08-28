import React from "react";

const Footer = () => {

    return (
        <footer className="page-footer  font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">NSF Martyrs' Memorial Trophy</h5>
                        <p>
                            A tribute to Kekuojalie Sachü & Vikhozo Yhoshü (1986).<br />
                            Celebrating unity, peace, and sportsmanship.<br />
                            Honoring legacy since 1996.
                        </p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Tickets</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!">Online Ticket</a></li>
                            <li><a href="#!">Payment and Prices</a></li>
                            <li><a href="#!">Contact &amp; Booking</a></li>
                            <li><a href="#!">Coupon</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Social</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3">© {new Date().getFullYear()}  Copyright:  All rights reserved
                <a href="https://play.google.com/store/apps/details?id=com.bingeboxx.app&pcampaignid=web_share"> BingeBoxx.com</a>
            </div>

        </footer>
    )

}

export default Footer;