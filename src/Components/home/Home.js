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
            src="https://dreamsong.art/wp-content/uploads/afeatherplucked_install_1_web.jpg"
            alt="First slide"
            style={{width:'1600px',height:'400px'}}
          />
          <Carousel.Caption className='text-dark'>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block"
            src="https://newcriterion.com/storage/app/resized/773/0c7/3bb/2022joanmitchell194o3-1_resized_7730c73bb41f416a8a54917f228119b85c64e03c.jpg"
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
            src="https://artbusinessnews.com/wpdev/wp-content/uploads/2020/05/How-to-Talk-About-Your-Art-1170x780.jpg"
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