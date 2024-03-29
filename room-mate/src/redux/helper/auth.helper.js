import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import jwt_decode from 'jwt-decode';
import { auth } from '../../components/login/firebaseConfig';
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
//Base Url
// const API_URL = "https://gleaming-puce-pullover.cyclic.app/auth/"
const API_URL = "https://determined-shift-tick.cyclic.app/api/v1.0/auth/"

// User Registration
const register = async (newUser) => {
    const response = await axios.post(API_URL + "register", newUser);
    console.log(response)
    return response.data;
};


// User Login
const login = async (user) => {
    const response = await axios.post(API_URL + "login", user);
console.log(response)
    if (response.data) {
        localStorage.setItem('jwt', JSON.stringify(response.data.token));
        // console.log(response.data)
        const decodedJwt = jwt_decode(response.data.token);
        // console.log(decodedJwt)
        localStorage.setItem('user', JSON.stringify(decodedJwt.user));
        return { jwt: response.data.token, user: decodedJwt.user };
    }
    return { jwt: response.data, user: null };
};


// Google signin
const googleLogin = async () => {
    try {
        const res = await signInWithPopup(auth, provider)
            .then((result) => {
                return result
            })
        const credential = GoogleAuthProvider.credentialFromResult(res)
        const token = {
            token: credential?.accessToken
        }
        const user = {
            id: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            isAdmin: false,
        }
        localStorage.setItem('jwt', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))
        return {
            jwt: token,
            user: user,
        }

    } catch (error) {
        return { jwt: null, user: null }
    }
};


// User Logout
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
};


// Jwt Verification
const verifyJwt = async (jwt) => {
    const response = await axios.post(
        `API_URL/verifyJWT`,
        { jwt }
    );
        console.log(response);
    if (response.data) {
        const jwtExpirationMs = response.data.exp * 1000;
        return jwtExpirationMs > Date.now();
    }

    return false;
};

const authService = {
    register,
    login,
    googleLogin,
    logout,
    verifyJwt,
};

export default authService;
