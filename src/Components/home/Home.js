import React from 'react'
import { Carousel } from 'react-bootstrap'
import Cards from '../card/Cards';
import art1  from '../Images/corouselart1.jpg'
import './Home.css'

function Home() {
  return (
    <div className='m-3'>
      <Carousel className='mt-5 mb-5'>
        <Carousel.Item>
          <img
            className="d-block"
            src={art1}
            alt="First slide"
          />
          <Carousel.Caption className='text-dark'>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block"
            src={art1}
            alt="Second slide"
          />
          <Carousel.Caption className='text-dark'>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block"
            src={art1}
            alt="Third slide"
          />
          <Carousel.Caption className='text-dark'>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Cards className='mt-5' />
    </div>
  );
}

export default Home