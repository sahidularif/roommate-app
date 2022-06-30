import React, { useState } from 'react';
import './../../../styles/herosection.css';
import { FaBeer } from 'react-icons/fa';
const HeroSection = ({ data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((area) => {
            return area.name.toLowerCase().includes(searchWord.toLowerCase())
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter)
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('clicked');
        console.log(wordEntered);
    }
    function reveal() {
        var reveals = document.querySelectorAll(".search-tag");
        for (var i = 0; i < reveals.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = reveals[i].getBoundingClientRect().top;
          var elementVisible = 150;
      
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
          } 
        }
      }
      
      window.addEventListener("scroll", reveal);
    return (
        <div className="hero-section">
            <div className="heading-section">
                <h1 className=""><strong>Find</strong><br /> your amazing room and roommate</h1>
            </div>

            <form onSubmit={handleFormSubmit} className="justify-content-center align-items-center">
                <div className="app__search">
                    <div className="app__search-text">
                        <input type="text" className="input_text" placeholder="Enter city or zip code"
                            value={wordEntered}
                            onChange={handleFilter}
                        />
                        <div className="autocomplete">
                            {filteredData.length !== 0 && (
                                <div className="dataResult">
                                    {filteredData.slice(0, 15).map((value, key) => {
                                        return (

                                            <p onClick={() => {
                                                setWordEntered(value.name);
                                                setFilteredData([]);
                                            }}>
                                                {value.name}
                                            </p>

                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <button type='submit' className="app__search-submit" >
                        {/* <i className="far fa-search" />  */}
                        Search
                    </button>
                </div >
            </form>


            <div className="d-block search-tag justify-content-center align-items-center">
                <h1>Or browse the highlights</h1>
                <div className="tag-btn justify-content-center align-items-center">
                    <button className="tag-btn-btn"><i className="far fa-bed"></i> Private room</button>
                    <button className="tag-btn-btn"><i className="fal fa-hotel"></i> Hotel</button>
                    <button className="tag-btn-btn"><i className="fal fa-building"></i> Apartment</button>
                    <button className="tag-btn-btn"><i className="fal fa-parking"></i> Parking</button>
                </div>
            </div>
        </div >
    );
};

export default HeroSection;