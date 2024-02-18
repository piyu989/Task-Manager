import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import "./Sidebar.css"

const menu=[
    {name:"Home",value:"Home",role:["ROLE_CUSTOMER","ROLE_ADMIN"]},
    {name:"Done",value:"Done",role:["ROLE_CUSTOMER","ROLE_ADMIN"]},
    {name:"Assigned",value:"Assigned",role:["ROLE_ADMIN"]},
    {name:"Not Assigned",value:"Pending",role:["ROLE_ADMIN"]},
    {name:"Create new Task",value:"",role:["ROLE_ADMIN"]},
    {name:"Notification",value:"Notification",role:["ROLE_CUSTOMER"]}
]

const role="ROLE_ADMIN"


const Sidebar = () => {
    
    const [activeMenu, setActiveMenu]=useState("Home")

    const handleMenuChange=(item)=>{
        setActiveMenu(item.name)
    }

    const handleLogout =()=>{
        console.log("logout")
    }

    return (
        <div className='card fixed min-h-[85vh] flex flex-col justify-center w-[20vw]'>
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
            <Button onClick={handleLogout()} sx={{padding:".4rem",borderRadius:"2rem"}} fullWidth className='logoutButton'>
                logout
            </Button>
        </div>
    </div>
  )
}

export default Sidebar