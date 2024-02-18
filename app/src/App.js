import { ThemeProvider } from '@mui/material';
import './App.css';
import DarkTheme from './theme/DarkTheme';
import Navbar from './Page/Navbar/Navbar';
import Home from './Page/Home/Home';

function App() {
  return (
    <div className="">
      <ThemeProvider theme={DarkTheme}>
        <Navbar/>
        <Home/>
      </ThemeProvider>  
    </div>
  );
}

export default App;
