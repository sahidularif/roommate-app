import Footer from "../components/home/footer/footer";
import Navbar from "../components/home/header/navBar";
import '../styles/rooms.css'
import { getDistricts, getDivisions, getRooms } from "../utilities/Api";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../utilities/Pagination";
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";
let PageSize = 9;
export default function Roommates() {
    const url = `http://localhost:5000/api/searchRoom`
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([])
    const [rooms, setRooms] = useState([])
    const [searchInput, setSearchInput] = useState({
        keyword: null,
        dateFrom: null,
        dateTo: null,
        maxRent: null
    })
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/roommates`)
            .then(res => {
                setData(res.data);
            })
    }, [])
    // useEffect(() => {
    //     axios.get(url)
    //         .then(res => {
    //             setData(res.data);
    //         })
    // }, [setSearchInput])

    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setRooms(data.slice(firstPageIndex, lastPageIndex));
    }, [data]);
    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setRooms(data.slice(firstPageIndex, lastPageIndex));
    }, [currentPage]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/api/searchRoom', {
            params: {
                keyword: searchInput.keyword,
                dateFrom: searchInput.dateFrom,
                dateTo: searchInput.dateTo,
                maxRent: searchInput.maxRent
            }
        })
            .then(function (response) {
                setData(response.data)
            })
    }

    return (
        <div class="wrapper">
            <div class="header">
                <Navbar></Navbar>
            </div>

            <div className="content">
                <div class="sidebar">
                    {/*  */}
                    <div class="sidebar-wrap bg-light ftco-animate">
                        <h3 class="heading mb-4">Find City</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div class="fields">
                                <div class="form-group">
                                    <input type="text" name="keyword"
                                        onChange={(e) => {
                                            setSearchInput(current => ({ ...current, keyword: e.target.value }))
                                        }} class="form-control" placeholder="Destination, City" />
                                </div>
                                <div class="form-group">
                                    <DatePicker className="form-control" name="dateFrom" selected={searchInput.dateFrom ? searchInput.dateFrom : null} placeholderText="Date form"
                                        onChange={(date) => {
                                            setSearchInput(current => ({ ...current, dateFrom: date }))
                                        }} />
                                </div>
                                <div class="form-group">
                                    <DatePicker className="form-control" name="dateTo" selected={searchInput.dateTo ? searchInput.dateTo : null} placeholderText="Date to"
                                        onChange={(date) => {
                                            setSearchInput(current => ({ ...current, dateTo: date }))
                                        }} />
                                </div>

                                <div class="form-group">
                                    <input type="number"
                                        onChange={(e) => {
                                            setSearchInput(current => ({ ...current, maxRent: e.target.value }))
                                        }} name="maxRent" id="maxRant" class="form-control" placeholder="Max rent (Ex. $5000)" />
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Search" class="btn btn-primary py-3 px-5" />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/*  */}
                </div>
                <div className="rooms">
                    {
                        rooms.map((room) => {
                            return (
                                <div class="col-md-4 ftco-animate" onClick={() => history.push(`/roommate/${room._id}`)}>
                                    <div class="destination">
                                        <div
                                            class="img img-2 d-flex justify-content-center align-items-center"
                                            style={{ backgroundImage: `url(${room.img_collection[0]})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                            <div class="icon d-flex justify-content-center align-items-center">
                                                <i class="far fa-search"></i>
                                            </div>
                                        </div>
                                        <div class="text p-3">
                                            <div class="d-block">
                                                 <span class="roommate-name"><small>Natasha hayat, 20</small></span>
                                            </div>
                                            <p className="roommate-describe">I'm a graphic designer from Canada with a job in advertising on the lower east side.</p>
                                            <hr />
                                            <p class="bottom-area d-flex">
                                                <span><i class="icon-map-o"></i>{room.state}</span>
                                                <span class="price per-price">$40<br /><small>/budget</small></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="row">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={data.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </div>



            </div>
            <div class="footer">
                <Footer></Footer>
            </div>
        </div>
    )
}