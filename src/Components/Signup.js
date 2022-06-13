import React from 'react'
import { useForm } from 'react-hook-form'
import { MdLogin } from "react-icons/md"

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit=(userObj)=>{
    console.log(userObj)
    alert("Signup Successfull")
  }

  return (
    <form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
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
        <input type="password" name='' id='pass' className='form-control' placeholder='Enter password' {...register('pass', { required: true })} />
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