import React from 'react';
//import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' ;



function AddArts() {
  const navigate = useNavigate();
     let users=[
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
      ]


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
                      <th><h4>Item</h4></th>
                      <th><h4>Total Cost</h4></th>
                      <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((userObj) => <tr key={userObj.id}>
                             <td><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/G%C3%A9rald_KIERZEK_%28Cr%C3%A9dit_Ibo%29.jpg" style={{width:'100px'}} alt="" /></td>
                            <td>{userObj.id*3}</td>
                            <td>{userObj.name}</td>
                            <td>{userObj.username}</td>
                            
                        </tr>)
                    }
                </tbody>
            </table>
      </div>

        <div>
           <button  className='btn btn-success d-block mx-auto' onClick={() =>navigate("/") }>Continue Shopping</button>
           <button  className='btn btn-success d-block mx-auto' onClick={() =>navigate("/check-out") }>Proceed to CheckOut</button>
        </div>
         
        </div>
    );
}

export default AddArts;







