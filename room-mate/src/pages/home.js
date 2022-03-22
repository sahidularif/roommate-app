import React, { useEffect, useState } from 'react';
import AddListing from '../components/home/addListing/addListing';
import FeatherListing from '../components/home/feathurListing/featherListing';
import Footer from '../components/home/footer/footer';
import Header from '../components/home/header/header';
import Navbar from '../components/home/header/navBar';
import HeroSection from '../components/home/heroSection/heroSection';
import Services from '../components/home/services/services';
import Subscribe from '../components/home/subscribe/subscribe';
import Testimonial from '../components/home/testimonial/testimonial';
import '../styles/home.css';
import BookData from '../data.json';
import axios from 'axios';
const Home = () => {
    const [data, setData] = useState([])
useEffect(()=>{
    axios.get('http://localhost:5000/api/find_rooms')
        // .then((res)=> JSON.parse(res))
        .then((res)=>{
            setData(res.data)
            console.log(res.data)
        })
},[])
    return (
        <>
            <section className="top-section">
                <div className="header-section">
                    <div className="top-bar">
                        <Header />
                    </div>
                    <div className="nav-bar">
                        <Navbar />
                    </div>
                    <div className="hero-bar text-center justify-content-center">
                        <HeroSection data={BookData} />
                    </div>
                </div>
            </section>
            <section className="service-section">
                <Services />
            </section>
            <section className="testimonial-section">
                <Testimonial />
            </section>
            <section>
                <FeatherListing />
            </section>
            <section>
                <AddListing />
            </section>
            <section>
                <Subscribe />
            </section>
            <section>
            <div className="col-6">
             <h4 className="text-success font-weight-bold">Multiple Files List</h4>
             <div className="row">
                      {data.map((file, index) =>
                        <div className="col-6">
                            <div className="card mb-2 border-0 p-0">
                              <img src={`${file.img_collection[0]}`} width="50%" className="card-img-top img-responsive" alt="img"/>
                              </div>
                          </div>
                       )}
                      </div>
           </div>
            </section>
            <section>
                <Footer />
            </section>
        </>
    );
};

export default Home;