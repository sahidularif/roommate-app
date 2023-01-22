import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from './firebaseConfig';
const provider = new GoogleAuthProvider();

// Create user with email and password(firebase)
export const createNewUserWithEmailAndPassword = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.isSignedIn = true;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(user.name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserinfo = {};
      newUserinfo.error = error.message
      return newUserinfo;
    });
}
// Sign in with email and password(firebase)
export const signInExistingUserWithEmailAndPassword = (user) => {
  return signInWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      const newUserInfo = res.user;
      console.log(newUserInfo);
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function (error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;  
      newUserInfo.success = false;
      console.log(newUserInfo);
      return newUserInfo;
    });
}
// Google sign in 
export const handleGoogleSignIn = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const { displayName, email } = result.user;
      const signedInUser = {
        name: displayName, email: email, success: true
      }
      return result;
    }).catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

// Update user name
const updateUserName = (name) => {
  updateProfile(auth.currentUser, {
    displayName: name
  }).then((res) => {
    console.log('update display name')
  }).catch((error) => {
    console.log((error.message));
  });
}
// Sign out
export const handleSignOut = () => {
  return signOut(auth).then((res) => {
    const signOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      error: '',
      success: false
    }
    return signOutUser;
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}
export const checkUserType = async (email) => {
  // return axios.get(`https://renterbd.herokuapp.com/api/getUser/${email}`)
  try {
    let response = await fetch(`https://renterbd.herokuapp.com/api/getUser/${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
export const checkSessionUser = (user) => {
  const sessionUser = sessionStorage.getItem('newUser')
  const data = JSON.parse(sessionUser)
  if (data.email !== user.email) {
    sessionStorage.setItem('newUser', JSON.stringify(user))
  }
}