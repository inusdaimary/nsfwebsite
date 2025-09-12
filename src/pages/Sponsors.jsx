import React, { useState } from "react";
import { motion } from "framer-motion";
import aboutBg from "../../public/images/bg_1.jpg";
import { postRequest, apiurl } from "../service/Axios";
import Loader from "../../src/components/Loader";

const Sponsors = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        brands: [{ brandName: "", brandLogo: null }],
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e, index = null) => {
        if (index !== null) {
            // Brand fields
            const updatedBrands = [...formData.brands];
            if (e.target.name === "brandLogo") {
                updatedBrands[index][e.target.name] = e.target.files[0];
            } else {
                updatedBrands[index][e.target.name] = e.target.value;
            }
            setFormData({ ...formData, brands: updatedBrands });
        } else {
            // Normal fields
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addBrandField = () => {
        setFormData({
            ...formData,
            brands: [...formData.brands, { brandName: "", brandLogo: null }],
        });
    };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  // Basic sponsor info
  data.append(
    "sponsor",
    JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    })
  );

  // Append brands
  const brandsData = formData.brands.map((brand, index) => {
    if (brand.brandLogo) {
      data.append(`brandLogo_${index}`, brand.brandLogo); 
    }
    return {
      brandName: brand.brandName,
    };
  });

  // Add all brand details as JSON
  data.append("brands", JSON.stringify(brandsData));

  // Extra identifier (optional, if your backend expects it)
  data.append("req_type", "add-sponsor");

  setLoading(true);
  try {
    const response = await fetch(`${apiurl}/api/Add-Team`, {
      method: "POST",
      body: data,
    });

    const result = await response.json();

    if (result.success) {
      alert("✅ Sponsor submitted successfully!");
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        brands: [{ brandName: "", brandLogo: null }],
      });
    } else {
      alert("❌ Failed to submit. Try again.");
    }
  } catch (error) {
    console.error("Error submitting sponsor:", error);
    alert("⚠️ Something went wrong.");
  } finally {
    setLoading(false);
  }
};




    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${aboutBg}) no-repeat center/cover`,
                padding: "40px 20px",

            }}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-4 p-4 p-md-5 w-100"
                style={{ maxWidth: "600px", marginTop: "6vh" }}

            >
                <h2 className="text-center mb-4 fw-bold text-primary">
                    <span  style={{fontSize:'24px'}}>NSF Martyrs’ Memorial Trophy 2025 🏆</span> <br />
                   <span  style={{fontSize:"15px"}}>Your brand, our stage — let’s grow together 🚀</span>
                </h2>
                <p className="text-center text-muted mb-4">
                    Join us in making football events unforgettable while promoting your
                    brand to thousands of fans.
                </p>

                {loading && <Loader />}

                {submitted ? (
                    <div className="text-center p-4">
                        <h4 className="text-success mb-3">✅ Thank You!</h4>
                        <p>We’ll get in touch with you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="row g-3">
                        {/* Full Name */}
                        <div className="col-md-6">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control rounded-3"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control rounded-3"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="col-md-12">
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                className="form-control rounded-3"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="col-12">
                            <label className="form-label">Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                className="form-control rounded-3"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us how you’d like to collaborate..."
                            ></textarea>
                        </div>

                        {/* Dynamic Brand Fields */}
                        <div className="col-12">
                            <label className="form-label fw-bold">Brands</label>
                            {formData.brands.map((brand, index) => (
                                <div key={index} className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="brandName"
                                            className="form-control rounded-3"
                                            value={brand.brandName}
                                            onChange={(e) => handleChange(e, index)}
                                            placeholder="Brand Name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="file"
                                            name="brandLogo"
                                            className="form-control rounded-3"
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="text-end">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={addBrandField}
                                >
                                    + Add Another Brand
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="col-12 text-center mt-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="btn btn-primary px-5 py-2 rounded-3 fw-bold"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Form"}
                            </motion.button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Sponsors;
