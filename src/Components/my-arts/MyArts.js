import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { MdLogin } from "react-icons/md";
import Cards from '../card/Cards';
import axios from 'axios';
//import { Component } from 'react';
import { useEffect } from 'react';

function MyArts() {


    let [art, setArt] = useState({ img: "" });
    
    let [users, setArts] = useState([])
    const [name1,setName]=useState("")

    useEffect(()=>{
      getArts();
      console.log("gets first time")
      const name=localStorage.getItem("username");
      setName(name)
     },[])
    

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onFormSubmit=(addArtObj)=>{
        addArtObj.image = art.img;
        console.log(addArtObj);

        const name=localStorage.getItem("username")
        
       console.log("NAMEEEEEEEE === ",name);

       
       axios
       .post(`http://localhost:3003/user-api/add-to-arts/${name}`,addArtObj)
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





        

        //alert("Art Added Successfull")
        setShow(false);
        getArts();
        getArts();
      }




      const handleChange = (e) => {
        setArt({ img: e.target.files[0].name });
      };

      const getArts=()=>{
        
        console.log("getArts is executed  ....")
        const name=localStorage.getItem("username");

        axios
        .get(`http://localhost:3003/user-api/get-art-products/${name}`)
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



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
        <div>
            <h1 className='mx-5 text-center'>My ARTS 
              <span className='ml-5' style={{float:"right"}}>
                 <Button variant="primary btn btn-warning" onClick={handleShow}>Add Arts</Button>
              </span>
            </h1>
            <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Art Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
        <form className='mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
      <div className='mb-3 mt-2'>
        <label htmlFor='artName'>Art Name</label>
        <input type="text" id='artName' className='form-control' placeholder='Enter Art Name' {...register('artName', { required: true, minLength: 4})} />
        {errors.artName?.type === 'required' && <p className='text-danger'> *artName is required </p>}
        {errors.artName?.type === 'minLength' && <p className='text-danger'> *min length should be 4 </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='artistName'>Artist Name</label>
        <input type="text" name='' id='artistName' className='form-control' placeholder='Enter Artist Name' {...register('artistName', { required: true })} />
        {errors.artistName?.type === 'required' && <p className='text-danger'> *Artist Name is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='price'>Price</label>
        <input type="number" name='price' id='price' className='form-control' placeholder='Enter price' {...register('price', { required: true })} />
        {errors.price?.type === 'required' && <p className='text-danger'> *Price is required </p>}
      </div>
      
      <div className='mb-3'>
        <label htmlFor='quantity'>Quantity</label>
        <input type="number" name='quantity' id='quantity' className='form-control' placeholder='Enter quantity' {...register('quantity', { required: true })} />
        {errors.quantity?.type === 'required' && <p className='text-danger'> *Quantity is required </p>}
      </div>

      <div className='mb-3'>
                <label htmlFor='description'>Description</label>
                <textarea name="description" id="description" rows="5" className='form-control' placeholder='Enter Description' {...register('description', {required: true})}/>
                {errors.description?.type === 'required' && <p className='text-danger'> *Address is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='url'>ArtImage Link</label>
        <input type="text" name='url' id='url' className='form-control' placeholder='Enter Url Link of ARt' {...register('url', { required: true })} />
        {errors.url?.type === 'required' && <p className='text-danger'> *ArtImage URL is required </p>}
      </div>
         
         
      <div className="mb-3">
              <label>Choose an image:</label>
              <input type="file" accept="image/png, image/jpeg" className="form-control-file"
                onChange={handleChange} />
              {errors.image?.type === "required" && ( <p className="text-danger">*Image is required</p> )}
     </div>
     <hr/>
     <button type='submit' className='btn btn-success mb-3 mx-auto'>Add Art <MdLogin/></button>
     <Button variant="secondary" className='mx-auto' style={{float:"right"}} onClick={handleClose}>
            Close
     </Button>
       
       </form>

        </Modal.Body>
       {/* <Modal.Footer>
        
          
         <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>  */ } 
      </Modal>

    </>
    <Cards className='mt-5'  users={users} username={"arts"}/>
        </div>
    );
}

export default MyArts;