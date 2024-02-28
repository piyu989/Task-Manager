import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../ReduxToolKit/AuthSlice';

const Signin = ({togglePanel}) => {
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        dispatch(login(formData))
        console.log("login form",formData)
    }

  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-10'>Login</h1>
        <form className='space-y-3' onSubmit={handleSubmit}>
            <TextField
            fullWidth
            label="Email"
            name="email"
            type='email'
            value={formData.email}
            placeholder='enter your email...'
            onChange={handleChange}
            />
            <TextField
            fullWidth
            label="Password"
            name="password"
            type='password'
            value={formData.password}
            placeholder='enter your password...'
            onChange={handleChange}
            />
            <Button
            className='customeButton'
            type='submit'
            fullWidth
            sx={{padding:".7rem"}}
            >
                Login
            </Button>   
            <div className='mt-5 flex items-center gap-1 py-5 justify-center'>
                <span>Don't have account?</span>
                <Button onClick={togglePanel}>signup</Button>
            </div>
        </form>
    </div>
  )
}

export default Signin