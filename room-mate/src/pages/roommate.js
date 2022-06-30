import Footer from "../components/home/footer/footer";
import Navbar from "../components/home/header/navBar";
import '../styles/rooms.css'
import img1 from '../images/assets/rooms/room11.jpg'
import img2 from '../images/assets/rooms/room10.jpg'
import { getDistricts, getDivisions, getRooms } from "../utilities/Api";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { useParams } from "react-router-dom";
// * main()
export default function Roommate() {
    const { _id } = useParams()
    const [room, setRoom] = useState([])
    const [images, setImages] = useState([])
    // console.log(data)
    const [divisions, setDivisions] = useState([])
    const [division, setDivision] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState("");
    const [searchInput, setSearchInput] = useState([{
        dateForm: null,
        dateTo: null
    }])
    useEffect(() => {
        axios.get(`http://localhost:5000/api/find_room/${_id}`)
            .then(res => {
                setRoom(res.data);
                setImages(res.data.img_collection);
            })
    }, [])


    useEffect(() => {
        getDivisions()
            .then(data => {
                setDivisions(data.data.data)
            })
    }, [])

    useEffect(() => {
        // console.log(searchData)
        getDistricts(division)
            .then(data => {
                setDistricts(data.data.data)
            })

    }, [division])
    // console.log(division)
    console.log(room)
    return (
        <div class="wrapper">
            <div class="header">
                <Navbar></Navbar>
            </div>

            <div className="content">
                <div class="sidebar">
                    {/*  */}
                    <div class="sidebar-wrap bg-light ftco-animate">
                        <div className="landlord-profile text-center">
                            <img src={img1} className="rounded-pill mb-3 img-fluid img-thumbnail" alt="..." />
                            <h4>Sahidul Arif</h4>
                            <div className="user-auth mt-2">
                                <span><i class="fas fa-envelope"></i></span>
                                <span><i class="fas fa-mobile-android-alt"></i></span>
                                <span><i class="fab fa-facebook"></i></span>
                            </div>
                            <h5 className="mt-3">Summary</h5>
                            <p>I'm a graphic designer from Canada with a job in advertising on the lower east side. I work Mon-Fri, and in my down time I like to workout, enjoy a good cocktail and/or explore the city! 😃😃</p>
                            <span><a href="#!">Contact</a></span>
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div className="rooms">
                    {/* {
                        rooms.map((room) => {
                            return (
                          
                            )
                        })
                    } */}
                    <div class="col-md-12 hotel-single mt-4 mb-5 ftco-animate">
                        <div className="bed-rate">
                            <p class="rate mb-5">
                                <span class="loc">
                                    <ul>
                                        <li><b>Move-in date:</b> {room.date} </li>
                                        <li><b>budget:</b> $0-{room.rent}</li>
                                    </ul>
                                </span>
                            </p>
                        </div>
                        <span className="roommate-name">About Sahidul</span>
                        <div className="about-roommate">
                            <p><strong>Work information</strong><br /><br />When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.</p>
                            <p><strong>I describe me:</strong><br /><br />When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.</p>
                        </div>


                        <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.</p>
                        <strong>Amenities</strong>
                        <div class="d-md-flex p-4 mb-5">

                            <ul className="amenities">
                                {
                                    room.amenities?.map(amenity => (<li>{amenity.text}</li>))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                    </div>
                </div>



            </div>
            <div class="footer">
                <Footer></Footer>
            </div>
        </div>
    )
}