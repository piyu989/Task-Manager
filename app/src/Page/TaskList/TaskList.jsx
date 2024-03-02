import React, { useEffect } from 'react'
import TaskCard from '../Task/TaskCard/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, fetchUsersTask } from '../../ReduxToolKit/TaskSlice';
import { useLocation } from 'react-router-dom';

const TaskList = () => {

  const dispatch=useDispatch();
  const {task,auth}=useSelector(store=>store)
  const location=useLocation();
  const queryParams=new URLSearchParams(location.search);
  const filterValue=queryParams.get("filter")



  useEffect(()=>{
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}));
    }else{
      dispatch(fetchUsersTask({status:filterValue}));
    }
  },[filterValue]);

  console.log("tasks: ",task)

  return (
    <div className='w-[65vw]'>
        <div className='space-y-6'>
            {
              task.tasks.map((item)=>(
              <TaskCard item={item}/>))
            }
        </div>
    </div>
  )
}

export default TaskList