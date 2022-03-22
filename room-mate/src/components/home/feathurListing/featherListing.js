import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { data, multiData } from "./data";
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

const PreviousBtn = (props) => {

  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaArrowCircleLeft style={{ color: "#f85959", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FaArrowCircleRight style={{ color: "#f85959", fontSize: "30px" }} />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 3,
  // infinite={false}
  // slidesToScroll={3}
  centerMode: true,
  centerPadding: "170px",
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

const FeatherListing = () => {
  return (
    <div style={{ margin: "60px" }} className="carousel">
      <div class="col-md-7 heading-section ftco-animate mb-3">
        <span class="subheading">Special Offers</span>
        <h2 class="mb-5"><strong>Top</strong> Rooms</h2>
      </div>
      <Slider {...carouselProperties}>
        {multiData.map((item) => (
          <Card item={item} />
        ))}
      </Slider>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        className="multi__image"
        src={item}
        alt=""
        style={{
          width: "100%",
          height: "170px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />
      {/* <p style={{ fontSize: "14px", padding: "5px 0" }}>TOP TRNDING TVs</p> */}
      <p style={{ fontSize: "16px", padding: "5px 0", color: "green" }}>
        From ₹ 7,000
      </p>
      {/* <p style={{ fontSize: "14px", padding: "5px 0", color: "gray" }}>
        Up To ₹ 5,000 Off on HDFC
      </p> */}
    </div>
  );
};

export default FeatherListing;