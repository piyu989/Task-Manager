import { ThemeProvider } from '@mui/material';
import './App.css';
import DarkTheme from './theme/DarkTheme';
import Navbar from './Page/Navbar/Navbar';
import Home from './Page/Home/Home';
import Auth from './Page/Auth/Auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './ReduxToolKit/TaskSlice';
import { getUserProfile } from './ReduxToolKit/AuthSlice';

function App() {

  const user=useState(true);
  const dispatch=useDispatch();
  const {task,auth}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")))
  },[auth.jwt]);

  return (
    <div className="">
      <ThemeProvider theme={DarkTheme}>
        {auth.user ? <div>
          <Navbar/>
          <Home/>
        </div>: <Auth/>}
      </ThemeProvider>  
    </div>
  );
}

export default App;
