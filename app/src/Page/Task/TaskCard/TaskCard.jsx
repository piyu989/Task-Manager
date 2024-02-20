import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../UserList';
import SubmissionList from '../SubmissionList';
import EditTaskCard from '../EditTaskCard';

const role="ROLE_ADMIN"

const TaskCard = () => {

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
    
    const handleOpenEditkModel = () =>{
        setOpenEditList(true);
        handleMenuClose();
    };
    const handleDeleteTask = () =>{
        handleMenuClose();
    };

  return (
    <div>
        <div className='card lg:flex justify-between'>
            <div className='lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]'>
                <div>
                    <img className='lg:w-[7rem] lg:h-[rem] object-cover'
                    src='https://i.pinimg.com/474x/6f/4b/2e/6f4b2e0d5e686801f107213a4ce0a90c.jpg'
                    alt=''/>
                </div>
                <div className='space-y-5'>
                    <div className='space-y-2'>
                        <h1 className='font-bold text-lg'>Car rental website</h1>
                        <p className='text-gray-400 text-sm'>use latest framework and technology to create this website</p>
                    </div>

                    <div className='flex flex-wrap gap-2 items-center'>
                        {[1,1,1,1].map((item)=><span className='py-1 px-5 rounded-full techstack'>
                            Angular
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
        <EditTaskCard open={openEditList} handleClose={handleEditCloseList} />
    </div>
  )
}

export default TaskCard