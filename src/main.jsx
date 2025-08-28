import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../src/assets/css/style.css'
import '../src/assets/css/aos.css'
import '../src/assets/css/bootstrap-datepicker.css'
import '../src/assets/css/bootstrap.min.css'
import '../src/assets/css/jquery-ui.css'
import '../src/assets/css/jquery.fancybox.min.css'
import '../src/assets/css/jquery.mb.YTPlayer.min.css'
import '../src/assets/css/magnific-popup.css'
import '../src/assets/css/mediaelementplayer.css'
import '../src/assets/css/owl.carousel.min.css'
import '../src/assets/css/owl.theme.default.min.css'
import '../src/assets/css/bootstrap/bootstrap-grid.css'
import '../src/assets/css/bootstrap/bootstrap-reboot.css'
import '../src/assets/css/bootstrap/bootstrap.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
