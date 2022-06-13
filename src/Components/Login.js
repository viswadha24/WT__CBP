import React from 'react'
import { useForm } from 'react-hook-form'
import { FiLogIn } from "react-icons/fi"

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit=(userObj)=>{
    console.log(userObj)
  }

  return (
    <form className='w-50 mx-auto p-5' onSubmit={handleSubmit(onFormSubmit)}>
      <div className='mb-3 mt-5'>
        <label htmlFor='username'>Username</label>
        <input type="text" id='username' className='form-control' placeholder='Enter username' {...register('username', { required: true, minLength: 4})} />
        {errors.username?.type === 'required' && <p className='text-danger'> *Username is required </p>}
        {errors.username?.type === 'minLength' && <p className='text-danger'> *min length should be 4 </p>}
      </div>

      <div className='mb-3'>
        <label htmlFor='pass'>Password</label>
        <input type="password" name='' id='pass' className='form-control' placeholder='Enter password' {...register('pass', { required: true })} />
        {errors.pass?.type === 'required' && <p className='text-danger'> *Password is required </p>}
      </div>

      <button type='submit' className='btn btn-success d-block mx-auto'>Login <FiLogIn/></button>
    </form>
  )
}

export default Login