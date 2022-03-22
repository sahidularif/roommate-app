import React, { useState } from 'react';
import Slide from './slide';
import '../../../styles/feather.scss';
// Functional Component
const TrySlide = (props) => {
  const [count, setCount] = useState({ current: 2 });
  const { slides, heading } = props
  const { current, direction } = count;

  const SliderControl = ({ type, title, handleClick }) => {
    return (
      <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
    )
  }

  const handlePreviousClick = () => {
    const previous = current - 1

    setCount({
      current: (previous < 0)
        ? slides.length - 1
        : previous
    })
  }

  const handleNextClick = () => {
    const next = current + 1;

    setCount({
      current: (next === slides.length)
        ? 0
        : next
    })
  }

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCount({
        current: index
      })
    }
  }
  const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
  const wrapperTransform = {
    'transform': `translateX(-${current * (100 / slides.length)}%)`
  }

  return (
    <section class="ftco-section ftco-destination">
      <div class="container">
        <div class="row justify-content-start mb-5 pb-3">
          <div class="col-md-7 heading-section ftco-animate">

            <h4 class="mb-4"><strong></strong>Roommates </h4>
            <span class="subheading"><strong> 3,082 flatmates searching for a room </strong></span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12" id="app">
            <div className='slider' aria-labelledby={headingId}>
              <ul className="slider__wrapper" style={wrapperTransform}>
                <h3 id={headingId} class="visuallyhidden">{heading}</h3>

                {slides.map(slide => {
                  return (
                    <Slide
                      key={slide.index}
                      slide={slide}
                      current={current}
                      handleSlideClick={handleSlideClick}
                    />
                  )
                })}
              </ul>

              <div className="slider__controls">
                <SliderControl
                  type="previous"
                  title="Go to previous slide"
                  handleClick={handlePreviousClick}
                />

                <SliderControl
                  type="next"
                  title="Go to next slide"
                  handleClick={handleNextClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrySlide;