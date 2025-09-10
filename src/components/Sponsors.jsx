import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postRequest, apiurl } from "../service/Axios";

export default function Sponsors() {
  const [sponsorslist, setSponsors] = useState([]);

  useEffect(() => {
    getSponsors();
  }, []);


  const getSponsors = async () => {

    try {
      const response = await postRequest(`${apiurl}/api/website`, {
        req_type: "get-sponsors",
      });
      if (response.success) {
        setSponsors(response);
      } else {
        setSponsors([]);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4 fw-bold">Our Live Streaming  Sponsors</h2>
        {sponsorslist && sponsorslist.Sponsors && sponsorslist.Sponsors.length > 0 ? (
          <>
            <Slider {...sliderSettings}>
              {sponsorslist.Sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="d-flex flex-column justify-content-center align-items-center p-2"
                >
                  <img
                    src={`${sponsor.APP_URL}/${sponsor.sponsor_logo}`}
                    alt={sponsor.sponsor_name}
                    className="img-fluid"
                    style={{
                      maxHeight: "105px",
                      objectFit: "contain",
                      transition: "transform 0.3s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <h5 className="mt-2">{sponsor.sponsor_name}</h5>
                </div>
              ))}
            </Slider>

            {/* Sponsorship Block */}
            <div
              className="text-center mt-4 p-3"
              style={{
                background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
                color: "white",
                borderRadius: "8px",
              }}
            >
              <h5 className="mb-2">Want to become a Sponsor?</h5>
              <p className="mb-3">
                Showcase your brand and reach thousands of football fans.
              </p>
              <a
                href="/sponsors"
                className="btn btn-warning fw-bold"
                style={{ padding: "10px 20px" }}
              >
                Become a Sponsor 🚀
              </a>
            </div>
          </>

        ) : (
          <p>No sponsors available</p>
        )}
      </div>
    </section>
  );
}
