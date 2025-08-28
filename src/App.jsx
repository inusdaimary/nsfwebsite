
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MainHeader from "./components/MainHeader";
import Herosection from "./components/Herosection";
import BookTicket from "./pages/BookTicket";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

import AboutUs from "./components/AboutUs ";

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <Header /> : <MainHeader />}

      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/Book-Ticket" element={<BookTicket />} />
        <Route path="/about-us" element={<AboutUs />} />

      </Routes>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <div className="site-wrap">
        <Layout />
      </div>
    </BrowserRouter>
  );
}
