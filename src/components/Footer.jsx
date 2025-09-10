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
                             {/* <li><a href="/pricing-details">Pricing Details</a></li> */}
                            <li><a href="/contac-us">Contact Us</a></li>

                            {/* <li><a href="#!">Coupon</a></li> */}
                            {/* <li><a href="/player-form">Team Form</a></li> */}

                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Info</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about-us">About Us</a></li>
                            <li><a href="/terms-conditions">Terms & Conditions</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/refund-policy">Refund Policy</a></li>

                            
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