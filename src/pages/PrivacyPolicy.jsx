import React from "react";
import aboutBg from "../../public/images/bg_1.jpg";

const PrivacyPolicy = () => {
    return (
        <>

            <div className="privacy-page  min-vh-100 d-flex align-items-center" style={{
                minHeight: "100vh",
                paddingTop: "15vh",
                 backgroundImage: `url(${aboutBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="container" >

                    <div className="row justify-content-center">

                        <div className="col-lg-10">
                            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="text-center mb-5">
                                    <h1 className="fw-bold display-4 text-dark">Privacy Policy</h1>
                                    <p className="text-muted lead">
                                        We respect your privacy. Learn how we handle and safeguard your information.
                                    </p>
                                </div>
                                {/* Banner */}
                                <div className="bg-gradient text-dark p-4"
                                    style={{ background: "linear-gradient(135deg, #007bff, #6610f2)" }}>
                                    <h2 className="mb-0 fw-bold">Our Commitment to Your Privacy</h2>
                                    <p className="mb-0">
                                        Last updated: <span className="fw-semibold">September 2025</span>
                                    </p>
                                </div>

                                {/* Content */}
                                <div className="card-body p-5">
                                    <section className="mb-5">
                                        <h3 className="fw-semibold">1. Information We Collect</h3>
                                        <p className="text-muted">
                                            We collect details such as your name, email, phone, and payment info when booking tickets.
                                            We may also collect device & usage information to enhance your experience.
                                        </p>
                                    </section>

                                    <section className="mb-5">
                                        <h3 className="fw-semibold">2. How We Use Your Data</h3>
                                        <ul className="text-muted">
                                            <li>To process ticket bookings securely</li>
                                            <li>To personalize your experience</li>
                                            <li>To send booking confirmations & updates</li>
                                            <li>To comply with legal and financial regulations</li>
                                        </ul>
                                    </section>

                                    <section className="mb-5">
                                        <h3 className="fw-semibold">3. Sharing Information</h3>
                                        <p className="text-muted">
                                            Your data is never sold. We only share information with trusted providers
                                            (e.g., payment gateways) when necessary.
                                        </p>
                                    </section>

                                    <section className="mb-5">
                                        <h3 className="fw-semibold">4. Security Measures</h3>
                                        <p className="text-muted">
                                            We use encryption, secure payment gateways, and other best practices
                                            to protect your information from unauthorized access.
                                        </p>
                                    </section>

                                    <section className="mb-5">
                                        <h3 className="fw-semibold">5. Your Rights</h3>
                                        <p className="text-muted">
                                            You may request access, correction, or deletion of your personal data
                                            by contacting our support team.
                                        </p>
                                    </section>

                                    <section className="mb-5">
                                        <h3 className="fw-semibold">6. Updates</h3>
                                        <p className="text-muted">
                                            We may update this Privacy Policy from time to time. Updates will be reflected here.
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="fw-semibold">7. Contact Us</h3>
                                        <p className="text-muted">
                                            Have questions? Email us at{" "}
                                            <a href="#" className="fw-semibold text-primary">
                                              customercare@bingeboxx.com
                                            </a>
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <br />
            </div>
        </>
    );
};

export default PrivacyPolicy;
