import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Users, Clock, Flag, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NSFTrophyResponsiveUI() {
 return(
       <div className="site-wrap">

        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>


        <header className="site-navbar py-4" role="banner">

          <div className="container">
            <div className="d-flex align-items-center">
              <div className="site-logo">
                <a href="index.html">
                  <img src="images/logo.png" alt="Logo" />
                </a>
              </div>
              <div className="ml-auto">
                <nav className="site-navigation position-relative text-right" role="navigation">
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li className="active"><a href="index.html" className="nav-link">Home</a></li>
                    <li><a href="matches.html" className="nav-link">Matches</a></li>
                    <li><a href="players" className="nav-link">Players</a></li>
                    <li><a href="blog.html" className="nav-link">Blog</a></li>
                    <li><a href="contact.html" className="nav-link">Contact</a></li>
                  </ul>
                </nav>

                <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"><span
                  className="icon-menu h3 text-white"></span></a>
              </div>
            </div>
          </div>

        </header>

        <div className="hero overlay" style={{ backgroundImage: "url('images/bg_3.jpg')" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 ml-auto">
                <h1 className="text-white">NSF Martyrs’ Memorial Trophy 2025</h1>
                <p>25th Silver Jubilee Edition Goal for Peace</p>
                <div id="date-countdown"></div>
                <p>
                  <a href="#" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</a>
                  <a href="#" className="more light">Learn More</a>
                </p>
              </div>
            </div>
          </div>
        </div>



        <div className="container">


          <div className="row">
            <div className="col-lg-12">

              <div className="d-flex team-vs">
                <span className="score">4-1</span>
                <div className="team-1 w-50">
                  <div className="team-details w-100 text-center">
                    <img src="images/logo_1.png" alt="Image" className="img-fluid" />
                    <h3>Kohima United <span>(win)</span></h3>
                    <ul className="list-unstyled">
                      <li>inus daimary (12)</li>
                      <li>Ashish (7)</li>
                      <li>imsu (10)</li>
                      <li>xxxxxx (5)</li>
                    </ul>
                  </div>
                </div>
                <div className="team-2 w-50">
                  <div className="team-details w-100 text-center">
                    <img src="images/logo_2.png" alt="Image" className="img-fluid" />
                    <h3>Chümoukedima Warriors <span>(loss)</span></h3>
                    <ul className="list-unstyled">
                      <li>Temjen (3)</li>
                      <li>Imkong (8)</li>
                      <li>xxxxxxx (9)</li>
                      <li>xxxxxxxxxx (5)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="latest-news">
          <div className="container">
            <div className="row">
              <div className="col-12 title-section">
                <h2 className="heading">Teams</h2>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-4">
                <div className="post-entry">
                  <a href="#">
                    <img src="test/ChümoukedimaWarriors.jpg" alt="Image" className="img-fluid" />
                  </a>
                  <div className="caption">
                    <div className="caption-inner">
                      <div className="author d-flex align-items-center">
                        <div className="text">
                          <h4>xxxxxxxxx</h4>
                          <span>xxxxx  xxxxxxxxxxxx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="post-entry">
                  <a href="#">
                    <img src="test/66309492_1728147677_1.jpg" alt="Image" className="img-fluid" />
                  </a>
                  <div className="caption">
                    <div className="caption-inner">
                      <div className="author d-flex align-items-center">
                        <div className="text">
                          <h4>xxxxxxxxxxxxxxxxxx</h4>
                          <span>xxxxxxxxxx  xxxxxxxxx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="post-entry">
                  <a href="#">
                    <img src="test/98535062_1728147634_2.webp" alt="Image" className="img-fluid" />
                  </a>
                  <div className="caption">
                    <div className="caption-inner">
                      <div className="author d-flex align-items-center">
                        <div className="text">
                          <h4>xxxxxxxxxxxxxxxxxxxx</h4>
                          <span>xxxxxxxxxx xxxxxxxxxxxx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="site-section bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="widget-next-match">
                  <div className="widget-title">
                    <h3>Next Match</h3>
                  </div>
                  <div className="widget-body mb-3">
                    <div className="widget-vs">
                      <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                        <div className="team-1 text-center">
                          <img src="images/logo_1.png" alt="Image" />
                          <h3>Football League</h3>
                        </div>
                        <div>
                          <span className="vs"><span>VS</span></span>
                        </div>
                        <div className="team-2 text-center">
                          <img src="images/logo_2.png" alt="Image" />
                          <h3>Soccer</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center widget-vs-contents mb-4">
                    <h4>NSF Martyrs’ Memorial Trophy 2025</h4>
                    <p className="mb-5">
                      <span className="d-block">13 Sep 2025</span>
                      <span className="d-block">16:00 IST</span>
                      <strong className="text-primary">Indira Gandhi Stadium, Kohima</strong>
                    </p>

                    <div id="date-countdown2" className="pb-1"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">

                <div className="widget-next-match">
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th>P</th>
                        <th>Team</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td><strong className="text-black">Football League</strong></td>
                        <td>22</td>
                        <td>3</td>
                        <td>2</td>
                        <td>140</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td><strong className="text-black">Soccer</strong></td>
                        <td>22</td>
                        <td>3</td>
                        <td>2</td>
                        <td>140</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td><strong className="text-black">Kohima United</strong></td>
                        <td>22</td>
                        <td>3</td>
                        <td>2</td>
                        <td>140</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td><strong className="text-black">Chümoukedima Warriors</strong></td>
                        <td>22</td>
                        <td>3</td>
                        <td>2</td>
                        <td>140</td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>



        <div className="container site-section">
          <div className="row">
            <div className="col-6 title-section">
              <h2 className="heading">Our Blog</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="custom-media d-flex">
                <div className="img mr-4">
                  <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="Image" className="img-fluid" />
                </div>
                <div className="text">
                  <span className="meta">Founded in 2011</span>
                  <h3 className="mb-4"><a href="#">Kohima United?</a></h3>
                  <p>Kohima United is a misnomer; the actual football club is 27 United FC, based in Kohima. It was founded in 2024 to promote community engagement through sports, using the motto "Peace Through Sports.</p>
                  {/* <p><a href="#">Read more</a></p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="custom-media d-flex">
                <div className="img mr-4">
                  <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="Image" className="img-fluid" />
                </div>
                <div className="text">
                  <span className="meta">xxxxxxxxxxxxxxxxxxxxx</span>
                  <h3 className="mb-4"><a href="#">Chümoukedima Warriors</a></h3>
                  <p>Youth Development: S. Ayenmongba and Vinato Achumi from Frontier Warriors FC were selected to represent Nagaland in the Swami Vivekananda U-20 Men's National Football Championship 2025</p>
                  {/* <p><a href="#">Read more</a></p> */}
                </div>
              </div>
            </div>
          </div>
        </div>



        <footer className="footer-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="widget mb-3">
                  <h3>News</h3>
                  <ul className="list-unstyled links">
                    <li><a href="#">All</a></li>
                    <li><a href="#">Club News</a></li>
                    <li><a href="#">Media Center</a></li>
                    <li><a href="#">Video</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="widget mb-3">
                  <h3>Tickets</h3>
                  <ul className="list-unstyled links">
                    <li><a href="#">Online Ticket</a></li>
                    <li><a href="#">Payment and Prices</a></li>
                    <li><a href="#">Contact &amp; Booking</a></li>
                    <li><a href="#">Tickets</a></li>
                    <li><a href="#">Coupon</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="widget mb-3">
                  <h3>Matches</h3>
                  <ul className="list-unstyled links">
                    <li><a href="#">xxxxx</a></li>
                   
                  </ul>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="widget mb-3">
                  <h3>Social</h3>
                  <ul className="list-unstyled links">
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="row text-center">
              <div className="col-md-12">
                <div className=" pt-5">
                  <p>
                    Copyright {" "}
                    {new Date().getFullYear()} All rights reserved<i className="icon-heart"
                      aria-hidden="true"></i> by <a href="https://play.google.com/store/apps/details?id=com.bingeboxx.app&pcampaignid=web_share" target="_blank">BingeBoxx</a>

                  </p>
                </div>
              </div>

            </div>
          </div>
        </footer>



      </div>
 )
}
