import React from "react";


const Contactus = () => {

    return (
        <>

            <div className="container my-5" id="Contact">
                <div className="card shadow-lg border-0 rounded-3">
                    <div className="card-body p-5">
                        <div className="row g-4">

                            <div className="col-lg-7">
                                <h3 className="mb-4 fw-bold">Contact for sponsorship</h3>
                                <form action="#">
                                    <div className="mb-3">
                                        <input type="text" className="form-control form-control-lg" placeholder="Your Name" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control form-control-lg" placeholder="Your Email" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control form-control-lg" placeholder="Subject" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className="form-control form-control-lg" rows="5" placeholder="Write your message..." required></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg w-100">
                                        Send Message
                                    </button>
                                </form>
                            </div>


                            <div className="col-lg-5">
                                <div className="bg-primary text-white rounded-3 h-100 p-4 d-flex flex-column justify-content-center shadow-sm">
                                    <h4 className="fw-bold mb-4">Contact Information</h4>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <i className="bi bi-geo-alt-fill me-2"></i>
                                            <strong>Address:</strong><br />
                                            <span className="ms-4"></span>
                                        </li>
                                        <li className="mb-3">
                                            <i className="bi bi-envelope-fill me-2"></i>
                                            <strong>Email:</strong><br />
                                            <span className="ms-4"><a href="#" className="text-white text-decoration-none">customercare@bingeboxx.com</a></span>

                                        </li>
                                        <li>
                                            <i className="bi bi-telephone-fill me-2"></i>
                                            <strong>Phone:</strong><br />
                                            <span className="ms-4"><a href="tel:+910000000000" className="text-white text-decoration-none">+91-87942 44328</a></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Contactus;