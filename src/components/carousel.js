import React from 'react';
import { Carousel } from 'react-bootstrap';

import home1 from '../images/home1.jpg';
import home2 from '../images/home2.jpg';
import home3 from '../images/home3.jpg';
import home5 from '../images/home5.jpg';
import home7 from '../images/home7.jpg';

function HomeCarousel() {
    return (
        <>
            <Carousel >
                <Carousel.Item style={{ backgroundColor: 'white' }}>
                    <img
                        className="homeImage"
                        src={home5}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{ backgroundColor: 'white' }}>
                    <img
                        className='homeImage'
                        src={home2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{ backgroundColor: 'white' }}>
                    <img
                        className='homeImage'
                        src={home3}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{ backgroundColor: 'white' }}>
                    <img
                        className='homeImage'
                        src={home7}
                        alt="fourth slide"
                    />
                </Carousel.Item>
                <Carousel.Item style={{ backgroundColor: 'white' }}>
                    <img
                        className='homeImage'
                        src={home1}
                        alt="fifth slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default HomeCarousel;