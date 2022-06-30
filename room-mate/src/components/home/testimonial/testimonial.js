import React from 'react';
import '../../../styles/testimonial.css';
import identity from '../../../images/users/person_1.jpg';
import match from '../../../images/users/person_3.jpg';
import chat from '../../../images/users/person_4.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Carousel } from 'react-bootstrap';
const Testimonial = () => {
    return (
        <div className="testimonial">
            <div className="about-us w-100 heading-section" >
                <span className="subheading">About</span>
                <h2 className=""><strong>Why</strong> Choose Us?</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.</p>
                <p><a href="www.renterbd.com" className="btn outlin-btn rounded-pill mt-4 px-4 py-3">Read more</a></p>
            </div>

            <div className="sliders w-100">
                <div className="about-us heading-section">
                    <span className="subheading">Testimonial</span>
                    <h2 className=""><strong>Our</strong> Guests Says</h2>
                </div>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="bg-secondary active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="bg-secondary" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="bg-secondary" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner mb-2">
                        <div className="carousel-item active ">
                            <div className="card mb-5">
                                <div className="row g-0 m-auto d-flex">
                                    <div className="col-md-4 user-img">
                                        <img src={identity} claclassNamess="img-fluid rounded-pill" alt="..." />
                                    </div><br/>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <h6 className="card-title">M.S.Shorif</h6>
                                            <p className="card-text"><small className="text-muted">From Banglaesh</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card mb-5">
                                <div className="row g-0  m-auto d-flex">
                                    <div className="col-md-4 user-img">
                                        <img src={match} className="img-fluid rounded-pill" alt="..." />
                                    </div><br/>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <h6 className="card-title">M.N.Zahid</h6>
                                            <p className="card-text"><small className="text-muted">From UAE</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="card mb-5">
                                <div className="row g-0  m-auto d-flex">
                                    <div className="col-md-4 user-img">
                                        <img src={chat} className="img-fluid rounded-pill" alt="..." />
                                    </div><br/>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <h6 className="card-title">M.S.Arif</h6>
                                            <p className="card-text"><small className="text-muted">From Bangladesh</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="text-dark carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <i className="far fa-angle-left"></i>
                    </button>
                    <button className="text-dark carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <i className="far fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Testimonial;