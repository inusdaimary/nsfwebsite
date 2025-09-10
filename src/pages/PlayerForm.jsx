
import React, { useState, useEffect } from "react";
import { postRequest, apiurl } from '../service/Axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../components/Loader";

const PlayerForm = () => {

    const [team, setTeam] = useState({
        team_name: "",
        country: "India",
        state: "Nagaland",
        foundyear: "",
        code: ""
    });

    const [players, setPlayers] = useState([
        { player_name: "", position: "", role: "", photos: "", jerseyNo: "", showJersey: false }
    ]);

    const [playerslist, setPlayerslist] = useState([]);
    const [appUrl, setAppUrl] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isneedjersy, setIsneedjersy] = useState(null)
    const [loading, setLoading] = useState(false);


    const getteamandplayerlist = async () => {
        try {
            const teamId = localStorage.getItem('teamId');

            const response = await postRequest('api/Add-Team', {
                teamId,
                req_type: "get-team-and-players"
            })

            if (response?.data) {
                setPlayerslist(response.data);
                setAppUrl(response.appurl);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getteamandplayerlist();
        //  localStorage.setItem('teamId', 74)
        // localStorage.setItem('accesscode', 'inustest1')
    }, []);

    const handleTeamChange = (e) => {
        const { name, value } = e.target;
        setTeam({ ...team, [name]: value });
    };


    const handlePlayerChange = (index, e) => {
        const { name, value, files, type } = e.target;
        const newPlayers = [...players];


        if (name === 'role') {
            newPlayers[index].role = value;
            newPlayers[index].showJersey = (value === 'Starter' || value === 'Substitute'
                || value === 'Vice Captain' || value === 'Captain');
        } else if (type === "file") {
            newPlayers[index]["photos"] = files[0];
        } else {
            newPlayers[index][name] = value;
        }

        setPlayers(newPlayers);
    };


    const addPlayer = () => {
        setPlayers([...players, { player_name: "", position: "", role: "", photos: "", jerseyNo: "", }]);
    };

    const removePlayer = (index) => {
        const newPlayers = [...players];
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const teamcode = localStorage.getItem('teamcode');
        const formData = new FormData();

        if (teamcode === team.code) {
            alert('Team already added! Please Enter New Code');
            return;
        }


        if (players.length < 11) {
            alert('Player should be at least 11')
            return
        }



        formData.append(
            "team",
            JSON.stringify({
                team_name: team.team_name,
                country: team.country,
                state: team.state,
                foundyear: team.foundyear,
                code: team.code,

            })
        );

        if (team.teamlogo) formData.append("teamlogo", team.teamlogo);
        if (team.teamimage) formData.append("teamimage", team.teamimage);


        const playersData = players.map((player, index) => {

            formData.append(`player_photos_${index}[]`, player.photos);

            return {
                player_name: player.player_name,
                position: player.position,
                role: player.role,
                jerseyNo: player.jerseyNo,
            };
        });

        formData.append("players", JSON.stringify(playersData));
        formData.append("req_type", "add-team");

        setLoading(true);
        try {
            const response = await fetch(`${apiurl}/api/Add-Team`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                setTeam({
                    team_name: "",
                    country: "India",
                    state: "Nagaland",
                    foundyear: "",
                })
                setPlayers([])
                e.target[4].value = ''
                e.target[5].value = ''
                localStorage.setItem('teamId', data.data.teamId)
                localStorage.setItem('accesscode', data.data.accesscode)
                localStorage.setItem('teamcode', team.code)

                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);

            }
        } catch (error) {
            console.error("Error submitting team:", error);
            toast.error(error?.message);
        }finally{
            await   getteamandplayerlist();

        }
    };

    const handleEdit = (player) => {
        setSelectedPlayer(player);
        setShowModal(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedPlayer({ ...selectedPlayer, [name]: value });
    };



    const handleUpdate = async () => {
        try {

            const accesscode = localStorage.getItem('accesscode');
            const response = await postRequest('api/Add-Team', {
                accesscode,
                selectedPlayer,
                req_type: 'update-payers'
            })


            if (response.success) {
                toast.success(response.message)
                await getteamandplayerlist();
                setShowModal(false);

            } else {
                toast.error(response.message)
            }

        } catch (error) {
            return toast.error(error?.message)
        }

    };



    return (
        <>
            {loading && <Loader />}
            <div className="container" style={{ paddingTop: "100px" }}>


                <div className="card shadow-lg p-4 rounded-4">

                    <div className="text-center mb-4">
                        <img
                            src="nsf/25NSFMMTlogo.jpg"
                            alt="NSF Logo"
                            style={{ height: "75px", marginRight: "8px", marginTop: '-20px' }}
                        />
                        <h2
                            style={{ fontSize: "17px" }}
                            className="d-flex justify-content-center align-items-center gap-2"
                        >

                            25th NSF Martyrs' Memorial Trophy
                        </h2>
                        <span
                            style={{
                                fontSize: "14px",
                                textDecoration: "underline",
                                display: "block",
                            }}
                        >
                            ⚽ Add Football Team & Players
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Team Info */}
                        <h4>Team Information</h4>
                        <div className="row  md-3">
                            <div className="col-md-12 mt-3">
                                <label htmlFor="form-label">Enter Team Access Code</label>
                                <input type="text" name="code" className="form-control" value={team.code}
                                    onChange={handleTeamChange} placeholder="Code" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Team Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="team_name"
                                    value={team.team_name}
                                    onChange={handleTeamChange}
                                    placeholder="Team Name"

                                    style={{ color: "black", backgroundColor: "white" }}
                                    required
                                />
                            </div>



                            <div className="col-md-6 mt-6">
                                <label className="form-label">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    value={team.country}
                                    onChange={handleTeamChange}
                                    placeholder="Country"
                                    disabled
                                    required
                                />
                            </div>

                            <div className="col-md-6 mt-3">
                                <label className="form-label">State</label>
                                <select
                                    name="state"
                                    id="state"
                                    className="form-control"
                                    value={team.state}
                                    onChange={handleTeamChange}
                                    required

                                >
                                    <option value="">-- Select State --</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>
                                </select>


                            </div>

                            <div className="col-md-6 mt-3" style={{ display: "none" }}>
                                <label className="form-label">Founded Year</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="foundyear"
                                    value={team.foundyear}
                                    onChange={handleTeamChange}

                                />
                            </div>

                            {/* <div className="col-md-6 mt-3">
                            <label className="form-label">Founded Year</label>
                            <select
                                className="form-control"
                                name="foundyear"
                                value={team.foundyear}
                                onChange={handleTeamChange}
                            >
                                <option value="">Select Year</option>
                                {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <option key={year} value={year}>
                                    {year}
                                    </option>
                                );
                                })}
                            </select>
                            </div> */}

                            {/* Team Image */}
                            <div className="col-md-6 mt-3">
                                <label className="form-label">Team Group Photo (with uniform) <span style={{ color: "red" }}>(JPEG/JPG/PNG)</span></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="teamimage"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setTeam({ ...team, teamimage: e.target.files[0] })
                                    }
                                    required
                                />
                            </div>

                            {/* Team Logo */}
                            <div className="col-md-6 mt-3">
                                <label className="form-label">Team Logo <span style={{ color: "red" }}>(JPEG/JPG/PNG)</span></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="teamlogo"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setTeam({ ...team, teamlogo: e.target.files[0] })
                                    }
                                    required
                                />
                            </div>



                        </div>


                        {/* Players Info */}
                        <h4 className="mt-4">Players</h4>
                        {players.map((player, index) => (
                            <div key={index} className="row align-items-end mb-3 border rounded-3 p-3 bg-light">

                                {/* Player Name */}
                                <div className="col-md-2">
                                    <label className="form-label">Player Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="player_name"
                                        value={player.player_name}
                                        onChange={(e) => handlePlayerChange(index, e)}
                                        placeholder="Player Name"
                                        required
                                    />
                                </div>

                                {/* Position */}
                                <div className="col-md-2">
                                    <label className="form-label">Position</label>
                                    <select
                                        name="position"
                                        className="form-control"
                                        value={player.position}
                                        onChange={(e) => handlePlayerChange(index, e)}
                                    >
                                        <option value="">--Select--</option>

                                        {/* On-field positions */}
                                        <option value="Goalkeeper">Goalkeeper</option>
                                        <option value="Right Back">Right Back</option>
                                        <option value="Left Back">Left Back</option>
                                        <option value="Center Back">Center Back</option>
                                        <option value="Defensive Midfielder">Defensive Midfielder</option>
                                        <option value="Central Midfielder">Central Midfielder</option>
                                        <option value="Attacking Midfielder">Attacking Midfielder</option>
                                        <option value="Right Winger">Right Winger</option>
                                        <option value="Left Winger">Left Winger</option>
                                        <option value="Forward/Striker">Forward/Striker</option>

                                    </select>
                                </div>

                                {/* Photo */}
                                <div className="col-md-2">
                                    <label className="form-label">Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={(e) => handlePlayerChange(index, e)}
                                        required
                                    />
                                </div>

                                {/* Role */}
                                <div className="col-md-2">
                                    <label className="form-label">Role</label>
                                    <select
                                        name="role"
                                        className="form-control"
                                        value={player.role}
                                        onChange={(e) => handlePlayerChange(index, e)}
                                        required
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Team Manager">Team Manager</option>
                                        <option value="Coach">Coach</option>
                                        <option value="Captain">Captain</option>
                                        <option value="Vice Captain">Vice Captain</option>
                                        <option value="Physiotherapist">Physiotherapist</option>
                                        <option value="Starter">Main Player</option>
                                        <option value="Substitute">Substitute</option>
                                    </select>
                                </div>

                                {/* Jersey No (conditional) */}
                                {player.showJersey && (
                                    <div className="col-md-2">
                                        <label className="form-label">Jersey No.</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Jersey No"
                                            name="jerseyNo"
                                            value={player.jerseyNo}
                                            onChange={(e) => handlePlayerChange(index, e)}
                                        />
                                    </div>
                                )}

                                {/* Remove button */}
                                <div className="col-md-2 text-end">
                                    {players.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger mt-4"
                                            onClick={() => removePlayer(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary mb-3"
                            onClick={addPlayer}
                        >
                            ➕ Add More Player
                        </button>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5">
                                ✅ Save Team & Players
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card card shadow-lg p-4 rounded-4">
                    <div className="card-body">
                        <div className="row">
                            {playerslist.length > 0 && (
                                <div className="card shadow-lg">
                                    <div className="card-header bg-dark text-white d-flex align-items-center">
                                        <img
                                            src={`${appUrl}/${playerslist[0].teamlogo}`}
                                            alt="Team Logo"
                                            className="me-3"
                                            style={{ width: "40px", height: "40px", objectFit: "contain" }}
                                        />
                                        <h4 className="mb-0">{playerslist[0].team_name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover align-middle">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Photo</th>
                                                        <th>Player Name</th>
                                                        <th>Position</th>
                                                        <th>Jersey No</th>
                                                        <th>Role</th>
                                                        <th>Country</th>
                                                        <th>State</th>
                                                        <th>Joined</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {playerslist.map((player, index) => (
                                                        <tr key={player.player_id}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <img
                                                                    src={`${appUrl}/${player.photo}`}
                                                                    alt={player.player_name}
                                                                    className="rounded-circle border"
                                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                />
                                                            </td>
                                                            <td>{player.player_name}</td>
                                                            <td>{player.position}</td>
                                                            <td>{player.jerseyNo == null ? 'N/A' : player.jerseyNo}</td>

                                                            <td>
                                                                <span
                                                                    className={`badge ${player.role === "Starter" ? "bg-success" : "bg-secondary"
                                                                        }`}
                                                                >
                                                                    {player.role}
                                                                </span>
                                                            </td>
                                                            <td>{player.country}</td>
                                                            <td>{player.state}</td>
                                                            <td>{new Date(player.created_at).toLocaleDateString()}</td>
                                                            <td><button className="btn  btn-danger  btn-sm" onClick={() => handleEdit(player)}>Edit</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Edit Player</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label>Player Name</label>
                                        <input
                                            type="text"
                                            name="player_name"
                                            value={selectedPlayer?.player_name || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Position</label>
                                        <select name="position" id="position" className="form-control" value={selectedPlayer?.position || ""} onChange={handleChange}>
                                            <option value="">-Selectc Position-</option>
                                            <option value="Goalkeeper">Goalkeeper</option>
                                            <option value="Right Back">Right Back</option>
                                            <option value="Left Back">Left Back</option>
                                            <option value="Center Back">Center Back</option>
                                            <option value="Defensive Midfielder">Defensive Midfielder</option>
                                            <option value="Central Midfielder">Central Midfielder</option>
                                            <option value="Attacking Midfielder">Attacking Midfielder</option>
                                            <option value="Right Winger">Right Winger</option>
                                            <option value="Left Winger">Left Winger</option>
                                            <option value="Forward/Striker">Forward/Striker</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Jersey No</label>
                                        <input
                                            type="number"
                                            name="jerseyNo"
                                            className="form-control"
                                            value={selectedPlayer?.jerseyNo || ""}
                                            onChange={handleChange}
                                            disabled={
                                                selectedPlayer?.role !== "Starter" && selectedPlayer?.role !== "Substitute"
                                            }
                                            placeholder="N/A"
                                        />
                                    </div>


                                    <div className="mb-3">
                                        <label>Team</label>
                                        <input
                                            type="text"
                                            name="team_name"
                                            value={selectedPlayer?.team_name || ""}
                                            onChange={handleChange}
                                            className="form-control"


                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={selectedPlayer?.country || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3" style={{ display: "none" }}>
                                        <label>Found year</label>
                                        <input
                                            type="date"
                                            name="foundyear"
                                            value={selectedPlayer?.foundyear || ""}
                                            onChange={handleChange}
                                            className="form-control"

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>State</label>
                                        <select name="state" id="state" className="form-control" value={selectedPlayer?.state || ""} onChange={handleChange}>
                                            <option value="">-- Select State --</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Ladakh">Ladakh</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label>Role</label>
                                        <select
                                            name="role"
                                            value={selectedPlayer?.role || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">--Select--</option>
                                            <option value="Team Manager">Team Manager</option>
                                            <option value="Coach">Coach</option>
                                            <option value="Captain">Captain</option>
                                            <option value="Vice Captain">Vice Captain</option>
                                            <option value="Physiotherapist">Physiotherapist</option>
                                            <option value="Starter">Main Player</option>
                                            <option value="Substitute">Substitute</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success" onClick={handleUpdate}>
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />

            <br />
        </>
    );
};



export default PlayerForm;