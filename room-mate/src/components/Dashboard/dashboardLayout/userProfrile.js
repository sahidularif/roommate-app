import React, { useEffect } from 'react';
import Footer from '../../home/footer/footer';
import Navbar from '../../home/header/navBar';
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import userPic from '../../../images/users/person_1.jpg';
import { Link } from 'react-router-dom';
const UserProfile = () => {
   
return (
        <div className="wrapper">
            <div className="header">
                <Navbar></Navbar>
            </div>
            <div className="content">
                <div className="user-sidebar justify-content-end align-items-end">
                    {/*  */}
                    <img src={userPic} alt='user image' className='img-fluid rounded-pill mx-auto d-block' />
                    <h5>User name</h5>
                    <h6>25</h6>
                    {/*  */}
                </div>
                <div className="dashboard-user">
                    <div className='row btn-user-edit mt-3 justify-content-end align-items-end mx-5'>
                        <div className='align-items-end justify-content-end'>
                            <Link to="/edit-user">
                                <button className='' type='button'><i class="far fa-user-edit"></i> Edit Profile</button>
                            </Link>
                        </div>
                    </div>
                    <div className='col-md-10 about-user p-5'>


                        <h5>About User</h5>

                        <div className='justify-content-between mt-3'>
                            <div className="col-md">
                                <h6>Summary</h6>
                                <span>I'm honestI'm honestI'm honestI'm honestI'm honestI'm honestI'm honestI'm honest</span>
                            </div><br />
                            <div className="col-md">
                                <h6>I’d describe myself as…</h6>
                                <span style={{ color: 'rgb(239,206,163)' }}>Student</span>
                            </div><br />

                        </div>
                    </div>
                    <div className='col-md-10 roommate-preference p-5'>
                        <h5>Roommate preference</h5>
                        <div className='input-group d-flex mt-4'>

                            <div className="col-md">
                                <label for="floatingSelectGrid">How often do you clean your apartment?</label><br />
                                <span>Once a week</span>
                            </div>
                            <div className="col-md">
                                <label for="floatingSelectGrid">Do you smoke?</label><br />
                                <span>No</span>

                            </div>
                        </div>
                        <div className='input-group d-flex mb-5 mt-4'>

                            <div className="col-md">
                                <label for="floatingSelectGrid">How do you feel about pets?</label><br />
                                <span>No pets please</span>

                            </div>
                            <div className="col-md">
                                <label for="floatingSelectGrid">How do you feel about guests?</label><br />
                                <span>Overnight is fine</span>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="footer">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default UserProfile;