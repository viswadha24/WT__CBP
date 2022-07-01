import React from 'react'
import { useForm } from 'react-hook-form'
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from 'react-router-dom' ;
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit=(userObj)=>{
    console.log(userObj,"************************");

    axios
    .post("http://localhost:3003/user-api/login",userObj)
    .then((response) => {
      //alert(response.data.message+"🎇🎃🎃🎃");
      //if user created
      if (response.data.message === "login-success") {
        //navigate to login
      //  navigate("/login");
         alert(response.data.message+"🎇🎃🎃🎃");  
          
         localStorage.setItem("token",response.data.token)
         localStorage.setItem("username",response.data.username)
         //localStorage.setItem("userObj",JSON.stringify(response.data.userObj))
         navigate("/");
      }
      else
      {
        alert(response.data.message+"🎇");
      }
    })
    .catch((error) => {
      console.log(error,"*******+++++++++++++");
      alert("Something went wrong in creating user");
    });


  }


  return (
    <form className='w-50 mx-auto p-5 mt-3' onSubmit={handleSubmit(onFormSubmit)} style={{backgroundColor:'#ACE1D8'}}>
      <h3 className='text-center'>LOGIN FORM</h3>
      <div className='mb-3 mt-5'>
        <label htmlFor='username'>Username</label>
        <input type="text" id='username' className='form-control' placeholder='Enter username' {...register('username', { required: true, minLength: 4})} />
        {errors.username?.type === 'required' && <p className='text-danger'> *Username is required </p>}
        {errors.username?.type === 'minLength' && <p className='text-danger'> *min length should be 4 </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='pass'>Password</label>
        <input type="password" name='' id='pass' className='form-control' placeholder='Enter password' {...register('password', { required: true })} />
        {errors.pass?.type === 'required' && <p className='text-danger'> *Password is required </p>}
      </div>

      <button type='submit' className='btn btn-success d-block mx-auto'>Login <FiLogIn/></button>
    </form>
  )
}

export default Login