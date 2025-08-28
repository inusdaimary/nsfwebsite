import React from "react";

const sponsors = [
  { id: 1, name: "Amazon", img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: 2, name: "Google", img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 3, name: "Microsoft", img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { id: 4, name: "Facebook", img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
  { id: 5, name: "Tesla", img: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
];

export default function Sponsors() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4 fw-bold">Our Sponsors</h2>
        <div className="row justify-content-center align-items-center">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="col-4 col-md-2 d-flex justify-content-center align-items-center mb-3">
              <img
                src={sponsor.img}
                alt={sponsor.name}
                className="img-fluid"
                style={{ maxHeight: "50px", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
