import React from "react";
import aboutBg from "../../public/images/bg_1.jpg";

const RefundPolicy = () => {
  return (
    <div className="refund-page min-vh-100 d-flex align-items-center"      style={{
          minHeight: "100vh",
          paddingTop: "15vh",
           backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }} >
      <div className="container py-5"   >
        {/* Policy Card */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                   <div className="text-center mb-5">
          <h1 className="fw-bold display-4 text-dark">Refund Policy</h1>
          <p className="text-muted lead">
            Learn about our refund and cancellation process for ticket bookings.
          </p>
        </div>
              {/* Banner */}
              <div
                className="bg-gradient text-dark p-4"
                style={{
                  background: "linear-gradient(135deg, #20c997, #0d6efd)",
                }}
              >
                <h2 className="mb-0 fw-bold">Our Refund Policy</h2>
                <p className="mb-0">
                  Last updated: <span className="fw-semibold">September 2025</span>
                </p>
              </div>

              {/* Content */}
              <div className="card-body p-5">
                <section className="mb-5">
                  <h3 className="fw-semibold">1. Eligibility for Refund</h3>
                  <p className="text-muted">
                    Refunds are only applicable for cancellations made within{" "}
                    <strong>24 hours</strong> of booking. After this period,
                    refunds may not be guaranteed due to event organizer policies.
                  </p>
                </section>

                <section className="mb-5">
                  <h3 className="fw-semibold">2. Non-Refundable Situations</h3>
                  <ul className="text-muted">
                    <li>No-shows or failure to attend the event</li>
                    <li>Tickets purchased under promotional/discounted offers</li>
                    <li>Bookings made less than 24 hours before the event</li>
                  </ul>
                </section>

                <section className="mb-5">
                  <h3 className="fw-semibold">3. Refund Process</h3>
                  <p className="text-muted">
                    Once approved, refunds will be processed within{" "}
                    <strong>7–10 business days</strong> and credited to your
                    original payment method.
                  </p>
                </section>

                <section className="mb-5">
                  <h3 className="fw-semibold">4. Event Cancellations</h3>
                  <p className="text-muted">
                    If the event is cancelled by the organizer, a{" "}
                    <strong>full refund</strong> will be issued automatically to
                    all affected customers.
                  </p>
                </section>

                <section className="mb-5">
                  <h3 className="fw-semibold">5. Contact for Refund</h3>
                  <p className="text-muted">
                    For refund-related queries, contact our support team at{" "}
                    <a
                      href="#"
                      className="fw-semibold text-primary"
                    >
                    customercare@bingeboxx.com
                    </a>
                  </p>
                </section>

                <div className="alert alert-info rounded-3">
                  ⚠️ <strong>Note:</strong> All refunds are subject to final
                  approval by the event organizer and payment gateway.
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default RefundPolicy;
