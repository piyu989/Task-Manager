import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../UserList';
import SubmissionList from '../SubmissionList';
import EditTaskCard from '../EditTaskCard';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import { fetchTaskById } from '../../../ReduxToolKit/TaskSlice';
import { useSelector } from 'react-redux';
import SubmitFormModel from './SubmitFormModel';

const role="ROLE_ADMIN"

const TaskCard = ({item}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const {auth}=useSelector(store=>store)
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        
        // navigate('/');
        // handleRemoveTaskIdParams();
    };

    const [formData,setFormData]=useState({
        title:"",
        image:"",
        description:"",
        tags:[],
        deadline: new Date(),
      })

    const [openUserList,setOpenUserList]=useState(false);
    
    const handleMenuCloseUserList=()=>{
        setOpenUserList(false);
    };
    
    const handleOpenUserList = () =>{
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`);
        
        setOpenUserList(true);
        handleMenuClose();
    };

    const [openSubmissionList,setOpenSubmissionList]=useState(false);
    
    const handleSubmissionCloseList=()=>{
        setOpenSubmissionList(false);
    };
    
    const handleOpenSubmissionList = () =>{
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`);

        setOpenSubmissionList(true);
        handleMenuClose();
    };

    const [openEditList,setOpenEditList]=useState(false);

    const handleEditCloseList=()=>{
        setOpenEditList(false);
    };

    const location=useLocation();
    const navigate=useNavigate();

    // const handleRemoveTaskIdParams=()=>{
    //     const updatedParams = new URLSearchParams(location.search);
    //     updatedParams.delete("filter")
    //     const queryString=updatedParams.toString();
    //     const updatedPath=queryString?`${location.pathname}?${queryString}`:location.pathname;
    //     navigate(updatedPath);
    // }
    
    const handleOpenEditkModel = async () => {
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`);

        setOpenEditList(true);      
        handleMenuClose();
        // navigate('/');
        // handleRemoveTaskIdParams();  
    };

    const handleDeleteTask = () =>{
        axios.delete(`http://localhost:8080/api/tasks/${item.id}`);
        window.location.reload();
        handleMenuClose();
    };


    const [openSubmitFormModel,setOpenSubmitFormModel]=useState(false);
    
    const handleCloseSubmitFormModel=()=>{
        setOpenSubmissionList(false);
    };
    
    const handleOpenSubmitFormModel = () =>{
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParams.toString()}`);

        setOpenSubmitFormModel(true);
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
                        auth.user?.role === "ROLE_ADMIN"?<>
                        <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                        <MenuItem onClick={handleOpenSubmissionList}>See Submission</MenuItem>
                        <MenuItem onClick={handleOpenEditkModel}>Edit</MenuItem>
                        <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
                        </>:<>
                        <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
                        </>
                    }
                </Menu>
            </div>
        </div>
        <UserList open={openUserList} handleClose={handleMenuCloseUserList} />
        <SubmissionList open={openSubmissionList} handleClose={handleSubmissionCloseList} />
        <EditTaskCard item={item} open={openEditList} handleClose={handleEditCloseList} />
        <SubmitFormModel open={openSubmitFormModel} handleClose={handleCloseSubmitFormModel} />
    </div>
  )
}

export default TaskCard