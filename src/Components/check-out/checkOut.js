import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom' ;

function CheckOut() {
  const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onFormSubmit=(userObj)=>{
        console.log(userObj)
        const name=localStorage.getItem("username");

        axios
        .post(`http://localhost:3003/user-api/add-to-checkout/${name}`,userObj)
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
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error,"*******+++++++++++++");
          alert("Something went wrong in creating user");
        });
 

      }
    return (
     <div >
            
    <form className='w-50 mx-auto p-5'style={{backgroundColor:'#CBACE1'}} onSubmit={handleSubmit(onFormSubmit)} >
    <h1 className='text-center my-3'>Check Out</h1>
      <div className='mb-3 mt-3'>
        <label htmlFor='name'>Name</label>
        <input type="text" id='name' className='form-control' placeholder='Enter name' {...register('name', { required: true, minLength: 4 })} />
        {errors.name?.type === 'required' && <p className='text-danger'> *name is required </p>}
        {errors.name?.type === 'minLength' && <p className='text-danger'> *min length should be 4 </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='street'>Street</label>
        <input type="text" id='street' className='form-control' placeholder='Enter street' {...register('street', { required: true })} />
        {errors.street?.type === 'required' && <p className='text-danger'> *street is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='houseNo'>House-no</label>
        <input type="text" id='houseNo' className='form-control' placeholder='Enter house-no' {...register('houseNo', { required: true })} />
        {errors.houseNo?.type === 'required' && <p className='text-danger'> *house-no is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='city'>City</label>
        <input type="text" id='city' className='form-control' placeholder='Enter city' {...register('city', { required: true})} />
        {errors.city?.type === 'required' && <p className='text-danger'> *city is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='state'>State</label>
        <input type="text" id='state' className='form-control' placeholder='Enter state' {...register('state', { required: true})} />
        {errors.state?.type === 'required' && <p className='text-danger'> *state is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='country'>Country</label>
        <input type="text" id='country' className='form-control' placeholder='Enter country' {...register('country', { required: true})} />
        {errors.country?.type === 'required' && <p className='text-danger'> *country is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='pincode'>Pincode</label>
        <input type="number" id='pincode' className='form-control' placeholder='Enter pincode' {...register('pincode', { required: true})} />
        {errors.pincode?.type === 'required' && <p className='text-danger'> *pincode is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='phonenumber'>Phonenumber</label>
        <input type="number" id='phonenumber' className='form-control' placeholder='Enter phonenumber' {...register('phonenumber', { required: true})} />
        {errors.phonenumber?.type === 'required' && <p className='text-danger'> *phonenumber is required </p>}
      </div>

      <button type='submit' className='btn btn-success d-block mx-auto'>Checkout</button>
    </form>
        </div>
    );
}

export default CheckOut;