import { React, useContext, useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import '../../styles/roomRegister.css';
import "react-datepicker/dist/react-datepicker.css";
import { MdApartment, MdHouseboat, MdHouse } from 'react-icons/md';
import axios from 'axios';
import { roomRentFirstStepValidation, roomRentSecondStepValidation } from '../../utilities/helperFunction';
import Navbar from '../home/header/navBar';
import { LoginContext } from '../../App';
import UserProfileSection from '../roommateFindAd/userProfileSection';
import { useParams } from 'react-router-dom';

//::::::::::::ROOMMATEFINDADD::::::::::::::
const EditRoom = () => {
    const { _id } = useParams()
    const fileInputRef = useRef();
    const [errorMessage, setErrorMessage] = useState({
        formErrors: {}
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [uploadedImage, setUploadedImage] = useState([]);
    const [invalidFileMsg, setInvalidFileMsg] = useState(false);
    const [divisions, setDivisions] = useState([])
    const [division, setDivision] = useState("")
    const [districts, setDistricts] = useState([])
    const [loggedInUser, SetLoggedInUser] = useContext(LoginContext)
    const [district, setDistrict] = useState("");

    const defaultData = {
        bedsNBath: [
            { value: '1', name: '1' },
            { value: '2', name: '2' },
            { value: '3', name: '3' },
            { value: '4', name: '4' },
            { value: '5', name: '5 + ' },
        ],
        stayCondition: [
            '3 month', '6 month', '1 year'
        ],
    }
    const [data, setData] = useState([])

    const [firstStep, setFirstStep] = useState({
        isChecked: true,
        title: null,
        description: null,
        region: null,
        city: null,
        state: null,
        zip: null,
        rent: null,
        deposit: null,
        date: null,
        formErrors: {},
    });
    const [secondStep, setSecondStep] = useState({
        isChecked: false,
        houseType: null,
        room: null,
        bed: null,
        bath: null,
        minStay: null,
        maxStay: null,
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
        img_collection: [],
    });
    // for creating file
    function blobToFile(theBlob, fileName) {
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/api/find_room/${_id}`)
            .then((res) => {
                const data = res.data;
                setData(data)
                const { houseType, room, bed, bath, minStay, maxStay, } = data;
                const {title, region, city, state, zip, rent, deposit, date, description, } = data;

                setSecondStep(current => (
                    {
                        ...current,
                        houseType: houseType,
                        room: room,
                        bed: bed,
                        bath: bath,
                        minStay: minStay,
                        maxStay: maxStay,
                    }
                ))
                setFirstStep(current => (
                    {
                        ...current,
                        title: title,
                        region: region,
                        city: city,
                        state: state,
                        zip: zip,
                        rent: rent,
                        deposit: deposit,
                        date: date,
                        description: description,

                    }
                ))


            })
    }, []);

    const urlToFile = (data) => {
        const imgFile = [];
        data.img_collection?.forEach((img) => {
            const filename = img.slice(55)
            fetch(`${img}`)
                .then(async res => {
                    const blob = await res.blob();
                    const file = new File([blob], filename, { type: blob.type })
                    imgFile.push(file)
                })

        })
        setSecondStep(current => ({ ...current, img_collection: imgFile }))
        setSelectedFiles(imgFile)

    }
    useEffect(() => {
        urlToFile(data)

    }, [data])
    const dd = Date.now() + '-' + Math.floor(Math.random() * 1000);

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
    const checkIsChecked = (item, data) => {
        const isChecked = data.amenities.find((utility) => {
            if (utility.text === item.text) {
                return true
            }
            return false
        })
        return isChecked
    }
    const [startDate, setStartDate] = useState(new Date());
    const [highlighted, setHighlighted] = useState(false)
    // console.log(startDate);
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
            if (selectedFiles.length <= 10) {
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
        setFirstStep(current => ({ ...current, region: item }))
    }
    const secondeStepInputChange = (e) => {
        let { name, value } = e.target;
        let data = { ...secondStep };
        data[name] = value;
        setSecondStep(data);
    }
    const handleDistrictChange = (e) => {
        const item = e.target.value;
        setDistrict(item)
        setFirstStep(current => ({ ...current, city: item }))
    }
    useEffect(() => {

        axios.get('https://bdapis.herokuapp.com/api/v1.1/divisions')
            .then((data) => {
                setDivisions(data.data.data)
            });

    }, []);

    useEffect(() => {

        axios.get(`https://bdapis.herokuapp.com/api/v1.1/division/${division ? division : firstStep.region}`)
            .then((data) => setDistricts(data.data.data));

    }, [division || firstStep.region]);

    const imgURLDef = secondStep.isChecked || selectedFiles
    useEffect(() => {

        if (selectedFiles.length < 1) return;
        let newImageUrls = [];
        selectedFiles.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagesURLs(newImageUrls);

    }, [imgURLDef])

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
        // console.log(s);
    }
    function filteredItems(data) {
        const checkedItems = data.filter(item => {
            return item.isChecked === true
        })
        return checkedItems.map(item => item)
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('handle form click');
        let formData = new FormData();
        const utilities = filteredItems(secondStep.utilities)
        const amenities = filteredItems(secondStep.amenities)

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        amenities.forEach(item => {
            formData.append(`amenities[]`, JSON.stringify(item));
        });
        utilities.forEach(item => {
            formData.append(`utilities[]`, JSON.stringify(item));
        });

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
        await fetch(`http://localhost:5000/api/updateRoom/${_id}`, {
            method: 'PUT',
            body: formData,

        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))

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
        let data = { ...firstStep };
        data[e.target.name] = e.target.value;
        setFirstStep(data);
    }
    return (
        <div className="room-registration-form p-3">
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
                        <h4>Edit your ads.</h4>
                        <form className="form cf" onSubmit={handleFormSubmit}>
                            {
                                firstStep.isChecked &&
                                <div className="first-step">
                                    <div className="heading-section">
                                        <h5 className=""><span className="subheading">Location</span></h5>
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
                                                                <option key={_id} value={division._id}
                                                                    selected={division._id == firstStep.region ? true : false}
                                                                >{division.division}</option>
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
                                                                <option key={key} value={district._id} selected={district._id == firstStep.city ? true : false}>{district.district}</option>
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
                                                <input type="text" name="state" defaultValue={firstStep.state} onBlur={handleBlur} className="form-control" id="state" />
                                                <label htmlFor="state">State/Upazilla</label>
                                            </div>
                                            {errorMessage.formErrors.stateError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.stateError}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="number" defaultValue={firstStep.zip} name="zip" onBlur={handleBlur} className="form-control" id="zip" />
                                                <label htmlFor="zip">Zip code</label>
                                            </div>
                                            {errorMessage.formErrors.zipError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.zipError}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row mb-3 mt-5">
                                        <div className="heading-section">
                                            <h5 className=""><span className="subheading">Rent & Move In:</span></h5>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="number" name="rent" defaultValue={firstStep.rent} onBlur={handleBlur} className="form-control" id="rent" />
                                                <label htmlFor="rent">Monthly Rent</label>
                                            </div>
                                            {errorMessage.formErrors.rentError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.rentError}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="text" name="deposit" defaultValue={firstStep.deposit} onBlur={handleBlur} className="form-control" id="deposit" />
                                                <label htmlFor="deposit">Deposit fee</label>
                                            </div>
                                            {errorMessage.formErrors.depositError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.depositError}</div>
                                            }
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <DatePicker className="form-control" name="date" placeholderText="Date" selected={startDate} onChange={(date) => {
                                                    setStartDate(date);
                                                    setFirstStep(current => ({ ...current, date: date }))
                                                }} />
                                            </div>
                                            {errorMessage.formErrors.dateError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.dateError}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="heading-section mt-5">
                                        <h5 className=""><span className="subheading">Listing Description</span></h5>
                                    </div>

                                    <div className="row mb-3">

                                        <div className="col-md">
                                            <div className="form-floating">
                                                <textarea className="form-control" defaultValue={firstStep.description} onChange={(e) => setFirstStep(current => ({ ...current, description: e.target.value }))} name="description" placeholder="Leave a comment here" id="special" style={{ height: '100px' }}></textarea>
                                                <label htmlFor="description">What's make's the location special?</label>
                                            </div>
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
                                            <div className="form-floating">
                                                <textarea className="form-control" defaultValue={firstStep.special} onChange={(e) => setFirstStep(current => ({ ...current, special: e.target.value }))} name="special" placeholder="Leave a comment here" id="special" style={{ height: '100px' }}></textarea>
                                                <label htmlFor="special">What's make's the location special?</label>
                                            </div>
                                            {errorMessage.formErrors.specialError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.specialError}</div>
                                            }
                                            {errorMessage.formErrors.specialCharError &&
                                                <div className="err-msg"><i className="far fa-exclamation-circle"></i> {errorMessage.formErrors.specialCharError}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                secondStep.isChecked &&
                                <div className="second-step">
                                    <div className="heading-section">
                                        <h6 className=""><span className="subheading">Staing Conditions:</span></h6>
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
                                                    {
                                                        defaultData.bedsNBath.map((option) => {
                                                            return (
                                                                <option selected={option.value == secondStep.room ? true : false} value={option.value}>{option.name} Room</option>
                                                            )
                                                        })
                                                    }
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
                                                    {
                                                        defaultData.bedsNBath.map((option) => {
                                                            return (
                                                                <option selected={option.value == secondStep.bed ? true : false} value={option.value}>{option.name} Bed</option>
                                                            )
                                                        })
                                                    }
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
                                                    {
                                                        defaultData.bedsNBath.map((option) => {
                                                            return (
                                                                <option selected={option.value == secondStep.bath ? true : false} value={option.value}>{option.name} Bath</option>
                                                            )
                                                        })
                                                    }
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
                                            <h6 className=""><span className="subheading">Staing Conditions:</span></h6>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select className="form-select" id="minStay" name="minStay"
                                                    aria-label="Floating label select example" onChange={secondeStepInputChange}>
                                                    {
                                                        defaultData.stayCondition.map(option => {
                                                            return (
                                                                <option value={option}
                                                                    selected={option === data.minStay ? true : false}>{option}</option>
                                                            )
                                                        })
                                                    }

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
                                                    {
                                                        defaultData.stayCondition.map(option => {
                                                            return (
                                                                <option value={option}
                                                                    selected={option === data.maxStay ? true : false}>
                                                                    {option}
                                                                </option>
                                                            )
                                                        })
                                                    }
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
                                    <h6 className="subheading mt-2">What’s the room like?</h6>
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
                                    <div className="row image-lists">
                                        {
                                            imagesURLs.map((image, index) => {
                                                return (
                                                    <div className="display-image">
                                                        <img src={image} className="img-fluid" width="180px" alt="" />
                                                        <div className=""><i className="fad fa-backspace" onClick={() => deleteFile(index)}>x</i></div>
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
                                        <button type="button" onClick={handleBackButtonClick} className="btn btn-outline-info"><i className="fal fa-long-arrow-left"></i> Back</button>
                                    </div>
                                }{
                                    firstStep.isChecked &&
                                    (
                                        <div className="">
                                            <button type="button" onClick={handleFirstStepSubmit} className="btn btn-outline-info">Next <i className="fal fa-long-arrow-right"></i></button>
                                        </div>
                                    )
                                }{
                                    secondStep.isChecked &&
                                    (
                                        <div className="">
                                            <button type="button" onClick={handleSecondStepSubmit} className="btn btn-outline-info">next <i className="fal fa-long-arrow-right"></i></button>
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

            </div>
        </div>
    );
};

export default EditRoom;