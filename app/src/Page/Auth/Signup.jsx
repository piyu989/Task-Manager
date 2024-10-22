import { Button, InputLabel, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { register } from '../../ReduxToolKit/AuthSlice';

const Signup = ({togglePanel}) => {

    const dispatch=useDispatch();
    
    const [formData,setFormData]=useState({
        fullName:"",
        role:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        dispatch(register(formData))
        console.log("login form",formData)
    }
    

  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-2'>Register</h1>
        <form className='space-y-2' onSubmit={handleSubmit}>
            <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            type='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='enter your Full Name...'
            />
            <TextField
            fullWidth
            onChange={handleChange}
            label="Email"
            name="email"
            type='email'
            value={formData.email}
            placeholder='enter your email...'
            />
            <TextField
            onChange={handleChange}
            fullWidth
            label="Password"
            name="password"
            type='password'
            value={formData.password}
            placeholder='enter your password...'
            />
            
            <Button
            className='customeButton'
            type='submit'
            fullWidth
            sx={{padding:".7rem"}}
            >
                Sign up
            </Button>   
            <div className='mt-3 flex items-center gap-1 py-2 justify-center'>
                <span>Already have account</span>
                <Button onClick={togglePanel}>Signin</Button>
            </div>
        </form>
    </div>
  )
}

export default Signup