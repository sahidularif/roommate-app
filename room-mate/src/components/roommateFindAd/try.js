import React, { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import '../../styles/roomRegister.css';
import "react-datepicker/dist/react-datepicker.css";
import { MdApartment, MdHouseboat, MdHouse, MdNoMeetingRoom } from 'react-icons/md';
import data from '../../data.json';
import axios from 'axios';

//::::::::::::ROOMMATEFINDADD::::::::::::::
const RoommateFindAd = () => {
    const fileInputRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [invalidFileMsg, setInvalidFileMsg] = useState(false);
    const [divisions, setDivisions] = useState([])
    const [division, setDivision] = useState("")
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState("");
    const [firstStep, setFirstStep] = useState(true);
    const [secondStep, setSecondStep] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [highlighted, setHighlighted] = useState(false)

    const preventDefault = (e) => {
        e.preventDefault();
    }
    const dragOver = (e) => {
        preventDefault(e);
        setHighlighted(true);
    }
    const dragEnter = (e) => {
        preventDefault(e);
        setHighlighted(true);
    }
    const dragLeave = (e) => {
        preventDefault(e);
        setHighlighted(false);
    }
    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            //   handleFiles(files);
        }
    }
    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }
    const handleFiles = (files) => {
        let fileInput = files[0];
        const fileName = fileInput.name;
        const patternFileExtension = /.*\.(jpeg|jpg|png)/i;
        if (((fileName).match(patternFileExtension))) {
            if (selectedFiles.length <= 3) {
                let files = [...selectedFiles, fileInput]
                setSelectedFiles(files)
                // handleFileUpload(files)

            }
        }
        else {
            setInvalidFileMsg(true);
            setTimeout(() => {
                setInvalidFileMsg(false)
            }, 3000);

        }
    }
    const fileInputClicked = () => {
        fileInputRef.current.click();
    }
    const handleDivisionChange = (e) => {
        const item = e.target.value;
        setDivision(item)
    }
    const handleDistrictChange = (e) => {
        const item = e.target.value;
        setDistrict(item)
    }
    useEffect(() => {
        axios.get('https://bdapis.herokuapp.com/api/v1.1/divisions')
            .then((data) => setDivisions(data.data.data));
    }, []);
    useEffect(() => {
        axios.get(`https://bdapis.herokuapp.com/api/v1.1/division/${division}`)
            .then((data) => setDistricts(data.data.data));
    }, [division]);
    useEffect(() => {
        if (selectedFiles.length < 1) return;
        let newImageUrls = [];
        selectedFiles.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagesURLs(newImageUrls);
    }, [selectedFiles])
    const handleBackButtonClick = () => {
        if (!firstStep && secondStep) {
            setFirstStep(true);
            setSecondStep(false)
        }

        if (!firstStep && !secondStep) {
            setFirstStep(false);
            setSecondStep(true)
        }


    }
    const handleSecondNextClick = () => {
        setFirstStep(false);
        setSecondStep(false);
    }
    function deleteFile(e) {
        const s = imagesURLs.filter((item, index) => index !== e);
        const m = selectedFiles.filter((item, index) => index !== e);
        setImagesURLs(s);
        setSelectedFiles(m);
        console.log(s);
    }
    // console.log(selectedFiles);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('handle form click');
    }
    return (
        <div className="room-register-section">
            <div className="flatation-side p-4">
                <div className="about-us heading-section">
                    <h2 className=""><strong>RenterBD</strong></h2>
                </div>
                <span className="subheading">your amazing room and roommate</span>
                <div className="flatation-img">
                </div>
            </div>
            <div className="room-form p-5">
                <div className="room-registration-form p-3">
                    <form className="form cf" onSubmit={handleFormSubmit}>
                        {
                            firstStep &&
                            <div className="first-step">
                                <div className="heading-section">
                                    <h5 className=""><span className="subheading">Location</span></h5>
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example"
                                                onChange={handleDivisionChange}>
                                                {
                                                    divisions.map((division, _id) => {
                                                        return (
                                                            <option key={_id} value={division._id}>{division.division}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="floatingSelectGrid">Region</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example"
                                                onChange={handleDistrictChange}
                                            >
                                                {
                                                    districts?.map((district, key) => {
                                                        return (
                                                            <option key={key} value={district._id}>{district.district}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label htmlFor="floatingSelectGrid">City</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="floatingInputGrid" />
                                            <label htmlFor="floatingInputGrid">State/Upazilla</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="floatingInputGrid" />
                                            <label htmlFor="floatingInputGrid">Zip code</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3 mt-5">
                                    <div className="heading-section">
                                        <h5 className=""><span className="subheading">Rent & Move In:</span></h5>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="floatingInputGrid" />
                                            <label htmlFor="floatingInputGrid">Monthly Rent</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="floatingInputGrid" />
                                            <label htmlFor="floatingInputGrid">Deposit fee</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <DatePicker className="form-control" placeholderText="Date" id="floatingInputGrid" selected={startDate} onChange={(date) => setStartDate(date)} />

                                        </div>
                                    </div>
                                </div>
                                <div className="heading-section mt-5">
                                    <h5 className=""><span className="subheading">Listing Description</span></h5>
                                </div>
                               
                                    <div className="row mb-3">

                                        <div className="col-md">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                                                <label htmlFor="floatingTextarea2">Describe your space</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">

                                        <div className="col-md">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                                                <label htmlFor="floatingTextarea2">What's make's the location special?</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        }
                        {
                            secondStep &&
                            <div className="second-step">
                                <div className="heading-section">
                                    <h6 className=""><span className="subheading">Staing Conditions:</span></h6>
                                </div>
                                <div className="row align-items-center mb-3 ">
                                    <div className="col-md">
                                        <div className="form cf">
                                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                                                <label className="btn btn-outline-secondary" htmlFor="btnradio1"><h1><MdHouseboat /></h1> Entire Place</label>

                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                                <label className="btn btn-outline-secondary" htmlFor="btnradio2"><h1><MdApartment /></h1> Private Room</label>

                                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                                                <label className="btn btn-outline-secondary" htmlFor="btnradio3"><h1><MdHouse /></h1> Shared Room</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="heading-section mt-5">
                                    <h6 className=""><span className="subheading">Beds & Baths:</span></h6>
                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example" >
                                                <option value="1">1 Room</option>
                                                <option value="2">2 Room</option>
                                                <option value="3">3 Room</option>
                                                <option value="4">4 Room</option>
                                                <option value="5">5 + Room</option>
                                            </select>
                                            <label htmlFor="floatingSelectGrid">No. of Bed</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example" >
                                                <option value="2">2 Bed</option>
                                                <option value="3">3 Bed</option>
                                                <option value="4">4 Bed</option>
                                                <option value="5">5 + Bed</option>
                                            </select>
                                            <label htmlFor="floatingSelectGrid">No. of Bed</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example" >
                                                <option value="2">2 Bath</option>
                                                <option value="3">3 Bath</option>
                                                <option value="4">4 Bath</option>
                                                <option value="5">5 + Bath</option>
                                            </select>
                                            <label htmlFor="floatingSelectGrid">No. of Bath</label>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="heading-section">
                                        <h6 className=""><span className="subheading">Staing Conditions:</span></h6>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example">
                                                <option value="6 month">3 Months</option>
                                                <option value="6 month">6 Months</option>
                                                <option value="6 month">1 Year</option>

                                            </select>
                                            <label htmlFor="floatingSelectGrid">Minimum Stay</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid"
                                                aria-label="Floating label select example" >
                                                <option value="6 month">3 Months</option>
                                                <option value="6 month">6 Months</option>
                                                <option value="6 month">1 Year</option>
                                            </select>
                                            <label htmlFor="floatingSelectGrid">Maximum Stay</label>
                                        </div>
                                    </div>


                                </div>

                                <h6 className="subheading mt-5">Included utilities?</h6>
                                <section className="app d-flex">
                                    <article className="feature1">
                                        <input type="checkbox" id="feature1" />
                                        <div>
                                            <h2><i className="fad fa-bolt"></i></h2>
                                            <span className="text-center">
                                                Electricity
                                            </span>
                                        </div>
                                    </article>

                                    <article className="feature2">
                                        <input type="checkbox" id="feature2" />
                                        <div>
                                            <h2><i className="far fa-burn"></i></h2>
                                            <span className="text-center">
                                                Gas
                                            </span>
                                        </div>
                                    </article>

                                    <article className="feature3">
                                        <input type="checkbox" id="feature3" />
                                        <div>
                                            <h2><i className="fad fa-water"></i></h2>
                                            <span className="text-center">
                                                Water
                                            </span>
                                        </div>
                                    </article>

                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="far fa-tv-retro"></i></h2>
                                            <span className="text-center">
                                                TV
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fal fa-wifi"></i></h2>
                                            <span className="text-center">
                                                Wifi
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fal fa-dumpster"></i></h2>
                                            <span className="text-center">
                                                Trash
                                            </span>
                                        </div>
                                    </article>
                                </section>

                                <h6 className="subheading mt-2">What’s the room like?</h6>
                                <section className="app d-flex">
                                    <article className="feature1">
                                        <input type="checkbox" id="feature1" />
                                        <div>
                                            <h2><i className="fas fa-lamp"></i></h2>
                                            <span className="text-center">
                                                Furnishid
                                            </span>
                                        </div>
                                    </article>

                                    <article className="feature2">
                                        <input type="checkbox" id="feature2" />
                                        <div>
                                            <h2><i className="far fa-burn"></i></h2>
                                            <span className="text-center">
                                                Balcony/Patio
                                            </span>
                                        </div>
                                    </article>

                                    <article className="feature3">
                                        <input type="checkbox" id="feature3" />
                                        <div>
                                            <h2><i className="fad fa-water"></i></h2>
                                            <span className="text-center">
                                                TV/Cable
                                            </span>
                                        </div>
                                    </article>

                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="far fa-dungeon"></i></h2>
                                            <span className="text-center">
                                                Closet
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fad fa-bed"></i></h2>
                                            <span className="text-center">
                                                Master Bedroom
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fas fa-door-open"></i></h2>
                                            <span className="text-center">
                                                Private Entrance
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fas fa-walking"></i></h2>
                                            <span className="text-center">
                                                Walk-In Closet
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fad fa-house-flood"></i></h2>
                                            <span className="text-center">
                                                First Floor
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fas fa-blanket"></i></h2>
                                            <span className="text-center">
                                                Carpet
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fas fa-mountain"></i></h2>
                                            <span className="text-center">
                                                Window
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fad fa-landmark"></i></h2>
                                            <span className="text-center">
                                                Vaulted Ceiling
                                            </span>
                                        </div>
                                    </article>
                                    <article className="feature4">
                                        <input type="checkbox" id="feature4" />
                                        <div>
                                            <h2><i className="fad fa-fan"></i></h2>
                                            <span className="text-center">
                                                Ceiling Fan
                                            </span>
                                        </div>
                                    </article>
                                </section>

                            </div>
                        }
                        {
                            (!firstStep && !secondStep) &&
                            <section>
                                <div className="row">
                                    <div className="heading-section">
                                        <h6 className=""><span className="subheading">Upload Photos:</span></h6>
                                    </div>
                                    <div className="col-md">
                                        <div className={`${highlighted ? "highlighted-dropzone" : "dropzone"}`}
                                            onDragEnter={dragEnter}
                                            onDragLeave={dragLeave}
                                            onDragOver={dragOver}
                                            onDrop={fileDrop}
                                            onClick={fileInputClicked}
                                        >
                                            <div className="dropzone-body">

                                                <div className="heading-section text-center dropzone-body">
                                                    <h1 className="text-primary"><i className="fad fa-cloud-upload-alt"></i></h1>
                                                    <h6 className="text-primary"><span className="subheading">+ Upload Photo</span></h6>
                                                    <span className="subheading"><strong>Supported only</strong> <br /> JPG, JPEG, PNG Format</span><br />
                                                    {
                                                        invalidFileMsg &&
                                                        <span className="subheading text-warning">Please choose a valid file.</span>
                                                    }
                                                </div>
                                                <form>
                                                    <input
                                                        id="myfile"
                                                        ref={fileInputRef}
                                                        className="file-input"
                                                        type="file"
                                                        placeholder="Click"
                                                        onChange={filesSelected}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row image-lists border">
                                    {
                                        imagesURLs.map((image, index) => {
                                            return (
                                                <div className="display-image">
                                                    <img src={image} className="img-fluid" width="180px" alt="" />
                                                    <div className=""><i className="fad fa-backspace" onClick={() => deleteFile(index)}></i></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        }
                        <div className="footer-form">
                            {
                                !firstStep && <div className="">
                                    <button type="button" onClick={handleBackButtonClick} className="btn btn-outline-info"><i className="fal fa-long-arrow-left"></i> Back</button>
                                </div>
                            }{
                                firstStep &&
                                (
                                    <div className="">
                                        <button type="button" onClick={() => {
                                            setFirstStep(null);
                                            setSecondStep(true);
                                        }} className="btn btn-outline-info">Next <i className="fal fa-long-arrow-right"></i></button>
                                    </div>
                                )
                            }{
                                secondStep &&
                                (
                                    <div className="">
                                        <button type="button" onClick={handleSecondNextClick} className="btn btn-outline-info">next <i className="fal fa-long-arrow-right"></i></button>
                                    </div>
                                )
                            }{
                                !firstStep && !secondStep &&
                                <div className="">
                                    <button type="submit" className="btn btn-success">Publish Your Ad.</button>
                                </div>
                            }

                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default RoommateFindAd;