import React from 'react';
import '../../../styles/services.css';
import safe from "../../../images/services/chatting.png";
import matchIcon from "../../../images/services/match.png";
import verifyIcon from "../../../images/services/verifide.png";

const Services = () => {
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);

  return (
    <>
       <section class="ftco-section services-section">
        <div class="container">
          <div class="row d-flex justify-content-between">
            <div class="col-md-4 align-self-stretch ftco-animate reveal">
              <div class="media block-6 services d-block text-center">
                <div class="d-flex justify-content-center"><img src={matchIcon} className="img-fluid" alt="" /></div>
                <div class="media-body p-2 mt-2">
                  <h3 class="heading mb-3">Perfect matching</h3>
                  <p>Create your personal roommate profile and get started in minutes! Get specific with things like pet preferences, room features, neighborhood details, and more.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 align-self-stretch ftco-animate reveal">
              <div class="media block-6 services d-block text-center">
                <div class="d-flex justify-content-center"><img src={safe} className="img-fluid" alt="" /></div>
                <div class="media-body p-2 mt-2">
                  <h3 class="heading mb-3">Safe connection</h3>
                  <p>Communicate with potential roommates using our website, iOS app, or Android app anytime, anywhere. Make a real connection - safe, simple, and convenient.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 align-self-stretch ftco-animate reveal">
              <div class="media block-6 services d-block text-center">
                <div class="d-flex justify-content-center"><img src={verifyIcon} className="img-fluid" alt="" /></div>
                <div class="media-body p-2 mt-2">
                  <h3 class="heading mb-3">Verified identities</h3>
                  <p>Users can verify identity through multiple sources so you can search with confidence! Our proprietary fraud detction tool helps keep out the spam.️</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
};

export default Services;