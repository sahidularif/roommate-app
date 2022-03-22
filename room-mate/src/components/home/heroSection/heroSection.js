import React, { useState } from 'react';
import '../../../styles/header.css';
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
    return (
        <div className="hero-section justify-content-center align-items-center my-auto">
            <div className="heading-section">
                <h1 className=""><strong>Find</strong><br /> your amazing room and roommate</h1>
            </div>
            <div class="search-bar">
                <form onSubmit={handleFormSubmit}>
                    <div class="input-fields">
                        <div class="textfield-search">
                            <input type="text" class="input-text" placeholder="Enter city or zipcode"
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
                        <button type="submit" className="search-submit" ><i class="far fa-search" /> Search</button>
                    </div>
                </form>

            </div >
            <div className="search-tag">
                <h1>Or browse the highlights</h1>
                <div className="tag-btn">
                    <button class="tag-btn-btn"><i class="far fa-bed"></i> Private room</button>
                    <button class="tag-btn-btn"><i class="fal fa-hotel"></i> Hotel</button>
                    <button class="tag-btn-btn"><i class="fal fa-building"></i> Apartment</button>
                    <button class="tag-btn-btn"><i class="fal fa-parking"></i> Parking</button>
                </div>
            </div>
        </div >
    );
};

export default HeroSection;