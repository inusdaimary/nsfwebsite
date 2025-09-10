import React, { useState } from "react";
import Dashboard from "../layout/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FaTv, FaFutbol } from "react-icons/fa";




import Header from "./Header";
const Herosection = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handlebookingticket = () => {
        setShowModal(true)
    }

    const handleoffline = () => {
        navigate('Book-Ticket')
    }

    return (
        <>
            <Header />
            <div className="hero overlay" style={{ backgroundImage: "url('images/bg_3.jpg')" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 ml-auto">
                            <h1 className="text-white">NSF Martyrs’ Memorial Trophy 2025</h1>
                            <p>25th Silver Jubilee Edition Goal for Peace</p>
                            <div id="date-countdown"></div>
                            <p>

                                <Link onClick={handlebookingticket} className="btn btn-primary py-3 px-4 mr-3">Book Ticket</Link >
                                <Link to="#" className="more light">Learn More</Link >

                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Dashboard />

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>🎟️ Book Your Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="row mt-4">
                                        {/* Offline Stadium Option */}
                                        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                            <Card className="shadow-lg border-0 h-100 text-center">
                                                <Card.Body>
                                                    <FaTv size={50} color="#0d6efd" />
                                                    <h4 className="mt-3">🎟️ Watch Offline</h4>
                                                    <p className="text-muted">
                                                        Feel the thrill in person at Ground Stadium. Book your tickets now and cheer for your team live!
                                                    </p>
                                                    <br /> <br />
                                                    <Button variant="primary" className="w-100" onClick={handleoffline}>
                                                        Book Stadium Ticket
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        {/* Online OTT Option */}
                                        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                            <Card className="shadow-lg border-0 h-100 text-center">
                                                <Card.Body>
                                                    <FaTv size={50} color="#198754" />
                                                    <h4 className="mt-3">📺 Watch Online</h4>
                                                    <p className="text-muted">
                                                        Can’t make it to the stadium?
                                                        Stream live on the BingeBoxx App—available on your mobile (Play Store, App Store), TV (Google TV, Amazon Fire TV), and Laptop (Windows Store). Never miss a moment of the action!
                                                    </p>
                                                    <Button
                                                        variant="success"
                                                        className="w-100"
                                                        onClick={() => window.open("https://app.bingeboxx.com/", "_blank")}
                                                    >
                                                        Go to BingeBoxx App
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
        </>
    )

}


export default Herosection;