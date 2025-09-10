import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MainHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close drawer if screen is desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <header
                className="site-navbar py-3 shadow-sm"
                role="banner"
                style={{ backgroundColor: "#0d1b2a", zIndex: "999" }}
            >
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* Logo */}
                       
                            <div className="site-logo">
                                {/* <p style={{ color: "white" }}>Naga Students' Federation</p>
                             */}
                                <img
                                    src="nsf/nsf.jpeg"
                                    alt=""
                                    className="band_logo"
                                    style={{

                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover",

                                    }}
                                />

                       
                        </div>

                        {/* Desktop Nav */}
                        <nav className="site-navigation d-none d-lg-block">
                            <ul className="nav gap-4" style={{ cursor: "pointer" }}>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link text-white fw-semibold">
                                        Home
                                    </Link>
                                </li>


                                {/* <li className="nav-item">
                                    <Link
                                        to="/dashboard#matches"
                                        className="nav-link text-white fw-semibold"
                                    >
                                        Matches
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/players" className="nav-link text-white fw-semibold">
                                        Players
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/blog" className="nav-link text-white fw-semibold">
                                        Blog
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link text-white fw-semibold">
                                        Contact
                                    </Link>
                                </li> */}


                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="btn btn-outline-light d-lg-none"
                            style={{ borderRadius: "8px" }}
                            onClick={toggleMenu}
                        >
                            <span className="h4 m-0">{isOpen ? "✖" : "☰"}</span>
                        </button>
                    </div>
                </div>



                {/* Mobile Side Drawer */}
                <div
                    className={`mobile-drawer ${isOpen ? "open" : ""}`}
                    style={{
                        position: "fixed",
                        top: "71px",
                        right: isOpen ? 0 : "-100%",
                        height: "100%",
                        width: "250px",
                        backgroundColor: "#0d1b2a",
                        color: "#fff",
                        transition: "right 0.3s ease-in-out",
                        zIndex: 2000,
                        padding: "2rem 1rem",
                    }}
                >
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <Link to="/" className="text-white fw-semibold" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        {/* <li className="mb-3">
                            <Link
                                to="/dashboard#matches"
                                className="text-white fw-semibold"
                                onClick={toggleMenu}
                            >
                                Matches
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link
                                to="/players"
                                className="text-white fw-semibold"
                                onClick={toggleMenu}
                            >
                                Players
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link
                                to="/blog"
                                className="text-white fw-semibold"
                                onClick={toggleMenu}
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link
                                to="/contact"
                                className="text-white fw-semibold"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </header>
        </>
    );
};



export default MainHeader;
