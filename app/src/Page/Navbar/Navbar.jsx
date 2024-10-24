import { Avatar } from '@mui/material';
import React from 'react';
import "./Navbar.css";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { task, auth } = useSelector(store => store);

  return (
    <div className='containe z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center'>
        <p className='font-bold text-lg'>Piyush Thakur</p>
        <div className='flex items-center gap-5'>
            {/* Check if auth.user is available before trying to access fullName */}
            {auth.user ? (
                <>
                    <p>{auth.user.fullName}</p>
                    <Avatar src='https://i.pinimg.com/474x/bd/55/d4/bd55d406105589c771c2716abf9667f4.jpg'>P</Avatar>
                </>
            ) : (
                <p>Welcome, Guest</p> // Fallback when user is not logged in
            )}
        </div>
    </div>
  );
}

export default Navbar;
