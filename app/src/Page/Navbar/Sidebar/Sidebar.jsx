import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import "./Sidebar.css"
import CreateNewTaskCard from '../../Task/CreateTaskCard'
import { useLocation, useNavigate } from 'react-router-dom'

const menu=[
    {name:"Home",value:"Home",role:["ROLE_CUSTOMER","ROLE_ADMIN"]},
    {name:"Done",value:"DONE",role:["ROLE_CUSTOMER","ROLE_ADMIN"]},
    {name:"Assigned",value:"ASSIGNED",role:["ROLE_ADMIN"]},
    {name:"Not Assigned",value:"PENDING",role:["ROLE_ADMIN"]},
    {name:"Create new Task",value:"",role:["ROLE_ADMIN"]},
    {name:"Notification",value:"Notification",role:["ROLE_CUSTOMER"]}
]

const role="ROLE_ADMIN"


const Sidebar = () => {

    const location=useLocation();

    const navigate=useNavigate();
    
    const [activeMenu, setActiveMenu]=useState("Home");

    const [openCreateTaskList,setOpenCreateTaskList]=useState(false);

    const handleCloseCreateTaskList=()=>{
        setOpenCreateTaskList(false);
    };
    
    const handleOpenCreateTaskModel = () =>{
        setOpenCreateTaskList(true);
    };

    const handleMenuChange=(item)=>{
        const updatedParams=new URLSearchParams(location.search);

        if(item.name=="Create new Task"){
            handleOpenCreateTaskModel()
        }else if(item.name=="Home"){
            updatedParams.delete("filter")
            const queryString=updatedParams.toString();
            const updatedPath=queryString?`${location.pathname}?${queryString}`:location.pathname;
            navigate(updatedPath);
        }else{
            updatedParams.set("filter",item.value);
            navigate(`${location.pathname}?${updatedParams.toString()}`)
        }

        setActiveMenu(item.name)
    }

    const handleLogout =()=>{
        console.log("logout")
    }

    return (
        <>
            <div className='card fixed  min-h-[85vh] flex flex-col justify-center w-[20vw]'>
                <div className='space-y-5 h-full'>
                    <div className='flex justify-center'>
                        <Avatar
                        sx={{width:"8rem",height:"8rem"}}
                        className='border-2 border-[#c24dd0]'
                        src='https://i.pinimg.com/474x/91/ae/b8/91aeb80ad63e147c54272ce8277df8af.jpg'
                        />
                    </div>
                    {
                        menu.filter((item)=>item.role.includes(role))
                        .map((item)=><p key={item.value} onClick={() => handleMenuChange(item)} className={`py-1 rounded-full text-center cursor-pointer ${activeMenu===item.name?"activeMenuItem":"menuItem"}`}>
                            {item.name}
                        </p>)
                    }
                    <Button onClick={handleLogout} sx={{padding:".4rem",borderRadius:"2rem"}} fullWidth className='logoutButton'>
                        logout
                    </Button>
                </div>
            </div>
            <CreateNewTaskCard open={openCreateTaskList} handleClose={handleCloseCreateTaskList}/>
        </>
  )
}

export default Sidebar  