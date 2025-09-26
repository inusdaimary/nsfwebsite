
import React, { useState, useEffect, useContext } from "react";
import { postRequest, apiurl } from '../service/Axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../components/Loader";
import { MatchContext } from "../context/MatchContext";

const LiveScore = () => {

    const { currentmatch, teams } = useContext(MatchContext)
    const [playersData, setPlayersData] = useState({});
    const [scorelist, setScorelist] = useState([])

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

    useEffect(() => {
        getscores()
    }, [])


    const getscores = async () => {
        try {
            const response = await postRequest('api/website', {
                req_type: 'get-scores'
            })

            if(response){
                  setScorelist(response.scorelist)
            }
            
        } catch (error) {

        }

    }

    const [currentTime, setCurrentTime] = useState(new Date());

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000); 
    //     return () => clearInterval(interval);
    // }, []);



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
                                            const matchDate = new Date(item.match_time.replace(" ", "T"));
                                            const now = currentTime;

                                            let islive = 0;
                                            let timerText = "";

                                            if (now >= matchDate) {

                                                const durationMs = now - matchDate;
                                                const totalSeconds = Math.floor(durationMs / 1000);
                                                const minutes = Math.floor(totalSeconds / 60);
                                                const seconds = totalSeconds % 60;

                                                if (minutes >= 95) {
                                                    islive = 0;
                                                    timerText = "FT";
                                                } else {
                                                    islive = 1;


                                                    if (minutes > 90) {
                                                        timerText = `90+${minutes - 90}:${seconds
                                                            .toString()
                                                            .padStart(2, "0")}`;
                                                    } else if (minutes > 45) {
                                                        timerText = `45+${minutes - 45}:${seconds
                                                            .toString()
                                                            .padStart(2, "0")}`;
                                                    } else {
                                                        timerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
                                                    }
                                                }
                                            } else {

                                                const kickoffTime = matchDate.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                });
                                                islive = 0;
                                                timerText = `Kickoff ${kickoffTime}`;
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


                                                    {islive === 1 && (
                                                        <h5
                                                            style={{
                                                                color: "red",
                                                                marginLeft: "5px",
                                                                fontSize: "14px",
                                                                animation: "blink 1s infinite",
                                                            }}
                                                        >
                                                            Live Score
                                                        </h5>
                                                    )}
                                                    <div className="card shadow-lg border-0 rounded-4 mb-4">
                                                        <div className="card-body">
                                                            <div className="row align-items-center text-center">
                                                                {/* Team 1 */}
                                                                <div className="col-12 col-md-5 mb-4 mb-md-0">
                                                                    <img
                                                                        src={`${item.APP_URL}/${item.team1_logo}`}
                                                                        alt={item.team1_name}
                                                                        className="img-fluid mb-2"
                                                                        style={{ cursor: "pointer", maxHeight: "90px" }}
                                                                    />
                                                                    <h5 className="fw-bold">{item.team1_name}</h5>

                                                                    {/* Half Score Table */}
                                                                    <table className="table table-sm table-bordered text-center align-middle mt-3">
                                                                        <thead className="table-dark">
                                                                            <tr>
                                                                                <th>First Half</th>
                                                                                <th>Second Half</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="fw-bold fs-6">{item.team1_first_half}</td>
                                                                                <td className="fw-bold fs-6">{item.team1_second_half}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                    {/* Playing Players */}
                                                                    <div className="d-flex flex-wrap justify-content-center mt-3">
                                                                        {players.players?.team1
                                                                            ?.filter((p) => p.isPlaying === 1)
                                                                            .map((p) => (
                                                                                <div
                                                                                    key={p.player_id}
                                                                                    className="text-center m-2 p-2 rounded-3 border"
                                                                                    style={{ width: "90px", backgroundColor: "#f9f9f9" }}
                                                                                >
                                                                                    <img
                                                                                        src={`${p.APP_URL}/${p.photo}`}
                                                                                        alt={p.player_name}
                                                                                        className="img-fluid rounded-circle border mb-1"
                                                                                        style={{
                                                                                            width: "55px",
                                                                                            height: "55px",
                                                                                            objectFit: "cover",
                                                                                        }}
                                                                                    />
                                                                                    <div className="fw-semibold small">{p.player_name}</div>
                                                                                    <div className="text-muted" style={{ fontSize: "11px" }}>
                                                                                        #{p.jerseyNo ?? "N/A"}
                                                                                    </div>
                                                                                    <div className="fw-bold text-primary" style={{ fontSize: "12px" }}>
                                                                                        {p.totalPoints} pts
                                                                                    </div>
                                                                                    <span className="badge bg-success mt-1" style={{ fontSize: "10px" }}>
                                                                                        {p.role} (Playing)
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>

                                                                {/* Score + VS */}
                                                                <div className="col-12 col-md-2 mb-4 mb-md-0">
                                                                    {islive === 1 && (
                                                                        <div className="mb-2">
                                                                            <span className="badge bg-danger rounded-pill px-3 py-2">LIVE</span>
                                                                        </div>
                                                                    )}
                                                                    <h3 className="fw-bold point">
                                                                        {item.team1_points} - {item.team2_points}
                                                                    </h3>
                                                                    {/* <div className="fw-semibold text-muted">Full Time</div> */}
                                                                    <div className="fw-bold fs-4 mt-2">VS</div>
                                                                </div>

                                                                {/* Team 2 */}
                                                                <div className="col-12 col-md-5">
                                                                    <img
                                                                        src={`${item.APP_URL}/${item.team2_logo}`}
                                                                        alt={item.team2_name}
                                                                        className="img-fluid mb-2"
                                                                        style={{ cursor: "pointer", maxHeight: "90px" }}
                                                                    />
                                                                    <h5 className="fw-bold">{item.team2_name}</h5>

                                                                    {/* Half Score Table */}
                                                                    <table className="table table-sm table-bordered text-center align-middle mt-3">
                                                                        <thead className="table-dark">
                                                                            <tr>
                                                                                <th>First Half</th>
                                                                                <th>Second Half</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="fw-bold fs-6">{item.team2_first_half}</td>
                                                                                <td className="fw-bold fs-6">{item.team2_second_half}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                    {/* Playing Players */}
                                                                    <div className="d-flex flex-wrap justify-content-center mt-3">
                                                                        {players.players?.team2
                                                                            ?.filter((p) => p.isPlaying === 1)
                                                                            .map((p) => (
                                                                                <div
                                                                                    key={p.player_id}
                                                                                    className="text-center m-2 p-2 rounded-3 border"
                                                                                    style={{ width: "90px", backgroundColor: "#f9f9f9" }}
                                                                                >
                                                                                    <img
                                                                                        src={`${p.APP_URL}/${p.photo}`}
                                                                                        alt={p.player_name}
                                                                                        className="img-fluid rounded-circle border mb-1"
                                                                                        style={{
                                                                                            width: "55px",
                                                                                            height: "55px",
                                                                                            objectFit: "cover",
                                                                                        }}
                                                                                    />
                                                                                    <div className="fw-semibold small">{p.player_name}</div>
                                                                                    <div className="text-muted" style={{ fontSize: "11px" }}>
                                                                                        #{p.jerseyNo ?? "N/A"}
                                                                                    </div>
                                                                                    <div className="fw-bold text-primary" style={{ fontSize: "12px" }}>
                                                                                        {p.totalPoints} pts
                                                                                    </div>
                                                                                    <span className="badge bg-success mt-1" style={{ fontSize: "10px" }}>
                                                                                        {p.role} (Playing)
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>
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


                       <div className="row">
        {scorelist.map((item, index) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
            <div className="card match-card p-3">
              <h6 className="text-center   mb-3 match-time">
                {new Date(item.match_time).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h6>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="team1 text-light">{item.team1_name}</strong>
                <span className="badge bg-primary">{item.team1point}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="team2 text-light">{item.team2_name}</strong>
                <span className="badge bg-danger text-light">{item.team2point}</span>
              </div>

              {Number(item.team1point) > Number(item.team2point) ? (
                <p className="winner text-center mt-2 mb-0">
                  Winner: {item.team1_name}
                </p>
              ) : Number(item.team1point) < Number(item.team2point) ? (
                <p className="winner text-center mt-2 mb-0">
                  Winner: {item.team2_name}
                </p>
              ) : (
                <p className="draw text-center mt-2 mb-0">Draw</p>
              )}
            </div>
          </div>
        ))}
      </div>
                </div>




                

            </div>




      <style jsx>{`
      
        .btn-gradient {
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: scale(1.03);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
        }

        .match-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .match-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(243, 239, 239, 0.25);
        }

        .match-time {
          font-weight: 600;
          font-size: 0.9rem;
          color: #ffffffff;
        }

        .winner {
         color: #b9ff20;
          font-weight: 600;
        }
        .draw {
          color: #000000ff;
          font-weight: 600;
        }

        @media (max-width: 576px) {
          .match-time {
            font-size: 0.8rem;
          }
        }
      `}</style>

            <style jsx="true">{`
                         @media (max-width: 576px) {
                              header, footer {
                                display:none;
                                }
                                .container-fluid{
                                padding-top: 1vh !important;
                                } 
                      .point{
                        font-size: 30px  !important
                      }

                }
            `}</style>

        </>
    )
}



export default LiveScore;