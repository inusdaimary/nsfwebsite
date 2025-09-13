
import React, { useState, useEffect, useContext } from "react";
import { postRequest, apiurl } from '../service/Axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../components/Loader";
import { MatchContext } from "../context/MatchContext";

const LiveScore = () => {

    const { currentmatch, teams } = useContext(MatchContext)
    const [playersData, setPlayersData] = useState({});


    useEffect(() => {
        const fetchPlayers = async () => {
            const data = {};

            for (const item of currentmatch) {
                const players = await postRequest("api/website", {
                    team1_id: item.team1_id,
                    team2_id: item.team2_id,
                    schedule_id: item.schedule_id,
                    req_type: "get-players-team-wise",
                });

                data[item.schedule_id] = players;
            }

            setPlayersData(data);
        };

        if (currentmatch && currentmatch.length > 0) {
            fetchPlayers();
        }
    }, [currentmatch]);



    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{
                minHeight: "100vh",
                paddingTop: "15vh",
                backgroundImage: `url("https://nsftrophy.bingeboxx.com/images/bg_7.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>

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

                                            const players = playersData[item.schedule_id] || { team1: [], team2: [] };

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

                                                    <div className="card-body" >
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

                                                                <ul className="list-unstyled mt-2 d-flex flex-wrap justify-content-center">
                                                                    {players.players?.team1
                                                                        ?.filter((p) => p.isPlaying === 1) 
                                                                        .map((p) => (
                                                                            <li
                                                                                key={p.player_id}
                                                                                className="text-center m-2"
                                                                                style={{ width: "80px" }}
                                                                            >
                                                                                <img
                                                                                    src={`${p.APP_URL}/${p.photo}`}
                                                                                    alt={p.player_name}
                                                                                    className="img-fluid rounded-circle border"
                                                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                                />

                                                                                <div className="mt-1" style={{ fontSize: "12px" }}>
                                                                                    {p.player_name}
                                                                                </div>
                                                                                <div style={{ fontSize: "11px", color: "#eee" }}>
                                                                                    #{p.jerseyNo ?? "N/A"}
                                                                                </div>
                                                                                <div style={{ fontSize: "11px", fontWeight: "bold" }}>
                                                                                    {p.totalPoints} pts
                                                                                </div>

                                                                                <span
                                                                                    className="badge mt-1 bg-success"
                                                                                    style={{ fontSize: "10px" }}
                                                                                >
                                                                                    {p.role} (Playing)
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                </ul>

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

                                                                <ul className="list-unstyled mt-2 d-flex flex-wrap justify-content-center">
                                                                    {players.players?.team2
                                                                        ?.filter((p) => p.isPlaying === 1) 
                                                                        .map((p) => (
                                                                            <li
                                                                                key={p.player_id}
                                                                                className="text-center m-2"
                                                                                style={{ width: "80px" }}
                                                                            >
                                                                                <img
                                                                                    src={`${p.APP_URL}/${p.photo}`}
                                                                                    alt={p.player_name}
                                                                                    className="img-fluid rounded-circle border"
                                                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                                />

                                                                                <div className="mt-1" style={{ fontSize: "12px" }}>
                                                                                    {p.player_name}
                                                                                </div>
                                                                                <div style={{ fontSize: "11px", color: "#eee" }}>
                                                                                    #{p.jerseyNo ?? "N/A"}
                                                                                </div>
                                                                                <div style={{ fontSize: "11px", fontWeight: "bold" }}>
                                                                                    {p.totalPoints} pts
                                                                                </div>

                                                                                <span
                                                                                    className="badge mt-1 bg-success"
                                                                                    style={{ fontSize: "10px" }}
                                                                                >
                                                                                    {p.role} (Playing)
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                </ul>

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
                                                Currently, there are no matches scheduled. Stay tuned for upcoming fixtures and live updates!
                                            </p>
                                            {/* <div className="d-flex justify-content-center gap-3">
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
            </div>


            <style jsx="true">{`
                         @media (max-width: 576px) {
                              header, footer {
                                display:none;
                                }
                                .container-fluid{
                                padding-top: 1vh !important;
                                } 
                }
            `}</style>

        </>
    )
}



export default LiveScore;