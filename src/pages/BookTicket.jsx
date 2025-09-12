import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { MatchContext } from "../context/MatchContext";
import { postRequest, apiurl } from "../service/Axios";
import aboutBg from "../../public/images/bg_1.jpg";
import { Modal, Button, Alert } from "react-bootstrap";
import Loader from "../../src/components/Loader"
const BookTicket = () => {
  const { currentmatch } = useContext(MatchContext)
  const [persons, setPersons] = useState(1);
  const [pricePerPerson, setpricePerPerson] = useState(null)
  const totalPrice = persons * pricePerPerson;
  const [loading, setloading] = useState(false)
  const [remark, setRemarks] = useState('')
  const [matchesdate, setmatchesdate] = useState(null)

  const [bookTicket, setBookTicket] = useState({
    fullname: "",
    email: "",
    phone: "",
    stadium: "",
    schedule_id: ""
  })

  const [showModal, setShowModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const [notifications, setnotifications] = useState([]);


  const handleBookingTicket = (e) => {
    const { name, value } = e.target;


    if (name === "schedule_id") {

      const selectedOption = e.target.options[e.target.selectedIndex];
      const dateAttr = selectedOption?.getAttribute("data-date");


      if (dateAttr) {
        const decodedDate = new Date(dateAttr).toISOString().split("T")[0];
        setmatchesdate(decodedDate);
      }
    }

    setBookTicket((prev) => ({ ...prev, [name]: value }));
  };



  useEffect(() => {
    getPricing()
    getnotication()
  }, [])


  const getPricing = async () => {
    try {
      const response = await postRequest(`${apiurl}/api/website`, {
        req_type: 'get-pricing'
      })

      if (response.success) {
        const ticketprice = response.ticketprice.map((price) => price.amount).join(',')
        const remarks = response.ticketprice.map((remark) => remark.remarks).join(',')

        setpricePerPerson(ticketprice || 0)
        setRemarks(remarks || '')
      }
    } catch (error) {
      alert(error?.message)
    }

  }

  const getnotication = async () => {

    try {

      const response = await postRequest('api/website', {

        req_type: "get-notifaction"
      })
      if (response) {
        setnotifications(response.notifications)
      }
    } catch (error) {
      console.log(error?.message)
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBookticket = async (e) => {
    e.preventDefault();


    const confirmBooking = window.confirm(
      "Please check all details (Name, Email, Phone, Stadium, Persons, and Total Price) before proceeding with payment."
    );

    if (!confirmBooking) {
      return;
    }

      
    if (matchesdate == '2025-09-13') {

    
      const formData = new FormData();
      formData.append("persons", persons);
      formData.append("totalPrice", totalPrice);
      formData.append("fullname", bookTicket.fullname);
      formData.append("email", bookTicket.email);
      formData.append("phone", bookTicket.phone);
      formData.append("stadium", bookTicket.stadium);
      formData.append("scheduleid", bookTicket.schedule_id);
      formData.append("req_type", "free-ticket");
      setloading(true)

      try {
        const freetickerresponse = await postRequest(`${apiurl}/api/website`, formData)

        const verifyData = freetickerresponse;
        if (verifyData.success) {
          setTicketData(verifyData);
          setShowModal(true);
          setBookTicket({
            fullname: "",
            email: "",
            phone: "",
            stadium: "",
            schedule_id: ""
          })
        }
      } catch (error) {
        alert(error?.message)
      } finally {
        setloading(false)
      }
      return
    }


    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }


    try {
      const formData = new FormData();
      formData.append("persons", persons);
      formData.append("totalPrice", totalPrice);
      formData.append("fullname", bookTicket.fullname);
      formData.append("email", bookTicket.email);
      formData.append("phone", bookTicket.phone);
      formData.append("stadium", bookTicket.stadium);
      formData.append("scheduleid", bookTicket.schedule_id);
      formData.append("req_type", "book-ticket");

      const res = await postRequest("api/website", formData);
      const data = res.response;

      if (!data.success) {
        alert("❌ Failed to create order. Try again!");
        return;
      }


      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Football Tickets",
        description: "Booking Ticket",
        order_id: data.order.id,


        handler: async function (response) {
          setloading(true);
          try {
            const verifyForm = new FormData();
            verifyForm.append("razorpay_payment_id", response.razorpay_payment_id);
            verifyForm.append("razorpay_order_id", response.razorpay_order_id);
            verifyForm.append("razorpay_signature", response.razorpay_signature);
            verifyForm.append("persons", persons);
            verifyForm.append("totalPrice", totalPrice);
            verifyForm.append("fullname", bookTicket.fullname);
            verifyForm.append("email", bookTicket.email);
            verifyForm.append("phone", bookTicket.phone);
            verifyForm.append("stadium", bookTicket.stadium);
            verifyForm.append("scheduleid", bookTicket.schedule_id);
            verifyForm.append("req_type", "verify-payment");

            const verifyRes = await postRequest("api/website", verifyForm);
            const verifyData = verifyRes;

            if (verifyData.success) {
              setTicketData(verifyData);
              setShowModal(true);
              setBookTicket({
                fullname: "",
                email: "",
                phone: "",
                stadium: "",
                schedule_id: ""
              })
            }
            else {
              alert("⚠️ Payment verification failed!");
            }
          } catch (err) {
            console.error("❌ Error verifying payment:", err);
            alert("⚠️ Something went wrong while verifying payment.");
          } finally {
            setloading(false);
          }
        },
        prefill: {
          name: bookTicket.fullname,
          email: bookTicket.email,
          contact: bookTicket.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Booking failed:", error);
      alert("⚠️ Booking failed. Please try again.");
    } finally {
      setloading(false)
    }
  };



  return (
    <>
      {loading && <Loader />}
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-start"
        style={{
          minHeight: "100vh",
          paddingTop: "15vh",
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* 
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-100 mb-4"
        >
          <div
            className="container rounded-4 shadow-lg p-3"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(12px)",
              color: "#fff",
            }}
          >
            <h5 className="fw-bold text-warning mb-3">🔔 Latest Updates</h5>

            <div className="list-group">
              {notifications.map((note) => (
                <motion.div
                  key={note.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <i className="bi bi-info-circle text-warning me-2"></i>
                    <span>{note.message}</span>
                  </div>
                  <small className="text-muted">
                    {new Date(note.created_at).toLocaleString()}
                  </small>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div> */}


        <div className="row w-100 justify-content-center g-5">

          {/* Booking Form (Right) */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="col-lg-6"
          >
            <div
              className="card border-0 rounded-4 shadow-lg mx-auto"
              style={{
                background: "rgba(0, 0, 218, 0.1)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                maxWidth: "500px",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-4 text-center text-light">
                  🎟 Reserve Your Spot
                </h2>

                <form onSubmit={handleBookticket} className="p-3">
                  {/* Full Name */}
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      id="floatingName"
                      name="fullname"
                      placeholder="Full Name"
                      value={bookTicket.fullname}
                      onChange={handleBookingTicket}
                      required
                    />
                    <label htmlFor="floatingName">Full Name</label>
                  </div>

                  {/* Email */}
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      className="form-control shadow-sm"
                      id="floatingEmail"
                      placeholder="Email"
                      name="email"
                      value={bookTicket.email}
                      onChange={handleBookingTicket}
                      required
                    />
                    <label htmlFor="floatingEmail">Email Address</label>
                  </div>

                  {/* Phone */}
                  <div className="form-floating mb-4">
                    <input
                      type="tel"
                      className="form-control shadow-sm"
                      id="floatingphone"
                      placeholder="Phone"
                      name="phone"
                      value={bookTicket.phone}
                      onChange={handleBookingTicket}
                      pattern="[0-9]{10}"
                      required
                    />
                    <label htmlFor="floatingphone">Phone</label>
                  </div>

                  {/* Stadium Select */}
                  <div className="form-floating mb-4">
                    <select
                      className="form-select shadow-sm"
                      id="floatingStadium"
                      required
                      name="stadium"
                      value={bookTicket.stadium}
                      onChange={handleBookingTicket}
                    >
                      <option value="">Choose Stadium...</option>

                      {[...new Set(currentmatch.map((m) => m.stadium))].map((stadium, idx) => (
                        <option key={idx} value={stadium}>
                          {stadium}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingStadium">Stadium</label>
                  </div>

                  {bookTicket.stadium && (
                    <div className="form-floating mb-4">
                      <select
                        className="form-select shadow-sm"
                        id="floatingMatch"
                        required
                        name="schedule_id"
                        value={bookTicket.schedule_id}
                        onChange={handleBookingTicket}
                      >
                        <option value="">Select Match Slot...</option>
                        {currentmatch
                          .filter((m) => m.stadium === bookTicket.stadium)
                          .map((m) => {
                            const matchDate = new Date(m.match_time);

                            const now = new Date();
                            const isExpired = matchDate < now;

                            return (
                              <option
                                data-date={matchDate}
                                key={m.schedule_id}
                                value={isExpired ? "" : m.schedule_id}
                                disabled={isExpired}
                                style={{ display: isExpired ? 'none' : '' }}
                              >
                                {matchDate.toLocaleDateString("en-GB", {
                                  weekday: "short",
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                — {m.team1_name} 🆚 {m.team2_name}
                                {isExpired ? " (Expired)" : ""}
                              </option>
                            );
                          })}
                      </select>
                      <label htmlFor="floatingMatch">Available Match Slots</label>
                    </div>
                  )}


                  {/* Total Persons */}
                  <div className="form-floating mb-4">
                    <input
                      type="number"
                      id="floatingqty"
                      min={1}
                      value={persons}
                      onChange={(e) => setPersons(Number(e.target.value))}
                      className="form-control shadow-sm"
                      required
                    />
                    <label htmlFor="floatingqty">Total Number of Persons</label>
                  </div>

                  {/* Price */}
                  <div className="alert alert-success text-center fw-bold shadow-sm">
                    🎟️ Total Price: ₹{matchesdate == '2025-09-13' ? <span style={{ color: "green" }}>Free</span> : totalPrice}

                  </div>

                  {/* Submit */}
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                    <button
                      type="submit"
                      className="btn btn-success confirm_booking btn-lg w-100 fw-bold shadow"
                      style={{
                        borderRadius: "14px",
                        padding: "14px",
                        fontSize: "1.2rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      ✅ Confirm Booking
                    </button>
                  </motion.div>
                </form>

              </div>
            </div>


          </motion.div>


          {/* Ticket Preview (Left) */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="col-lg-6"
          >
            {currentmatch
              .filter((matches) => new Date(matches.match_time) >= new Date())
              .map((matches) => {
                const matchDateTime = new Date(matches.match_time);
                const freeMatchDateTime = new Date("2025-09-13T16:30:00");
                const isFree =
                  matchDateTime.getTime() === freeMatchDateTime.getTime();

                return (
                  <div
                    className="card border-0 shadow-lg rounded-4 p-4 mb-4"
                    key={matches.schedule_id}
                    style={{
                      background: "rgba(0, 0, 0, 0.6)",
                      backdropFilter: "blur(12px)",
                      color: "#fff",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h4 className="fw-bold text-warning mb-0">
                        {matches.tournament_type}
                      </h4>
                      <span className="badge bg-light text-dark px-3 py-2">🎟 Ticket</span>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-center">
                        <img
                          src={`${matches.APP_URL}/${matches.team1_logo}`}
                          alt={matches.team1_name}
                          style={{ width: "70px", height: "70px", objectFit: "contain" }}
                        />
                        <p className="mt-2 fw-bold">{matches.team1_name}</p>
                      </div>
                      <h2 className="fw-bold text-light">VS</h2>
                      <div className="text-center">
                        <img
                          src={`${matches.APP_URL}/${matches.team2_logo}`}
                          alt={matches.team2_name}
                          style={{ width: "70px", height: "70px", objectFit: "contain" }}
                        />
                        <p className="mt-2 fw-bold">{matches.team2_name}</p>
                      </div>
                    </div>

                    <hr className="border-light" />

                    <p className="mb-2">
                      <i className="bi bi-geo-alt me-2"></i>{" "}
                      <strong style={{ fontSize: "22px" }}>
                        {matches.stadium || "Venue TBA"}
                      </strong>
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-calendar-event me-2"></i>{" "}
                      {matchDateTime.toLocaleString()}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <small className="text-light">Price</small>
                        <h5 className="fw-bold text-success mb-0">
                          {isFree ? "Free" : `₹${totalPrice} ${remark}`}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}


          </motion.div>




        </div>

      </div>




      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🎟️ Your Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ticketData && (
            <>
              <p><strong>Name:</strong> {ticketData.ticket.fullname}</p>
              <p><strong>Email:</strong> {ticketData.ticket.email}</p>
              <p><strong>Phone:</strong> {ticketData.ticket.phone}</p>
              <p><strong>Stadium:</strong> {ticketData.ticket.stadium}</p>
              <p><strong>Persons:</strong> {ticketData.ticket.persons}</p>
              <p><strong>Amount:</strong> ₹{ticketData.ticket.amount}</p>
              <p><strong>Order ID:</strong> {ticketData.ticket.orderId}</p>
              <p><strong>Payment ID:</strong> {ticketData.ticket.paymentId}</p>
              <p><strong>Status:</strong> ✅ {ticketData.ticket.status}</p>

              <div className="text-center">
                <img
                  src={ticketData.qrCode}
                  alt="Ticket QR"
                  style={{ width: "250px", height: "250px" }}
                />
                <br /><br />
                <a href={ticketData.qrCode} download="ticket_qr.png">
                  <Button variant="success">⬇️ Download QR Ticket</Button>
                </a>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>




      <style jsx="true">{`
                  @media (max-width: 576px) {
                    .form-floating > label {
                      font-size: 0.9rem !important;
                    }
                    .form-floating > .form-control,
                    .form-floating > .form-select {
                      font-size: 0.95rem  !important;
                    }

                    .confirm_booking{
                          font-size: medium !important;
                     }
                  }
                         
          `}</style>

    </>
  );
};

export default BookTicket;