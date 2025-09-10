
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MatchProvider } from "./context/MatchContext";
import Header from "./components/Header";
import MainHeader from "./components/MainHeader";
import Herosection from "./components/Herosection";
import BookTicket from "./pages/BookTicket";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AboutUs from "./pages/AboutUs";
import PlayerForm from "../src/pages/PlayerForm";
import LiveScore from "./pages/LiveScore";
import PricingDetails from "./pages/PricingDetails";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUs from "./pages/ContactUs";
import Sponsors from "./pages/Sponsors";
function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <Header /> : <MainHeader />}
      <MatchProvider>
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/Book-Ticket" element={<BookTicket />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/player-form" element={<PlayerForm />} />
          <Route path="/live-score" element={<LiveScore />} />
          <Route path="/pricing-details" element={<PricingDetails />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/contac-us" element={<ContactUs />} />
          <Route path="/sponsors" element={<Sponsors />} />





        </Routes>
        <ScrollToTopButton />
      </MatchProvider>
      {location.pathname === '/player-form' ? '' : <Footer />}
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
