import React, { useContext } from 'react';
import '../../../styles/addListing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { UserActionContext } from '../../../App';
const AddListing = () => {
    const [userAction, setUserAction] = useContext(UserActionContext);
    return (
        <div className="addListing-section mt-5 mb-5">
            <div className="advertise">
                <div class="heading-section ftco-animate">
                    <h3 class="mb-1 text-center">Looking for roommate?</h3>
                    <p>Be amazed at the response rate - rent your room within days</p>
                    <p className="p-btn" onClick={() => setUserAction({ roommate: true })}>
                        <Link to="/roommateFind" className="btn outlin-btn rounded-pill mt-2 px-4 py-3">Add Your Room</Link>
                    </p>
                </div>
            </div>
            <div className="advertise">
                <div class="heading-section ftco-animate">
                    <h3 class="mb-1 text-center">Looking for room?</h3>
                    <p>Most people with rooms for rent search the rooms wanted for suitable.</p>
                    <p className="p-btn" onClick={() => setUserAction({ roommate: false })}>
                        <Link to="/roomFind" className="btn outlin-btn rounded-pill mt-2 px-4 py-3">Advertise for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddListing;