// import { ThemeProvider } from '@mui/material';
// import './App.css';
// import DarkTheme from './theme/DarkTheme';
// import Navbar from './Page/Navbar/Navbar';
// import Home from './Page/Home/Home';
// import Auth from './Page/Auth/Auth';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks } from './ReduxToolKit/TaskSlice';
// import { getUserProfile } from './ReduxToolKit/AuthSlice';
// import VerifyOtp from './Page/Auth/VerifyOtp';
// import EnterEmail from './Page/Auth/EnterEmail';

// function App() {
//   const [isEmailVerified, setIsEmailVerified] = useState(false); // State to track email verification
//   const dispatch = useDispatch();
//   const { auth } = useSelector(store => store);

//   useEffect(() => {
//     dispatch(fetchTasks({}));
//     dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
//   }, [auth.jwt]);

//   // This function can be called upon successful OTP verification
//   const handleOtpVerificationSuccess = () => {
//     setIsEmailVerified(true); // Set the email verification state to true
//   };

//   return (
//     <div className="">
//       {!isEmailVerified ? (
//         <>
//           <EnterEmail />
//           <VerifyOtp onSuccess={handleOtpVerificationSuccess} />
//         </>
//       ) : (
//         <ThemeProvider theme={DarkTheme}>
//           {auth.user ? (
//             <div>
//               <Navbar />
//               <Home />
//             </div>
//           ) : (
//             <Auth />
//           )}
//         </ThemeProvider>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import './App.css';
import DarkTheme from './theme/DarkTheme';
import Navbar from './Page/Navbar/Navbar';
import Home from './Page/Home/Home';
import Auth from './Page/Auth/Auth';
import VerifyOtp from './Page/Auth/VerifyOtp';
import EnterEmail from './Page/Auth/EnterEmail';
import Signin from './Page/Auth/Signin'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './ReduxToolKit/TaskSlice';
import { getUserProfile } from './ReduxToolKit/AuthSlice';

function App() {
  const [isEmailVerified, setIsEmailVerified] = useState(false); // State to track email verification
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt, dispatch]);

  // This function can be called upon successful OTP verification
  const handleOtpVerificationSuccess = () => {
    setIsEmailVerified(true); // Set the email verification state to true
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <div className="">
        <Navbar /> {/* Always show the Navbar */}
        {!isEmailVerified ? (
          <>
            <EnterEmail />
            <VerifyOtp onSuccess={handleOtpVerificationSuccess} />
          </>
        ) : (
            
          <ThemeProvider theme={DarkTheme}>
           {auth.user ? (
            <div>
              <Navbar />
              <Home />
            </div>
          ) : (
            <Auth />
          )}
        </ThemeProvider>


          // <Signin /> // Show the Signin component after OTP verification
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
