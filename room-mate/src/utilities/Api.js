import axios from 'axios'

export async function getDivisions () {
return await axios.get(`https://bdapis.herokuapp.com/api/v1.1/divisions`)
}

export async function getDistricts (division) {
return await axios.get(`https://bdapis.herokuapp.com/api/v1.1/division/${division}`)
}

export async function getRooms (division) {
return await axios.get(`http://localhost:5000/api/find_rooms`)
}