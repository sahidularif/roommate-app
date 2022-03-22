import jwt_decode from 'jwt-decode';
export const formValidation = (user, newUser, setErrMessage) => {
    let formErrors = {};
    let formIsValid = true;

    /* Sign in validation */
    // Email field
    if (!newUser && user.email != null && user.email !== undefined) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
            formIsValid = false;
            formErrors["email"] = "Email is not valid!";
        }
        else {
            formIsValid = true;
            formErrors["email"] = "";
        }
    }
    if (!newUser && user.email == null && user.email === undefined) {
        formIsValid = false;
        formErrors["email"] = "Email is required!";
    }
    // Password field
    if (!newUser && user.password == null && user.password === undefined) {
        formIsValid = false;
        formErrors["password"] = "Password is required!";
    }

    if (!newUser && user.password != null && user.password !== undefined) {
        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(user.password))) {
            formIsValid = false;
            formErrors["password"] = "Minimum eight characters, at least one letter and one number!";
        } else {
            formIsValid = true;
            formErrors["password"] = "";
        }
    }

    /* Sign up validation */
    // Name field
    if (newUser && user.name == null && user.name === undefined) {
        formIsValid = false;
        formErrors["name"] = "Name is required!";
    } else {
        formIsValid = true;
        formErrors["firstName"] = "";
    }

    // Email field
    if (newUser && user.email == null & user.email === undefined) {
        formIsValid = false;
        formErrors["email"] = "Email is required!";
    }

    if (newUser && user.email !== null && user.email !== undefined) {
        console.log('inner');
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
            formIsValid = false;
            formErrors["email"] = "Email is not valid!";
        }
        else {
            formIsValid = true;
            formErrors["email"] = "";
        }
    }
    // Password field
    if (newUser && user.password == null && user.password === undefined) {
        formIsValid = false;
        formErrors["password"] = "Password is required!";
    }

    if (newUser && user.password != null && user.password !== undefined) {
        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(user.password))) {
            formIsValid = false;
            formErrors["password"] = "Minimum eight characters, at least one letter and one number!";
        } else {
            formIsValid = true;
            formErrors["password"] = "";
        }
    }

    if (newUser && !user.tos) {
        formIsValid = false;
        formErrors["tos"] = "Must checked Terms of Services!";
    } else {
        formIsValid = true;
        formErrors["tos"] = "";
    }

    setErrMessage({ formErrors: formErrors });
    return formIsValid;
}

export const roomRentFirstStepValidation = (state, setErrMessage) => {
    let formErrors = {};
    let formIsValid = true;

    if (state.region == null && state.region === undefined) {
        formIsValid = false;
        formErrors["regionError"] = "Region is required!";
    } else {
        formIsValid = true;
        formErrors["regionError"] = null;
    }
    if (state.city == null && state.city === undefined) {
        formIsValid = false;
        formErrors["cityError"] = "City is required!";
    } else {
        formIsValid = true;
        formErrors["cityError"] = null
    }
    if (state.state == null && state.state === undefined) {
        formIsValid = false;
        formErrors["stateError"] = "State is required!";
    }
    if (state.zip == null && state.zip === undefined) {
        formIsValid = false;
        formErrors["zipError"] = "Zipcode is required!";
    } if (state.zip === "") {
        formIsValid = false;
        formErrors["zipError"] = "Zipcode is required!";
    }
    if (state.rent == null && state.rent === undefined) {
        formIsValid = false;
        formErrors["rentError"] = "Monthly rent is required!";
    } if (state.rent === "") {
        formIsValid = false;
        formErrors["rentError"] = "Monthly rent is required!";
    }
    if (state.deposit == null && state.deposit === undefined) {
        formIsValid = false;
        formErrors["depositError"] = "Deposit is required!";
    } if (state.deposit === "") {
        formIsValid = false;
        formErrors["depositError"] = "Deposit is required!";
    }
    if (state.date == null && state.date === undefined) {
        formIsValid = false;
        formErrors["dateError"] = "Move date is required!";
    } if (state.date === "") {
        formIsValid = false;
        formErrors["dateError"] = "Move date is required!";
    }
    //
    if (state.description == null && state.description === undefined) {
        formIsValid = false;
        formErrors["descriptError"] = "Description is required!";
    } if (state.description === "") {
        formIsValid = false;
        formErrors["descriptError"] = "Description is required!";
    }
    if(state.description !== null && state.description !== undefined){
        if(state.description.length < 300){
            formIsValid = false;
            formErrors["descCharError"] = "Description must be in 300 character!";
        }
    }
    //
    if (state.special == null && state.special === undefined) {
        formIsValid = false;
        formErrors["specialError"] = "Room specialization is required!";
    } if (state.special === "") {
        formIsValid = false;
        formErrors["specialError"] = "Room specialization is required!";
    }
    if(state.special !==null && state.special !== undefined){
        if(state.special.length < 100){
            formIsValid = false;
            formErrors["specialCharError"] = "Room specialization is must be in 100 character!";
        }
    }


    setErrMessage({ formErrors: formErrors })
    return formIsValid;
}

export const roomRentSecondStepValidation = (state, setErrMessage) => {
    let formErrors = {};
    let formIsValid = true;
    // Room Type
    if (state.roomType == null && state.roomType === undefined) {
        formIsValid = false;
        formErrors["roomTypeErr"] = "Room type is required!";
    } if (state.roomType === "") {
        formIsValid = false;
        formErrors["roomTypeErr"] = "Room type is required!";
    }
    // Room No.
    if (state.room == null && state.roomTypeErr === undefined) {
        formIsValid = false;
        formErrors["roomErr"] = "Room number is required!";
    } if (state.roomTypeErr === "") {
        formIsValid = false;
        formErrors["roomErr"] = "Room number is required!";
    }
    
    // Bed No.
    if (state.bed == null && state.bed === undefined) {
        formIsValid = false;
        formErrors["bedErr"] = "Bed number is required!";
    } if (state.bed === "") {
        formIsValid = false;
        formErrors["bedErr"] = "Bed number is required!";
    }
    // Bath No.
    if (state.bath == null && state.bath === undefined) {
        formIsValid = false;
        formErrors["bathErr"] = "Bath number is required!";
    } if (state.bath === "") {
        formIsValid = false;
        formErrors["bathErr"] = "Bath number is required!";
    }
    // Minimum Stay
    if (state.minStay == null && state.minStay === undefined) {
        formIsValid = false;
        formErrors["minStayErr"] = "Minimum stay is required!";
    } if (state.minStay === "") {
        formIsValid = false;
        formErrors["minStayErr"] = "Minimum stay is required!";
    }
    // Maximum Stay
    if (state.maxStay == null && state.maxStay === undefined) {
        formIsValid = false;
        formErrors["maxStayErr"] = "Maximum stay is required!";
    } if (state.maxStay === "") {
        formIsValid = false;
        formErrors["maxStayErr"] = "Maximum stay is required!";
    }
    // Room Utilities
    if (state.utilities == null && state.utilities === undefined) {
        formIsValid = false;
        formErrors["utilitiesErr"] = "Room utilities is required!";
    } if (state.utilities === "") {
        formIsValid = false;
        formErrors["utilitiesErr"] = "Room utilities is required!";
    }
    
    // Room Utilities
    if (state.amenities == null && state.amenities === undefined) {
        formIsValid = false;
        formErrors["amenitiesErr"] = "Room amenities is required!";
    } if (state.amenities === "") {
        formIsValid = false;
        formErrors["amenitiesErr"] = "Room amenities is required!";
    }
    
  
    setErrMessage({ formErrors: formErrors })
    return formIsValid;
}
export const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;        
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
}