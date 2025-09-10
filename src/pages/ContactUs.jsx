import React from "react";
import aboutBg from "../../public/images/bg_1.jpg";

const ContactUs = () => {
    return (
        <>
            <div className="contact-page  min-vh-100 d-flex align-items-center" style={{
                minHeight: "100vh",
                paddingTop: "15vh",
                backgroundImage: `url(${aboutBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                position: "relative",
                zIndex: 1,
            }}>

                <div className="container py-5">


                    <div className="row g-4">
                        {/* Contact Info */}
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-4 h-100">
                                <div
                                    className="card-header text-white p-4"
                                    style={{
                                        background: "linear-gradient(135deg, #0d6efd, #20c997)",
                                    }}
                                >
                                    <h3 className="mb-0 fw-semibold">Get in Touch</h3>
                                </div>
                                <div className="card-body p-4">
                                    {/* <p className="mb-3">
                                        <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                      Dimapur, Nagaland
                                    </p> */}
                                    <p className="mb-3">
                                        <i className="bi bi-envelope-fill text-primary me-2"></i>
                                        customercare@bingeboxx.com
                                    </p>
                                    <p className="mb-3">
                                        <i className="bi bi-telephone-fill text-primary me-2"></i>
                                        +91-87942 44328.
                                    </p>
                                    <hr />
                                    <h6 className="fw-semibold mb-3">Follow Us</h6>
                                    <div className="d-flex gap-3">
                                        <a href="#" className="text-primary fs-4">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                        <a href="#" className="text-info fs-4">
                                            <i className="bi bi-twitter"></i>
                                        </a>
                                        <a href="#" className="text-danger fs-4">
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                        <a href="#" className="text-dark fs-4">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-4">
                                <div
                                    className="card-header text-white p-4"
                                    style={{
                                        background: "linear-gradient(135deg, #20c997, #0d6efd)",
                                    }}
                                >
                                    <h3 className="mb-0 fw-semibold">Send Us a Message</h3>
                                </div>
                                <div className="card-body p-4">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Phone"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Message</label>
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                placeholder="Write your message..."
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ContactUs;
