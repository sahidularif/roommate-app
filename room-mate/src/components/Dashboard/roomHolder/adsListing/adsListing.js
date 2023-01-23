import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import img from "../../../../images/bg1.jpg"
import '../../../../styles/dashboard.css'

const AdsListing = () => {

    const [ads, setAds] = useState([])
    const history = useHistory();

    useEffect(() => {
        axios.get(`https://renterbd-backend.cyclic.app/api/find_rooms`)
            .then((res) => {
                setAds(res.data)
            })
    }, [])
    // console.log(ads);


    return (
        <div className='ads-list-section'>
            <div className='ads-list-body'>
                <div className="dashboard-add mt-5 mb-5">
                    <div className="advertise border">
                        <div class="heading-section ftco-animate">
                            <h3 className="">Looking for roommates?</h3>
                            <p>Be amazed at the response rate - rent your room within days</p>
                            <p className="p-btn">
                                <Link to="/roommateFind" className="btn btn-primary rounded-pill mt-2 px-4 py-3">Add Your Room</Link>
                            </p>
                        </div>
                    </div>
                    <div className="advertise border mt-2">
                        <div class="heading-section ftco-animate">
                            <h3 className="">Looking for room?</h3>
                            <p>Most people with rooms for rent search the rooms wanted for suitable.</p>
                            <p className="p-btn" >
                                <Link to="/tanentAds" className="btn btn-primary rounded-pill mt-2 px-4 py-3">Advertise for free</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdsListing;