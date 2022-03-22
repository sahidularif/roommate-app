import React from 'react';
// import '../../../styles/testimonial.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const Subscribe = () => {
    return (
        <div className="subscription-section">
            <div className="subscribe">
                <div className="about-us heading-section">
                    <h2 class=""><strong>NEWSLETTER</strong></h2>
                    <p>Subscribe and get the latest news and useful tips, advice and best offer.</p>

                </div>

                <div className="subscribe-body">
                    <div class="subscription-bar">
                        <form class="">
                            <div class="input-field pt-5">
                                <div class="textfield-search">
                                    <input type="text" class="input-text" placeholder="Enter your email" />
                                </div>
                                <button type="submit" className="search-submit">Subscribe</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Subscribe;