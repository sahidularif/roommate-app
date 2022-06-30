import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import img from "../../../../images/bg1.jpg"
import '../../../../styles/dashboard.css'

const AdsListing = () => {

    const [ads, setAds] = useState([])
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/find_rooms`)
            .then((res) => {
                setAds(res.data)
            })
    }, [])
    // console.log(ads);

    
    return (
        <div className='ads-list-section'>
            <div className='ads-list-body'>
                {
                    ads.map((ad) => {
                        return (
                            <div className='ads-body d-flex' onClick={()=> history.push(`/edit/${ad._id}`)}>
                                <div className='ads-pic'>
                                    <img src={ad.img_collection[1]} className="img-fluid rounded " alt="..." />
                                </div>
                                <div className='ads-desc'>
                                    <h5>{ad.title}</h5>
                                    <div className=''>
                                        <span>{ad.description}</span>
                                    </div>
                                    <div className=''>
                                        <span><i class="fa-solid fa-door-open"></i> Room: {ad.room}</span> &nbsp;
                                        <span><i class="fa-solid fa-bed"></i> Bed: {ad.bed}</span>&nbsp;
                                        <span><i class="fa-solid fa-bath"></i> Bath: {ad.bath}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='ads-list-heiglight'>
                <h1>This is heilight</h1>
            </div>
        </div>
    );
};

export default AdsListing;