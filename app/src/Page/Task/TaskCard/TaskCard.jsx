import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../UserList';
import SubmissionList from '../SubmissionList';
import EditTaskCard from '../EditTaskCard';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../ReduxToolKit/TaskSlice';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const role="ROLE_ADMIN"

const TaskCard = ({item}) => {

    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [openUserList,setOpenUserList]=useState(false);
    
    const handleMenuCloseUserList=()=>{
        setOpenUserList(false);
    };
    
    const handleOpenUserList = () =>{
        setOpenUserList(true);
        handleMenuClose();
    };

    const [openSubmissionList,setOpenSubmissionList]=useState(false);
    
    const handleSubmissionCloseList=()=>{
        setOpenSubmissionList(false);
    };
    
    const handleOpenSubmissionList = () =>{
        setOpenSubmissionList(true);
        handleMenuClose();
    };

    const [openEditList,setOpenEditList]=useState(false);

    const handleEditCloseList=()=>{
        setOpenEditList(false);
    };

    const location=useLocation();
    const navigate=useNavigate();
    
    const handleOpenEditkModel = () => {
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`);
        setOpenEditList(true);
        // axios.get(`http://localhost:8080/api/tasks/${item.id}`)
        //   .then(response => {
        //     const { data } = response;
        //     console.log("data is coming");
        //   })
        //   .catch(error => {
        //     console.error("Error fetching task:", error.response);
        //   });
        fetchData();
        console.log("ram ram")

        
        handleMenuClose();
    };

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/tasks/502`)
          const jsonData = response.data;
          console.log(jsonData); // JSON data
          console.log("milgya")
          return jsonData; // Return the JSON data if needed
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle the error
        }
      };
      
    const handleDeleteTask = () =>{
        axios.delete(`http://localhost:8080/api/tasks/${item.id}`);
        window.location.reload();
        handleMenuClose();
    };


  return (
    <div>
        <div className='card lg:flex justify-between'>
            <div className='lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]'>
                <div>
                    <img className='lg:w-[7rem] lg:h-[rem] object-cover'
                    src={item.image}
                    alt=''/>
                </div>
                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <h1 className='font-bold text-lg'>{item.title}</h1>
                        <p className='text-gray-400 text-sm'>{item.description}</p>
                    </div>

                    <div className='flex flex-wrap gap-2 items-center'>
                        {item.tags.map((item)=><span className='py-1 px-5 rounded-full techstack'>
                            {item}
                        </span>)}
                    </div>
                </div>
            </div>
            <div>
                <IconButton id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleMenuClick}>
                    <MoreVertIcon/>
                    </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        role==="ROLE_ADMIN"?<>
                        <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                        <MenuItem onClick={handleOpenSubmissionList}>See Submission</MenuItem>
                        <MenuItem onClick={handleOpenEditkModel}>Edit</MenuItem>
                        <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
                        </>:<>
                        
                        </>
                    }
                </Menu>
            </div>
        </div>
        <UserList open={openUserList} handleClose={handleMenuCloseUserList} />
        <SubmissionList open={openSubmissionList} handleClose={handleSubmissionCloseList} />
        <EditTaskCard item={item} open={openEditList} handleClose={handleEditCloseList} />
    </div>
  )
}

export default TaskCard