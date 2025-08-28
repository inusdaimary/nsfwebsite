import React from "react";
import aboutImg from "../../public/nsf/NSF-martyrs-trophy-football.jpg";
import aboutBg from "../../public/images/bg_1.jpg";
const AboutUs = () => {
    return (
        <section
            className="py-5 position-relative"
            style={{
                backgroundImage: `url(${aboutBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                color: "#fff",
            }}
        >
            <div
                className="position-absolute w-100 h-100"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", top: 0, left: 0 }}
            ></div>

            <div className="container" style={{ paddingTop: "100px" }}>
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="about-image position-relative overflow-hidden rounded shadow-sm">
                            <img
                                src={aboutImg}
                                alt="About Us"
                                className="img-fluid w-100"
                                style={{ transition: "transform 0.5s" }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6" >
                        <h2 className="fw-bold mb-3 text-white">About Us</h2>
                        <p className="text-white mb-4">
                            Welcome to NSF! We are committed to delivering the best experiences in sports and events.
                            Our mission is to connect people through competitions, training, and community events.
                        </p>
                        <p className="text-white mb-4">
                            The NSF Martyrs' Memorial Trophy is an annual football tournament organized by the Naga Students' Federation (NSF) to honor the memory of two students—Kekuojalie Sachü and Vikhozo Yhoshü—who were tragically killed during a peaceful protest on March 20, 1986, in Kohima, Nagaland. This protest was against the introduction of Indian Police Service (IPS) cadres in Nagaland and the extension of the Disturbed Area Belt along the Indo-Myanmar border. The incident led to widespread outrage, resulting in the resignation of several state ministers and leaving an indelible mark on the Naga community.
                            Established in 1996, the tournament serves as both a tribute to these martyrs and a platform to promote peace, unity, and the rich cultural heritage of the Naga people. The event has grown over the years, attracting teams from various Naga-inhabited regions, including Nagaland, Manipur, Assam, Arunachal Pradesh, and Myanmar. The 25th anniversary edition in 2025, themed "Goal for Peace," is scheduled to be held from September 13 to October 18 at the Indira Gandhi Stadium in Kohima and Chumoukedima Stadium .
                            The tournament not only honors the sacrifices of the martyrs but also emphasizes the role of sports in fostering community spirit and resilience. Through this event, the NSF continues to uphold the legacy of Kekuojalie Sachu and Vikhozo Yhoshü, ensuring their contributions to the Naga cause are remembered and celebrated.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
