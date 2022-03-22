import React, { useContext, useState } from 'react';


const UserRedirect = () => {
    const data = sessionStorage.getItem('newUser')
    // console.log(JSON.parse(data))
    return (
        <div className="userType-section">
            {/* <div className="log-wrapper"> */}
            <div className="userType-flatation">
                <div className='user-type'>
                    <div className="about-us heading-section">
                        <h2 class=""><strong>RenterBD</strong></h2>
                    </div>
                    <span class="subheading">your amazing room and roommate</span>
                </div>
                <div className='user-type'>
                    <h4 class="pb-5"><strong>Select your account type</strong></h4>
                    <div className='house-holder' onClick={()=>console.log('house holder')}>
                        <h6><span><i class="fad fa-user h2"></i> </span>House-holder <i class="far fa-long-arrow-right"></i></h6>
                    </div>
                    <div className='house-seeker' onClick={()=> console.log('house seeker')}>
                        <h6><span><i class="fad fa-search-location h2"></i></span> House-seeker <i class="far fa-long-arrow-right"></i></h6>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default UserRedirect;