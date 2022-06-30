import React from 'react';
import '../../../styles/addListing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const Subscribe = () => {
    return (
        <div className="subscription-section">
            <div className="subscribe">
                <div className="about-us heading-section">
                    <h2 class=""><strong>Subcribe to our Newsletter</strong></h2>
                    <p>Subscribe and get the latest news and useful tips, advice and best offer.</p>

                </div>

                <form class="subscribe-body">
                    
                    <div class="input-field">
                        <input type="text" class="input-text" placeholder="Enter your email" />
                        <button type="button" className="search-submit">Subscribe</button>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default Subscribe;