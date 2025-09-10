import React, { useState } from "react";
import aboutBg from "../../public/images/bg_1.jpg";


const TermsConditions = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(!accepted);
    if (!accepted && typeof onAccept === "function") onAccept(true);
    if (accepted && typeof onAccept === "function") onAccept(false);
  };

  return (
    <>
      <div style={{
        minHeight: "100vh",
        paddingTop: "15vh",
     backgroundImage: `url(${aboutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>

        <div className="container"  >
          <div className="mx-auto" >
            <div className="card shadow-sm border-0">
              <div
                className="card-header text-white"
                style={{
                  borderTopLeftRadius: ".375rem",
                  borderTopRightRadius: ".375rem",
                  background: "linear-gradient(90deg,#0ea5e9,#7c3aed)",
                }}
              >
                <h3 className="mb-0">Terms &amp; Conditions</h3>
                <small className="text-white-50">Please read carefully before booking</small>
              </div>

              <div className="card-body">
                <section className="mb-3">
                  <h5 className="fw-semibold">1. Introduction</h5>
                  <p className="text-muted mb-0">
                    These Terms and Conditions ("Terms") govern your purchase of tickets via this website or
                    mobile application. By purchasing a ticket you agree to be bound by these Terms, any
                    event rules, and applicable laws.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">2. Ticket Purchase & Payment</h5>
                  <ul className="text-muted">
                    <li>Ticket prices are displayed in INR and are exclusive of any applicable taxes unless stated.</li>
                    <li>
                      Payment must be completed via the provided payment methods (UPI, card, wallet). Bookings are
                      provisional until payment is confirmed.
                    </li>
                    <li>
                      If payment fails or is not completed within the payment window, the reservation will be
                      cancelled automatically.
                    </li>
                    <li>
                      You must provide a valid email and phone number. We may contact you about your booking.
                    </li>
                  </ul>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">3. Refunds & Cancellations</h5>
                  <ul className="text-muted">
                    <li>
                      Unless otherwise stated, tickets are <strong>non-refundable</strong>. Refunds may be issued
                      only in exceptional situations (e.g., event cancelled or postponed) and will be processed
                      according to the promoter's policy.
                    </li>
                    <li>
                      If an event is rescheduled, your ticket will remain valid for the new date. If you cannot
                      attend, contact customer support for available options.
                    </li>
                    <li>
                      Any refund—where applicable—may be subject to administrative charges and will be processed
                      to the original payment method.
                    </li>
                  </ul>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">4. Entry, ID & Gate Policy</h5>
                  <ul className="text-muted">
                    <li>Carry a valid ticket (digital or printed) and a government-issued photo ID for entry.</li>
                    <li>
                      Duplicate, altered, or fraudulent tickets will not be accepted. We reserve the right to refuse
                      entry if ticket validity cannot be verified.
                    </li>
                    <li>
                      Gates open/close times will be published for each event. Late entry may be restricted for
                      safety reasons.
                    </li>
                  </ul>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">5. COVID-19 & Health Safety</h5>
                  <p className="text-muted mb-0">
                    Attendees must comply with any health & safety guidelines published for the event (e.g., mask
                    requirements, vaccination or negative test requirements). We are not liable for any illness
                    arising from your attendance.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">6. Code of Conduct</h5>
                  <p className="text-muted mb-0">
                    All attendees must behave responsibly. Offensive or illegal behavior, possession of prohibited
                    items, or failure to follow venue/staff instructions may lead to ejection without refund.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">7. Liability & Disclaimer</h5>
                  <p className="text-muted mb-0">
                    To the maximum extent permitted by law, the ticket provider, promoters and venue are not
                    responsible for personal injury, loss, theft, or damage to personal property while at the event.
                    We shall not be liable for indirect, incidental or consequential damages.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">8. Personal Data & Privacy</h5>
                  <p className="text-muted mb-0">
                    We collect personal information (name, email, phone) to process bookings and for event
                    communication. By booking, you consent to our privacy policy. We will not sell your personal
                    data. Contact us for privacy-related requests.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">9. Ticket Transfer & Resale</h5>
                  <p className="text-muted mb-0">
                    Tickets may be transferable unless prohibited in the event terms. Resale of tickets for profit
                    or via unauthorized channels is strictly prohibited and may result in cancellation without refund.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">10. Changes & Force Majeure</h5>
                  <p className="text-muted mb-0">
                    We may change the event line-up, schedule or venue. In case of force majeure (events beyond our
                    control: natural calamity, strike, epidemic, government action), we may postpone/cancel events.
                    Remedies will be handled as per promoter policy.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">11. Governing Law</h5>
                  <p className="text-muted mb-0">
                    These Terms are governed by the laws of India and disputes will be subject to the jurisdiction of
                    competent courts.
                  </p>
                </section>

                <section className="mb-3">
                  <h5 className="fw-semibold">12. Contact & Support</h5>
                  <p className="text-muted mb-0">
                    For booking issues or support, contact: <br />
                    <strong>customercare@bingeboxx.com</strong> or call <strong>+91-87942 44328</strong>.
                  </p>
                </section>

                <div className="form-check form-switch my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptTnC"
                    checked={accepted}
                    onChange={handleAccept}
                  />
                  <label className="form-check-label" htmlFor="acceptTnC">
                    I have read and agree to the <strong>Terms &amp; Conditions</strong>.
                  </label>
                </div>

                {/* <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                disabled={!accepted}
                onClick={() => {
                  if (typeof onAccept === "function") onAccept(true);
                }}
              >
                Continue
              </button>
            </div> */}
              </div>

              <div className="text-center small text-muted mt-3">
                Last updated: <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>
          </div>
        </div>
         
         <br />
      </div>


    </>
  );
};

export default TermsConditions;
