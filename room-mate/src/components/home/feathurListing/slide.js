import React from 'react';
import '../../../styles/feather.scss';
const Slide = (props) => {
    const { src, button, headline, index } = props.slide
    const slide = React.useRef();
    const {current} = props.current
    let classNames = 'slide'
    
    if (current === index) classNames += ' slide--current'
    else if (current - 1 === index) classNames += ' slide--previous'
    else if (current + 1 === index) classNames += ' slide--next'

    const handleMouseMove = (e) => {
        const el = slide.current
        const r = el.getBoundingClientRect()

        el.style.setProperty('--x', e.clientX - (r.left + Math.floor(r.width / 2)))
        el.style.setProperty('--y', e.clientY - (r.top + Math.floor(r.height / 2)))
    }

    const handleMouseLeave = (e) => {
        slide.current.style.setProperty('--x', 0)
        slide.current.style.setProperty('--y', 0)
    }

    const handleSlideClick = (e) => {
        props.handleSlideClick(props.slide.index)
    }

    const imageLoaded = (e) => {
        e.target.style.opacity = 1
    }
    return (
        <li
            ref={slide}
            className={classNames}
            onClick={handleSlideClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="slide__image-wrapper">
                <img
                    className="slide__image"
                    alt={headline}
                    src={src}
                    onLoad={imageLoaded}
                />
            </div>

            <article className="slide__content">
                <h2 className="slide__headline">{headline}</h2>
                <button className="slide__action btn">{button}</button>
            </article>
        </li>
    );
};

export default Slide;