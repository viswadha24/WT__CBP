import React, { useState } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import art1 from "../Images/corouselart1.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { MdNoMealsOuline } from "react-icons/md";


function Cards(props) {

  let url="https://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c=s1200"
  const [userObj1,setuserObj]=useState({});
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let userObj;

  const handleSet = (userObj)=>{
   
    console.log("BEFORE ENTRY  === ",userObj1)
   // userObj1=userObj;
    setuserObj(userObj)
    console.log("AFTER ENTRY  === ",userObj1)

    setShow(true);
  }
  
  const handleAdd = (userObj) =>{
      
    

    const name=localStorage.getItem("username")
        
    console.log("NAMEEEEEEEE === ",name,userObj1);

    
    axios
    .post(`http://localhost:3003/user-api/add-to-cart/${name}`,userObj1)
    .then((response) => {
     // alert(response.data.message+"🎇🎃🎃🎃");
      //if user created
      if (response.data.message === "Username already exists") {
        //navigate to login
        
         alert(response.data.message+"🎃🎃🎃");  
      }
      else
      {
        alert(response.data.message+"🎇🎇🎇🎇🎇");
       // navigate("/login");
      }
    })
    .catch((error) => {
      console.log(error,"*******+++++++++++++");
      alert("Something went wrong in creating user");
    });   

       setShow(false);
     
  }


  /*
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();   */

  const onFormSubmit = (userObj) => {
    console.log(userObj);
  };

  let users=props.users
  console.log(" USERS ==== 🎁🎀🎁🎀🎀🎀 ",props.users);

  const [islogged,setState]=useState(false)

  const [name1,setName]=useState("");

  useEffect(()=>{
    console.log("FIRST EXECUTED   ");
    const name=localStorage.getItem("username");
    setName(props.username);
      if(name!=null)
      {
        setState(true);
      }
   })
 
 

  const getCartItems=(userObj)=>{
      userObj1=userObj;
  }

  const addCartItems=(userObj)=>
  {
       
    const name=localStorage.getItem("username")
        
    console.log("NAMEEEEEEEE === ",name);

    
    axios
    .post(`http://localhost:3003/user-api/add-to-cart/${name}`,userObj)
    .then((response) => {
     // alert(response.data.message+"🎇🎃🎃🎃");
      //if user created
      if (response.data.message === "Username already exists") {
        //navigate to login
        
         alert(response.data.message+"🎃🎃🎃");  
      }
      else
      {
        alert(response.data.message+"🎇🎇🎇🎇🎇");
       // navigate("/login");
      }
    })
    .catch((error) => {
      console.log(error,"*******+++++++++++++");
      alert("Something went wrong in creating user");
    });


  }

 /* let users=[
    {
       id:"1",
       name:"bfjghj",
       username:"visu",
       website:"www.google1.com"
    },
    {
      id:"2",
      name:"bbbbb",
      username:"veda",
      website:"www.google2.com"
   },
   {
    id:"3",
    name:"ccccc",
    username:"rana",
    website:"www.google3.com"
   },
   {
    id:"4",
    name:"ddddd",
    username:"varshi",
    website:"www.google4.com"
  }
  ]*/

  return (
    <div className='mx-5 my-4'>
      <Row xs={1} md={3} className="g-4">
        {users.map((userObj) => (
          <Col>
            <Card  className="shadow-box-example z-depth-5" style={{width:'320px',alignContent:'center',padding:'10px',
        boxShadow: '1px 2px 3px #000000',}}>
              <Card.Img variant="top" src={userObj.url}
              style={{width:'300px',boxShadow:3}}
              />
              <Card.Body>
                <Card.Title>{userObj.artName}</Card.Title>
                <Card.Text>
                {userObj.description}
                  This is a longer card with supporting text below as a natural
                </Card.Text>
                <Button className="float-right" variant="primary" onClick={()=>handleSet(userObj)}>
    
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
        
        }
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{userObj1.artName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            <li>
              <b>Name : </b>
              {userObj1.artName}
            </li>
            <li>
              <b>Artist : </b>
              {userObj1.artistName}
            </li>
            <li>
              <b>Price : </b>
              {userObj1.price}
            </li>
            <li>
              <b>Quantity : </b>
              {userObj1.quantity}
            </li>
            <li>
              <b>Description : </b>
              {userObj1.description}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          
          {name1=="home" &&
            islogged===true &&
              <Button variant="secondary"  onClick={()=>handleAdd(userObj1)}>
                 AddToCart
               </Button>
          }
            {islogged==true && name1=="arts" &&
            <Button variant="secondary"  onClick={handleClose}>
            Close
            </Button>
            }


              {name1=="home" &&
            <Button variant="secondary"  onClick={handleClose}>
            Close
            </Button>
            }
            
          
          
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cards;