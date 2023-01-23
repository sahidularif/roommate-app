import React, { useContext, useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import '../../styles/roomRegister.css';
import "react-datepicker/dist/react-datepicker.css";
import { MdApartment, MdHouseboat, MdHouse } from 'react-icons/md';
import data from '../../data.json';
import axios from 'axios';
import { roomRentFirstStepValidation, roomRentSecondStepValidation } from '../../utilities/helperFunction';
import Navbar from '../home/header/navBar';
import { LoginContext } from '../../App';
import UserProfileSection from './DashboarSideNav';
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
//::::::::::::ROOMMATEFINDADD::::::::::::::
const RoommateFindAd = () => {
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
    const [upazilas, setUpazilas] = useState([])
    const [upazila, setUpazila] = useState("")
    const [loggedInUser, SetLoggedInUser] = useContext(LoginContext)
    const [district, setDistrict] = useState("");
    const [firstStep, setFirstStep] = useState({
        title: '',
        description: '',
        region: '',
        city: '',
        state: '',
        zip: '',
        rent: '',
        deposit: '',
        date: '',
        houseType: '', room: '', bed: '', bath: '',
        minStay: '', maxStay: '',
    });

    const [secondStep, setSecondStep] = useState({

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
            handleFiles(files);
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
    const handleUpazilaChange = (e) => {
        const item = e.target.value;
        setUpazila(item)
        setFirstStep(current => ({ ...current, state: item }))
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
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1.0/divisions')
            .then((data) => setDivisions(data.data));
    }, []);
    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/v1.0/divisions')
    //         .then((data) => setDivisions(data.data));
    // }, []);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1.0/districts/${division}`)
            .then((data) => setDistricts(data.data));
    }, [division]);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1.0/upazilas/${district}`)
            .then((data) => setUpazilas(data.data));
    }, [district]);
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

    const handleFormSubmit = async (values, { setSubmitting }) => {
        console.log(values)
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

        formData.append('title', firstStep.title);
        formData.append('description', firstStep.description);
        formData.append('region', firstStep.region);
        formData.append('city', firstStep.city);
        formData.append('state', firstStep.state);
        formData.append('zip', firstStep.zip);
        formData.append('rent', firstStep.rent);
        formData.append('deposit', firstStep.deposit);
        formData.append('date', firstStep.date);

        formData.append('houseType', secondStep.houseType);
        formData.append('room', secondStep.room);
        formData.append('bed', secondStep.bed);
        formData.append('bath', secondStep.bath);
        formData.append('minStay', secondStep.minStay);
        formData.append('maxStay', secondStep.maxStay);
        // console.dir(amen.Prototype);
        // console.log(selectedFiles);
        // await axios.post('https://renterbd-backend.cyclic.app/api/addRoom', formData)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err))
        // console.log(firstStep)

    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This field is required!"),
        description: Yup.string().required("This field is required!"),
        region: Yup.string().required("This field is required!"),
        city: Yup.string().required("This field is required!"),
        state: Yup.string().required("This field is required!"),
        zip: Yup.string().required("This field is required!"),
        rent: Yup.string().required("This field is required!"),
        deposit: Yup.string().required("This field is required!"),
        date: Yup.string().required("This field is required!"),
        minStay: Yup.string().required("This field is required!"),
        maxStay: Yup.string().required("This field is required!"),
        room: Yup.string().required("This field is required!"),
        bed: Yup.string().required("This field is required!"),
        bath: Yup.string().required("This field is required!"),
        houseType: Yup.string().required("This field is required!"),
    });

    return (
        <Formik
            initialValues={{ ...firstStep, ...secondStep }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
                /* and other goodies */
            }) => (
                <Form>
                    <div className="room-registration-form p-3">
                        <div className='row'>
                            <div className='col-md'>
                                <h5>Post your ad.</h5>
                            </div>
                        </div>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <div className="btn-sn rounded-pill">01</div>
                                        <div className="accordion_title">
                                            <h6>Address</h6>
                                            <p>Fill all information below</p>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        <div className="first-step">
                                            <div className="heading-section">
                                                <h5 className=""><span className="subheading">Title and description</span></h5>
                                            </div>
                                            <div className="row mb-3">

                                                <div className="col-md">
                                                    <div className="form-floating mb-3">
                                                        <Field type="text" className="form-control" name="title" id="title" />
                                                        <label for="description">Title</label>
                                                        <ErrorMessage
                                                            name="title"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row mb-3">

                                                <div className="col-md">
                                                    <div className="form-floating mb-3">
                                                        <Field type="text" className="form-control" name="description" id="title" />
                                                        <label for="description">Description</label>
                                                        <ErrorMessage
                                                            name="description"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="heading-section">
                                                <h5 className=""><span className="subheading">Location</span></h5>
                                            </div>

                                            <div className="row g-2 mb-3">
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                    <select className="form-select" id="region"
                                                    aria-label="Floating label select example"
                                                    onChange={(e)=>{
                                                        handleDivisionChange(e)
                                                        handleChange(e)
                                                    }}>
                                                    {
                                                        divisions.map((division, _id) => {
                                                            return (
                                                                <option key={_id} value={division.id}>{division.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                        <label htmlFor="division">Division</label>
                                                    </div>
                                                    <ErrorMessage
                                                        name="region"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <select className="form-select" id="city"
                                                            aria-label="Floating label select example"
                                                            name='city'
                                                            onChange={(e)=>{
                                                                handleDistrictChange(e)
                                                                handleChange(e)
                                                            }}
                                                        >
                                                            <option value='' selected disabled>Choose...</option>
                                                            {
                                                                districts?.map((district, key) => {
                                                                    return (
                                                                        <option key={key} value={district.id}>{district.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <label htmlFor="city">District</label>
                                                    </div>
                                                    <ErrorMessage
                                                        name="city"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>

                                            </div>
                                            <div className="row g-2 mb-3">
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field as="select" className="form-select" id="upazila"
                                                            aria-label="Floating label select example" name="state"
                                                        >
                                                            <option value='' selected disabled>Choose...</option>
                                                            {
                                                                upazilas?.map((upazila, key) => {
                                                                    return (
                                                                        <option key={key} value={upazila.id}>{upazila.name}</option>
                                                                    )
                                                                })
                                                            }

                                                        </Field>
                                                        <label htmlFor="city">Upazila</label>
                                                    </div>
                                                    <ErrorMessage
                                                        name="state"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field type="number" name="zip" className="form-control" id="zip" />
                                                        <label htmlFor="zip">Zip code</label>
                                                    </div>
                                                    <ErrorMessage
                                                        name="zip"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3 mt-5">
                                                <div className="heading-section">
                                                    <h5 className=""><span className="subheading">Rent & Move In:</span></h5>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field type="number" name="rent" className="form-control" id="rent" />
                                                        <label htmlFor="rent">Monthly Rent</label>
                                                    </div>

                                                    <ErrorMessage
                                                        name="rent"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field type="number" name="deposit" className="form-control" id="deposit" />
                                                        <label htmlFor="deposit">Deposit fee</label>
                                                    </div>
                                                    <ErrorMessage
                                                        name="deposit"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field type="number" name="date" className="form-control" id="deposit">
                                                            {
                                                                ({ field, form, meta }) => (
                                                                    <DatePicker
                                                                        className="form-control date-ficker"
                                                                        name="date"
                                                                        selected={values.date ? values.date : startDate}
                                                                        onChange={date => setFieldValue("date", date)}
                                                                    />
                                                                )
                                                            }
                                                        </Field>
                                                        {/* <label htmlFor="deposit">Deposit fee</label> */}
                                                    </div>

                                                    <ErrorMessage
                                                        name="date"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <div className="btn-sn rounded-pill">02</div>
                                        <div className="accordion_title">
                                            <h6>Room Specification</h6>
                                            <p>Fill all information below</p>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="second-step">
                                            <div className="heading-section">
                                                <h6 className=""><span className="subheading">Home type:</span></h6>
                                            </div>
                                            <div className="row align-items-center mb-3 ">
                                                <div className="col-md">
                                                    <div className="form cf">
                                                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                            <Field type="radio" className="btn-check" value="entire" name="houseType" id="btnradio1" autoComplete="off" />
                                                            <label className="btn btn-outline-secondary" htmlFor="btnradio1"><h1></h1> Entire Place</label>

                                                            <Field type="radio" className="btn-check" value="private" name="houseType" id="btnradio2" autoComplete="off" />
                                                            <label className="btn btn-outline-secondary" htmlFor="btnradio2"><h1></h1> Private Room</label>

                                                            <Field type="radio" className="btn-check" value="share" name="houseType" id="btnradio3" autoComplete="off" />
                                                            <label className="btn btn-outline-secondary" htmlFor="btnradio3"><h1></h1> Shared Room</label>
                                                        </div>
                                                        <ErrorMessage
                                                            name="houseType"
                                                            component="div"
                                                            className="alert wrap-msg"
                                                        />
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="heading-section mt-5">
                                                <h6 className=""><span className="subheading">Beds & Baths:</span></h6>
                                            </div>
                                            <div className="row g-2 mb-3">
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field as='select' className="form-select" id="room" name="room"
                                                            aria-label="Floating label select example">
                                                            <option value="1">1 Room</option>
                                                            <option value="2">2 Room</option>
                                                            <option value="3">3 Room</option>
                                                            <option value="4">4 Room</option>
                                                            <option value="5">5 + Room</option>

                                                        </Field>
                                                        <label htmlFor="room">No. of Room</label>
                                                        <ErrorMessage
                                                            name="room"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field as='select' className="form-select" id="bed" name="bed"
                                                            aria-label="Floating label select example">
                                                            <option value="2">2 Bed</option>
                                                            <option value="3">3 Bed</option>
                                                            <option value="4">4 Bed</option>
                                                            <option value="5">5 + Bed</option>

                                                        </Field>
                                                        <label htmlFor="bed">No. of Bed</label>
                                                        <ErrorMessage
                                                            name="bed"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field as='select' className="form-select" id="bath" name="bath"
                                                            aria-label="Floating label select example">
                                                            <option value="2">2 Bath</option>
                                                            <option value="3">3 Bath</option>
                                                            <option value="4">4 Bath</option>
                                                            <option value="5">5 + Bath</option>

                                                        </Field>
                                                        <label htmlFor="bath">No. of Bath</label>
                                                        <ErrorMessage
                                                            name="bath"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row mb-3">
                                                <div className="heading-section">
                                                    <h6 className=""><span className="subheading">Staing Conditions:</span></h6>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field as='select' className="form-select" id="minStay" name="minStay"
                                                            aria-label="Floating label select example">
                                                            <option value="1 month">3 Months</option>
                                                            <option value="6 month">6 Months</option>
                                                            <option value="1 year">1 Year</option>

                                                        </Field>
                                                        <label htmlFor="minStay">Minimum Stay</label>
                                                        <ErrorMessage
                                                            name="minStay"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <Field as='select' className="form-select" id="maxStay" name="maxStay"
                                                            aria-label="Floating label select example">
                                                            <option value="1 month">3 Months</option>
                                                            <option value="6 month">6 Months</option>
                                                            <option value="1 year">1 Year</option>

                                                        </Field>
                                                        <label htmlFor="maxStay">Maximum Stay</label>
                                                        <ErrorMessage
                                                            name="maxStay"
                                                            component="div"
                                                            className="alert alert-danger"
                                                        />
                                                    </div>

                                                </div>


                                            </div>
                                            <h6 className="subheading mt-5">Included utilities?</h6>
                                            <section className="app d-flex">
                                                {
                                                    secondStep.utilities?.map((utility, i) =>
                                                    (
                                                        <article key={Math.random()}>
                                                            <Field type="checkbox" id={utility.text}
                                                                checked={utility.isChecked}
                                                                onChange={(e) => utilitiesCheckboxChange(i)}
                                                                name='utility'

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
                                            <ErrorMessage
                                                name="utility"
                                                component="div"
                                                className="alert wrap-msg"
                                            />
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
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <div className="btn-sn rounded-pill">03</div>
                                        <div className="accordion_title">
                                            <h6>Upload Image</h6>
                                            <p>Fill all information below</p>
                                        </div>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
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
                                                                <div className=""><i className="fad fa-backspace" onClick={() => deleteFile(index)}></i></div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='row p-5'>
                        <div className='col-md'>
                            <button type="submit" className='btn btn-success'>
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            )
            }
        </Formik >


    );
};

export default RoommateFindAd;