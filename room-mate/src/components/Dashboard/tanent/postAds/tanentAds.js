import React, { useContext, useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../../styles/roomRegister.css';
import { MdApartment, MdHouseboat, MdHouse } from 'react-icons/md';
import axios from 'axios';
import { roomRentFirstStepValidation, roomRentSecondStepValidation } from '../../../../utilities/helperFunction';
import Navbar from '../../../home/header/navBar';
import { LoginContext } from '../../../../App';
import UserProfileSection from '../../../roommateFindAd/DashboarSideNav';

//::::::::::::ROOMMATEFINDADD::::::::::::::
const TanentAds = () => {
    const fileInputRef = useRef();
    const [errorMessage, setErrorMessage] = useState({
        formErrors: {}
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [amen, setAmen] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [uploadedImage, setUploadedImage] = useState([]);
    const [invalidFileMsg, setInvalidFileMsg] = useState(false);
    const [divisions, setDivisions] = useState([])
    const [division, setDivision] = useState("")
    const [districts, setDistricts] = useState([])
    const [loggedInUser, SetLoggedInUser] = useContext(LoginContext)
    const [district, setDistrict] = useState("");
    const [firstStep, setFirstStep] = useState({
        isChecked: true,
        title: null,
        region: null,
        city: null,
        state: null,
        zip: null,
        rent: null,
        deposit: null,
        date: null,
        description: null,
        formErrors: {},
    });
    const [secondStep, setSecondStep] = useState({
        isChecked: false, houseType: null, room: null, bed: null, bath: null,
        minStay: null, maxStay: null,
        utilities: [
            {
                fontAwesome: 'fad fa-bolt',
                isChecked: false,
                text: 'Electricity',
            },
            {
                fontAwesome: 'far fa-burn',
                isChecked: false,
                text: 'Gas',
            },
            {
                fontAwesome: 'fad fa-water',
                isChecked: false,
                text: 'Water',
            },
            {
                fontAwesome: 'far fa-tv-retro',
                isChecked: false,
                text: 'Tv',
            },
        ],
        amenities: [
            {
                text: 'Furnished',
                isChecked: false,
                fontAwesome: 'fas fa-lamp',
            },
            {
                text: 'Belcony/Patio',
                isChecked: false,
                fontAwesome: 'far fa-burn',
            },
            {
                text: 'Tv/Cable',
                isChecked: false,
                fontAwesome: 'fad fa-water',
            },
            {
                text: 'Closet',
                isChecked: false,
                fontAwesome: 'far fa-dungeon',
            },
            {
                text: 'Master Bedroom',
                isChecked: false,
                fontAwesome: 'fad fa-bed',
            },
            {
                text: 'Private Entrance',
                isChecked: false,
                fontAwesome: 'fas fa-door-open',
            },
            {
                text: 'Walk-in Closet',
                isChecked: false,
                fontAwesome: 'fas fa-walking',
            },
            {
                text: 'First Floor',
                isChecked: false,
                fontAwesome: 'fad fa-house-flood',
            },
            {
                text: 'Carpet',
                isChecked: false,
                fontAwesome: 'fas fa-blanket',
            },
            {
                text: 'Window',
                isChecked: false,
                fontAwesome: 'fas fa-mountain',
            },
            {
                text: 'Vaulted Ceiling',
                isChecked: false,
                fontAwesome: 'fad fa-landmark',
            },
            {
                text: 'Ceiling Fan',
                isChecked: false,
                fontAwesome: 'fad fa-fan',
            },
        ],
    });
    const utilitiesCheckboxChange = (i) => {
        const newUtility = secondStep.utilities[i];
        newUtility.isChecked = !newUtility.isChecked
        const newUtilities = secondStep.utilities.map((utility, index) => {
            return index === i ? newUtility : utility;
        })
        setSecondStep(current => ({ ...current, utilities: newUtilities }))
    }
    const amenitiesCheckboxChange = (i) => {
        const newAmenity = secondStep.amenities[i];
        newAmenity.isChecked = !newAmenity.isChecked
        const newAmenities = secondStep.amenities.map((amenity, index) => {
            return index === i ? newAmenity : amenity;
        })
        setSecondStep(current => ({ ...current, amenities: newAmenities }))
    }
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
        console.log(files)
        let fileInput = files[0];
        const fileName = fileInput.name;
        const patternFileExtension = /.*\.(jpeg|jpg|png)/i;
        if (((fileName).match(patternFileExtension))) {
            if (selectedFiles.length <= 10) {
                let files = [fileInput]
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
        setFirstStep(current => ({ ...current, region: item }))
    }
    const secondeStepInputChange = (e) => {
        let { name, value } = e.target;
        let previousValue = { ...secondStep };
        previousValue[name] = value;
        setSecondStep(previousValue);
    }
    const handleDistrictChange = (e) => {
        const item = e.target.value;
        setDistrict(item)
        setFirstStep(current => ({ ...current, city: item }))
    }
    useEffect(() => {
        axios.get('https://bd-geolocation-api.cyclic.app/api/v1.0/divisions')
            .then((data) => setDivisions(data.data.data));
    }, []);
    useEffect(() => {
        axios.get(`https://bdapis.herokuapp.com/api/v1.0/division/${division}`)
            .then((data) => setDistricts(data.data.data));
    }, [division]);
    useEffect(() => {
        if (selectedFiles.length < 1) return;
        let newImageUrls = [];
        selectedFiles.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagesURLs(newImageUrls);
    }, [selectedFiles])
    const handleBackButtonClick = () => {
        if (!firstStep.isChecked && secondStep.isChecked) {
            setFirstStep(current => ({ ...current, isChecked: true }))
            setSecondStep(current => ({ ...current, isChecked: false }))
        }
        if (!firstStep.isChecked && !secondStep.isChecked) {
            setFirstStep(current => ({ ...current, isChecked: false }))
            setSecondStep(current => ({ ...current, isChecked: true }))
        }
    }
    const handleSecondStepSubmit = () => {
        setFirstStep(current => ({ ...current, isChecked: false }))
        setSecondStep(current => ({ ...current, isChecked: false }))
        // }
    }
    function deleteFile(e) {
        const s = imagesURLs.filter((item, index) => index !== e);
        const m = selectedFiles.filter((item, index) => index !== e);
        setImagesURLs(s);
        setSelectedFiles(m);
        console.log(s);
    }
    function filteredItems(data) {
        const checkedItems = data.filter(item => {
            return item.isChecked === true
        })
        return checkedItems.map(item => item)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        const utilities = filteredItems(secondStep.utilities)
        const amenities = filteredItems(secondStep.amenities)

        
        formData.append('title', firstStep.region);
        formData.append('region', firstStep.region);
        formData.append('city', firstStep.city);
        formData.append('state', firstStep.state);
        formData.append('zip', firstStep.zip);
        formData.append('rent', firstStep.rent);
        formData.append('deposit', firstStep.deposit);
        formData.append('date', firstStep.date);
        formData.append('description', firstStep.description);

        formData.append('houseType', secondStep.houseType);
        formData.append('room', secondStep.room);
        formData.append('bed', secondStep.bed);
        formData.append('bath', secondStep.bath);
        formData.append('minStay', secondStep.minStay);
        formData.append('maxStay', secondStep.maxStay);
        amenities.forEach(item => {
            formData.append(`amenities[]`, JSON.stringify(item));
        });
        utilities.forEach(item => {
            formData.append(`utilities[]`, JSON.stringify(item));
        });
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        // console.dir(amen.Prototype);
        console.log(secondStep);
        await axios.post('https://renterbd.herokuapp.com/api/tanentAds', formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))


    }

    const handleFirstStepSubmit = () => {
        setFirstStep(current => ({ ...current, isChecked: false }))
        setSecondStep(current => ({ ...current, isChecked: true }))
        // if (roomRentFirstStepValidation(firstStep, setErrorMessage)) {
        //     setFirstStep({ isChecked: false });
        //     setSecondStep(true);
        // }
    }
    const handleBlur = (e) => {
        let step1 = { ...firstStep };
        step1[e.target.name] = e.target.value;
        setFirstStep(step1);
    }
    // console.log(loggedInUser);
    return (
        <div className="room-registration-form">
            <div className="bg-danger">
                <div className="nav-bar">
                    <Navbar />
                </div>
            </div>
            <div className="room-register-section">
                <div className="flatation-side p-4 align-items-center justify-content-center">

                    {/* <div className="flatation-img">
                    </div> */}
                    <UserProfileSection />
                </div>
                <div className="room-form p-5">
                    <div className="room-registration-form p-3">
                        <form className="form cf" onSubmit={handleFormSubmit}>
                            {
                                firstStep.isChecked &&
                                <div className="first-step">
                                    <div className="row mb-3">

                                        <div className="col-md">
                                            <label for="description" className="form-label">Post title</label>
                                            <input type="text" className="form-control" value={firstStep.title} onChange={(e) => setFirstStep(current => ({ ...current, title: e.target.value }))} name="description" id="title" />

                                            {errorMessage.formErrors.descriptError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.descriptError}</div>
                                            }
                                            {errorMessage.formErrors.descCharError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.descCharError}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row mb-3">

                                        <div className="col-md">
                                            <div className="mb-3">
                                                <label for="description" className="form-label">Post description</label>
                                                <textarea className="form-control" value={firstStep.description} onChange={(e) => setFirstStep(current => ({ ...current, description: e.target.value }))} name="description" placeholder="Wrote post descripton in 500 words." id="special" style={{ height: '100px' }}></textarea>
                                            </div>
                                            {errorMessage.formErrors.descriptError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.descriptError}</div>
                                            }
                                            {errorMessage.formErrors.descCharError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.descCharError}</div>
                                            }
                                        </div>
                                    </div>

                                    <div className="heading-section">
                                        <h6 className=""><span className="subheading">Where do you want to move?</span></h6>
                                    </div>

                                    <div className="row g-2 mb-3">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="region"
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
                                                <label htmlFor="region">Region</label>
                                            </div>
                                            {errorMessage.formErrors.regionError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.regionError}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="city"
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
                                                <label htmlFor="city">City</label>
                                            </div>
                                            {errorMessage.formErrors.cityError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.cityError}</div>
                                            }
                                        </div>

                                    </div>
                                    <div className="row g-2 mb-3">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="text" name="state" onBlur={handleBlur} className="form-control" id="state" />
                                                <label htmlFor="state">State/Upazilla</label>
                                            </div>
                                            {errorMessage.formErrors.stateError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.stateError}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="number" name="zip" onBlur={handleBlur} className="form-control" id="zip" />
                                                <label htmlFor="zip">Zip code</label>
                                            </div>
                                            {errorMessage.formErrors.zipError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.zipError}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row mb-3 mt-5">
                                        <div className="col-md">
                                            <label for="rent" className="form-label">Max rent(Monthly)</label>
                                            <input type="number" name="rent" value={firstStep.rent} onBlur={handleBlur} className="form-control" id="rent" />
                                            {errorMessage.formErrors.rentError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.rentError}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <label for="rent" className="form-label">Deposit</label>
                                            <input type="number" name="deposit" value={firstStep.rent} onBlur={handleBlur} className="form-control" id="rent" />
                                            {errorMessage.formErrors.rentError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.rentError}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row mb-3 mt-3">

                                        <div className="col-md-4">
                                            <label for="date" className="form-label">Move-in date</label>
                                            <DatePicker className="form-control" name="date" placeholderText="Date" selected={firstStep.date ? firstStep.date : startDate} onChange={(date) => {
                                                setStartDate(date);
                                                setFirstStep(current => ({ ...current, date: date }))
                                            }} />
                                            {errorMessage.formErrors.dateError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.dateError}</div>
                                            }
                                        </div>

                                    </div>


                                </div>
                            }
                            {
                                secondStep.isChecked &&
                                <div className="second-step">
                                    <div className="heading-section">
                                        <h6 className=""><span className="subheading">Preferred home type:</span></h6>
                                    </div>
                                    <div className="row align-items-center mb-3 ">
                                        <div className="col-md">
                                            <div className="form cf">
                                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                    <input type="radio" onChange={secondeStepInputChange} className="btn-check" value="entire" name="houseType" id="btnradio1" autoComplete="off" />
                                                    <label className="btn btn-outline-secondary" htmlFor="btnradio1"><h1><MdHouseboat /></h1> Entire Place</label>

                                                    <input type="radio" onChange={secondeStepInputChange} className="btn-check" value="private" name="houseType" id="btnradio2" autoComplete="off" />
                                                    <label className="btn btn-outline-secondary" htmlFor="btnradio2"><h1><MdApartment /></h1> Private Room</label>

                                                    <input type="radio" onChange={secondeStepInputChange} className="btn-check" value="share" name="houseType" id="btnradio3" autoComplete="off" />
                                                    <label className="btn btn-outline-secondary" htmlFor="btnradio3"><h1><MdHouse /></h1> Shared Room</label>
                                                </div>
                                            </div>
                                            {errorMessage.formErrors.houseTypeErr &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.houseTypeErr}</div>
                                            }
                                        </div>
                                    </div>


                                    <div className="heading-section mt-5">
                                        <h6 className=""><span className="subheading">Beds & Baths:</span></h6>
                                    </div>
                                    <div className="row g-2 mb-3">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="room" name="room"
                                                    aria-label="Floating label select example" onChange={secondeStepInputChange} >
                                                    <option value="1">1 Room</option>
                                                    <option value="2">2 Room</option>
                                                    <option value="3">3 Room</option>
                                                    <option value="4">4 Room</option>
                                                    <option value="5">5 + Room</option>
                                                </select>
                                                <label htmlFor="room">No. of Room</label>
                                            </div>
                                            {errorMessage.formErrors.roomErr &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.roomErr}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="bed" name="bed"
                                                    aria-label="Floating label select example" onChange={secondeStepInputChange} >
                                                    <option value="2">2 Bed</option>
                                                    <option value="3">3 Bed</option>
                                                    <option value="4">4 Bed</option>
                                                    <option value="5">5 + Bed</option>
                                                </select>
                                                <label htmlFor="bed">No. of Bed</label>
                                            </div>
                                            {errorMessage.formErrors.bedErr &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.bedErr}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="bath" name="bath"
                                                    aria-label="Floating label select example" onChange={secondeStepInputChange}>
                                                    <option value="2">2 Bath</option>
                                                    <option value="3">3 Bath</option>
                                                    <option value="4">4 Bath</option>
                                                    <option value="5">5 + Bath</option>
                                                </select>
                                                <label htmlFor="bath">No. of Bath</label>
                                            </div>
                                            {errorMessage.formErrors.bathErr &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.bathErr}</div>
                                            }
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <div className="heading-section">
                                            <h6 className=""><span className="subheading">Staying Conditions:</span></h6>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="minStay" name="minStay"
                                                    aria-label="Floating label select example" onChange={secondeStepInputChange}>
                                                    <option value="1 month">3 Months</option>
                                                    <option value="6 month">6 Months</option>
                                                    <option value="1 year">1 Year</option>

                                                </select>
                                                <label htmlFor="minStay">Minimum Stay</label>
                                            </div>
                                            {errorMessage.formErrors.minStayErr &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.minStayErr}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" name="maxStay" id="maxStay"
                                                    aria-label="Floating label select example" onChange={secondeStepInputChange}>
                                                    <option value="3 month">3 Months</option>
                                                    <option value="6 month">6 Months</option>
                                                    <option value="1 year">1 Year</option>
                                                </select>
                                                <label htmlFor="maxStay">Maximum Stay</label>
                                            </div>
                                            {errorMessage.formErrors.maxStayErr &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.maxStayErr}</div>
                                            }
                                        </div>


                                    </div>
                                    <h6 className="subheading mt-5">Included utilities?</h6>
                                    <section className="app d-flex">
                                        {
                                            secondStep.utilities?.map((utility, i) =>
                                            (
                                                <article key={Math.random()}>
                                                    <input type="checkbox" id={utility.text}
                                                        checked={utility.isChecked}
                                                        onChange={(e) => utilitiesCheckboxChange(i)}
                                                    />
                                                    <div>
                                                        <h2><i className={utility.fontAwesome}></i></h2>
                                                        <span className="text-center">
                                                            {utility.text}
                                                        </span>
                                                    </div>
                                                </article>
                                            ))
                                        }
                                    </section>
                                    <h6 className="subheading mt-2">What’s the amenities do you like?</h6>
                                    <section className="app d-flex">
                                        {
                                            secondStep.amenities?.map((amenity, i) =>
                                            (
                                                <article key={Math.random()}>
                                                    <input type="checkbox" id={amenity.text}
                                                        checked={amenity.isChecked}
                                                        onChange={(e) => amenitiesCheckboxChange(i)}
                                                    />
                                                    <div>
                                                        <h2><i className={amenity.fontAwesome}></i></h2>
                                                        <span className="text-center">
                                                            {amenity.text}
                                                        </span>
                                                    </div>
                                                </article>
                                            ))
                                        }
                                    </section>

                                </div>
                            }
                            {
                                (!firstStep.isChecked && !secondStep.isChecked) &&
                                <section>
                                    <div className="row">
                                        <div className="heading-section">
                                            <h6 className=""><span className="subheading">Profile picture:</span></h6>
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
                                    <div className="row image-lists">
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
                                    !firstStep.isChecked && <div className="">
                                        <button type="button" onClick={handleBackButtonClick} className="btn btn-secondary"><i className="fal fa-long-arrow-left"></i> Back</button>
                                    </div>
                                }{
                                    firstStep.isChecked &&
                                    (
                                        <div className="">
                                            <button type="button" onClick={handleFirstStepSubmit} className="btn btn-secondary">Next <i className="fal fa-long-arrow-right"></i></button>
                                        </div>
                                    )
                                }{
                                    secondStep.isChecked &&
                                    (
                                        <div className="">
                                            <button type="button" onClick={handleSecondStepSubmit} className="btn btn-secondary">next <i className="fal fa-long-arrow-right"></i></button>
                                        </div>
                                    )
                                }{
                                    !firstStep.isChecked && !secondStep.isChecked &&
                                    <div className="">
                                        <button type="submit" className="btn btn-success">Publish Your Ad.</button>
                                    </div>
                                }

                            </div>
                        </form>
                    </div>

                </div>

            </div >
        </div >
    );
};

export default TanentAds;