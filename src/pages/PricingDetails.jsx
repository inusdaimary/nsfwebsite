import React from "react";
import aboutBg from "../../public/images/bg_1.jpg";

const PricingDetails = () => {
  const basePrice = 50;
  return (

    <div style={{
      minHeight: "100vh",
      paddingTop: "15vh",
     backgroundImage: `url(${aboutBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="container" >

        {/* Pricing Card */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-12">
            <div
              className="card border-0 shadow-lg text-center p-4"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(135deg, #007bff, #6610f2)",
                color: "white",
              }}
            >

              <div className="text-center mb-5">
                <h1 className="fw-bold text-white display-5">🎟️ Ticket Pricing</h1>
                <p className="text-white fs-5" >
                  Starting from just <strong>₹{basePrice}</strong>.
                  Prices may vary depending on match and booking time.
                </p>
              </div>
              <h3 className="fw-bold">Standard Ticket</h3>
              <h1 className="display-3 fw-bold my-3">₹{basePrice}</h1>
              <p className="fs-6 mb-4">
                Base ticket price.
                Final price may change depending on demand & timing.
              </p>
              <button
                className="btn btn-light btn-lg w-100 fw-bold"
                style={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-5">
          <p className="text-white">
            ⚡ Hurry! Prices may increase as the match day approaches.
          </p>
        </div>
      </div>
    </div>


  );
};

export default PricingDetails;
