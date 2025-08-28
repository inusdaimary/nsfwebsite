
import { useEffect } from "react";
import Sponsors from "../components/Sponsors";
import Contactus from "../components/Contactus";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {

    const location = useLocation();


    // useEffect(() => {
    //     if (location.hash) {
    //         const section = document.querySelector(location.hash);
    //         if (section) {
    //             section.scrollIntoView({ behavior: "smooth", block: "start" });
    //         }
    //     }
    // }, [location]);
    const teams = [
        {
            img: "nsf/ChümoukedimaWarriors.jpg",
            name: "Chümoukedima Warriors",
            desc: "Fearless and united team spirit",
        },
        {
            img: "nsf/66309492_1728147677_1.jpg",
            name: "Nagaland Tigers",
            desc: "Strength. Passion. Determination.",
        },
        {
            img: "nsf/98535062_1728147634_2.webp",
            name: "Dimapur Royals",
            desc: "Royal attitude, royal play",
        },
        {
            img: "images/img_1.jpg",
            name: "XYZ Strikers",
            desc: "Fast and furious on the field",
        },
        {
            img: "images/img_2.jpg",
            name: "ashish",
            desc: "Fast and furious on the field",
        },
        {
            img: "images/img_3.jpg",
            name: "inus fc",
            desc: "Fast and furious on the field",
        },
        {
            img: "images/bg_2.jpg",
            name: "imsu fc",
            desc: "Fast and furious on the field",
        },
    ];

    return (

        <>
            <div className="container" id="matches">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="d-flex team-vs">
                            <span className="score">4-1</span>
                            <div className="team-1 w-50">
                                <div className="team-details w-100 text-center">
                                    <img src="images/logo_1.png" alt="Image" className="img-fluid" />
                                    <h3>Kohima United <span>(win)</span></h3>
                                    <ul className="list-unstyled">
                                        <li>inus daimary (12)</li>
                                        <li>Ashish (7)</li>
                                        <li>imsu (10)</li>
                                        <li>xxxxxx (5)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="team-2 w-50">
                                <div className="team-details w-100 text-center">
                                    <img src="images/logo_2.png" alt="Image" className="img-fluid" />
                                    <h3>Chümoukedima Warriors <span>(loss)</span></h3>
                                    <ul className="list-unstyled">
                                        <li>Temjen (3)</li>
                                        <li>Imkong (8)</li>
                                        <li>xxxxxxx (9)</li>
                                        <li>xxxxxxxxxx (5)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12 text-center">
                    <img src="./images/nsf.png" alt="logo" className="img-fluid" />
                </div>
            </div>
            <div className="latest-news py-5" id="Players">
                <div className="container">
                    <div className="row">
                        <div className="col-12 title-section text-center mb-4">
                            <h2 className="heading fw-bold">🏆 Teams</h2>
                        </div>
                    </div>

                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            992: { slidesPerView: 3 },
                        }}
                    >
                        {teams.map((team, index) => (
                            <SwiperSlide key={index}>
                                <div className="card border-0 shadow-lg h-100 text-center">
                                    <img
                                        src={team.img}
                                        alt={team.name}
                                        className="card-img-top rounded"
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="fw-bold">{team.name}</h5>
                                        <p className="text-muted">{team.desc}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div className="site-section bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="widget-next-match">
                                <div className="widget-title">
                                    <h3>Next Match</h3>
                                </div>
                                <div className="widget-body mb-3">
                                    <div className="widget-vs">
                                        <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                                            <div className="team-1 text-center">
                                                <img src="images/logo_1.png" alt="Image" />
                                                <h3>Football League</h3>
                                            </div>
                                            <div>
                                                <span className="vs"><span>VS</span></span>
                                            </div>
                                            <div className="team-2 text-center">
                                                <img src="images/logo_2.png" alt="Image" />
                                                <h3>Soccer</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center widget-vs-contents mb-4">
                                    <h4>NSF Martyrs’ Memorial Trophy 2025</h4>
                                    <p className="mb-5">
                                        <span className="d-block">13 Sep 2025</span>
                                        <span className="d-block">16:00 IST</span>
                                        <strong className="text-primary">Indira Gandhi Stadium, Kohima</strong>
                                    </p>

                                    <div id="date-countdown2" className="pb-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">

                            <div className="widget-next-match">
                                <table className="table custom-table">
                                    <thead>
                                        <tr>
                                            <th>P</th>
                                            <th>Team</th>
                                            <th>W</th>
                                            <th>D</th>
                                            <th>L</th>
                                            <th>PTS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><strong className="text-black">Football League</strong></td>
                                            <td>22</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>140</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><strong className="text-black">Soccer</strong></td>
                                            <td>22</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>140</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><strong className="text-black">Kohima United</strong></td>
                                            <td>22</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>140</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><strong className="text-black">Chümoukedima Warriors</strong></td>
                                            <td>22</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>140</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="row bg">
                <Sponsors />
                <Contactus />
            </div>

        </>
    )

}



export default Dashboard;