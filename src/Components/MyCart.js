import React,{useState} from 'react';
//import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' ;

import axios from 'axios';
import { useEffect } from 'react';
//import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function AddArts() {
  const navigate = useNavigate();

  let [users, setArts] = useState([])
  let [price, setPrice]=useState(0)
  let [qty,setQty]=useState(0)
  let [totalCost,setCost]=useState(0)

  useEffect(()=>{
    getCart();
    console.log("gets first time")
    
  // calculate();

   },[])

   const calculate=(users)=>
   {
    let p1=0;
    let q1=0;
    let t1=0;
    console.log("LENGTH ===",users.length,users)
     for (let index = 0; index < users.length; index++) {
         p1=p1+(+users[index].price);
         q1=q1+(+users[index].quantity); 
         t1=t1+(+users[index].quantity)*(+users[index].price);
         console.log("T1= ",t1,"  ",p1,"   ",q1);
    }
    console.log("T1= ",t1,"  ",p1,"   ",q1);
   setPrice(p1);
   setQty(q1);
   setCost(t1);
   }

   const getCart=()=>{
       
    const name=localStorage.getItem("username");
    console.log("getCart is executed  ....",name)
    

    axios
    .get(`http://localhost:3003/user-api/get-cart-products/${name}`)
    .then((response) => {
     // alert(response.data.message+"🎇🎃🎃🎃");
      //if user created
      if (response.data.message === "usercart empty") {
        //navigate to login
        
         alert(response.data.message+"🎃🎃🎃");  
      }
      else
      {
        setArts(response.data.products)
        calculate(response.data.products);
        console.log("CART PRODUCTS == ",response.data.products)
        alert(response.data.message+"🎇🎇🎇🎇🎇");
       // navigate("/login");
      }
    })
    .catch((error) => {
      console.log(error,"*******+++++++++++++");
      alert("Something went wrong in creating user");
    });




  }




   /*  let users=[
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
        <div>

    <div className='text-center container p-5 mx-auto'>
            {/* <h1 className='display-2 text-warning'>My Cart</h1>
             display users data as table */}
            <h1>MY CART
            {/*  <span  style={{float: "right"}}>
                <div className="btn btn-info d-block mx-auto text-white mb-2" style={{color:"red", padding:"20px"}}>
                      <a className='text-white'  data-bs-target="#mdl" data-bs-toggle="modal" > Add Doctor</a>
                </div>
    </span>  */}
            </h1>
            <table className="table mt-4">
                <thead>
                    <tr>
                      <th><h4>Product</h4></th>
                      <th><h4>Price</h4></th>
                      <th><h4>Items</h4></th>
                      <th><h4>Total Cost</h4></th>
                      <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((userObj) => <tr key={userObj.artName}>
                             <td><img src={userObj.url} style={{width:'280px'}} alt="" /><br/>{userObj.artName}</td>
                            <td>{userObj.price}</td>
                            <td>{userObj.quantity}</td>
                            <td>{userObj.price*userObj.quantity}</td>
                            
                        </tr>)
                    }
                </tbody>
                <thead>
                    <tr>
                      <th><h4>Totals</h4></th>
                      <th>  
                        <h4>
                            Total Individual price : {price}
                        </h4>
                      </th>
                      <th><h4>No. of items : {qty}</h4></th>
                      <th><h4>Total Cost : {totalCost} </h4></th>
                      <th></th>
                    </tr>
                </thead>
            </table>
      </div>

        <div>
           <button  className='btn btn-success d-block mx-auto' onClick={() =>navigate("/") }>Continue Shopping</button>
           <button  className='btn btn-success d-block mx-auto mt-2 mb-5' onClick={() =>navigate("/check-out") }>Proceed to CheckOut</button>
        </div>
         
        </div>
    );
}

export default AddArts;







