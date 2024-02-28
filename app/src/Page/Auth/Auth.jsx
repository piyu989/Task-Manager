import React, { useState } from 'react';
import "./Auth.css"
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {

  const [isRegister,setIsRegister]=useState(true);
  const togglePanel=()=>{
    setIsRegister(!isRegister)
  }

  return (
    <div className='justify-center flex items-center h-screen overflow-hidden'>
      <div className='box lg:max-w-4x1 '>
        <div className={`cover ${isRegister?"rotate-active":""}`}>
          <div className='front'>
            <img alt='' src='https://i.pinimg.com/564x/4c/ca/f9/4ccaf963538fc92d008d3b6e4aabac75.jpg'/>
            <div className='text'>
              <span className='text-1'>Sucess built upon well</span>
              <br/>
              <span className='text-2 text-xs'>Let's get connected</span>
            </div>
          </div>
          <div className='back'>
            <img src='https://i.pinimg.com/474x/56/42/44/564244e71d47c7f2951eee78cfc690ec.jpg' alt=''/>
          </div>
        </div>
        <div className='forms h-full'>
          <div className='form-content h-full'>
            <div className='login-form'>
              <Signin togglePanel={togglePanel}/>
            </div>
            <div className='signup-form'>
              <Signup togglePanel={togglePanel}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
