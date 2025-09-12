import { useState, useEffect, useCallback, useContext } from "react";
import Sponsors from "../components/Sponsors";
import Contactus from "../components/Contactus";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { postRequest } from '../service/Axios';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";

import { MatchContext } from "../context/MatchContext";

const Dashboard = () => {
    const { currentmatch, nextMatch, teams } = useContext(MatchContext);

    const navigate = useNavigate()
    const handdleteam = () => {
        navigate('/live-score')
    }

    const stadiumVideos = [
        {
            id: 1,
            url: "video/igstadium.mp4",
            title: "I.G Stadium",
            description: "Explore the stadium facilities and surroundings",
        },
        {
            id: 2,
            url: "video/Chümoukedimastadium.mp4",
            title: "Chumoukedima Football Stadium, Chumoukedima",
            description: "Explore the stadium facilities and surroundings",
        }
    ];

    const highlightVideos = [
        {
            id: 1,
            url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "INUS FC vs Mizoram Highlights",
            description: "Best goals & moments from the match",
        },
        {
            id: 2,
            url: "https://www.youtube.com/embed/5qap5aO4i9A",
            title: "Nagaland vs Inus Test Highlights",
            description: "Full highlights of the exciting game",
        },
    ];

    const VideoGrid = ({ title, videos }) => (
        <div className="site-section bg-dark ">
            <div className="container" style={{ marginTop: "-9%" }}>
                <div className="section-title text-center mb-5">
                    <h2 className="text-white fw-bold">{title}</h2>
                    <p className="text-secondary">
                        Watch the best videos in this category
                    </p>
                </div>
                <div className="row" style={{ justifyContent: "center" }}>
                    {videos.map((video, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                            <div className="card shadow-lg border-0 rounded-3 overflow-hidden h-100">
                                <div className="ratio ratio-16x9">
                                    <video
                                        src={video.url}
                                        controls
                                        controlsList="nodownload"
                                        disablePictureInPicture
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    ></video>
                                </div>
                                <div className="card-body bg-light text-center">
                                    <h5 className="card-title text-dark">{video.title}</h5>
                                    <p className="card-text text-muted">{video.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    );



    return (
        <>
            <div className="bg">
                <div className="container" id="matches">
                    <div className="row">
                        <div className="col-lg-12">
                            {currentmatch && currentmatch.length > 0 ? (
                                currentmatch.some(item => item.status === 1) ? (
                                    // ✅ Show only matches with status = 1
                                    currentmatch
                                        .filter(item => item.status === 1)
                                        .map((item, index) => {
                                            const matchDate = new Date(item.match_time);
                                            const now = new Date();

                                            const durationMs = now - matchDate;
                                            const durationMinutes = Math.floor(durationMs / 60000);

                                            let islive = 1;
                                            if (now > matchDate) {
                                                if (durationMinutes > 95) {
                                                    islive = 0;
                                                } else {
                                                    islive = 1;
                                                }
                                            } else {
                                                islive = 0;
                                            }

                                            const gradients = [
                                                ["#1abc9c", "#16a085"],
                                                ["#3498db", "#2c3e50"],
                                                ["#9b59b6", "#8e44ad"],
                                                ["#e67e22", "#d35400"],
                                                ["#2ecc71", "#27ae60"],
                                                ["#e74c3c", "#c0392b"],
                                                ["#f39c12", "#f1c40f"],
                                            ];

                                            const [color1, color2] = gradients[index % gradients.length];

                                            return (
                                                <div
                                                    className="card my-3 text-white border-0"
                                                    key={item.schedule_id}
                                                    style={{
                                                        background: `linear-gradient(135deg, ${color1}, ${color2})`,
                                                    }}
                                                >
                                                    {/* Stadium Name on top */}
                                                    <div
                                                        className="card-header text-center border-0"
                                                        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                                                    >
                                                        <h5 className="mb-0">{item.stadium}</h5>
                                                    </div>

                                                    <h5
                                                        style={{
                                                            color: 'red',
                                                            marginLeft: '5px',
                                                            fontSize: '14px',
                                                            animation: 'blink 1s infinite'
                                                        }}
                                                    >
                                                        On Live
                                                    </h5>

                                                    <style>
                                                        {`
                                                            @keyframes blink {
                                                                0%, 50%, 100% { opacity: 1; }
                                                                25%, 75% { opacity: 0; }
                                                            }
                                                            `}
                                                    </style>

                                                    <div className="card-body" onClick={handdleteam}>
                                                        <div className="row align-items-center text-center">
                                                            {/* Team 1 */}
                                                            <div className="col-12 col-md-5 mb-3 mb-md-0">
                                                                <img
                                                                    src={`${item.APP_URL}/${item.team1_logo}`}
                                                                    alt={item.team1_name}
                                                                    className="img-fluid"
                                                                    style={{ cursor: "pointer", maxHeight: "80px" }}
                                                                />
                                                                <h6 className="mt-2">{item.team1_name}</h6>
                                                            </div>

                                                            {/* Middle - LIVE + Score + VS */}
                                                            <div className="col-12 col-md-2 mb-3 mb-md-0">
                                                                {islive === 1 && (
                                                                    <div className="live-indicator mb-2">
                                                                        <span className="dot"></span>{" "}
                                                                        <span className="live-text">LIVE</span>
                                                                    </div>
                                                                )}
                                                                <div className="fw-bold fs-5">
                                                                    {item.team1_points}-{item.team2_points}
                                                                </div>
                                                                <div className="fw-bold">VS</div>
                                                            </div>

                                                            {/* Team 2 */}
                                                            <div className="col-12 col-md-5">
                                                                <img
                                                                    src={`${item.APP_URL}/${item.team2_logo}`}
                                                                    alt={item.team2_name}
                                                                    className="img-fluid"
                                                                    style={{ cursor: "pointer", maxHeight: "80px" }}
                                                                />
                                                                <h6 className="mt-2">{item.team2_name}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    <div
                                        className="card my-3 text-white border-0"
                                        style={{
                                            background: "linear-gradient(135deg, #34495e, #2c3e50)",
                                        }}
                                    >
                                        <div
                                            className="card-header text-center border-0"
                                            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                                        >
                                            <h5 className="mb-0">No Scheduled Matches</h5>
                                        </div>
                                        <div className="card-body text-center">
                                            <p className="mb-3 fs-6">
                                                ⚽ Currently, there are <b>no live matches</b> right now.
                                                Stay tuned for upcoming fixtures and live updates!
                                            </p>
                                            {/* <div className="d-flex justify-content-center gap-3 flex-wrap">
                                                <span className="badge bg-info">Latest Results</span>
                                                <span className="badge bg-warning">Upcoming Fixtures</span>
                                                <span className="badge bg-success">Team Rankings</span>
                                            </div> */}
                                        </div>
                                    </div>

                                )
                            ) : (
                                <div
                                    className="card my-3 text-white border-0"
                                    style={{
                                        background: "linear-gradient(135deg, #34495e, #2c3e50)",
                                    }}
                                >
                                    <div
                                        className="card-header text-center border-0"
                                        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                                    >
                                        <h5 className="mb-0">No Scheduled Matches</h5>
                                    </div>
                                    <div className="card-body text-center">
                                        <p className="mb-3 fs-6">
                                            Currently, there are no matches scheduled. Stay tuned for upcoming fixtures and live updates!
                                        </p>
                                        <div className="d-flex justify-content-center gap-3">
                                            <span className="badge bg-info">Latest Results</span>
                                            <span className="badge bg-warning">Upcoming Fixtures</span>
                                            <span className="badge bg-success">Team Rankings</span>
                                        </div>
                                    </div>
                                </div>

                            )}

                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-12 text-center">
                        <img src="./images/nsf.png" alt="logo" className="img-fluid" />
                    </div>
                </div> */}


            </div>


            <div className="latest-news py-5" id="Players" >
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
                                        src={
                                            team.teamimage
                                                ? team.APP_URL + "/" + team.teamlogo
                                                : team.APP_URL + "/" + team.teamlogo
                                        }
                                        alt={team.team_name}
                                        className="card-img-top rounded"
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="fw-bold">{team.team_name}</h5>
                                        <h5 className="text-mute" style={{fontSize:"12px"}}>{team.state}</h5>
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
                        {nextMatch ? nextMatch.map((match, index) => (
                            <div className="col-lg-6" key={index}>
                                <div className="widget-next-match">
                                    <div className="widget-title">
                                        <h3>Next Match</h3>
                                    </div>
                                    <div className="widget-body mb-3">
                                        <div className="widget-vs">
                                            <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                                                {/* Team 1 */}
                                                <div className="team-1 text-center">
                                                    <img
                                                        src={`${match.APP_URL}/${match.team1_logo}`}
                                                        alt={match.team1_name}
                                                        style={{ height: "80px" }}
                                                    />
                                                    <h3>{match.team1_name}</h3>
                                                </div>
                                                <div>
                                                    <span className="vs"><span>VS</span></span>
                                                </div>
                                                {/* Team 2 */}
                                                <div className="team-2 text-center">
                                                    <img
                                                        src={`${match.APP_URL}/${match.team2_logo}`}
                                                        alt={match.team2_name}
                                                        style={{ height: "80px" }}
                                                    />
                                                    <h3>{match.team2_name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tournament & Match Time */}
                                    <div className="text-center text-white widget-vs-contents mb-4">
                                        <h4>{match.tournament_type}</h4>
                                        <p className="mb-5">
                                            <span className="d-block">
                                                {new Date(match.match_time).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span className="d-block">
                                                {new Date(match.match_time).toLocaleTimeString("en-GB", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })} IST
                                            </span>
                                            <strong className="text-primary">{match.stadium}</strong>
                                        </p>

                                        <div id={`date-countdown-${index}`} className="pb-1"></div>
                                    </div>
                                </div>
                            </div>
                        )) : <div className="text-center widget-vs-contents mb-4">
                            <h4>No Scheduled Match</h4>
                            <p className="mb-5">
                                <span className="d-block">--</span>
                                <span className="d-block">--</span>
                                <strong className="text-primary">--</strong>
                            </p>
                        </div>}
                    </div>

                    {/* <div className="row mt-3">

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
                    </div> */}
                </div>
            </div>


            <VideoGrid title="🏟️ Stadium Videos" videos={stadiumVideos} />
            {/* <VideoGrid title="🎥 Match Highlights" videos={highlightVideos} /> */}




            <div className="row bg">
                <Sponsors />
                {/* <Contactus /> */}
            </div>



        </>
    )


}



export default Dashboard;