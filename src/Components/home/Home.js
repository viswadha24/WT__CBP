import React from 'react'
import { Carousel } from 'react-bootstrap'
import Cards from '../card/Cards';
import art1  from '../Images/corouselart1.jpg'
import './Home.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
/*
  let users=[
    {
      "artName": "vbhjk",
      "artistName": "fghjk",
      "description": "ghcj dghj ghdjk vhj",
      "image": "20220315_195918.jpg",
      "price": "567",
      "quantity": "345"
    },
  
  ]  */

 

  let [users, setArts] = useState([])

    useEffect(()=>{
      getArts();
      console.log("gets first time")
     },[])

     const getArts=()=>{
        
      console.log("getArts in home is executed  ....")
      const name=localStorage.getItem("username");

      axios
      .get("http://localhost:3003/user-api/get-all-arts")
      .then((response) => {
       // alert(response.data.message+"🎇🎃🎃🎃");
        //if user created
        if (response.data.message === "userarts empty") {
          //navigate to login
          
           alert(response.data.message+"🎃🎃🎃");  
        }
        else
        {
          setArts(response.data.products)
          console.log("ARTS PRODUCTS == ",response.data.products)
          alert(response.data.message+"🎇🎇🎇🎇🎇");
         // navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error,"*******+++++++++++++");
        alert("Something went wrong in creating user");
      });


    }





  return (
    <div className='m-3'>
      <Carousel className='mt-5 mb-5'>
        <Carousel.Item>
          <img
            className="d-block"
            src="https://dreamsong.art/wp-content/uploads/afeatherplucked_install_1_web.jpg"
            alt="First slide"
            style={{width:'1600px',height:'560px'}}
          />
          <Carousel.Caption className='text-dark'>
           
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block"
            src="https://newcriterion.com/storage/app/resized/773/0c7/3bb/2022joanmitchell194o3-1_resized_7730c73bb41f416a8a54917f228119b85c64e03c.jpg"
            alt="Second slide"
            style={{width:'1600px',height:'560px'}}
          />
          <Carousel.Caption className='text-dark'>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block"
            src="https://artbusinessnews.com/wpdev/wp-content/uploads/2020/05/How-to-Talk-About-Your-Art-1170x780.jpg"
            alt="Third slide"
            style={{width:'1600px',height:'560px'}}
          />
          <Carousel.Caption className='text-dark'>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      
      <Cards className='mt-5' users={users} username={"home"}/>
      
    </div>
  );
}

export default Home