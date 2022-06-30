import React, { useContext, useState } from 'react';
import Footer from '../../home/footer/footer';
import Navbar from '../../home/header/navBar';
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import userPic from '../../../images/users/person_1.jpg';
import { LoginContext, UserActionContext } from '../../../App';
import axios from 'axios';

const EditUserProfile = () => {
    const defaultData = {
        userProfession: [
            { value: 'Developer', name: 'Developer' },
            { value: 'Student', name: 'Student' },
            { value: 'Freelancer', name: 'Freelancer' },
            { value: 'Businessman', name: 'Businessman' },
            { value: 'Early bird', name: 'Early bird' },
            { value: 'Entrepreneur', name: 'Entrepreneur' },
            { value: 'Foodie', name: 'Foodie' },
        ],
        apartmentClean: [
            { value: 'Once a week', name: 'Once a week' },
            { value: 'Once a month', name: 'Once a month' },
            { value: 'Every few days', name: 'Every few days' },
        ],
        guests: [
            { value: 'Only during the day', name: 'Only during the day' },
            { value: 'Overnight is fine', name: 'Overnight is fine' },
            { value: 'No guests, please', name: 'No guests, please' },
        ],
        pets: [
            { value: 'I live with pets of my own', name: 'I live with pets of my own' },
            { value: 'No pets myself, but I don\'\t mind living with them', name: 'No pets myself, but I don\'\t mind living with them' },
            { value: 'No pets, please', name: 'No pets, please' },
        ],
    }
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [userAction, setUserAction] = useContext(UserActionContext);
    const initialData = {
        uid: loggedInUser.user_id,
        name: loggedInUser.name,
        email: loggedInUser,
        age: null,
        summary: null,
        userProfession: null,
        apartmentClean: null,
        smoke: null,
        guests: null,
        pets: null,
    }
    const [user, setUser] = useState(initialData);
    const handleChange = (e) => {
        let newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        const initial = {
            uid: loggedInUser.user_id,
            name: loggedInUser.name,
            email: loggedInUser.email,
            age: user.age,
            summary: user.summary,
            userProfession: user.userProfession,
            apartmentClean: user.apartmentClean,
            smoke: user.smoke,
            guests: user.guests,
            pets: user.pets,
        }
        // formData.append('uid', loggedInUser.user_id)
        // formData.append('name', loggedInUser.name)
        // formData.append('email', loggedInUser.email)
        // formData.append('age', user.age)
        // formData.append('summary', user.summary)
        // formData.append('userProfession', user.userProfession)
        // formData.append('apartmentClean', user.apartmentClean)
        // formData.append('smoke', user.smoke)
        // formData.append('guests', user.guests)
        // formData.append('pets', user.pets)

        await axios.put(`http://localhost:5000/api/updateUser/${loggedInUser.user_id}`, initial)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    //     console.log(user);
    //     console.log(initial)
    }

    // console.log(userAction);
    // console.log(loggedInUser);

    return (
        <div className="wrapper">
            <div className="header">
                <Navbar></Navbar>
            </div>
            <div className="content">
                <div className="user-sidebar justify-content-end align-items-end">
                    {/*  */}
                    <img src={loggedInUser.picture} alt='user image' className='img-fluid rounded-pill mx-auto d-block' />
                    <button className='btn btn-outline-primary'>Update image</button>
                    {/*  */}
                </div>
                <div className="dashboard-user">

                    <form onSubmit={handleFormSubmit} class="row g-3 m-5 mb-5">

                        <div className='personal-details border p-5'>
                            <h5>About User</h5>
                            <h6>Personal details</h6>
                            <div className='input-group d-flex justify-content-between mt-3'>
                                <div className="col-md">
                                    <label for="inputEmail4" className="form-label">Full name</label>
                                    <input type="text" disabled name="name" onChange={handleChange} defaultValue={loggedInUser.name} className="form-control" id="inputName" />
                                </div>
                                <div className="col-md">
                                    <label for="inputPassword4" className="form-label">Email</label>
                                    <input type="email" name="email" disabled defaultValue={loggedInUser.email} className="form-control" id="inputPassword" />
                                </div><br />

                            </div>
                            <div className='input-group d-flex mt-3'>
                                <div className="col-md-4">
                                    <label for="inputPassword4" className="form-label">Age</label>
                                    <input type="number" name="age" defaultValue={user.age} onChange={handleChange} className="form-control" id="inputPassword4" />
                                </div>
                            </div>
                            <div className='input-group d-flex justify-content-between mt-3'>
                                <div className="col-md">
                                    <label for="floatingTextarea2">Summary</label>
                                    <textarea name="summary" defaultValue={user.summary} onChange={handleChange} class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '60px' }}></textarea>
                                </div>
                                <div className="col-md">
                                    <label for="floatingSelectGrid">Which of these words describe you?</label>
                                    <select name="userProfession" onChange={handleChange} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                        {
                                            defaultData.userProfession.map((option) => {
                                                return (
                                                    <option selected={option.value == user.userProfession ? true : false} value={option.value}>{option.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className=' roommate-preference border p-5'>
                            <h5>Roommate preference</h5>
                            <div className='input-group d-flex mt-4'>

                                <div className="col-md">
                                    <label for="floatingSelectGrid">How often do you clean your apartment?</label>
                                    <select name="apartmentClean" onChange={handleChange} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                    {
                                            defaultData.apartmentClean.map((option) => {
                                                return (
                                                    <option selected={option.value == user.apartmentClean ? true : false} value={option.value}>{option.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                                <div className="col-md">
                                    <label for="floatingSelectGrid">Do you smoke?</label>
                                    <select name="smoke" onChange={handleChange} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                        <option selected>Choose</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>
                            </div>
                            <div className='input-group d-flex mb-5 mt-4'>

                                <div className="col-md">
                                    <label for="floatingSelectGrid">How do you feel about pets?</label>
                                    <select name="pets" onChange={handleChange} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                    {
                                            defaultData.pets.map((option) => {
                                                return (
                                                    <option selected={option.value == user.pets ? true : false} value={option.value}>{option.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                                <div className="col-md">
                                    <label for="floatingSelectGrid">How do you feel about guests?</label>
                                    <select name="guests" onChange={handleChange} class="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
                                    {
                                            defaultData.guests.map((option) => {
                                                return (
                                                    <option selected={option.value == user.guests ? true : false} value={option.value}>{option.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className='row mt-3 justify-content-end'>
                            <div className='col-md align-items-center '>
                                <button className='btn btn-primary btn-sm align-self-center'>Save changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="footer">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default EditUserProfile;