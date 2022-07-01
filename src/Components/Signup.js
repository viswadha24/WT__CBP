import React from 'react'
import { useForm } from 'react-hook-form'
import { MdLogin } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


  const onFormSubmit=(userObj)=>{
    console.log(userObj);   

    axios
    .post("http://localhost:3003/user-api/create-user",userObj)
    .then((response) => {
      //alert(response.data.message+"🎇🎃🎃🎃");
      //if user created
      if (response.data.message === "Username already exists") {
        //navigate to login
        
         alert(response.data.message+"🎃🎃🎃");  
      }
      else
      {
        alert(response.data.message+"🎇🎇🎇🎇🎇");
        navigate("/login");
      }
    })
    .catch((error) => {
      console.log(error,"*******+++++++++++++");
      alert("Something went wrong in creating user");
    });

    //alert("Signup Successfull");
  }

  return (
    <form className='w-50 mx-auto p-3 mt-3' onSubmit={handleSubmit(onFormSubmit)} style={{backgroundColor:'#ECEFAD'}}>
       <h3 className='text-center'>SIGNUP FORM</h3>
      <div className='mb-3 mt-2'>
        <label htmlFor='username'>Username</label>
        <input type="text" id='username' className='form-control' placeholder='Enter username' {...register('username', { required: true, minLength: 4})} />
        {errors.username?.type === 'required' && <p className='text-danger'> *Username is required </p>}
        {errors.username?.type === 'minLength' && <p className='text-danger'> *min length should be 4 </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='email'>Email</label>
        <input type="email" name='' id='email' className='form-control' placeholder='example@gmail.com' {...register('email', { required: true })} />
        {errors.email?.type === 'required' && <p className='text-danger'> *Email is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='pass'>Password</label>
        <input type="password" name='' id='pass' className='form-control' placeholder='Enter password' {...register('password', { required: true })} />
        {errors.pass?.type === 'required' && <p className='text-danger'> *Password is required </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='confpass'>Confirm Password</label>
        <input type="password" name='' id='confpass' className='form-control' placeholder='Re-Enter password' {...register('confpass', { required: true })} />
        {errors.pass?.type === 'required' && <p className='text-danger'> *Confirm Password is required </p>}
        <span id="message" className='text-danger'></span>
      </div>

      <div className='mb-3'>
        <label htmlFor='dob'>Date of Birth</label>
        <input type="date" name='' id='dob' className='form-control' {...register('dob', { required: true })} />
        {errors.dob?.type === 'required' && <p className='text-danger'> *Date of Birth is required </p>}
      </div>
      
      <div className='mb-3'>
        <label>Nationality  &nbsp; &nbsp;</label>
        <div className='form-check form-check-inline'>
              <input type='radio' id='nation' className='form-check-input' {...register('nationality')} value='nationality'/>
              <label htmlFor='nation' className='form-check-label'> India</label>
        </div>

        <div className='form-check form-check-inline'>
              <input type='radio' id='nation1' className='form-check-input' {...register('nationality')} value='nationality'/>
              <label htmlFor='nation' className='form-check-label'> Other</label>
        </div>
      </div>

      <div className='mb-3'>
                <label htmlFor='address'>Address</label>
                <textarea name="" id="" rows="5" className='form-control' placeholder='Enter Address' {...register('address', {required: true})}/>
                {errors.feedback?.type === 'required' && <p className='text-danger'> *Address is required </p>}
            </div>

      <button type='submit' className='btn btn-success d-block mx-auto mb-3'>Signup <MdLogin/></button>
    </form>
  )
}

export default Signup